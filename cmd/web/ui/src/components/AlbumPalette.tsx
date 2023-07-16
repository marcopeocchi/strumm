import { useSelector } from 'react-redux'
import { RootState } from '../store/redux'

type Props = {
  id: string
  color?: string,
  children?: React.ReactNode
}

export const AlbumPalette: React.FC<Props> = ({ children, color }) => {
  const settings = useSelector((state: RootState) => state.settings)

  const generateGradient = (from?: string) =>
    settings.theme === 'dark'
      ? `linear-gradient(180deg, ${from ?? 'black'} 0%, black 100%)`
      : `linear-gradient(180deg, ${from ?? 'white'} 0%, white 100%)`

  return (
    <div
      className="w-full"
      style={{ background: generateGradient(color) }}
    >
      <div className='relative p-8 flex items-end'>
        <div className='pb-8'>
          {children}
        </div>
      </div>
    </div>
  )
}