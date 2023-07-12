import { useDispatch, useSelector } from "react-redux"
import { Album } from "../types"
import { RootState } from "../store/redux"
import { setImg, setIsPlaying, setQueue } from "../features/player"
import { Play } from "lucide-react"

type Props = {
  album: Album
}

const AlbumTrackList: React.FC<Props> = ({ album }) => {
  const dispatch = useDispatch()
  const player = useSelector((state: RootState) => state.player)

  return (
    <div className="pt-3 md:pt-6 -ml-2">
      {album.tracks.map((track, idx) => (
        <div
          className="
            cursor-pointer 
            rounded p-2
            flex flex-row gap-4 py-1.5 items-center
            hover:bg-neutral-200 hover:dark:bg-neutral-700
            hover:duration-100"
          key={track.ID}
          onClick={() => {
            dispatch(setQueue(album.tracks.slice(idx)))
            dispatch(setImg(album.picture))
            dispatch(setIsPlaying(true))
          }}
        >
          <div>
            {player.currentId === track.ID
              ? <Play size={12} fill="#60a5fa" color="#60a5fa" />
              : track.index
            }
          </div>
          <div className="flex flex-col">
            <div className={`${(player.currentId === track.ID) &&
              'text-blue-400 -ml-1'
              }`}
            >
              {track.title}
            </div>
            <div className={`${(player.currentId === track.ID) &&
              'text-blue-400 -ml-1'
              } text-sm`}
            >
              {track.artist}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AlbumTrackList