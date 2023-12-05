# Strumm

Dead simple, ultra-lightweight, self-hosted audio streaming platform.

```sh
docker run -d \
  --name strumm \
  -p 8080:8080 \
  -v /music/directory:/music \
  -v /config/directory:/config \
  marcobaobao/strumm

# run the first library scan
docker exec -it strumm /app/dbseed -r /music -d /cache/data.db -c /cache/images
```

![image](https://github.com/marcopeocchi/strumm/assets/35533749/b136d270-3189-4860-a237-1ca8ce50ca30)
![image](https://github.com/marcopeocchi/strumm/assets/35533749/cab28c84-f734-448d-b169-58d6f3978df9)

## Metadata

Retrieve artist's related metatada from LastFM and Deezer 😎.

![image](https://github.com/marcopeocchi/strumm/assets/35533749/5c54b8da-79ea-4ca3-b642-44ffad8dd0f7)

**🚧 Still WIP 🚧**
