import { Loader as LoaderIcon } from 'lucide-react'

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className='animate-spin'>
        <LoaderIcon />
      </div>
    </div>
  )
}