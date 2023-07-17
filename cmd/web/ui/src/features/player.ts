import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Track } from '../types'

export interface PlayerState {
  isPlaying: boolean
  volume: number
  img: string
  queue: Track[]
  currentId: number
  currentIndex: number
}

const initialState: PlayerState = {
  isPlaying: false,
  volume: Number(localStorage.getItem('volume')) || 0.5,
  queue: [],
  img: '',
  currentId: 0,
  currentIndex: 0,
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
    setImg: (state, action: PayloadAction<string>) => {
      state.img = action.payload
    },
    setQueue: (state, action: PayloadAction<Track[]>) => {
      state.queue = action.payload
    },
    setCurrentId: (state, action: PayloadAction<number>) => {
      state.currentId = action.payload
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload
    },
  }
})

export const {
  setIsPlaying,
  setImg,
  setVolume,
  setQueue,
  setCurrentId,
  setCurrentIndex,
} = playerSlice.actions

export default playerSlice.reducer