package metadata

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/internal/domain"
)

type Handler struct {
	service domain.MetadataService
}

func (h *Handler) GetAlbumMetadata() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()

		w.Header().Set("Contet-Type", "application/json")

		artist := chi.URLParam(r, "name")

		data, err := h.service.GetAlbumMetadata(r.Context(), artist)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err = json.NewEncoder(w).Encode(data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
