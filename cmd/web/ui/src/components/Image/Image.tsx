import { useState } from "react"
import { Blurhash } from "react-blurhash-as"
import FallbackImage from "./FallbackImage"
import { Disc3 } from "lucide-react"
import clsx from "clsx"

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'mini' | 'full'
  rounded?: boolean
  blurhash?: string,
}

const Image: React.FC<Props> = ({
  src,
  size,
  rounded,
  blurhash,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <FallbackImage size={size ?? 'full'} rounded={rounded}>
        <Disc3 size={size === 'mini' ? 32 : 96} />
      </FallbackImage>
    )
  }
  return (
    <div className={clsx(
      'aspect-square bg-cover',
      size === 'full' ? 'sm:w-64 sm:h-64' : 'w-full h-full',
      size === 'mini' ? 'sm:w-16 sm:h-16' : 'w-full h-full',
      rounded && 'rounded',
      className
    )}>
      {blurhash ?
        <>
          <img
            src={src}
            onLoad={() => setHasError(false)}
            onError={() => setHasError(true)}
            className='hidden'
            {...props}
          />
          <Blurhash
            mode="css"
            src={src ?? ''}
            alt={props.alt ?? ''}
            hash={blurhash!}
            width={Number(props.width) || 300}
            height={Number(props.height) || 300}
          />
        </> :
        <img
          src={src}
          className={`w-full h-full ${rounded && 'rounded'}`}
          onLoad={() => setHasError(false)}
          onError={() => setHasError(true)}
        />
      }
    </div>
  )
}

export default Image