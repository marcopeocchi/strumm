import { useRecoilValue } from 'recoil'
import { themeState } from '../atoms/settings'
import { Palette } from '../types'
import { pickBrightest } from '../utils/colors'

type Props = {
  palette: Palette,
  children?: React.ReactNode
}

export const AlbumPalette: React.FC<Props> = ({ children, palette }) => {
  const theme = useRecoilValue(themeState)

  const generateGradient = (from?: string) =>
    theme === 'dark' ||
      (theme == 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? `linear-gradient(180deg, ${from ?? 'black'} 0%, #0a0a0a 100%)`
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