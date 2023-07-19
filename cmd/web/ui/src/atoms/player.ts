import { atom, selector } from 'recoil'
import { Album, Track } from '../types'

export const volumeState = atom<number>({
  key: 'volumeState',
  default: Number(localStorage.getItem('volume')) || 0.5,
  effects: [
    ({ onSet }) => {
      onSet(value => localStorage.setItem('volume', String(value)))
    }
  ]
})

export const playingQueueState = atom<Array<Track>>({
  key: 'playingQueueState',
  default: [],
})

export const albumMetadataState = atom<Partial<Album>>({
  key: 'albumMetadataState',
  default: {},
})

export const currentIndexState = atom<number>({
  key: 'currentIndexState',
  default: 0,
})

export const isPlayingState = selector<boolean>({
  key: 'isPlayingState',
  get: ({ get }) => get(playingQueueState).length > 0
})

export const volumePercentState = selector<number>({
  key: 'volumePercent',
  get: ({ get }) => get(volumeState) * 100
})