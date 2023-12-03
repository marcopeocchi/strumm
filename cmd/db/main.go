package main

import (
	"flag"
	"log"
	"os"

	"github.com/glebarez/sqlite"
	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/internal/domain"
	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/pkg/seed"
	"gorm.io/gorm"
)

var (
	root   string
	cache  string
	dbpath string
)

func init() {
	flag.StringVar(&root, "r", ".", "path of music directory")
	flag.StringVar(&cache, "c", ".cache", "path of cache directory")
	flag.StringVar(&dbpath, "d", "data.db", "path of database")
	flag.Parse()
}

func main() {
	db, err := gorm.Open(sqlite.Open(dbpath))
	if err != nil {
		log.Fatalln(err)
	}

	os.Mkdir(cache, os.ModePerm)

	db.AutoMigrate(domain.Track{})
	db.AutoMigrate(domain.Album{})

	seed.SeedDatabase(db, root, cache)
}
