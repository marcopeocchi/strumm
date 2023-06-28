package stream

import (
	"sync"

	"github.com/marcopeocchi/mille/internal/domain"
	"gorm.io/gorm"
)

var (
	repository *Repository
	service    *Service
	handler    *Handler

	repositoryOnce sync.Once
	serviceOnce    sync.Once
	handlerOnce    sync.Once
)

func ProvideRepository(db *gorm.DB) *Repository {
	repositoryOnce.Do(func() {
		repository = &Repository{db: db}
	})
	return repository
}

func ProvideService(repo domain.StreamRepository) *Service {
	serviceOnce.Do(func() {
		service = &Service{repository: repo}
	})
	return service
}

func ProvideHandler(svc domain.StreamService) *Handler {
	handlerOnce.Do(func() {
		handler = &Handler{service: svc}
	})
	return handler
}
