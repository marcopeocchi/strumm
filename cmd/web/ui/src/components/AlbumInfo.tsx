import { Album } from "../types"
import { getHTTPEndpoint } from "../utils/url"
import Image from "./Image/Image"

type Props = {
  album: Album
}

const AlbumInfo: React.FC<Props> = ({ album }) => {
  const getFormat = () =>
    album.tracks.find(t => Boolean(t.format))!.format
    || 'unknown format'

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start md:items-end">
      <Image
        src={`${getHTTPEndpoint()}/static/img/${album.picture}`}
        size="full"
      />
      <div>
        <h1 className="text-6xl sm:text-7xl font-black">
          {album.title}
        </h1>
        <h5 className="font-semibold pt-2">
          {album.year || '-'}
        </h5>
        <h5 className="font-semibold text-sm pt-1">
          {album.artist} - {album.tracks.length || '-'} tracks - {getFormat()}
        </h5>
      </div>
    </div>
  )
}

export default AlbumInfo