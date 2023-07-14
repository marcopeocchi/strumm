package seed

import (
	"bytes"
	"errors"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/buckket/go-blurhash"
	"github.com/dhowden/tag"
	"github.com/google/uuid"
	"github.com/marcopeocchi/mille/internal/domain"
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
				cachedImagePath := filepath.Join(
					cache,
					_uuid,
				)

				os.WriteFile(cachedImagePath, tags.Picture().Data, os.ModePerm)

				rgba, err := decodeCoverImage(tags.Picture().Data)

				if err == nil {
					hash, err := generateBlurHash(rgba)

					if err == nil {
						db.Model(&domain.Album{}).
							Where("title = ?", tags.Album()).
							Update("blur_hash", hash)
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

func decodeCoverImage(b []byte) (image.Image, error) {
	var (
		mime = http.DetectContentType(b)
		r    = bytes.NewReader(b)
		rgba image.Image
		err  error
	)

	if mime == "image/png" {
		rgba, err = png.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if mime == "image/jpeg" {
		rgba, err = jpeg.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if mime == "" {
		return nil, errors.New("can't decode image")
	}

	return rgba, err
}

func generateBlurHash(rgba image.Image) (string, error) {
	if rgba == nil {
		return "", errors.New("can't generate hash")
	}

	hash, err := blurhash.Encode(X_COMPONENTS, Y_COMPONENTS, rgba)
	if err != nil {
		return "", err
	}
	return hash, nil
}
