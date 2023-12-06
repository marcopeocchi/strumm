package auth

import (
	"context"

	"github.com/marcopeocchi/strumm/internal/domain"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (r *Repository) Login(ctx context.Context, form *domain.LoginForm) (domain.User, error) {
	var user domain.User

	if err := r.db.WithContext(ctx).Where("username = ?", form.Username).First(&user).Error; err != nil {
		return user, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(form.Password)); err != nil {
		return user, err
	}

	return user, nil
}
