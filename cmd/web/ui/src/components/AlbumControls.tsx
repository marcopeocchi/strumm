import { Heart, Play } from "lucide-react"
import { useRecoilState } from "recoil"
import { albumMetadataState, playingQueueState } from "../atoms/player"
import { Album } from "../types"

type Props = {
  album: Album
}

const AlbumControls: React.FC<Props> = ({ album }) => {
  const [, setMetadata] = useRecoilState(albumMetadataState)
  const [, setQueue] = useRecoilState(playingQueueState)

  return (
    <div className="flex gap-4">
      <button
        className="
          bg-blue-400 h-14 w-14 rounded-full 
          flex items-center justify-center
          hover:bg-blue-500 duration-100 shadow-md"
        onClick={() => {
          setQueue(album.tracks)
          setMetadata({ ...album, tracks: [] })
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