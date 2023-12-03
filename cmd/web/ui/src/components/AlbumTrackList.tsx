import { ListEnd, Play } from 'lucide-react'
import { useRecoilState } from 'recoil'
import {
  albumMetadataState,
  currentIndexState,
  playingQueueState
} from '../atoms/player'
import { Album } from '../types'

type Props = {
  album: Album
}

const AlbumTrackList: React.FC<Props> = ({ album }) => {
  const [index] = useRecoilState(currentIndexState)
  const [, setMetadata] = useRecoilState(albumMetadataState)
  const [queue, setQueue] = useRecoilState(playingQueueState)

  return (
    <div className="pt-3 md:pt-6 -ml-2">
      {album.tracks.map((track, idx) => (
        <div
          className="
            cursor-pointer 
            rounded p-2
            flex flex-row gap-4 py-1.5 items-center justify-between
            hover:bg-neutral-200 hover:dark:bg-neutral-700
            hover:duration-100"
          key={track.id}
        >
          <div className="flex items-center gap-4 w-full" onClick={() => {
            setQueue(album.tracks.slice(idx))
            setMetadata({ ...album, tracks: [] })
          }}>
            <div>
              {queue.at(index)?.id === track.id
                ? <Play size={12} fill="#f87171" color="#f87171" />
                : track.index
              }
            </div>
            <div className="flex flex-col">
              <div className={`${(queue.at(index)?.id === track.id) &&
                'text-red-400 -ml-1'
                }`}
              >
                {track.title}
              </div>
              <div className={`${(queue.at(index)?.id === track.id) &&
                'text-red-400 -ml-1'
                } text-sm`}
              >
                {track.artist}
              </div>
            </div>
          </div>
          <button
            className="
              py-1 px-1.5 
              rounded 
              hover:bg-red-200 dark:hover:bg-red-400"
            onClick={() => { setQueue([...queue, track]) }}
          >
            <ListEnd size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default AlbumTrackList