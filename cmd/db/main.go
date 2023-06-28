package main

import (
	"log"

	"github.com/glebarez/sqlite"
	"github.com/marcopeocchi/mille/internal/domain"
	"github.com/marcopeocchi/mille/pkg/seed"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("data.db"))
	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(domain.Track{})
	db.AutoMigrate(domain.Album{})

	seed.SeedDatabase(db, "/Volumes/private/music")
}
