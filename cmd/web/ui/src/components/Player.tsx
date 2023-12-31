
import { Mic2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  albumMetadataState,
  currentIndexState,
  isPlayingState,
  playingQueueState,
  volumePercentState,
  volumeState
} from '../atoms/player'
import { showLyricsState } from '../atoms/ui'
import { ellipsis } from '../utils/strings'
import { getHTTPEndpoint } from '../utils/url'
import RemoteImage from './Image/RemoteImage'
import MiniPlayer from './MiniPlayer'
import { BehaviorSubject } from 'rxjs'

export default function Player() {
  const [showLyrics, setShowLyrics] = useRecoilState(showLyricsState)
  const [, setCurrentIndex] = useRecoilState(currentIndexState)
  const [volume, setVolume] = useRecoilState(volumeState)
  const [queue, setQueue] = useRecoilState(playingQueueState)

  const metadata = useRecoilValue(albumMetadataState)
  const isPlaying = useRecoilValue(isPlayingState)
  const volumePercent = useRecoilValue(volumePercentState)

  const playerRef = useRef<HTMLAudioElement>(null)

  const currentTime$ = useMemo(() => new BehaviorSubject(0), [])

  const [seek, setSeek] = useState(0)
  const [index, setIndex] = useState(0)

  const nextTrack = () => {
    index >= (queue.length - 1)
      ? setQueue([])
      : setIndex(state => state + 1)
  }

  const previousTrack = () => setIndex(state => (
    state <= 0 ? 0 : (state - 1) % queue.length
  ))

  const back15 = () => {
    if (playerRef.current) {
      playerRef.current.currentTime -= 15
    }
  }

  const forward15 = () => {
    if (playerRef.current) {
      playerRef.current.currentTime += 15
    }
  }

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const percentage = Number(e.currentTarget.value)
      const currentTime = (percentage / 100) * playerRef.current.duration
      playerRef.current.currentTime = currentTime
    }
  }

  const togglePlayPause = () => playerRef.current?.paused
    ? playerRef.current?.play()
    : playerRef.current?.pause()

  useEffect(() => {
    if (queue.length > 0 && queue.at(index)) {
      setCurrentIndex(index)
    }
  }, [index, queue])

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    setIndex(0)
  }, [queue])

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const seek = playerRef.current.currentTime / playerRef.current.duration
        setSeek(Math.ceil(seek * 100))
        currentTime$.next(playerRef.current.currentTime)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [metadata.id])

  if (!isPlaying) {
    return null
  }

  return (
    <div className="
      fixed bottom-0 
      flex flex-row px-2 py-2 gap-4
      border-t dark:border-neutral-700 
      w-full
      justify-between items-center 
      min-h-24
      bg-white dark:bg-neutral-950"
    >
      <div className="sm:w-1/4 flex gap-4">
        <RemoteImage
          rounded
          size="mini"
          albumId={queue.at(index)?.album}
          className='hidden sm:block'
        />
        <div className="flex flex-col">
          <Link
            className="font-semibold hover:underline"
            to={`/album/${queue.at(index)?.album}`}
          >
            {ellipsis(queue.at(index)?.title ?? '', 25)}
          </Link>
          <Link
            className="text-sm hover:underline"
            to={`/search/${queue.at(index)?.artist}`}
          >
            {queue.at(index)?.artist}
          </Link>
        </div>
      </div>
      <audio
        className="hidden"
        controls
        autoPlay
        ref={playerRef}
        onEnded={nextTrack}
        // for firefox and safari which won't autoplay.
        onCanPlay={e => e.currentTarget.play()}
        onPlay={e => e.currentTarget.volume = volume}
        src={`${getHTTPEndpoint()}/api/stream/${queue.at(index)?.id}`}
      />
      <MiniPlayer
        onNext={nextTrack}
        onPrev={previousTrack}
        onFastForward={forward15}
        onRewind={back15}
        onSeek={onSeek}
        onPlayToggle={togglePlayPause}
        seekValue={seek}
        paused={playerRef.current?.paused}
        currentTime$={currentTime$}
        duration={playerRef.current?.duration}
      />
      <div />
      <div className='flex items-center gap-2.5'>
        <button
          onClick={() => setShowLyrics(state => !state)}
          className={showLyrics ? 'text-red-500' : ''}>
          <Mic2 size={18} />
        </button>
        <input
          type="range"
          className="w-20 accent-red-500 dark:accent-red-400"
          value={volumePercent}
          onChange={e => {
            const val = Number(e.currentTarget.value) / 100
            setVolume(val)
          }}
        />
      </div>
    </div>
  )
}