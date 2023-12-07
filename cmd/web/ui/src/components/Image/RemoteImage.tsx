import useFetch from '../../hooks/useFetch'
import { Album } from '../../types'
import { hostFmt } from '../../utils/url'
import Image from './Image'

type Props = Omit<React.ComponentProps<typeof Image>, 'src'> & {
  albumId?: number
}

const RemoteImage: React.FC<Props> = (props) => {
  const { data } = useFetch<Album>(hostFmt`/api/album/id/${props.albumId}`)

  if (!data || !props.albumId) {
    return null
  }

  return (
    <Image
      className={props.className}
      blurhash={props.blurhash}
      rounded={props.rounded}
      size={props.size}
      src={hostFmt`/static/img/${data.picture}`}
    />
  )
}

export default RemoteImage