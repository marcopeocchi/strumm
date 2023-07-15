import { Shuffle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Album } from '../types'
import { getHTTPEndpoint } from '../utils/url'
import Sidebar from './Sidebar'

export default function NavigateRandom() {
  const navigate = useNavigate()

  const navigateToAlbum = () => {
    fetch(`${getHTTPEndpoint()}/api/album/random`)
      .then(res => res.json())
      .then((data: Album) => navigate(`/album/${data.id}`))
  }

  return (
    <Sidebar.Action icon={<Shuffle size={16} />} onClick={navigateToAlbum}>
      Random
    </Sidebar.Action>
  )
}