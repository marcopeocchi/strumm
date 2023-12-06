package auth

import (
	"sync"

	"github.com/marcopeocchi/strumm/internal/domain"
	"gorm.io/gorm"
)

var (
	repository *Repository
	handler    *Handler

	repositoryOnce sync.Once
	handlerOnce    sync.Once
)

func provideRepository(db *gorm.DB) domain.AuthRepository {
	repositoryOnce.Do(func() {
		repository = &Repository{
			db: db,
		}
	})

	return repository
}

func provideHandler(r domain.AuthRepository) domain.AuthHandler {
	handlerOnce.Do(func() {
		handler = &Handler{
			r: r,
		}
	})

	return handler
}
