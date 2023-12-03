package stream

import (
	"context"

	"github.com/marcopeocchi/github.com/marcopeocchi/strumm/internal/domain"
)

type Service struct {
	repository domain.StreamRepository
}

func (s *Service) GetPath(ctx context.Context, id uint) (string, error) {
	return s.repository.GetPath(ctx, id)
}
