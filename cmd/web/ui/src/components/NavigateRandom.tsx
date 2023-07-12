import { Shuffle } from 'lucide-react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import { getHTTPEndpoint } from '../utils/url'
import { Album } from '../types'

export default function NavigateRandom() {
  const navigate = useNavigate()

  const navigateToRandomAlbum = () => {
    fetch(`${getHTTPEndpoint()}/api/album/random`)
      .then(res => res.json())
      .then((data: Album) => navigate(`/album/${data.id}`))
  }

  return (
    <Sidebar.Action icon={<Shuffle size={16} />} onClick={navigateToRandomAlbum}>
      Random
    </Sidebar.Action>
  )
}