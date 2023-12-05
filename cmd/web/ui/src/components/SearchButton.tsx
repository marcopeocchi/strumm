import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function SearchButton() {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      e.preventDefault()
      navigate(`/search/${search.trim()}`)
      setOpen(false)
    }
  }

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <button
        className="border dark:border-neutral-700 rounded-lg p-1.5"
        onClick={() => setOpen(state => !state)}
      >
        <Search size={16} />
      </button>
      <div className={`
        flex gap-1
        items-center
        justify-center
        rounded-lg
        bg-neutral-100 dark:bg-neutral-800
        py-1 px-3 w-full
        text-neutral-600 dark:text-neutral-200 text-sm
        border dark:border-neutral-700
        transition duration-150 ease-in-out
        !visible
        ${!open && 'hidden'}
      `}>
        <input
          placeholder="Search album or artist"
          type="text"
          className="
            appearance-none 
            text-center 
            bg-transparent 
            w-full 
            focus:outline-0"
          onChange={e => setSearch(e.currentTarget.value)}
          onKeyUp={onEnterPressed}
        />
      </div>
    </>
  )
}