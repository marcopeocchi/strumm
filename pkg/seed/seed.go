package seed

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/dhowden/tag"
	"github.com/google/uuid"
	"github.com/marcopeocchi/strumm/internal/domain"
	"github.com/marcopeocchi/strumm/pkg/utils"
	"gorm.io/gorm"
)

const (
	X_COMPONENTS int = 4
	Y_COMPONENTS int = 3
)

func seedTracks(db *gorm.DB, root, cache string) {
	filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if strings.HasPrefix(d.Name(), ".") {
			return nil
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

			if tags.Picture() != nil && len(tags.Picture().Data) > 0 {
				_uuid = _uuid + "." + tags.Picture().Ext
				cachedImagePath := filepath.Join(cache, _uuid)

				if err := os.WriteFile(cachedImagePath, tags.Picture().Data, os.ModePerm); err != nil {
					fmt.Println(err)
					os.Exit(1)
				}

				rgba, err := utils.DecodeImageFromBytes(tags.Picture().Data)

				if err == nil {
					hash, errHash := utils.GenerateBlurHash(rgba, X_COMPONENTS, Y_COMPONENTS)
					palette, errColors := utils.GetDominantColors(rgba, 5)

					if errHash == nil && errColors == nil {
						db.Model(&domain.Album{}).
							Where("title = ?", tags.Album()).
							Update("blur_hash", hash).
							Update("dominant_color", palette.Dominant).
							Update("less_dominant_color", palette.LessDominant).
							Update("accent_color", palette.Accent)
					}
				}
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
			log.Printf("[OK] %s\n", path)
		} else {
			log.Printf("[SKIP] %s\n", path)
		}

		return nil
	})
}

func SeedDatabase(db *gorm.DB, root, cache string) {
	seedTracks(db, root, cache)
}

func Scan(db *gorm.DB, root, cache string) {
	os.Mkdir(cache, os.ModePerm)

	db.AutoMigrate(domain.Track{})
	db.AutoMigrate(domain.Album{})

	SeedDatabase(db, root, cache)
}
