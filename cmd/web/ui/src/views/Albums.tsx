import { useEffect, useState } from "react"
import { getHTTPEndpoint } from "../utils/url"
import { Link } from "react-router-dom"
import AlbumImage from "../components/AlbumImage"
import Paginator from "../components/Paginator"

export default function Albums() {
  const [albums, setAlbums] = useState<Paginated<Album>>({
    list: [],
    page: 1,
    pages: 0,
    pageSize: 0,
    totalElements: 0
  })
  const [page, setPage] = useState(1)

  const fetcher = async (page: number) => {
    const res = await fetch(`${getHTTPEndpoint()}/api/album/all?page=${page}`)
    const data: Paginated<Album> = await res.json()
    setAlbums(data)
  }

  useEffect(() => {
    fetcher(page)
  }, [page])

  return (
    <div className="px-8 pt-8">
      <h1 className="font-semibold text-2xl">
        Albums
      </h1>
      <div className='border-b pt-4 dark:border-neutral-600' />
      <div className="
        pt-6 px-8 pb-8 
        grid 
        grid-cols-1 
        sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-6
        gap-6"
      >
        {albums.list.map(album => (
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
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {album.artist}
            </div>
          </Link>
        ))}
      </div>
      {albums.pages > 1 &&
        <Paginator
          pages={albums.pages}
          setPage={setPage}
        />
      }
    </div>
  )
}