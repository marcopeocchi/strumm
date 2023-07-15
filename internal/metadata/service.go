package metadata

import (
	"context"
	"errors"
	"sync"

	"github.com/marcopeocchi/mille/internal/domain"
)

type Service struct {
	repo domain.MetatadaRepository
}

func (s *Service) GetAlbumMetadata(ctx context.Context, artist string) (domain.AlbumMetadata, error) {
	var (
		deezerResponse domain.DeezerAPIResponse
		lastFMResponse domain.LastFMScrobble
		retval         domain.AlbumMetadata
		err            error
		wg             sync.WaitGroup
	)

	wg.Add(2)

	go func() {
		lastFMResponse, err = s.repo.GetLastFMScrobble(ctx, artist)
		wg.Done()
	}()

	go func() {
		deezerResponse, err = s.repo.GetAlbumMetadata(ctx, artist)
		wg.Done()
	}()

	wg.Wait()

	if len(deezerResponse.Data) == 0 {
		return retval, errors.New("can't find metadata for given artist")
	}

	retval.ArtistPicture = deezerResponse.Data[0].PictureXL
	retval.ArtistBio = lastFMResponse.Artist.Bio.Summary

	return retval, err
}
