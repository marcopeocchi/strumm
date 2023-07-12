import { useDispatch } from "react-redux"
import { Album } from "../types"
import { setImg, setIsPlaying, setQueue } from "../features/player"
import { Heart, Play } from "lucide-react"

type Props = {
  album: Album
}

const AlbumControls: React.FC<Props> = ({ album }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex gap-4">
      <button
        className="
          bg-blue-400 h-14 w-14 rounded-full 
          flex items-center justify-center
          hover:bg-blue-500 duration-100 shadow-md"
        onClick={() => {
          dispatch(setQueue(album.tracks))
          dispatch(setImg(album.picture))
          dispatch(setIsPlaying(true))
        }}
      >
        <Play
          fill="white"
          color="white"
          className="ml-1"
          size={24}
        />
      </button>
      <button
        className="
          bg-blue-400 h-14 w-14 rounded-full 
          flex items-center justify-center
          hover:bg-blue-500 duration-100 shadow-md"
      >
        <Heart
          fill="white"
          color="white"
          size={24}
        />
      </button>
    </div>
  )
}

export default AlbumControls