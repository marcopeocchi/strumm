import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PlayerState {
  isPlaying: boolean
  volume: number
  artist: string
  title: string
  img: string
  src: string
}

const initialState: PlayerState = {
  isPlaying: false,
  volume: Number(localStorage.getItem('volume')),
  artist: '',
  title: '',
  img: '',
  src: '',
}

export const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
      localStorage.setItem('volume', String(action.payload))
    },
    setArtist: (state, action: PayloadAction<string>) => {
      state.artist = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.img = action.payload
    },
    setSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload
    },
  }
})

export const {
  setImg,
  setIsPlaying,
  setSrc,
  setTitle,
  setArtist,
  setVolume,
} = playerSlice.actions

export default playerSlice.reducer