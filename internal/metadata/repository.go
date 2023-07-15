package metadata

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/marcopeocchi/mille/internal/domain"
)

var (
	LASTFM_APIKEY = os.Getenv("LASTFM_APIKEY")
)

type Repository struct {
	client *http.Client
}

func (r *Repository) GetAlbumMetadata(ctx context.Context, artist string) (domain.DeezerAPIResponse, error) {
	res, err := r.client.Get(buildQueryDeezer(artist))
	if err != nil {
		return domain.DeezerAPIResponse{}, err
	}

	defer res.Body.Close()

	m := domain.DeezerAPIResponse{}

	err = json.NewDecoder(res.Body).Decode(&m)
	if err != nil {
		return m, nil
	}

	return m, nil
}

func (r *Repository) GetLastFMScrobble(ctx context.Context, artist string) (domain.LastFMScrobble, error) {
	res, err := r.client.Get(buildQueryLastFM(artist))
	if err != nil {
		return domain.LastFMScrobble{}, err
	}

	defer res.Body.Close()

	m := domain.LastFMScrobble{}

	err = json.NewDecoder(res.Body).Decode(&m)
	if err != nil {
		return m, nil
	}

	return m, nil
}

func buildQueryDeezer(artist string) string {
	return fmt.Sprintf(
		"https://api.deezer.com/search/artist/?q=%s&index=0&limit=1&output=json",
		artist,
	)
}

func buildQueryLastFM(artist string) string {
	return fmt.Sprintf(
		"https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=%s&api_key=%s&format=json",
		artist,
		LASTFM_APIKEY,
	)
}
