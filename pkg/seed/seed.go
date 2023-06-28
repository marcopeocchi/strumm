package seed

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"github.com/dhowden/tag"
	"github.com/marcopeocchi/mille/internal/domain"
	"gorm.io/gorm"
)

func seedTracks(db *gorm.DB, root string) {
	filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		fd, err := os.Open(path)
		if err != nil {
			fmt.Println(err)
			return nil
		}

		tags, err := tag.ReadFrom(fd)
		if err != nil {
			return nil
		}

		trackIndex, _ := tags.Track()

		_modelAlbum := domain.Album{
			Title: tags.Album(),
		}

		modelAlbum := domain.Album{
			Title:   tags.Album(),
			Picture: "",
		}

		db.FirstOrCreate(&_modelAlbum, &modelAlbum)

		modelTrack := domain.Track{
			Path:    path,
			Title:   tags.Title(),
			Genre:   tags.Genre(),
			Artist:  tags.Artist(),
			Lyrics:  tags.Lyrics(),
			Year:    tags.Year(),
			Index:   trackIndex,
			AlbumID: modelAlbum.ID,
			Format:  string(tags.Format()),
		}

		result := db.FirstOrCreate(&modelTrack, &modelTrack)
		if result.RowsAffected > 0 {
			fmt.Printf("[OK] %s\n", path)
		} else {
			fmt.Printf("[SKIP] %s\n", path)
		}

		return nil
	})
}

func SeedDatabase(db *gorm.DB, root string) {
	seedTracks(db, root)
}
