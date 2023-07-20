package album

import (
	"github.com/marcopeocchi/mille/internal/domain"
	"github.com/marcopeocchi/mille/internal/track"
	"gorm.io/gorm"
)

func Container(db *gorm.DB) domain.AlbumHandler {
	var (
		albumRepo = ProvideRepository(db)
		trackRepo = track.ProvideRepository(db)
		service   = ProvideService(albumRepo, trackRepo)
		handler   = ProvideHandler(service)
	)
	return handler
}
