import { Link } from "react-router-dom"
import { getHTTPEndpoint } from "../utils/url"
import AlbumImage from "./AlbumImage"

type Props = {
  album: Album
}

export default function AlbumCard({ album }: Props) {
  return (
    <Link
      key={album.id}
      to={`/album/${album.id}`}
      className="flex justify-start items-center flex-col gap-1 cursor-pointer"
    >
      <AlbumImage
        src={`${getHTTPEndpoint()}/static/img/${album.picture}`}
      />
      <div className="text-center">
        {album.title}
      </div>
      <Link
        to={`/search/${album.artist}`}
        className="text-sm text-neutral-600 hover:underline"
      >
        {album.artist}
      </Link>
    </Link>
  )
}