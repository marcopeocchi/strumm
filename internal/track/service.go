package track

import (
	"context"

	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/internal/domain"
)

type Service struct {
	repository domain.TrackRepository
}

func (s *Service) FindTrackByID(ctx context.Context, id uint) (domain.Track, error) {
	return s.repository.FindTrackByID(ctx, id)
}

func (s *Service) FindTrackByTitle(ctx context.Context, title string) (domain.Track, error) {
	return s.repository.FindTrackByTitle(ctx, title)
}

func (s *Service) FindTrackByGenre(ctx context.Context, genre string) (*[]domain.Track, error) {
	return s.repository.FindTrackByGenre(ctx, genre)
}

func (s *Service) FindTrackByArtist(ctx context.Context, artist string) (*[]domain.Track, error) {
	return s.repository.FindTrackByArtist(ctx, artist)
}

func (s *Service) FindTrackByTitleLike(ctx context.Context, titleLike string) (*[]domain.Track, error) {
	return s.repository.FindTrackByTitleLike(ctx, titleLike)
}

func (s *Service) FindAllTracks(ctx context.Context) (*[]domain.Track, error) {
	return s.repository.FindAllTracks(ctx)
}

func (s *Service) RandomTrack(ctx context.Context) (domain.Track, error) {
	return s.repository.RandomTrack(ctx)
}
