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
  title: string
  artist: string
  genre: string
  index: number
  lyrics: string
  year: Int16Array
}