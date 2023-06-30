import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [search, setSearch] = useState('')

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      e.preventDefault()
      navigate(`/search/${search.trim()}`)
    }
  }

  const navigate = useNavigate()

  return (
    <div className="flex flex-row pl-6 py-2 border-b dark:border-neutral-600 w-full justify-between items-center">
      <Link
        to="/"
        className="font-semibold hover:text-blue-400 duration-200 select-none"
      >
        Mille
      </Link>
      <div className="
        flex gap-1
        items-center
        justify-center
        rounded-lg
      bg-neutral-100 dark:bg-neutral-800
        py-1.5 px-3 w-1/4
      text-neutral-600 dark:text-neutral-200 text-sm"
      >
        <input
          placeholder="Search album or artist"
          type="text"
          className="appearance-none text-center bg-transparent w-full focus:outline-0"
          onChange={e => setSearch(e.currentTarget.value)}
          onKeyUp={onEnterPressed}
        />
      </div>
      <div />
    </div>
  )
}