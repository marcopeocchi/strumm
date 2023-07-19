import { useEffect, useState } from 'react'
import { Album } from '../../types'
import { getHTTPEndpoint } from '../../utils/url'
import Image from './Image'

type Props = Omit<React.ComponentProps<typeof Image>, 'src'> & {
  albumId?: number
}

const RemoteImage: React.FC<Props> = (props) => {
  const [src, setSrc] = useState<string>()

  const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data: Album = await res.json()
    return `${getHTTPEndpoint()}/static/img/${data.picture}`
  }

  useEffect(() => {
    fetcher(`${getHTTPEndpoint()}/api/album/search/id/${props.albumId}`)
      .then(setSrc)
  }, [props.albumId])

  if (!src || !props.albumId) {
    return null
  }

  return (
    <Image
      className={props.className}
      blurhash={props.blurhash}
      rounded={props.rounded}
      size={props.size}
      src={src}
    />
  )
}

export default RemoteImage