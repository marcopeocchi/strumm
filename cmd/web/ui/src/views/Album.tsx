import { useParams } from "react-router-dom"
import useSWR from 'swr'
import AlbumControls from "../components/AlbumControls"
import AlbumInfo from "../components/AlbumInfo"
import { AlbumPalette } from "../components/AlbumPalette"
import AlbumTrackList from "../components/AlbumTrackList"
import Loader from "../components/Loader"
import { Album } from "../types"
import { getHTTPEndpoint } from "../utils/url"

export default function AlbumView() {
  const params = useParams()

  const fetcher = (url: string) =>
    fetch(url)
      .then(res => res.json())


  const { data: album } = useSWR<Album>(
    `${getHTTPEndpoint()}/api/album/search/id/${params.id ?? ''}`,
    fetcher
  )

  if (!album) {
    return <Loader />
  }

  return (
    <div className="pb-20 select-none">
      <AlbumPalette id={album.picture} color={album.dominant_color}>
        <AlbumInfo album={album} />
      </AlbumPalette>
      <div className="px-8">
        <AlbumControls album={album} />
        <AlbumTrackList album={album} />
      </div>
    </div>
  )
}