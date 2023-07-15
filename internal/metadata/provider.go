package metadata

import (
	"net/http"
	"sync"

	"github.com/marcopeocchi/mille/internal/domain"
)

var (
	repository *Repository
	service    *Service
	handler    *Handler

	repositoryOnce sync.Once
	serviceOnce    sync.Once
	handlerOnce    sync.Once
)

func ProvideRepository(client *http.Client) *Repository {
	repositoryOnce.Do(func() {
		repository = &Repository{
			client: client,
		}
	})
	return repository
}

func ProvideService(repo domain.MetatadaRepository) *Service {
	serviceOnce.Do(func() {
		service = &Service{
			repo: repo,
		}
	})
	return service
}

func ProvideHandler(svc domain.MetadataService) *Handler {
	handlerOnce.Do(func() {
		handler = &Handler{
			service: svc,
		}
	})
	return handler
}
