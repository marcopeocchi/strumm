import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/redux"
import { useEffect, useRef } from "react"
import { setIsPlaying, setVolume } from "../features/player"

export default function Bottom() {
  const player = useSelector((state: RootState) => state.player)
  const playerRef = useRef<HTMLAudioElement>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = player.volume
    }
  }, [playerRef, player])

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
      <img
        className="h-16 rounded"
        src={`http://localhost:8080/static/img/${player.img}`}
      />
      <div className="flex flex-col">
        <div className="font-semibold">
          {player.title}
        </div>
        <div className="text-sm">
          {player.artist}
        </div>
      </div>
      <audio
        className="pt-4 w-full"
        controls
        autoPlay
        ref={playerRef}
        onVolumeChange={(e) => dispatch(setVolume(e.currentTarget.volume))}
        onEnded={() => dispatch(setIsPlaying(false))}
        src={`http://localhost:8080/api/stream/${player.src}`}
      />
    </div>
  )
}