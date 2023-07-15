package metadata

import (
	"net/http"

	"github.com/marcopeocchi/mille/internal/domain"
)

func Container(client *http.Client) (domain.MetadataHandler, domain.MetadataService) {
	var (
		repository = ProvideRepository(client)
		service    = ProvideService(repository)
		handler    = ProvideHandler(service)
	)
	return handler, service
}
