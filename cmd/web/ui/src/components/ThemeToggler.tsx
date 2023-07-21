import { Moon, Sun } from 'lucide-react'
import useTheme from '../hooks/useTheme'

type Props = {
  size?: 'sm' | 'md'
  className?: string
}

export default function ThemeToggler({ size = 'md', className }: Props) {
  const { theme, toggler } = useTheme()

  return (
    <button
      className={`border dark:border-neutral-600 rounded-lg p-1.5 ${className}`}
      onClick={() => toggler()}
    >
      {
        theme === 'light'
          ? <Moon size={size === 'sm' ? 12 : 16} />
          : <Sun size={size === 'sm' ? 12 : 16} />
      }
    </button>
  )
}