package paginator

import "math"

type PaginatedResponse[T any] struct {
	List          []T   `json:"list"`
	Page          int64 `json:"page"`
	Pages         int64 `json:"pages"`
	PageSize      int64 `json:"pageSize"`
	TotalElements int64 `json:"totalElements"`
}

type Paginator[T any] struct {
	PageSize   int64
	Items      []T
	TotalItems int64
}

func NewPaginator[T any](items []T, pageSize int64) *Paginator[T] {
	return &Paginator[T]{
		Items:      items,
		PageSize:   pageSize,
		TotalItems: int64(len(items)),
	}
}

func (p *Paginator[T]) Get(page int64) *PaginatedResponse[T] {
	itemsLenght := float64(p.TotalItems)
	pageSize := float64(p.PageSize)
	pages := int64(math.Ceil(itemsLenght / pageSize))

	limit := p.PageSize * page
	if limit > p.TotalItems {
		limit = p.TotalItems
	}

	res := PaginatedResponse[T]{
		List:          p.Items[p.PageSize*(page-1) : limit],
		Page:          page,
		Pages:         pages,
		PageSize:      p.PageSize,
		TotalElements: p.TotalItems,
	}

	return &res
}
