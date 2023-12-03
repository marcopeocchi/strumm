package metadata

import (
	"net/http"

	"github.com/marcopeocchi/strumm/internal/domain"
	"github.com/patrickmn/go-cache"
)

func Container(client *http.Client, cache *cache.Cache) (domain.MetadataHandler, domain.MetadataService) {
	var (
		repository = ProvideRepository(client, cache)
		service    = ProvideService(repository)
		handler    = ProvideHandler(service)
	)
	return handler, service
}
