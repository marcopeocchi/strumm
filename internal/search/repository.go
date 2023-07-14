package search

import (
	"context"

	"github.com/marcopeocchi/mille/internal/domain"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (r *Repository) FindAlbumByID(ctx context.Context, id uint) (domain.Album, error) {
	m := domain.Album{}

	err := r.db.WithContext(ctx).Where("id = ?", id).Find(&m).Error
	if err != nil {
		return domain.Album{}, err
	}

	return m, nil
}

func (r *Repository) FindAlbumByTitle(ctx context.Context, title string) (domain.Album, error) {
	m := domain.Album{}

	err := r.db.WithContext(ctx).Where("title = ?", title).Find(&m).Error
	if err != nil {
		return domain.Album{}, err
	}

	return m, nil
}

func (r *Repository) FindAlbumByGenre(ctx context.Context, genre string) (*[]domain.Album, error) {
	m := new([]domain.Album)

	err := r.db.WithContext(ctx).Where("genre = ?", genre).Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindAlbumByArtist(ctx context.Context, artist string) (*[]domain.Album, error) {
	m := new([]domain.Album)

	err := r.db.WithContext(ctx).Where("artist = ?", artist).Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindAlbumByTitleLike(ctx context.Context, titleLike string) (*[]domain.Album, error) {
	m := new([]domain.Album)

	err := r.db.WithContext(ctx).Where("title like ?", "%"+titleLike+"%").Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) Latest(ctx context.Context) (*[]domain.Album, error) {
	m := new([]domain.Album)

	err := r.db.WithContext(ctx).Order("created_at DESC").Limit(100).Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindTrackByID(ctx context.Context, id uint) (domain.Track, error) {
	m := domain.Track{}

	err := r.db.WithContext(ctx).Where("id = ?", id).Find(&m).Error
	if err != nil {
		return domain.Track{}, err
	}

	return m, nil
}

func (r *Repository) FindTrackByTitle(ctx context.Context, title string) (domain.Track, error) {
	m := domain.Track{}

	err := r.db.WithContext(ctx).Where("title = ?", title).Find(&m).Error
	if err != nil {
		return domain.Track{}, err
	}

	return m, nil
}

func (r *Repository) FindTrackByGenre(ctx context.Context, genre string) (*[]domain.Track, error) {
	m := new([]domain.Track)

	err := r.db.WithContext(ctx).Where("genre = ?", genre).Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindTrackByArtist(ctx context.Context, artist string) (*[]domain.Track, error) {
	m := new([]domain.Track)

	err := r.db.WithContext(ctx).Where("artist = ?", artist).Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindTrackByTitleLike(ctx context.Context, titleLike string) (*[]domain.Track, error) {
	m := new([]domain.Track)

	err := r.db.WithContext(ctx).Where("title like ?", "%"+titleLike+"%").Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindTrackByAlbumID(ctx context.Context, id uint) (*[]domain.Track, error) {
	m := new([]domain.Track)

	err := r.db.WithContext(ctx).Where("album_id = ?", id).Find(m).Error
	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindAny(ctx context.Context, like string) (*[]domain.Album, error) {
	m := new([]domain.Album)

	err := r.db.WithContext(ctx).Where("title like ?", "%"+like+"%").
		Or("artist like ?", "%"+like+"%").
		Find(m).Error

	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindAllAlbums(ctx context.Context) (*[]domain.Album, error) {
	m := new([]domain.Album)

	err := r.db.WithContext(ctx).Find(m).Error

	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) FindAllTracks(ctx context.Context) (*[]domain.Track, error) {
	m := new([]domain.Track)

	err := r.db.WithContext(ctx).Find(m).Error

	if err != nil {
		return nil, err
	}

	return m, nil
}

func (r *Repository) RandomAlbum(ctx context.Context) (domain.Album, error) {
	m := domain.Album{}

	err := r.db.WithContext(ctx).
		Raw("SELECT * FROM albums ORDER BY RANDOM() LIMIT 1").
		Scan(&m).
		Error

	if err != nil {
		return domain.Album{}, err
	}

	return m, nil
}
