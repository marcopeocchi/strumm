package domain

import (
	"context"
	"net/http"
)

type AlbumMetadata struct {
	ArtistBio     string `json:"artistBio"`
	ArtistPicture string `json:"artistPicture"`
}

type DeezerArtist struct {
	Id            int    `json:"id"`
	Name          string `json:"name"`
	Link          string `json:"link"`
	Picture       string `json:"picture"`
	PictureSmall  string `json:"picture_small"`
	PictureMedium string `json:"picture_medium"`
	PictureBig    string `json:"picture_big"`
	PictureXL     string `json:"picture_xl"`
}

type DeezerAPIResponse struct {
	Data  []DeezerArtist `json:"data"`
	Total int            `json:"total"`
	Next  string         `json:"string"`
}

type LastFMScrobble struct {
	Artist struct {
		Name string `json:"data"`
		Bio  struct {
			Published string `json:"published"`
			Summary   string `json:"summary"`
			Content   string `json:"content"`
		} `json:"bio"`
	} `json:"artist"`
}

type MetatadaRepository interface {
	GetDeezerMetadata(ctx context.Context, artist string) (DeezerAPIResponse, error)
	GetLastFMScrobble(ctx context.Context, artist string) (LastFMScrobble, error)
}

type MetadataService interface {
	GetAlbumMetadata(ctx context.Context, artist string) (AlbumMetadata, error)
}

type MetadataHandler interface {
	GetAlbumMetadata() http.HandlerFunc
}
