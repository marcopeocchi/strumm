import useSWR from 'swr'
import AlbumCard from '../components/AlbumCard'
import { Album } from '../types'
import { getHTTPEndpoint } from '../utils/url'
import Loader from '../components/Loader'

export default function Home() {
  const fetcher = async () => {
    const res = await fetch(`${getHTTPEndpoint()}/api/album/latest`)
    const data: Album[] = await res.json()
    return data.slice(0, 36)
  }

  const { data: albums } = useSWR<Album[]>(
    `${getHTTPEndpoint()}/api/album/latest`,
    fetcher
  )

  if (!albums) {
    return <Loader />
  }

  return (
    <div>
      <div className="px-8 pt-8">
        <h1 className="font-semibold text-2xl">
          Your collection
        </h1>
        <h2 className="">
          Latest albums
        </h2>
        <div className='border-b dark:border-neutral-600 pt-4' />
      </div>
      <div className="
        pt-6 px-8 pb-32 
        grid 
        grid-cols-2
        sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-6
        gap-4 sm:gap-6"
      >
        {albums.map(album => <AlbumCard album={album} key={album.id} />)}
      </div>
    </div>
  )
}