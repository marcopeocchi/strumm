type Album = {
  id: number
  created_at: string
  updated_at: string
  title: string
  artist: string
  picture: string
  year: number
  tracks: Track[]
}

type Track = {
  ID: number
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

type Paginated<T> = {
  list: T[]
  page: number
  pages: number
  pageSize: number
  totalElements: number
}