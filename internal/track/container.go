package track

import (
	"github.com/marcopeocchi/strumm/internal/domain"
	"gorm.io/gorm"
)

func Container(db *gorm.DB) domain.TrackHandler {
	var (
		repository = ProvideRepository(db)
		service    = ProvideService(repository)
		handler    = ProvideHandler(service)
	)
	return handler
}
