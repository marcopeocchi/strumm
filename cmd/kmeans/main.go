package main

import (
	"fmt"
	"image"
	"image/color"
	"image/jpeg"
	"os"
	"sort"

	"github.com/muesli/clusters"
	"github.com/muesli/kmeans"
)

func main() {
	fd, err := os.Open(os.Args[1])
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	defer fd.Close()

	rgba, err := jpeg.Decode(fd)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
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

	K := 5

	km := kmeans.New()
	kmClusters, _ := km.Partition(ob, K)

	imgH := K * 1000
	imgW := 1000
	tile := 1000

	img := image.NewRGBA(image.Rectangle{
		image.Point{0, 0},
		image.Point{imgW, imgH},
	})

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

		rgba := color.RGBA{r, g, b, 0xff}

		for x := 0; x < imgW; x++ {
			for y := (i * tile); y < ((i + 1) * tile); y++ {
				img.Set(x, y, rgba)
			}
		}
	}

	f, _ := os.Create("image.jpg")
	defer f.Close()

	jpeg.Encode(f, img, nil)
}
