import { Link } from 'react-router-dom'
import SearchButton from './SearchButton'
import ThemeToggler from './ThemeToggler'

export default function Navbar() {


  return (
    <div className="
      flex flex-row 
      pl-6 py-2 
      border-b dark:border-neutral-600
      w-full 
      justify-between items-center"
    >
      <Link
        to="/"
        className="font-semibold hover:text-blue-400 duration-200 select-none"
      >
        Mille
      </Link>

      <></>

      <div className='flex gap-1'>
        <SearchButton />
        <ThemeToggler className='mr-2' />
      </div>
    </div>
  )
}