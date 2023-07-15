export type LastFMScrobbleResponse = {
  artist: LastFMScrobbleResponseArtist
}

export type LastFMScrobbleResponseArtist = {
  name: string
  mbid: string
  url: string
  image: Image[]
  streamable: string
  ontour: string
  stats: Stats
  similar: Similar
  tags: Tags
  bio: Bio
}

type Bio = {
  published: string
  summary: string
  content: string
}

type Image = {
  "#text": string
  size: string
}

type Similar = {
  artist: ArtistElement[]
}

type ArtistElement = {
  name: string
  url: string
  image: Image[]
}

type Stats = {
  listeners: string
  playcount: string
}

type Tags = {
  tag: Tag[]
}

type Tag = {
  name: string
  url: string
}