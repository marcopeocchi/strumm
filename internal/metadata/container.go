package metadata

import (
	"net/http"

	"github.com/marcopeocchi/strumm/internal/domain"
	"github.com/patrickmn/go-cache"
)

func Container(client *http.Client, cache *cache.Cache, apikey string) domain.MetadataHandler {
	var (
		repository = ProvideRepository(client, cache, apikey)
		service    = ProvideService(repository)
		handler    = ProvideHandler(service)
	)
	return handler
}
