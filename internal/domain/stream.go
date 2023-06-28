package domain

import (
	"context"
	"net/http"
)

type StreamRequest struct {
	ID     uint   `json:"id"`
	Path   string `json:"path"`
	Format string `json:"format"`
}

type StreamRepository interface {
	GetPath(ctx context.Context, id uint) (string, error)
}

type StreamService interface {
	GetPath(ctx context.Context, id uint) (string, error)
}

type StreamHandler interface {
	StreamFromStorage() http.HandlerFunc
}
