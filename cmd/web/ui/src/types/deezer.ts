export type DeezerAPIResponse<T> = {
  data: T[]
  total: number
  next: string
}

export type DeezerArtist = {
  id: number
  name: string
  link: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  nb_album: number
  nb_fan: number
  radio: boolean
  tracklist: string
  type: string
}
