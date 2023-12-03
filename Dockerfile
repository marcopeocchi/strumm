FROM golang:alpine AS build

RUN apk update && \
    apk add nodejs npm

COPY . /usr/src/strumm

WORKDIR /usr/src/strumm/frontend

RUN npm install
RUN npm run build

WORKDIR /usr/src/strumm
RUN CGO_ENABLED=0 GOOS=linux go build -o strumm cmd/web/main.go
RUN CGO_ENABLED=0 GOOS=linux go build -o dbseed cmd/db/main.go

FROM scratch

VOLUME /music /cache

WORKDIR /app

COPY --from=build /usr/src/strumm/strumm /app
COPY --from=build /usr/src/strumm/dbseed /app

ENV JWT_SECRET=secret
ENV LASTFM_APIKEY=apikey

EXPOSE 8084
ENTRYPOINT [ "./strumm" , "-c", "/cache", "-d", "/cache/data.db", "-r", "/music" ]
