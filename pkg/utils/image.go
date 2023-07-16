package utils

import (
	"bytes"
	"errors"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"net/http"
	"sort"

	"github.com/muesli/clusters"
	"github.com/muesli/kmeans"
	"golang.org/x/image/webp"
)

func DecodeImage(b []byte) (image.Image, error) {
	var (
		mime = http.DetectContentType(b)
		r    = bytes.NewReader(b)
		rgba image.Image
		err  error
	)

	if mime == "image/png" {
		rgba, err = png.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if mime == "image/jpeg" {
		rgba, err = jpeg.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if mime == "image/webp" {
		rgba, err = webp.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if mime == "" {
		return nil, errors.New("can't decode image")
	}

	return rgba, err
}

func GetDominantColors(rgba image.Image, kgroups int) ([]string, error) {
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
		centroidR := cluster.Center[0]
		centroidG := cluster.Center[1]
		centroidB := cluster.Center[2]

		r := uint8(centroidR)
		g := uint8(centroidG)
		b := uint8(centroidB)

		dominantColors[i] = fmt.Sprintf("#%02x%02x%02x", r, g, b)
	}

	return dominantColors, nil
}
