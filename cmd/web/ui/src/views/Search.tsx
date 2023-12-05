import { useState } from "react"
import { useParams } from "react-router-dom"
import useSWR from 'swr'
import AlbumCard from "../components/AlbumCard"
import Loader from "../components/Loader"
import Paginator from "../components/Paginator"
import { Album, Paginated } from "../types"
import { getHTTPEndpoint } from "../utils/url"

export default function Search() {
  const [page, setPage] = useState(1)

  const { query } = useParams()

  const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data: Paginated<Album> = await res.json()
    return data
  }

  const { data: albums } = useSWR(
    `${getHTTPEndpoint()}/api/album/any/${query}?page=${page}`,
    fetcher
  )

  if (!albums) {
    return <Loader />
  }

  return (
    <div className="px-8 pt-8">
      <h1 className="font-semibold text-2xl">
        Results for "{query}"
      </h1>
      <div className='border-b dark:border-neutral-700 pt-4' />
      <div className={`
        pt-6 ${albums.pages > 1 ? 'pb-8' : 'pb-32 '}
        grid 
        grid-cols-2
        sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-6
        gap-4 sm:gap-6`
      }>
        {albums.list.map(album => <AlbumCard album={album} key={album.id} />)}
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