package stream

import (
	"context"

	"github.com/marcopeocchi/strumm/internal/domain"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (r *Repository) GetPath(ctx context.Context, id uint) (string, error) {
	track := domain.Track{}
	err := r.db.WithContext(ctx).Where("id = ?", id).First(&track).Error

	return track.Path, err
}
