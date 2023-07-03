import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark' | 'system'

export interface SettingsState {
  theme: Theme
}

const initialState: SettingsState = {
  theme: localStorage.getItem('theme') as Theme || 'system'
}

export const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload.toString())
    },
    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark'
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
        return
      }
      if (state.theme === 'dark') {
        state.theme = 'light'
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.remove('dark')
        return
      }
    }
  }
})

export const { setTheme, toggleTheme } = settingsSlice.actions
export default settingsSlice.reducer