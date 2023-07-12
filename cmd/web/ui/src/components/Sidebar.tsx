namespace Sidebar {
  type ContainerProps = {
    children: React.ReactNode
  }

  export function Container({ children }: ContainerProps) {
    return (
      <div className="
        border-r 
        dark:border-neutral-600 
        hidden 
        sm:flex md:w-1/6 
        h-[calc(100vh-3rem)] 
        py-2 
        flex-col
        overflow-auto"
      >
        {children}
      </div>
    )
  }

  type SectionProps = {
    title: string
    children: React.ReactNode
  }

  export function Section({ title, children }: SectionProps) {
    return (
      <div className="flex flex-col p-4 w-full">
        <div className="text-lg font-semibold pl-3 pb-2 select-none">
          {title}
        </div>
        <div className="flex flex-col justify-center gap-1">
          {children}
        </div>
      </div>
    )
  }

  type ActionProps = {
    icon?: React.ReactNode
    active?: boolean
    children: React.ReactNode
    onClick?: () => void
  }

  export function Action({ icon, active, children, onClick }: ActionProps) {
    return (
      <button className={`
        rounded px-3 py-1.5 
        hover:bg-neutral-200 
        hover:dark:bg-neutral-700
        hover:duration-150
        hover:cursor-pointer
        select-none
        w-full
        h-10 flex items-center
        ${active && 'bg-neutral-200 dark:bg-neutral-700'}`}
        onClick={onClick}
      >
        <div className="flex gap-2 items-center">
          {icon}
          {children}
        </div>
      </button>
    )
  }
}

export default Sidebar