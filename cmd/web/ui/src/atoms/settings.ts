import { atom, selector } from 'recoil'

export type Theme = 'light' | 'dark' | 'system'

export type SettingsState = {
  theme: Theme
}

export const themeState = atom<Theme>({
  key: 'themeState',
  default: localStorage.getItem('theme') as Theme || 'system'
})

export const settingsState = selector<SettingsState>({
  key: 'settingsState',
  get: ({ get }) => {
    const theme = get(themeState);
    const state: SettingsState = {
      theme
    }
    return state
  },
})
