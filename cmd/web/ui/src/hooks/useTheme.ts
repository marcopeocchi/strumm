import { useRecoilState } from 'recoil'
import { themeState } from '../atoms/settings'

const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState)

  const toggler = () => {
    if (theme === 'light') {
      setTheme('dark')
      return
    }
    if (theme === 'dark') {
      setTheme('light')
      return
    }
  }

  return { theme, toggler }
}

export default useTheme