package utils

import (
	"errors"
	"fmt"
	"image"
	"sort"

	"github.com/buckket/go-blurhash"
	"github.com/muesli/clusters"
	"github.com/muesli/kmeans"
)

type Palette struct {
	Dominant     string `json:"dominant"`
	LessDominant string `json:"lessDominant"`
	Accent       string `json:"accent"`
}

func GetDominantColors(rgba image.Image, kgroups int) (Palette, error) {
	if kgroups < 3 {
		return Palette{}, errors.New("kgroups can't be less than 3")
	}

	var ob clusters.Observations

	for y := rgba.Bounds().Min.Y; y < rgba.Bounds().Max.Y; y += 10 {
		for x := rgba.Bounds().Min.X; x < rgba.Bounds().Max.X; x += 10 {
			c := rgba.At(x, y)
			r, g, b, _ := c.RGBA()
			ob = append(ob, clusters.Coordinates{
				float64(r >> 8),
				float64(g >> 8),
				float64(b >> 8),
			})
		}
	}

	K := kgroups

	km := kmeans.New()
	kmClusters, _ := km.Partition(ob, K)

	dominantColors := make([]string, K)

	sort.SliceStable(kmClusters, func(i, j int) bool {
		return len(kmClusters[i].Observations) > len(kmClusters[j].Observations)
	})

	for i, cluster := range kmClusters {
		r := uint8(cluster.Center[0])
		g := uint8(cluster.Center[1])
		b := uint8(cluster.Center[2])

		dominantColors[i] = fmt.Sprintf("#%02x%02x%02x", r, g, b)
	}

	return Palette{
		Dominant:     dominantColors[0],
		LessDominant: dominantColors[1],
		Accent:       dominantColors[2],
	}, nil
}

func GenerateBlurHash(rgba image.Image, xcomp, ycomp int) (string, error) {
	if rgba == nil {
		return "", errors.New("can't generate hash")
	}

	hash, err := blurhash.Encode(xcomp, ycomp, rgba)
	if err != nil {
		return "", err
	}
	return hash, nil
}
