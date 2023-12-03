package album

import (
	"github.com/marcopeocchi/strumm/internal/domain"
	"github.com/marcopeocchi/strumm/internal/track"
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
