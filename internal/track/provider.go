package track

import (
	"sync"

	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/internal/domain"
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

func ProvideService(r domain.TrackRepository) *Service {
	serviceOnce.Do(func() {
		service = &Service{
			repository: r,
		}
	})
	return service
}

func ProvideHandler(s domain.TrackService) *Handler {
	handlerOnce.Do(func() {
		handler = &Handler{service: s}
	})
	return handler
}
