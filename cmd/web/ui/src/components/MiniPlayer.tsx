import {
  FastForward,
  LoaderIcon,
  Pause,
  Play,
  Rewind,
  SkipBack,
  SkipForward
} from 'lucide-react'
import { formatMMSS } from '../utils/time'

type Props = {
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPlayToggle: () => void
  onNext: () => void
  onPrev: () => void
  onFastForward: () => void
  onRewind: () => void
  duration?: number
  currentTime?: number
  seekValue: number
  paused?: boolean
}

const MiniPlayer: React.FC<Props> = (props) => {
  if (!props.currentTime || !props.duration) {
    return <div className='animate-spin'>
      <LoaderIcon />
    </div>
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-1.5">
        <div className="text-sm">
          {formatMMSS(props.currentTime)}
        </div>
        <input
          type="range"
          value={props.seekValue}
          onChange={props.onSeek}
          className="md:w-80"
        />
        <div className="text-sm">
          {formatMMSS(props.duration)}
        </div>
      </div>
      <div className="flex gap-1.5 justify-center">
        <button
          onClick={props.onPrev}
          className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100
            "
        >
          <SkipBack />
        </button>
        <button
          onClick={props.onRewind}
          className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100"
        >
          <Rewind />
        </button>
        <button
          onClick={props.onPlayToggle}
          className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100"
        >
          {props.paused ? <Play /> : <Pause />}
        </button>
        <button
          onClick={props.onFastForward}
          className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100
            "
        >
          <FastForward />
        </button>
        <button
          onClick={props.onNext}
          className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100"
        >
          <SkipForward />
        </button>
      </div>
    </div>

  )
}

export default MiniPlayer