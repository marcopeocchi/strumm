import { useEffect, useState } from 'react'
import AlbumCard from '../components/AlbumCard'
import { getHTTPEndpoint } from '../utils/url'

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([])

  const fetcher = async () => {
    const res = await fetch(`${getHTTPEndpoint()}/api/album/latest`)
    const data = await res.json() as Album[]
    return data
  }

  useEffect(() => {
    fetcher().then(setAlbums)
  }, [])

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
        {albums.map(album => <AlbumCard album={album} />)}
      </div>
    </div>
  )
}