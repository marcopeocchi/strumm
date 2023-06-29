package search

import (
	"context"

	"github.com/marcopeocchi/mille/internal/domain"
)

type Service struct {
	repository domain.SearchRepository
}

func (s *Service) FindAlbumByID(ctx context.Context, id uint) (domain.AlbumEntity, error) {
	album, err := s.repository.FindAlbumByID(ctx, id)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	tracks, err := s.repository.FindTrackByAlbumID(ctx, id)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	return domain.AlbumEntity{
		ID:        album.ID,
		CreatedAt: album.CreatedAt,
		UpdatedAt: album.UpdatedAt,
		Title:     album.Title,
		Picture:   album.Picture,
		Artist:    album.Artist,
		Year:      album.Year,
		Tracks:    tracks,
	}, nil
}

func (s *Service) FindAlbumByTitle(ctx context.Context, title string) (domain.AlbumEntity, error) {
	album, err := s.repository.FindAlbumByTitle(ctx, title)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	tracks, err := s.repository.FindTrackByAlbumID(ctx, album.ID)
	if err != nil {
		return domain.AlbumEntity{}, err
	}

	return domain.AlbumEntity{
		ID:        album.ID,
		Title:     album.Title,
		Artist:    album.Artist,
		Picture:   album.Picture,
		Year:      album.Year,
		CreatedAt: album.CreatedAt,
		UpdatedAt: album.UpdatedAt,
		Tracks:    tracks,
	}, nil
}

func (s *Service) FindAlbumByGenre(ctx context.Context, genre string) (*[]domain.AlbumEntity, error) {
	albums, err := s.repository.FindAlbumByGenre(ctx, genre)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].ID = album.ID
		res[i].Year = album.Year
		res[i].Title = album.Title
		res[i].Artist = album.Artist
		res[i].Picture = album.Picture
		res[i].CreatedAt = album.CreatedAt
		res[i].UpdatedAt = album.UpdatedAt
		res[i].Tracks = &[]domain.Track{}
	}

	return &res, nil
}

func (s *Service) FindAlbumByArtist(ctx context.Context, artist string) (*[]domain.AlbumEntity, error) {
	albums, err := s.repository.FindAlbumByArtist(ctx, artist)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range res {
		res[i].ID = album.ID
		res[i].Year = album.Year
		res[i].Title = album.Title
		res[i].Artist = album.Artist
		res[i].Picture = album.Picture
		res[i].CreatedAt = album.CreatedAt
		res[i].UpdatedAt = album.UpdatedAt
		res[i].Tracks = &[]domain.Track{}
	}

	return &res, nil
}

func (s *Service) FindAlbumByTitleLike(ctx context.Context, titleLike string) (*[]domain.AlbumEntity, error) {
	albums, err := s.repository.FindAlbumByTitleLike(ctx, titleLike)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].ID = album.ID
		res[i].Year = album.Year
		res[i].Title = album.Title
		res[i].Artist = album.Artist
		res[i].Picture = album.Picture
		res[i].CreatedAt = album.CreatedAt
		res[i].UpdatedAt = album.UpdatedAt
		res[i].Tracks = &[]domain.Track{}
	}

	return &res, nil
}

func (s *Service) Latest(ctx context.Context) (*[]domain.AlbumEntity, error) {
	albums, err := s.repository.Latest(ctx)
	if err != nil {
		return nil, err
	}

	res := make([]domain.AlbumEntity, len(*albums))

	for i, album := range *albums {
		res[i].ID = album.ID
		res[i].Year = album.Year
		res[i].Title = album.Title
		res[i].Artist = album.Artist
		res[i].Picture = album.Picture
		res[i].CreatedAt = album.CreatedAt
		res[i].UpdatedAt = album.UpdatedAt
		res[i].Tracks = &[]domain.Track{}
	}

	return &res, nil
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
