package album

import (
	"context"

	"github.com/marcopeocchi/mille/internal/domain"
)

type Service struct {
	albumRepository domain.AlbumRepository
	trackRepository domain.TrackRepository
}

func (s *Service) FindAlbumByID(ctx context.Context, id uint) (domain.AlbumEntity, error) {
	album, err := s.albumRepository.FindAlbumByID(ctx, id)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	tracks, err := s.trackRepository.FindTrackByAlbumID(ctx, id)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	m := domain.AlbumEntity{}
	m.FromAlbum(album, tracks)

	return m, nil
}

func (s *Service) FindAlbumByTitle(ctx context.Context, title string) (domain.AlbumEntity, error) {
	album, err := s.albumRepository.FindAlbumByTitle(ctx, title)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	tracks, err := s.trackRepository.FindTrackByAlbumID(ctx, album.ID)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	m := domain.AlbumEntity{}
	m.FromAlbum(album, tracks)

	return m, nil
}

func (s *Service) FindAlbumByGenre(ctx context.Context, genre string) (*[]domain.AlbumEntity, error) {
	albums, err := s.albumRepository.FindAlbumByGenre(ctx, genre)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].FromAlbum(album, &[]domain.Track{})
	}

	return &res, nil
}

func (s *Service) FindAlbumByArtist(ctx context.Context, artist string) (*[]domain.AlbumEntity, error) {
	albums, err := s.albumRepository.FindAlbumByArtist(ctx, artist)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].FromAlbum(album, &[]domain.Track{})
	}

	return &res, nil
}

func (s *Service) FindAlbumByTitleLike(ctx context.Context, titleLike string) (*[]domain.AlbumEntity, error) {
	albums, err := s.albumRepository.FindAlbumByTitleLike(ctx, titleLike)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].FromAlbum(album, &[]domain.Track{})
	}

	return &res, nil
}

func (s *Service) Latest(ctx context.Context) (*[]domain.AlbumEntity, error) {
	albums, err := s.albumRepository.Latest(ctx)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].FromAlbum(album, &[]domain.Track{})
	}

	return &res, nil
}

func (s *Service) FindAny(ctx context.Context, like string) (*[]domain.AlbumEntity, error) {
	albums, err := s.albumRepository.FindAny(ctx, like)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].FromAlbum(album, &[]domain.Track{})
	}

	return &res, nil
}

func (s *Service) FindAllAlbums(ctx context.Context) (*[]domain.AlbumEntity, error) {
	albums, err := s.albumRepository.FindAllAlbums(ctx)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].FromAlbum(album, &[]domain.Track{})
	}

	return &res, nil
}

func (s *Service) RandomAlbum(ctx context.Context) (domain.AlbumEntity, error) {
	album, err := s.albumRepository.RandomAlbum(ctx)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	tracks, err := s.trackRepository.FindTrackByAlbumID(ctx, album.ID)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	m := domain.AlbumEntity{}
	m.FromAlbum(album, tracks)

	return m, nil
}
