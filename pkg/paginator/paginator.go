package common

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
	Items      *[]T
	TotalItems int64
}

func NewPaginator[T any](i *[]T, p int64) *Paginator[T] {
	return &Paginator[T]{
		Items:      i,
		PageSize:   p,
		TotalItems: int64(len(*i)),
	}
}

func (p *Paginator[T]) Get(page int64) *PaginatedResponse[T] {
	itemsLenght := float64(p.TotalItems)
	pageSize := float64(p.PageSize)
	pages := int64(math.Ceil(itemsLenght / pageSize))

	res := PaginatedResponse[T]{
		List:          *p.Items,
		Page:          page,
		Pages:         pages,
		PageSize:      p.PageSize,
		TotalElements: p.TotalItems,
	}

	return &res
}
