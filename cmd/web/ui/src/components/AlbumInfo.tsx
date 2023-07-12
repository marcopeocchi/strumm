import { Disc3 } from "lucide-react"
import { useState } from "react"
import { Album } from "../types"
import { getHTTPEndpoint } from "../utils/url"
import FallbackImage from "./FallbackImage"

type Props = {
  album: Album
}

const AlbumInfo: React.FC<Props> = ({ album }) => {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-end">
      {!hasError
        ? <img
          className="object-cover w-full sm:w-64 sm:h-64 shadow-lg"
          src={`${getHTTPEndpoint()}/static/img/${album.picture}`}
          onError={() => setHasError(true)}
        />
        : <FallbackImage size="full">
          <Disc3 size={96} />
        </FallbackImage>
      }
      <div>
        <h1 className="text-6xl sm:text-7xl font-bold">
          {album.title}
        </h1>
        <h5 className="font-semibold pt-2">
          {album.year || '-'}
        </h5>
        <h5 className="font-semibold text-sm pt-1">
          {album.artist} - {album.tracks.length || '-'} tracks
        </h5>
      </div>
    </div>
  )
}

export default AlbumInfo