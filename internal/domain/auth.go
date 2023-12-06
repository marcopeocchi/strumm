package domain

import (
	"context"
	"net/http"

	"gorm.io/gorm"
)

const (
	UserRegular int = iota
	UserAdmin
)

type User struct {
	gorm.Model
	Username string `gorm:"uniqueIndex"`
	Password string
	Role     int
}

type LoginForm struct {
	Username string
	Password string
}

type AuthRepository interface {
	Login(ctx context.Context, form *LoginForm) (User, error)
}

type AuthHandler interface {
	Login() http.HandlerFunc
	Logout() http.HandlerFunc
}
