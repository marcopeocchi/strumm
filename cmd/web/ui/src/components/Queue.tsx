import { useSelector } from "react-redux"
import useSWR from 'swr'
import { RootState } from "../store/redux"
import { Album, ArtistMetadata } from "../types"
import { ellipsis } from "../utils/strings"
import { getHTTPEndpoint } from "../utils/url"
import Image from "./Image"
import Loader from "./Loader"

const nextFetcher = (url: string) =>
  fetch(url)
    .then(res => res.json())

const metadataFetcher = (artist: string) =>
  fetch(`${getHTTPEndpoint()}/api/metadata/${artist}`)
    .then(res => res.json())

const Queue: React.FC = () => {
  const player = useSelector((state: RootState) => state.player)

  const { data: next } = useSWR<Album>(
    `${getHTTPEndpoint()}/api/album/search/id/${player.queue.at(1)?.album ?? ''}`,
    nextFetcher
  )

  const { data: metadata } = useSWR<ArtistMetadata>(
    player.queue.at(1)?.artist ?? '',
    metadataFetcher,
  )

  return (
    <div className={`
      w-1/5 p-6 
      border-l dark:border-neutral-600 
      ${player.isPlaying
        ? 'xl:flex flex-col gap-4 hidden'
        : 'hidden'
      }
      overflow-y-scroll h-[calc(100vh-3.15rem)] `
    }>
      <img src={metadata?.artistPicture} className="rounded-lg" />
      <div className="
        p-4 flex gap-2 flex-col
      bg-neutral-50 dark:bg-neutral-900 
        rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {player.queue.at(0)?.artist}
        </h2>
        <h2 className="text-sm break-words">
          {metadata?.artistBio
            ? ellipsis(metadata?.artistBio ?? '', 500)
            : <Loader />
          }
        </h2>
        <p className="text-sm">
          Genre: {player.queue.at(0)?.genre || '-'}
        </p>
      </div>
      {(next && player.isPlaying) &&
        <div className="
          p-4 
        bg-neutral-50 dark:bg-neutral-900 
          rounded-lg"
        >
          <p className="font-semibold mb-2">
            Next on queue
          </p>
          <div className="flex gap-2">
            <Image
              size="mini"
              rounded
              className="rounded w-14 h-14 mt-1.5"
              src={`${getHTTPEndpoint()}/static/img/${next?.picture}`}
            />
            <div>
              <p className="text-ellipsis">
                {player.queue.at(1)?.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {next?.artist}
              </p>
            </div>
          </div>
        </div>
      }
      {player.isPlaying && <div className="py-8" />}
    </div>
  )
}

export default Queue