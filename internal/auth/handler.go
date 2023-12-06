package auth

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/marcopeocchi/strumm/internal/domain"
)

type Handler struct {
	r domain.AuthRepository
}

func (h *Handler) Login() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()

		var form domain.LoginForm

		if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		user, err := h.r.Login(r.Context(), &form)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if err := json.NewEncoder(w).Encode(user); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"username":  user.Username,
			"role":      user.Role,
			"expiresAt": time.Now().Add(time.Hour * 24 * 30),
		})

		tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		cookie := http.Cookie{
			Name:     "jwt",
			HttpOnly: true,
			Secure:   false,
			Expires:  time.Now().Add(time.Hour * 24 * 30),
			Value:    tokenString,
			Path:     "/",
		}
		http.SetCookie(w, &cookie)

		w.Write([]byte(tokenString))
	}
}

func (h *Handler) Logout() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie := http.Cookie{
			Name:     "jwt",
			HttpOnly: true,
			Expires:  time.Now(),
			Value:    "",
			Path:     "/",
		}
		http.SetCookie(w, &cookie)
	}
}
