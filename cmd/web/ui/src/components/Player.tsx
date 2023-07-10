import {
  FastForward,
  Pause,
  Play,
  Rewind,
  SkipBack,
  SkipForward
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setCurrentId, setIsPlaying, setVolume } from "../features/player"
import { RootState } from "../store/redux"
import { ellipsis } from "../utils/strings"
import { getHTTPEndpoint } from "../utils/url"
import { formatMMSS } from "../utils/time"

export default function Player() {
  const player = useSelector((state: RootState) => state.player)
  const playerRef = useRef<HTMLAudioElement>(null)

  const [seek, setSeek] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const nextTrack = () => {
    index >= (player.queue.length - 1)
      ? dispatch(setIsPlaying(false))
      : setIndex(state => state + 1)
  }

  const previousTrack = () => setIndex(state => (
    state <= 0 ? 0 : (state - 1) % player.queue.length
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

  const pause = () => playerRef.current?.paused
    ? playerRef.current?.play()
    : playerRef.current?.pause()

  const [index, setIndex] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = player.volume
    }
  }, [playerRef, player])

  useEffect(() => {
    if (player.queue.length > 0) {
      dispatch(setCurrentId(player.queue[index].ID))
    }
  }, [index, player.queue])

  useEffect(() => {
    setIndex(0)
  }, [player.queue])

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const seek = playerRef.current.currentTime / playerRef.current.duration
        setSeek(Math.ceil(seek * 100))
        setCurrentTime(playerRef.current.currentTime)
        setDuration(playerRef.current.duration)
      }
    }, 250)
    return () => clearInterval(interval)
  }, [player.currentId])

  if (!player.isPlaying) {
    return null
  }

  return (
    <div className="
      fixed bottom-0 
      flex flex-row px-2 py-2 gap-4
      border-t dark:border-neutral-600 
      w-full
      justify-between items-center 
      min-h-24
      bg-white dark:bg-black"
    >
      <div className="sm:w-1/4 flex gap-4">
        <img
          className="h-16 rounded"
          src={`${getHTTPEndpoint()}/static/img/${player.img}`}
        />
        <div className="flex flex-col">
          <Link
            className="font-semibold hover:underline"
            to={`/album/${player.queue[index].album}`}
          >
            {ellipsis(player.queue[index].title, 25)}
          </Link>
          <Link
            className="text-sm hover:underline"
            to={`/search/${player.queue[index].artist}`}
          >
            {player.queue[index].artist}
          </Link>
        </div>
      </div>
      <audio
        className="hidden"
        controls
        autoPlay
        ref={playerRef}
        onVolumeChange={(e) => dispatch(setVolume(e.currentTarget.volume))}
        onEnded={nextTrack}
        src={`${getHTTPEndpoint()}/api/stream/${player.queue[index].ID}`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-1.5">
          <div className="text-sm">
            {formatMMSS(currentTime)}
          </div>
          <input
            type="range"
            value={seek}
            onChange={onSeek}
            className="md:w-80"
          />
          <div className="text-sm">
            {formatMMSS(duration)}
          </div>
        </div>
        <div className="flex gap-1.5 justify-center">
          <button
            onClick={previousTrack}
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
            onClick={back15}
            className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100
            "
          >
            <Rewind />
          </button>
          <button
            onClick={pause}
            className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100
            "
          >
            {playerRef.current && playerRef.current.paused
              ? <Play />
              : <Pause />
            }
          </button>
          <button
            onClick={forward15}
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
            onClick={nextTrack}
            className="px-1 py-0.5 
            rounded-lg 
            border dark:border-neutral-400/30
            hover:bg-neutral-100 dark:hover:bg-neutral-50/70
            duration-100
            "
          >
            <SkipForward />
          </button>
        </div>
      </div>
      <input
        type="range"
        className="w-20"
        value={(playerRef.current?.volume ?? player.volume) * 100}
        onChange={e => {
          if (playerRef.current) {
            const val = Number(e.currentTarget.value) / 100
            playerRef.current.volume = val
            setVolume(val)
          }
        }}
      />
    </div>
  )
}