import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AlbumCard from "../components/AlbumCard"
import Paginator from "../components/Paginator"
import { getHTTPEndpoint } from "../utils/url"

export default function Search() {
  const [albums, setAlbums] = useState<Paginated<Album>>({
    list: [],
    page: 1,
    pages: 0,
    pageSize: 0,
    totalElements: 0
  })
  const [page, setPage] = useState(1)

  const { query } = useParams()

  const fetcher = async (query: string, page: number) => {
    const res = await fetch(
      `${getHTTPEndpoint()}/api/album/search/any/${query}?page=${page}`
    )
    const data: Paginated<Album> = await res.json()
    setAlbums(data)
  }

  useEffect(() => {
    if (query) {
      fetcher(query, page)
    }
  }, [page, query])

  return (
    <div className="px-8 pt-8">
      <h1 className="font-semibold text-2xl">
        Results for "{query}"
      </h1>
      <div className='border-b pt-4' />
      <div className={`
        pt-6 px-8 ${albums.pages > 1 ? 'pb-8' : 'pb-32 '}
        grid 
        grid-cols-1 
        sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-6
        gap-6`
      }>
        {albums.list.map(album => <AlbumCard album={album} />)}
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