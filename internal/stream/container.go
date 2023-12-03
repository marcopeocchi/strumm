package stream

import (
	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/internal/domain"
	"gorm.io/gorm"
)

func Container(db *gorm.DB) domain.StreamHandler {
	var (
		repository = ProvideRepository(db)
		service    = ProvideService(repository)
		handler    = ProvideHandler(service)
	)
	return handler
}
