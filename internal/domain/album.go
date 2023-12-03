package domain

import (
	"context"
	"net/http"
	"time"

	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/pkg/utils"
	"gorm.io/gorm"
)

type Album struct {
	gorm.Model
	Title             string `gorm:"index,unique"`
	Artist            string
	Picture           string
	BlurHash          string
	DominantColor     string
	LessDominantColor string
	AccentColor       string
	Year              int
}

type AlbumEntity struct {
	ID            uint          `json:"id"`
	CreatedAt     time.Time     `json:"created_at"`
	UpdatedAt     time.Time     `json:"updated_at"`
	Title         string        `json:"title"`
	Artist        string        `json:"artist"`
	Picture       string        `json:"picture"`
	BlurHash      string        `json:"blur_hash"`
	DominantColor string        `json:"dominant_color"`
	Year          int           `json:"year"`
	Palette       utils.Palette `json:"palette"`
	Tracks        *[]Track      `json:"tracks"`
}

func (a *AlbumEntity) FromAlbum(album Album, tracks *[]Track) {
	a.ID = album.ID
	a.CreatedAt = album.CreatedAt
	a.UpdatedAt = album.UpdatedAt
	a.Title = album.Title
	a.Artist = album.Artist
	a.Picture = album.Picture
	a.BlurHash = album.BlurHash
	a.DominantColor = album.DominantColor
	a.Year = album.Year
	a.Tracks = tracks
	a.Palette = utils.Palette{
		Dominant:     album.DominantColor,
		LessDominant: album.LessDominantColor,
		Accent:       album.AccentColor,
	}
}

type AlbumRepository interface {
	FindAllAlbums(ctx context.Context) (*[]Album, error)
	FindAlbumByID(ctx context.Context, id uint) (Album, error)
	FindAlbumByTitle(ctx context.Context, title string) (Album, error)
	FindAlbumByGenre(ctx context.Context, genre string) (*[]Album, error)
	FindAlbumByArtist(ctx context.Context, genre string) (*[]Album, error)
	FindAlbumByTitleLike(ctx context.Context, titleLike string) (*[]Album, error)

	Latest(ctx context.Context) (*[]Album, error)
	FindAny(ctx context.Context, like string) (*[]Album, error)

	RandomAlbum(ctx context.Context) (Album, error)
}

type AlbumService interface {
	FindAllAlbums(ctx context.Context) (*[]AlbumEntity, error)
	FindAlbumByID(ctx context.Context, id uint) (AlbumEntity, error)
	FindAlbumByTitle(ctx context.Context, title string) (AlbumEntity, error)
	FindAlbumByGenre(ctx context.Context, genre string) (*[]AlbumEntity, error)
	FindAlbumByArtist(ctx context.Context, genre string) (*[]AlbumEntity, error)
	FindAlbumByTitleLike(ctx context.Context, titleLike string) (*[]AlbumEntity, error)

	Latest(ctx context.Context) (*[]AlbumEntity, error)
	FindAny(ctx context.Context, like string) (*[]AlbumEntity, error)

	RandomAlbum(ctx context.Context) (AlbumEntity, error)
}

type AlbumHandler interface {
	FindAllAlbums() http.HandlerFunc
	FindAlbumByID() http.HandlerFunc
	FindAlbumByTitle() http.HandlerFunc
	FindAlbumByGenre() http.HandlerFunc
	FindAlbumByArtist() http.HandlerFunc
	FindAlbumByTitleLike() http.HandlerFunc

	Latest() http.HandlerFunc
	FindAny() http.HandlerFunc

	RandomAlbum() http.HandlerFunc
}
