import { useState } from 'react'
import { Blurhash } from 'react-blurhash-as'

type Props = {
  src: string
  hash: string
}

export default function AlbumImage({ src, hash }: Props) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="
        aspect-square w-full
        duration-200 
        rounded-lg
      bg-neutral-300 dark:bg-neutral-800
      hover:bg-neutral-200 hover:dark:bg-neutral-700
        hover:ring-2 ring-red-300 animate-pulse
        flex items-center justify-center font-semibold text-3xl"
      >
        FLAC
      </div>
    )
  }
  return (
    <div className="
      aspect-square
      bg-cover overflow-hidden
      rounded-lg 
      hover:ring-2 ring-red-300 
      w-full"
    >
      <img
        src={src}
        onError={() => setHasError(true)}
        className='hidden'
      />
      {hash !== '' &&
        <Blurhash
          mode="css"
          src={src}
          alt={''}
          hash={hash}
          width={300}
          height={300}
        />
      }
    </div>
  )
}