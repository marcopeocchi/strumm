import { Search } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="flex flex-row pl-6 py-2 border-b w-full justify-between items-center">
      <div className="font-semibold hover:text-amber-500 duration-300 select-none">
        Mille
      </div>
      <div className="
        flex gap-1
        items-center
        justify-center
        rounded-xl 
      bg-neutral-100
        py-1.5 px-3 w-1/4
      text-neutral-600 text-sm"
      >
        <Search size={14} />
        <input placeholder="Search" type="text" className="appearance-none text-center bg-transparent" />
      </div>
      <div />
    </div>
  )
}