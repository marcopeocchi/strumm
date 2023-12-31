package domain

import (
	"context"
	"net/http"
	"time"

	"gorm.io/gorm"
)

type Track struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Format    string         `json:"format"`
	Title     string         `json:"title"`
	AlbumID   uint           `json:"album"`
	Artist    string         `json:"artist"`
	Genre     string         `json:"genre"`
	Index     int            `json:"index"`
	Lyrics    string         `json:"lyrics"`
	Year      int            `json:"year"`
	Path      string         `json:"path"`
}

type TrackRepository interface {
	FindAllTracks(ctx context.Context) (*[]Track, error)
	FindTrackByID(ctx context.Context, id uint) (Track, error)
	FindTrackByTitle(ctx context.Context, title string) (Track, error)
	FindTrackByGenre(ctx context.Context, genre string) (*[]Track, error)
	FindTrackByAlbumID(ctx context.Context, id uint) (*[]Track, error)
	FindTrackByArtist(ctx context.Context, artist string) (*[]Track, error)
	FindTrackByTitleLike(ctx context.Context, titleLike string) (*[]Track, error)
	RandomTrack(ctx context.Context) (Track, error)
}

type TrackService interface {
	FindAllTracks(ctx context.Context) (*[]Track, error)
	FindTrackByID(ctx context.Context, id uint) (Track, error)
	FindTrackByTitle(ctx context.Context, title string) (Track, error)
	FindTrackByGenre(ctx context.Context, genre string) (*[]Track, error)
	FindTrackByArtist(ctx context.Context, artist string) (*[]Track, error)
	FindTrackByTitleLike(ctx context.Context, titleLike string) (*[]Track, error)
	RandomTrack(ctx context.Context) (Track, error)
}

type TrackHandler interface {
	FindAllTracks() http.HandlerFunc
	FindTrackByID() http.HandlerFunc
	FindTrackByTitle() http.HandlerFunc
	FindTrackByGenre() http.HandlerFunc
	FindTrackByArtist() http.HandlerFunc
	FindTrackByTitleLike() http.HandlerFunc
	RandomTrack() http.HandlerFunc
}
