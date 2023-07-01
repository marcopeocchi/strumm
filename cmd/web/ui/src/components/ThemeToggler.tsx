import { Sun, Moon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/redux'
import { toggleTheme } from '../features/settings'

type Props = {
  size?: 'sm' | 'md'
  className?: string
}

export default function ThemeToggler({ size = 'md', className }: Props) {
  const settings = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()

  return (
    <button
      className={`border dark:border-neutral-600 rounded-lg p-1.5 ${className}`}
      onClick={() => dispatch(toggleTheme())}
    >
      {
        settings.theme === 'light'
          ? <Moon size={size === 'sm' ? 12 : 16} />
          : <Sun size={size === 'sm' ? 12 : 16} />
      }
    </button>
  )
}