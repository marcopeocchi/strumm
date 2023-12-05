import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { themeState } from '../atoms/settings'

type Props = {
  children: React.ReactNode
}

export default function ThemeLoader({ children }: Props) {
  const theme = useRecoilValue(themeState)

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
      return
    }
    document.documentElement.classList.remove('dark')
    return
  }, [])

  return (
    <>{children}</>
  )
}