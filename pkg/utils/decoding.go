package utils

import (
	"bytes"
	"errors"
	"image"
	"image/jpeg"
	"image/png"
	"io"

	"github.com/gabriel-vasile/mimetype"
	"golang.org/x/image/webp"
)

func DecodeImage(r io.ReadSeeker) (image.Image, error) {
	var (
		rgba image.Image
		err  error
	)

	mime, err := mimetype.DetectReader(r)
	if err != nil {
		return nil, err
	}

	r.Seek(0, io.SeekStart)

	if mime.Is("image/png") {
		rgba, err = png.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if mime.Is("image/jpeg") {
		rgba, err = jpeg.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if mime.Is("image/webp") {
		rgba, err = webp.Decode(r)
		if err != nil {
			return nil, err
		}
	}

	if rgba == nil {
		return nil, errors.New("can't decode image")
	}

	return rgba, err
}

func DecodeImageFromBytes(b []byte) (image.Image, error) {
	return DecodeImage(bytes.NewReader(b))
}
