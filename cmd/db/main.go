package main

import (
	"flag"
	"log"

	"github.com/glebarez/sqlite"
	"github.com/marcopeocchi/mille/internal/domain"
	"github.com/marcopeocchi/mille/pkg/seed"
	"gorm.io/gorm"
)

var (
	root  string
	cache string
)

func init() {
	flag.StringVar(&root, "r", ".", "path of music directory")
	flag.StringVar(&cache, "c", ".cache", "path of cache directory")
	flag.Parse()
}

func main() {
	db, err := gorm.Open(sqlite.Open("data.db"))
	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(domain.Track{})
	db.AutoMigrate(domain.Album{})

	seed.SeedDatabase(db, root, cache)
}
