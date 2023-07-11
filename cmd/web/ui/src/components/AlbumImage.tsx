import { useState } from 'react'

type Props = {
  src: string
}

export default function AlbumImage({ src }: Props) {
  const [hasError, setHasError] = useState(false)

  if (!hasError) {
    return (
      <div className="
        aspect-square
        bg-cover overflow-hidden
        rounded-lg 
        hover:ring-2 ring-blue-300
        ">
        <img
          className="
          aspect-square
          duration-100 
          hover:scale-105"
          src={src}
          loading='lazy'
          onError={() => setHasError(true)}
        />
      </div>
    )
  }

  return (
    <div className="
      aspect-square w-full
      duration-200 
      rounded-lg
    bg-neutral-300 dark:bg-neutral-800
    hover:bg-neutral-200 hover:dark:bg-neutral-700
      hover:ring-2 ring-blue-300 animate-pulse
      flex items-center justify-center font-semibold text-3xl"
    >
      FLAC
    </div>
  )
}