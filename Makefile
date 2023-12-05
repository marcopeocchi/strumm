default:
	go build -o strumm cmd/web/main.go

react:
	cd app && pnpm build

wasm:
	GOOS=js GOARCH=wasm go build -o dominantColors.wasm cmd/wasm/main.go

multiarch:
	mkdir -p build
	CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=6 go build -o build/strumm-armv6 cmd/web/main.go
	CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=7 go build -o build/strumm-armv7 cmd/web/main.go
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o build/strumm-arm64 cmd/web/main.go
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o build/strumm-amd64 cmd/web/main.go

docker:
	docker buildx build --push -t marcobaobao/strumm --platform linux/amd64,linux/arm64 .