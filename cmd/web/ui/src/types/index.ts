export type Album = {
  id: number
  created_at: string
  updated_at: string
  title: string
  artist: string
  picture: string
  blur_hash: string
  year: number
  palette: Palette,
  tracks: Track[]
}

export type Palette = {
  dominant: string
  lessDominant: string
  accent: string
}

export type Track = {
  id: number
  created_at: string
  updated_at: string
  format: string
  album: number
  title: string
  artist: string
  genre: string
  index: number
  lyrics: string
  year: number
}

export type Paginated<T> = {
  list: T[]
  page: number
  pages: number
  pageSize: number
  totalElements: number
}

export type ArtistMetadata = {
  artistBio: string
  artistPicture: string
}