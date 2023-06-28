import { useEffect, useState } from "react";

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
      {albums.map((album) => (
        <div
          key={album.id}
          className="flex justify-start items-center flex-col gap-1 cursor-pointer"
        >
          <div className="h-64 w-full bg-neutral-200 hover:bg-neutral-100 duration-200 rounded-lg" />
          <div className="text-center">
            {album.title}
          </div>
          <div className="text-sm text-neutral-600">
            {album.artist}
          </div>
        </div>
      ))}
    </div>
  )
}