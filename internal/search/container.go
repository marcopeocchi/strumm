package search

import (
	"github.com/marcopeocchi/mille/internal/domain"
	"gorm.io/gorm"
)

func Container(db *gorm.DB) domain.SearchHandler {
	var (
		repository = ProvideRepository(db)
		service    = ProvideService(repository)
		handler    = ProvideHandler(service)
	)
	return handler
}
