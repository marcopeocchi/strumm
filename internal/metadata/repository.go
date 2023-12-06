package metadata

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"

	"github.com/marcopeocchi/strumm/internal/domain"
	"github.com/patrickmn/go-cache"
)

type Repository struct {
	client *http.Client
	cache  *cache.Cache
	apikey string
}

func (r *Repository) GetDeezerMetadata(ctx context.Context, artist string) (domain.DeezerAPIResponse, error) {
	url := buildQueryDeezer(artist)

	cached, found := r.cache.Get(url)
	if found {
		return cached.(domain.DeezerAPIResponse), nil
	}

	select {
	case <-ctx.Done():
		return domain.DeezerAPIResponse{}, errors.New("context cancelled")
	default:
		res, err := r.client.Get(url)
		if err != nil {
			return domain.DeezerAPIResponse{}, err
		}

		defer res.Body.Close()

		m := domain.DeezerAPIResponse{}

		err = json.NewDecoder(res.Body).Decode(&m)
		if err != nil {
			return m, nil
		}

		r.cache.Set(url, m, cache.DefaultExpiration)

		return m, nil
	}
}

func (r *Repository) GetLastFMScrobble(ctx context.Context, artist string) (domain.LastFMScrobble, error) {
	url := r.buildQueryLastFM(artist)

	cached, found := r.cache.Get(url)
	if found {
		return cached.(domain.LastFMScrobble), nil
	}

	select {
	case <-ctx.Done():
		return domain.LastFMScrobble{}, errors.New("context cancelled")
	default:
		res, err := r.client.Get(url)
		if err != nil {
			return domain.LastFMScrobble{}, err
		}

		defer res.Body.Close()

		m := domain.LastFMScrobble{}

		err = json.NewDecoder(res.Body).Decode(&m)
		if err != nil {
			return m, nil
		}

		r.cache.Set(url, m, cache.DefaultExpiration)

		return m, nil
	}
}

func buildQueryDeezer(artist string) string {
	return fmt.Sprintf(
		"https://api.deezer.com/search/artist/?q=%s&index=0&limit=1&output=json",
		url.QueryEscape(artist),
	)
}

func (r *Repository) buildQueryLastFM(artist string) string {
	return fmt.Sprintf(
		"https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=%s&api_key=%s&format=json",
		url.QueryEscape(artist),
		r.apikey,
	)
}
