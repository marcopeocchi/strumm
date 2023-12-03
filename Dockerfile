# Node ------------------------------------------------------------------------
FROM node:20-slim AS ui
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /usr/src/strumm

WORKDIR /usr/src/strumm/cmd/web/ui

RUN rm -rf node_modules

RUN pnpm install
RUN pnpm install -D @rollup/rollup-linux-x64-gnu
RUN pnpm install -D @rollup/rollup-linux-arm64-gnu
RUN pnpm run build
# -----------------------------------------------------------------------------

# Go --------------------------------------------------------------------------
FROM golang AS build

COPY . /usr/src/strumm
COPY --from=ui /usr/src/strumm/cmd/web/ui/dist /usr/src/strumm/cmd/web/ui/dist

WORKDIR /usr/src/strumm
RUN CGO_ENABLED=0 GOOS=linux go build -o strumm cmd/web/main.go
RUN CGO_ENABLED=0 GOOS=linux go build -o dbseed cmd/db/main.go
# -----------------------------------------------------------------------------

# Bin -------------------------------------------------------------------------
FROM scratch

VOLUME /music /cache

WORKDIR /app

COPY --from=build /usr/src/strumm/strumm /app
COPY --from=build /usr/src/strumm/dbseed /app

ENV JWT_SECRET=secretW
ENV LASTFM_APIKEY=apikey

EXPOSE 8080
ENTRYPOINT [ "./strumm" , "-c", "/cache", "-d", "/cache/data.db" ]
