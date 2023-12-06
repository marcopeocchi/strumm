package auth

import (
	"github.com/marcopeocchi/strumm/internal/domain"
	"gorm.io/gorm"
)

func Container(db *gorm.DB) domain.AuthHandler {
	var (
		repo    = provideRepository(db)
		handler = provideHandler(repo)
	)

	return handler
}
