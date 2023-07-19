import { Moon, Sun } from 'lucide-react'
import { useRecoilState } from 'recoil'
import { themeState } from '../atoms/settings'

type Props = {
  size?: 'sm' | 'md'
  className?: string
}

export default function ThemeToggler({ size = 'md', className }: Props) {
  const [theme, setTheme] = useRecoilState(themeState)

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
      return
    }
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
      return
    }
  }

  return (
    <button
      className={`border dark:border-neutral-600 rounded-lg p-1.5 ${className}`}
      onClick={() => toggleTheme()}
    >
      {
        theme === 'light'
          ? <Moon size={size === 'sm' ? 12 : 16} />
          : <Sun size={size === 'sm' ? 12 : 16} />
      }
    </button>
  )
}