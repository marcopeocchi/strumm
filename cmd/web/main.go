package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"

	"github.com/glebarez/sqlite"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/marcopeocchi/mille/internal/middlewares"
	"github.com/marcopeocchi/mille/internal/search"
	"github.com/marcopeocchi/mille/internal/stream"
	"gorm.io/gorm"
)

var (
	//go:embed ui/dist
	app embed.FS
)

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

	r := chi.NewRouter()
	r.Use(middlewares.CORS)
	r.Use(middleware.Logger)

	streamContainer := stream.Container(db)
	searchContainer := search.Container(db)

	r.Route("/api", func(r chi.Router) {
		r.Get("/stream/{id}", streamContainer.StreamFromStorage())

		r.Route("/album", func(r chi.Router) {
			r.Get("/search/id/{id}", searchContainer.FindAlbumByID())
			r.Get("/search/like/{title}", searchContainer.FindAlbumByTitleLike())
			r.Get("/search/title/{title}", searchContainer.FindAlbumByTitle())
			r.Get("/search/genre/{genre}", searchContainer.FindAlbumByGenre())
		})

		r.Route("/track", func(r chi.Router) {
			r.Get("/search/id/{id}", searchContainer.FindTrackByID())
			r.Get("/search/like/{title}", searchContainer.FindTrackByTitleLike())
			r.Get("/search/title/{title}", searchContainer.FindTrackByTitle())
			r.Get("/search/genre/{genre}", searchContainer.FindTrackByGenre())
		})
	})

	r.Get("/*", sh.Handler())

	http.ListenAndServe(":8080", r)
}
