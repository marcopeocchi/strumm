import { Heart, Play } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import useSWR from 'swr'
import { setImg, setIsPlaying, setQueue, } from "../features/player"
import { RootState } from "../store/redux"
import { Album } from "../types"
import { getHTTPEndpoint } from "../utils/url"
import { AlbumPalette } from "../components/AlbumPalette"

export default function AlbumView() {
  const params = useParams()

  const dispatch = useDispatch()
  const player = useSelector((state: RootState) => state.player)

  const fetcher = (url: string, id: string) =>
    fetch(`${url}/${id}`)
      .then(res => res.json())


  const { data: album } = useSWR<Album>(
    `${getHTTPEndpoint()}/api/album/search/id`,
    url => fetcher(url, params.id ?? '')
  )

  return (
    <div className="pb-32 select-none">
      <AlbumPalette id={album?.picture ?? ''} >
        <div className="flex flex-col sm:flex-row gap-8 items-end">
          <img
            className="object-cover w-full sm:w-64 sm:h-64 shadow-lg"
            src={`${getHTTPEndpoint()}/static/img/${album?.picture}`}
          />
          <div>
            <h1 className="text-7xl font-bold">
              {album?.title}
            </h1>
            <h5 className="font-semibold pt-2">
              {album?.year || '-'}
            </h5>
            <h5 className="font-semibold text-sm pt-1">
              {album?.artist} - {album?.tracks.length || '-'} tracks
            </h5>
          </div>
        </div>
      </AlbumPalette>
      <div className="px-8">
        <div className="flex gap-4">
          <button
            className="
              bg-blue-400 h-14 w-14 rounded-full 
              flex items-center justify-center
              hover:bg-blue-500 duration-100 shadow-md"
            onClick={() => {
              dispatch(setQueue(album?.tracks ?? []))
              dispatch(setImg(album?.picture ?? ''))
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
        <div className="pt-3 md:pt-6 -ml-2">
          {album?.tracks.map((track, idx) => (
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
      </div>
    </div>
  )
}