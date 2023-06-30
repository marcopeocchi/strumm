package domain

import (
	"context"
	"net/http"
	"time"

	"gorm.io/gorm"
)

type Track struct {
	gorm.Model
	Format  string `json:"format"`
	Title   string `json:"title"`
	AlbumID uint   `json:"album"`
	Artist  string `json:"artist"`
	Genre   string `json:"genre"`
	Index   int    `json:"index"`
	Lyrics  string `json:"lyrics"`
	Year    int    `json:"year"`
	Path    string `json:"path"`
}

type Album struct {
	gorm.Model
	Title   string `gorm:"index,unique"`
	Artist  string
	Picture string
	Year    int
}

type AlbumEntity struct {
	ID        uint      `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Title     string    `json:"title"`
	Artist    string    `json:"artist"`
	Picture   string    `json:"picture"`
	Year      int       `json:"year"`
	Tracks    *[]Track  `json:"tracks"`
}

type SearchRepository interface {
	FindAlbumByID(ctx context.Context, id uint) (Album, error)
	FindAlbumByTitle(ctx context.Context, title string) (Album, error)
	FindAlbumByGenre(ctx context.Context, genre string) (*[]Album, error)
	FindAlbumByArtist(ctx context.Context, genre string) (*[]Album, error)
	FindAlbumByTitleLike(ctx context.Context, titleLike string) (*[]Album, error)

	Latest(ctx context.Context) (*[]Album, error)
	FindAny(ctx context.Context, like string) (*[]Album, error)
	FindAllAlbums(ctx context.Context) (*[]Album, error)
	FindAllTracks(ctx context.Context) (*[]Track, error)

	FindTrackByID(ctx context.Context, id uint) (Track, error)
	FindTrackByTitle(ctx context.Context, title string) (Track, error)
	FindTrackByGenre(ctx context.Context, genre string) (*[]Track, error)
	FindTrackByAlbumID(ctx context.Context, id uint) (*[]Track, error)
	FindTrackByArtist(ctx context.Context, artist string) (*[]Track, error)
	FindTrackByTitleLike(ctx context.Context, titleLike string) (*[]Track, error)
}

type SearchService interface {
	FindAlbumByID(ctx context.Context, id uint) (AlbumEntity, error)
	FindAlbumByTitle(ctx context.Context, title string) (AlbumEntity, error)
	FindAlbumByGenre(ctx context.Context, genre string) (*[]AlbumEntity, error)
	FindAlbumByArtist(ctx context.Context, genre string) (*[]AlbumEntity, error)
	FindAlbumByTitleLike(ctx context.Context, titleLike string) (*[]AlbumEntity, error)

	Latest(ctx context.Context) (*[]AlbumEntity, error)
	FindAny(ctx context.Context, like string) (*[]AlbumEntity, error)
	FindAllAlbums(ctx context.Context) (*[]AlbumEntity, error)
	FindAllTracks(ctx context.Context) (*[]Track, error)

	FindTrackByID(ctx context.Context, id uint) (Track, error)
	FindTrackByTitle(ctx context.Context, title string) (Track, error)
	FindTrackByGenre(ctx context.Context, genre string) (*[]Track, error)
	FindTrackByArtist(ctx context.Context, artist string) (*[]Track, error)
	FindTrackByTitleLike(ctx context.Context, titleLike string) (*[]Track, error)
}

type SearchHandler interface {
	FindAlbumByID() http.HandlerFunc
	FindAlbumByTitle() http.HandlerFunc
	FindAlbumByGenre() http.HandlerFunc
	FindAlbumByArtist() http.HandlerFunc
	FindAlbumByTitleLike() http.HandlerFunc

	Latest() http.HandlerFunc
	FindAny() http.HandlerFunc
	FindAllAlbums() http.HandlerFunc
	FindAllTracks() http.HandlerFunc

	FindTrackByID() http.HandlerFunc
	FindTrackByTitle() http.HandlerFunc
	FindTrackByGenre() http.HandlerFunc
	FindTrackByArtist() http.HandlerFunc
	FindTrackByTitleLike() http.HandlerFunc
}
