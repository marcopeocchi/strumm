export function getHTTPEndpoint() {
  return import.meta.env.DEV
    ? 'http://localhost:8080'
    : ''
}

export function lastFMArtistScrobbleEndpoint(artist: string) {
  return `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=e4f2d9842b1fd96906d5bedafae3821d&format=json`
}

export function deezerArtistSearchEndpoint(artist: string) {
  return `https://api.deezer.com/search/artist/?q=${artist}&index=0&limit=1&output=json`
}