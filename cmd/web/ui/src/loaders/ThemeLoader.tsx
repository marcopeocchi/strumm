import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { themeState } from '../atoms/settings'

type Props = {
  children: React.ReactNode
}

export default function ThemeLoader({ children }: Props) {
  const [theme, setTheme] = useRecoilState(themeState)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      return
    }
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
      return
    }
    if (
      theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
      return
    }
    document.documentElement.classList.remove('dark')
    setTheme('light')
    return
  }, [])

  return (
    <>{children}</>
  )
}