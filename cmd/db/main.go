package main

import (
	"flag"
	"log"

	"github.com/glebarez/sqlite"
	"github.com/marcopeocchi/strumm/pkg/seed"
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

	seed.Scan(db, root, cache)
}
