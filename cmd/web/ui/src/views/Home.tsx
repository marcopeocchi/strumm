import { useEffect, useState } from 'react'
import AlbumImage from '../components/AlbumImage'
import { Link } from 'react-router-dom'

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([])

  const fetcher = async () => {
    const res = await fetch('http://localhost:8080/api/album/latest')
    const data = await res.json() as Album[]
    return data
  }

  useEffect(() => {
    fetcher().then(setAlbums)
  }, [])

  return (
    <div className="
      p-8 pb-32 
      grid 
      grid-cols-1 
      sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 
      2xl:grid-cols-6
      gap-6"
    >
      {albums.map(album => (
        <Link
          key={album.id}
          to={`/album/${album.id}`}
          className="flex justify-start items-center flex-col gap-1 cursor-pointer"
        >
          <AlbumImage
            src={`http://localhost:8080/static/img/${album.picture}`}
          />
          <div className="text-center">
            {album.title}
          </div>
          <div className="text-sm text-neutral-600">
            {album.artist}
          </div>
        </Link>
      ))}
    </div>
  )
}