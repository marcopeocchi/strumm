# Bun ----------------------------------------------------------
FROM oven/bun:1 as ui

COPY . /usr/src/strumm

WORKDIR /usr/src/strumm/cmd/web/ui

RUN bun install
RUN bun run build
# --------------------------------------------------------------

# Go -----------------------------------------------------------
FROM golang AS build

COPY . /usr/src/strumm
COPY --from=ui /usr/src/strumm/cmd/web/ui /usr/src/strumm/cmd/web/ui

WORKDIR /usr/src/strumm
RUN CGO_ENABLED=0 GOOS=linux go build -o strumm cmd/web/main.go
RUN CGO_ENABLED=0 GOOS=linux go build -o dbseed cmd/db/main.go
# --------------------------------------------------------------

# Bin ----------------------------------------------------------
FROM scratch

VOLUME /music /cache

WORKDIR /app

COPY --from=build /usr/src/strumm/strumm /app
COPY --from=build /usr/src/strumm/dbseed /app

ENV JWT_SECRET=secretW
ENV LASTFM_APIKEY=apikey

EXPOSE 8084
ENTRYPOINT [ "./strumm" , "-c", "/cache", "-d", "/cache/data.db", "-r", "/music" ]
