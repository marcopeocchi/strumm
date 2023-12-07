import { Link } from 'react-router-dom'
import SearchButton from './SearchButton'
import ThemeToggler from './ThemeToggler'
import LogoutButton from './LogoutButton'

export default function Navbar() {
  return (
    <div className="
      flex flex-row 
      pl-6 py-2 
      border-b dark:border-neutral-700
      w-full 
      justify-between items-center"
    >
      <Link
        to="/"
        className="font-semibold hover:text-red-400 duration-200 select-none"
      >
        Strumm
      </Link>

      <></>

      <div className='flex gap-1'>
        <SearchButton />
        <ThemeToggler />
        <LogoutButton className='mr-2' />
      </div>
    </div>
  )
}