package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"path/filepath"

	"github.com/glebarez/sqlite"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/marcopeocchi/mille/internal/metadata"
	"github.com/marcopeocchi/mille/internal/middlewares"
	"github.com/marcopeocchi/mille/internal/search"
	"github.com/marcopeocchi/mille/internal/stream"
	"gorm.io/gorm"
)

var (
	//go:embed ui/dist
	app   embed.FS
	port  int
	cache string
)

func init() {
	flag.IntVar(&port, "p", 8080, "port to listen at")
	flag.StringVar(&cache, "c", ".cache", "path of cache directory")
	flag.Parse()
}

func main() {
	db, err := gorm.Open(sqlite.Open("data.db"))
	if err != nil {
		log.Fatalln(err)
	}

	build, _ := fs.Sub(app, "ui/dist")

	sh := middlewares.SpaHandler{
		Entrypoint: "index.html",
		Filesystem: &build,
	}
	sh.AddClientRoute("/album")
	sh.AddClientRoute("/albums")
	sh.AddClientRoute("/artists")
	sh.AddClientRoute("/songs")

	r := chi.NewRouter()
	r.Use(middlewares.CORS)
	r.Use(middleware.Logger)

	streamContainer := stream.Container(db)
	searchContainer := search.Container(db)
	metadataContainer, _ := metadata.Container(&http.Client{})

	r.Route("/api", func(r chi.Router) {
		r.Get("/stream/{id}", streamContainer.StreamFromStorage())

		r.Route("/album", func(r chi.Router) {
			r.Get("/all", searchContainer.FindAllAlbums())
			r.Get("/latest", searchContainer.Latest())
			r.Get("/random", searchContainer.RandomAlbum())
			r.Get("/search/id/{id}", searchContainer.FindAlbumByID())
			r.Get("/search/any/{query}", searchContainer.FindAny())
			r.Get("/search/like/{title}", searchContainer.FindAlbumByTitleLike())
			r.Get("/search/title/{title}", searchContainer.FindAlbumByTitle())
			r.Get("/search/artist/{artist}", searchContainer.FindAlbumByArtist())
		})

		r.Route("/track", func(r chi.Router) {
			r.Get("/all", searchContainer.FindAllTracks())
			r.Get("/search/id/{id}", searchContainer.FindTrackByID())
			r.Get("/search/like/{title}", searchContainer.FindTrackByTitleLike())
			r.Get("/search/title/{title}", searchContainer.FindTrackByTitle())
			r.Get("/search/genre/{genre}", searchContainer.FindTrackByGenre())
			r.Get("/search/artist/{artist}", searchContainer.FindTrackByArtist())
		})

		r.Route("/metadata", func(r chi.Router) {
			r.Get("/{name}", metadataContainer.GetAlbumMetadata())
		})
	})

	r.Route("/static", func(r chi.Router) {
		r.Get("/img/{id}", func(w http.ResponseWriter, r *http.Request) {
			id := chi.URLParam(r, "id")
			http.ServeFile(w, r, filepath.Join(cache, id))
		})
	})

	r.Get("/*", sh.Handler())

	http.ListenAndServe(fmt.Sprintf(":%d", port), r)
}
