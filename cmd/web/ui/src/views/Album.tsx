import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import useSWR from 'swr'
import { currentIndexState, playingQueueState } from "../atoms/player"
import { showLyricsState } from "../atoms/ui"
import AlbumControls from "../components/AlbumControls"
import AlbumInfo from "../components/AlbumInfo"
import { AlbumPalette } from "../components/AlbumPalette"
import AlbumTrackList from "../components/AlbumTrackList"
import Loader from "../components/Loader"
import Lyrics from "../components/Lyrics"
import { Album } from "../types"
import { getHTTPEndpoint } from "../utils/url"

export default function AlbumView() {
  const [showLyrics] = useRecoilState(showLyricsState)
  const [queue] = useRecoilState(playingQueueState)
  const [index] = useRecoilState(currentIndexState)

  const params = useParams()

  const fetcher = (url: string) =>
    fetch(url)
      .then(res => res.json())

  const { data: album } = useSWR<Album>(
    `${getHTTPEndpoint()}/api/album/id/${params.id ?? ''}`,
    fetcher
  )

  if (!album) {
    return <Loader />
  }

  return (
    <div className="pb-20 select-none">
      <Lyrics lyrics={queue.at(index)?.lyrics ?? ''} show={showLyrics} />
      <AlbumPalette palette={album.palette}>
        <AlbumInfo album={album} />
      </AlbumPalette>
      <div className="px-8">
        <AlbumControls album={album} />
        <AlbumTrackList album={album} />
      </div>
    </div>
  )
}