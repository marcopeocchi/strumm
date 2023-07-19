import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import useSWR from 'swr'
import { currentIndexState, isPlayingState, playingQueueState } from "../atoms/player"
import { Album, ArtistMetadata } from "../types"
import { ellipsis } from "../utils/strings"
import { getHTTPEndpoint } from "../utils/url"
import Image from "./Image/Image"
import Loader from "./Loader"

const nextFetcher = (url: string) =>
  fetch(url)
    .then(res => res.json())

const metadataFetcher = (artist: string) =>
  fetch(`${getHTTPEndpoint()}/api/metadata/${artist}`)
    .then(res => res.json())

const Queue: React.FC = () => {
  const [queue] = useRecoilState(playingQueueState)
  const [currentIndex] = useRecoilState(currentIndexState)
  const isPlaying = useRecoilValue(isPlayingState)

  const { data: next } = useSWR<Album>(
    `${getHTTPEndpoint()}/api/album/search/id/${queue.at(1)?.album ?? ''}`,
    nextFetcher
  )

  const { data: metadata } = useSWR<ArtistMetadata>(
    queue.at(currentIndex)?.artist ?? '',
    metadataFetcher,
  )

  return (
    <div className={`
      w-1/4 p-6 
      border-l dark:border-neutral-600 
      ${isPlaying
        ? 'xl:flex flex-col gap-4 hidden'
        : 'hidden'
      }
      overflow-y-scroll h-[calc(100vh-3.15rem)]`
    }>
      <img src={metadata?.artistPicture} className="rounded-lg" />
      <div className="
        p-4 flex gap-2 flex-col
      bg-neutral-50 dark:bg-neutral-900 
        rounded-lg"
      >
        <Link
          to={`/search/${queue.at(0)?.artist}`}
          className="text-2xl font-bold hover:underline"
        >
          {queue.at(0)?.artist}
        </Link>
        <h2 className="text-sm break-words">
          {metadata?.artistBio
            ? ellipsis(metadata?.artistBio ?? '', 500)
            : <Loader />
          }
        </h2>
        <p className="text-sm">
          Genre: {queue.at(0)?.genre || '-'}
        </p>
      </div>
      {(next && isPlaying) &&
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
                {queue.at(1)?.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {next?.artist}
              </p>
            </div>
          </div>
        </div>
      }
      {isPlaying && <div className="py-8" />}
    </div>
  )
}

export default Queue