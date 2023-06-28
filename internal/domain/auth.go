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
	Username string
	Password string
	Picture  string
	Role     int
}

type LoginForm struct {
	Username string
	Password string
}

type AuthRepository interface {
	Login(ctx context.Context, username, password string) (User, error)
}

type AuthService interface {
	Login(ctx context.Context, username, password string) (User, error)
}

type AuthHandler interface {
	Login() http.HandlerFunc
	Logout() http.HandlerFunc
}
