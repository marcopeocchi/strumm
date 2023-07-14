import { useEffect, useMemo, useRef, useState } from 'react'
import * as blurhash from 'blurhash-wasm'

type Props = {
  src: string
  hash: string
}

export default function AlbumImage({ src, hash }: Props) {
  const [hasError, setHasError] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const data = useMemo(() => blurhash.decode(hash, 250, 150), [])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data) return

    const ctx = canvasRef.current.getContext('2d')
    const pixels = new Uint8ClampedArray(data.buffer)
    const imageData = new ImageData(pixels, 250, 150)

    ctx?.putImageData(imageData, 0, 0)

    console.log('d')

  }, [canvasRef.current, data])

  if (hasError) {
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
  return (
    <div className="
      aspect-square
      bg-cover overflow-hidden
      rounded-lg 
      hover:ring-2 ring-blue-300"
    >
      {(!hasLoaded && !hasError) &&
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      }
      <img
        className={`
          aspect-square
          duration-100 
          hover:scale-105
          ${!hasLoaded && 'hidden'}`
        }
        src={src}
        loading='lazy'
        onLoad={() => setHasLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}