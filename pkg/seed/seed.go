package seed

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"github.com/dhowden/tag"
	"github.com/google/uuid"
	"github.com/marcopeocchi/mille/internal/domain"
	"gorm.io/gorm"
)

func seedTracks(db *gorm.DB, root, cache string) {
	filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		fd, err := os.Open(path)
		if err != nil {
			fmt.Println(err)
			return nil
		}
		defer fd.Close()

		tags, err := tag.ReadFrom(fd)
		if err != nil {
			return nil
		}

		trackIndex, _ := tags.Track()

		_modelAlbum := domain.Album{
			Title: tags.Album(),
		}

		modelAlbum := domain.Album{
			Title:  tags.Album(),
			Artist: tags.AlbumArtist(),
			Year:   tags.Year(),
		}

		if db.FirstOrCreate(&_modelAlbum, &modelAlbum).RowsAffected > 0 {
			_uuid := uuid.NewString()

			if tags.Picture() != nil {
				_uuid = _uuid + "." + tags.Picture().Ext
				cachedImagePath := filepath.Join(
					cache,
					_uuid,
				)
				os.WriteFile(cachedImagePath, tags.Picture().Data, os.ModePerm)
			}

			db.Model(&domain.Album{}).
				Where("title = ?", tags.Album()).
				Update("picture", _uuid)
		}

		modelTrack := domain.Track{
			Path:    path,
			Title:   tags.Title(),
			Genre:   tags.Genre(),
			Artist:  tags.Artist(),
			Lyrics:  tags.Lyrics(),
			Year:    tags.Year(),
			Index:   trackIndex,
			AlbumID: _modelAlbum.ID,
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

func SeedDatabase(db *gorm.DB, root, cache string) {
	seedTracks(db, root, cache)
}
