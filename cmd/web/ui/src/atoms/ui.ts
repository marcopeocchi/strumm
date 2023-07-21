import { atom } from 'recoil'

export const showLyricsState = atom<boolean>({
  key: 'showLyricsState',
  default: false,
})