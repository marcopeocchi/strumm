import clsx from "clsx"
import { Palette } from "../types"

type Props = {
  className?: string
  palette: Palette
  lyrics: string
  show: boolean
}

const Lyrics: React.FC<Props> = ({ className, lyrics, show, palette }) => {
  return (
    <div
      className={clsx(
        show ? 'absolute' : 'hidden',
        'w-full sm:w-5/6 xl:w-2/3 h-[calc(100vh-8rem)]',
        'bg-neutral-50 dark:bg-neutral-900',
        'z-10',
        'border-r dark:border-neutral-700',
        'p-8 overflow-y-auto',
        className
      )}
      style={{ backgroundColor: palette.accent }}
    >
      <div className="text-justify text-2xl font-semibold">
        {!lyrics && 'No lyrics this track'}

        {lyrics.split('\n').map((line, idx) => (
          <p className="py-0.5" key={idx}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export default Lyrics