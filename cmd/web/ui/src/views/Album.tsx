import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setImg, setIsPlaying, setQueue, } from "../features/player"
import { RootState } from "../store/redux"
import { getHTTPEndpoint } from "../utils/url"

export default function AlbumView() {
  const params = useParams()

  const [album, setAlbum] = useState<Album>()

  const dispatch = useDispatch()
  const player = useSelector((state: RootState) => state.player)

  useEffect(() => {
    fetch(`${getHTTPEndpoint()}/api/album/search/id/${params.id}`)
      .then(res => res.json())
      .then(setAlbum)
  }, [params])

  return (
    <div className="p-8 pb-32">
      <div className="flex flex-row gap-8">
        <img
          className="object-cover w-64 h-64 rounded-lg"
          src={`${getHTTPEndpoint()}/static/img/${album?.picture}`}
        />
        <div>
          <h1 className="text-6xl font-bold">
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
      <div className="pt-8 -ml-2">
        {album?.tracks.map((track, idx) => (
          <div
            className={`
              cursor-pointer 
              rounded p-2
              flex flex-row gap-4 py-1.5 items-center
              hover:bg-neutral-200 hover:dark:bg-neutral-700
              hover:duration-100
              ${(player.currentId === track.ID) &&
              'bg-neutral-200 dark:bg-neutral-700'
              }
            `}
            key={track.ID}
            onClick={() => {
              dispatch(setQueue(album.tracks.slice(idx)))
              dispatch(setImg(album.picture))
              dispatch(setIsPlaying(true))
            }}
          >
            <div>{track.index}</div>
            <div className="flex flex-col">
              <div>{track.title}</div>
              <div className="text-sm">{track.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}