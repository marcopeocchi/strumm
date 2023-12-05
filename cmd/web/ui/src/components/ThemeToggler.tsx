import { Moon, Sun, SunMoon } from 'lucide-react'
import useTheme from '../hooks/useTheme'
import { Theme } from '../atoms/settings'

type Props = {
  className?: string
}

const states: Record<Theme, JSX.Element> = {
  dark: <Moon size={16} />,
  light: <Sun size={16} />,
  system: <SunMoon size={16} />
}

export default function ThemeToggler({ className }: Props) {
  const { theme, toggler } = useTheme()

  return (
    <button
      className={`border dark:border-neutral-700 rounded-lg p-1.5 ${className}`}
      onClick={() => toggler()}
    >
      {states[theme]}
    </button>
  )
}