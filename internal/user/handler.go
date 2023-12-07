package user

import (
	"encoding/json"
	"net/http"

	"github.com/marcopeocchi/strumm/internal/domain"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// flat structure since there's no additional complexity to handle

type UserHandler struct {
	db *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{
		db: db,
	}
}

type ChangePasswordRequest struct {
	OldPassword string `json:"oldPassword"`
	NewPassword string `json:"newPassword"`
}

func (h *UserHandler) ChangePassword() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()

		w.Header().Set("Contet-Type", "application/json")

		var (
			req  ChangePasswordRequest
			user domain.User
		)

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if err := h.db.Where("username = ?", "admin").First(&user).Error; err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.OldPassword)); err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		hashed, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = h.db.
			Model(&domain.User{}).
			Where("username = ?", "admin").
			Update("password", string(hashed)).
			Error

		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		if err := json.NewEncoder(w).Encode("ok"); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
