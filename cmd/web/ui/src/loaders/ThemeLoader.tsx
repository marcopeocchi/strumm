import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../features/settings'
import { RootState } from '../store/redux'

type Props = {
  children: React.ReactNode
}

export default function ThemeLoader({ children }: Props) {
  const settings = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark')
      return
    }
    if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark')
      return
    }
    if (
      settings.theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark')
      dispatch(setTheme('dark'))
      return
    }
    document.documentElement.classList.remove('dark')
    dispatch(setTheme('light'))
    return
  }, [])

  return (
    <>{children}</>
  )
}