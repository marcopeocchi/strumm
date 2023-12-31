import { useState } from "react"
import useSWR from 'swr'
import AlbumCard from "../components/AlbumCard"
import Paginator from "../components/Paginator"
import { Album, Paginated } from "../types"
import { getHTTPEndpoint } from "../utils/url"
import Loader from "../components/Loader"
import { useNavigate } from 'react-router-dom'

export default function Albums() {
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

  const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  const { data: albums, error } = useSWR<Paginated<Album>>(
    `${getHTTPEndpoint()}/api/album/all?page=${page}`,
    fetcher
  )

  if (error) {
    navigate('/login')
  }

  if (!albums) {
    return <Loader />
  }

  return (
    <div className="px-8 pt-8">
      <h1 className="font-semibold text-2xl">
        Albums
      </h1>
      <div className='border-b pt-4 dark:border-neutral-700' />
      <div className="
        pt-6 pb-8 
        grid 
        grid-cols-2
        sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-6
        gap-4 sm:gap-6"
      >
        {albums.list.map(album => <AlbumCard album={album} key={album.id} />)}
      </div>
      {(albums.pages ?? 0) > 1 &&
        <Paginator
          pages={albums.pages}
          setPage={setPage}
        />
      }
    </div>
  )
}