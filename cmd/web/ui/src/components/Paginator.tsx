type Props = {
  pages: number
  setPage: (page: number) => void
}

export default function Paginator({ pages, setPage }: Props) {
  return (
    <div className="flex flex-row justify-center pb-28">
      {[...Array(pages).keys()].map(page => (
        <span
          onClick={() => {
            setPage(page + 1)
            window.scrollTo(0, 0)
          }}
          className={`
            py-1.5 px-2.5 bg-blue-500 text-neutral-100 border-x border-blue-600/20
            cursor-pointer
            hover:bg-blue-400 duration-100
            ${page === 0 && 'rounded-l-lg'}
            ${page === pages - 1 && 'rounded-r-lg'}
        `}>
          {page + 1}
        </span>
      ))}
    </div>
  )
}