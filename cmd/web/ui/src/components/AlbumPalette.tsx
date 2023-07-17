import { useSelector } from 'react-redux'
import { RootState } from '../store/redux'
import { Palette } from '../types'
import { pickBrightest } from '../utils/colors'

type Props = {
  palette: Palette,
  children?: React.ReactNode
}

export const AlbumPalette: React.FC<Props> = ({ children, palette }) => {
  const settings = useSelector((state: RootState) => state.settings)

  const generateGradient = (from?: string) =>
    settings.theme === 'dark'
      ? `linear-gradient(180deg, ${from ?? 'black'} 0%, black 100%)`
      : `linear-gradient(180deg, ${from ?? 'white'} 0%, white 100%)`

  return (
    <div
      className="w-full"
      style={{ background: generateGradient(pickBrightest(palette)) }}
    >
      <div className='relative p-8 flex items-end'>
        <div className='pb-8'>
          {children}
        </div>
      </div>
    </div>
  )
}