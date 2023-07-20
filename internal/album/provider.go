package album

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

func ProvideService(ar domain.AlbumRepository, tr domain.TrackRepository) *Service {
	serviceOnce.Do(func() {
		service = &Service{
			albumRepository: ar,
			trackRepository: tr,
		}
	})
	return service
}

func ProvideHandler(svc domain.AlbumService) *Handler {
	handlerOnce.Do(func() {
		handler = &Handler{service: svc}
	})
	return handler
}
