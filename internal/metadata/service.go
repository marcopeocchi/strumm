package metadata

import (
	"context"
	"sync"

	"github.com/marcopeocchi/strumm/internal/domain"
)

type Service struct {
	repo domain.MetatadaRepository
}

func (s *Service) GetAlbumMetadata(ctx context.Context, artist string) (domain.AlbumMetadata, error) {
	var (
		deezerResponse domain.DeezerAPIResponse
		lastFMResponse domain.LastFMScrobble
		retval         domain.AlbumMetadata
		wg             sync.WaitGroup
		err            error
	)

	wg.Add(2)

	go func() {
		lastFMResponse, err = s.repo.GetLastFMScrobble(ctx, artist)
		wg.Done()
	}()

	go func() {
		deezerResponse, err = s.repo.GetDeezerMetadata(ctx, artist)
		wg.Done()
	}()

	wg.Wait()

	if len(deezerResponse.Data) == 0 {
		retval.ArtistBio = ""
	}

	retval.ArtistPicture = deezerResponse.Data[0].PictureXL
	retval.ArtistBio = lastFMResponse.Artist.Bio.Summary

	return retval, err
}
