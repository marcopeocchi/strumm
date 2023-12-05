import { useRecoilState } from 'recoil'
import { Theme, themeState } from '../atoms/settings'


const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState)

  const states: Theme[] = ['light', 'dark', 'system']
  const currentState = states.indexOf(theme)


  const toggler = () => {
    setTheme(states[(currentState + 1) % states.length])
  }

  return { theme, toggler }
}

export default useTheme