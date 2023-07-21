import { atom, selector } from 'recoil'

export type Theme = 'light' | 'dark' | 'system'

export type SettingsState = {
  theme: Theme
}

export const themeState = atom<Theme>({
  key: 'themeState',
  default: localStorage.getItem('theme') as Theme || 'system',
  effects: [
    ({ onSet }) => {
      onSet(value => {
        localStorage.setItem('theme', value.toString())
        if (value === 'dark') {
          document.documentElement.classList.add('dark')
          return
        }
        if (value === 'light') {
          document.documentElement.classList.remove('dark')
          return
        }
        if (
          value === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          document.documentElement.classList.add('dark')
          return
        }
        document.documentElement.classList.remove('dark')
      })
    }
  ]
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
