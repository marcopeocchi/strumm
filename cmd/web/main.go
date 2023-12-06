package main

import (
	"context"
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"github.com/fsnotify/fsnotify"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/marcopeocchi/strumm/internal/album"
	"github.com/marcopeocchi/strumm/internal/metadata"
	"github.com/marcopeocchi/strumm/internal/middlewares"
	"github.com/marcopeocchi/strumm/internal/stream"
	"github.com/marcopeocchi/strumm/internal/track"
	"github.com/marcopeocchi/strumm/pkg/seed"
	_ "github.com/ncruces/go-sqlite3/embed"
	"github.com/ncruces/go-sqlite3/gormlite"
	"github.com/patrickmn/go-cache"
	"gorm.io/gorm"
)

var (
	//go:embed ui/dist
	app    embed.FS
	port   int
	root   string
	static string
	dbpath string
	lastfm string
)

func init() {
	flag.IntVar(&port, "p", 8080, "port to listen at")
	flag.StringVar(&root, "r", ".", "path of music directory")
	flag.StringVar(&static, "c", ".cache", "path of cache directory")
	flag.StringVar(&dbpath, "d", "data.db", "path of database")
	flag.StringVar(&lastfm, "lfm", os.Getenv("LASTFM_APIKEY"), "lastfm api key")
	flag.Parse()
}

func main() {
	db, err := gorm.Open(gormlite.Open(dbpath))
	if err != nil {
		log.Fatalln(err)
	}

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}

	defer watcher.Close()

	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				if event.Has(fsnotify.Write) || event.Has(fsnotify.Remove) {
					seed.Scan(db, root, static)
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println("filewatcher error:", err)
			}
		}
	}()

	if err := watcher.Add(root); err != nil {
		log.Fatalln(err)
	}

	go seed.Scan(db, root, static)

	var (
		httpClient  = http.DefaultClient
		sharedCache = cache.New(2*time.Hour, 10*time.Minute)
	)

	defer httpClient.CloseIdleConnections()

	build, err := fs.Sub(app, "ui/dist")
	if err != nil {
		log.Fatalln(err)
	}

	r := chi.NewRouter()
	r.Use(middlewares.CORS)
	r.Use(middleware.Logger)

	// Dependency Injection containers
	var (
		albumContainer    = album.Container(db)
		trackContainer    = track.Container(db)
		streamContainer   = stream.Container(db)
		metadataContainer = metadata.Container(httpClient, sharedCache, lastfm)
	)

	r.Route("/api", func(r chi.Router) {
		r.Get("/stream/{id}", streamContainer.StreamFromStorage())

		r.Route("/album", func(r chi.Router) {
			r.Get("/all", albumContainer.FindAllAlbums())
			r.Get("/latest", albumContainer.Latest())
			r.Get("/random", albumContainer.RandomAlbum())
			r.Get("/id/{id}", albumContainer.FindAlbumByID())
			r.Get("/any/{query}", albumContainer.FindAny())
			r.Get("/like/{title}", albumContainer.FindAlbumByTitleLike())
			r.Get("/title/{title}", albumContainer.FindAlbumByTitle())
			r.Get("/artist/{artist}", albumContainer.FindAlbumByArtist())
		})

		r.Route("/track", func(r chi.Router) {
			r.Get("/all", trackContainer.FindAllTracks())
			r.Get("/random", trackContainer.RandomTrack())
			r.Get("/id/{id}", trackContainer.FindTrackByID())
			r.Get("/like/{title}", trackContainer.FindTrackByTitleLike())
			r.Get("/title/{title}", trackContainer.FindTrackByTitle())
			r.Get("/genre/{genre}", trackContainer.FindTrackByGenre())
			r.Get("/artist/{artist}", trackContainer.FindTrackByArtist())
		})

		r.Route("/metadata", func(r chi.Router) {
			r.Get("/{name}", metadataContainer.GetAlbumMetadata())
		})
	})

	r.Route("/static", func(r chi.Router) {
		r.Get("/img/{id}", func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, filepath.Join(static, chi.URLParam(r, "id")))
		})
	})

	r.Get("/*", http.FileServer(http.FS(build)).ServeHTTP)

	s := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: r,
	}

	go gracefulShutdown(s, db)

	s.ListenAndServe()
}

func gracefulShutdown(s *http.Server, db *gorm.DB) {
	ctx, stop := signal.NotifyContext(context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
		syscall.SIGQUIT,
	)

	go func() {
		<-ctx.Done()
		log.Println("shutdown signal received")

		ctxTimeout, cancel := context.WithTimeout(
			context.Background(),
			5*time.Second,
		)

		defer func() {
			stop()
			cancel()
			fmt.Println("shutdown completed")
		}()

		s.Shutdown(ctxTimeout)
	}()
}
