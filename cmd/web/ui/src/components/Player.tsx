import { Pause, SkipBack, SkipForward } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setCurrentId, setIsPlaying, setVolume } from "../features/player"
import { RootState } from "../store/redux"
import { ellipsis } from "../utils/strings"
import { getHTTPEndpoint } from "../utils/url"

export default function Player() {
  const player = useSelector((state: RootState) => state.player)
  const playerRef = useRef<HTMLAudioElement>(null)

  const nextTrack = () => {
    index >= (player.queue.length - 1)
      ? dispatch(setIsPlaying(false))
      : setIndex(state => state + 1)
  }
  const previousTrack = () => setIndex(state => (
    state <= 0 ? 0 : (state - 1) % player.queue.length
  ))

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

  if (!player.isPlaying) {
    return null
  }

  return (
    <div className="
      fixed bottom-0 
      flex flex-row px-4 py-2 gap-4
      border-t dark:border-neutral-600 
      w-full
      justify-between items-center 
      h-24
      bg-white dark:bg-black"
    >
      <div className="w-1/4 flex gap-4">
        <img
          className="h-16 rounded"
          src={`${getHTTPEndpoint()}/static/img/${player.img}`}
        />
        <div className="flex flex-col">
          <Link
            className="font-semibold hover:underline"
            to={`/album/${player.queue[index].album}`}
          >
            {ellipsis(player.queue[index].title, 32)}
          </Link>
          <Link
            className="text-sm hover:underline"
            to={`/album/${player.queue[index].album}`}
          >
            {player.queue[index].artist}
          </Link>
        </div>
      </div>
      <audio
        className="w-full"
        controls
        autoPlay
        ref={playerRef}
        onVolumeChange={(e) => dispatch(setVolume(e.currentTarget.volume))}
        onEnded={nextTrack}
        src={`${getHTTPEndpoint()}/api/stream/${player.queue[index].ID}`}
      />
      <div className="flex gap-2 w-1/4 justify-center">
        <button
          onClick={previousTrack}
          className="px-1 py-0.5 rounded-lg border hover:bg-neutral-100 duration-100"
        >
          <SkipBack />
        </button>
        <button
          onClick={pause}
          className="px-1 py-0.5 rounded-lg border hover:bg-neutral-100 duration-100"
        >
          <Pause />
        </button>
        <button
          onClick={nextTrack}
          className="px-1 py-0.5 rounded-lg border hover:bg-neutral-100 duration-100"
        >
          <SkipForward />
        </button>
      </div>
    </div>
  )
}