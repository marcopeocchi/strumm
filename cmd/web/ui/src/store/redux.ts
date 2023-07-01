import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/player'
import settingsReducer from '../features/settings'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    settings: settingsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch