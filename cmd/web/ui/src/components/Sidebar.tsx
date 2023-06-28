namespace Sidebar {
  type ContainerProps = {
    children: React.ReactNode
  }

  export function Container({ children }: ContainerProps) {
    return (
      <div className="border-r hidden sm:flex md:w-1/5 min-h-full py-2 flex-col">
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
  }

  export function Action({ icon, active, children }: ActionProps) {
    return (
      <div className={`
        rounded px-3 py-1.5 
        hover:bg-neutral-200 
        hover:duration-150
        hover:cursor-pointer
        select-none
        w-full
        h-10 flex items-center
        ${active && 'bg-neutral-200'}`
      }>
        <div className="flex gap-2 items-center">
          {icon}
          {children}
        </div>
      </div>
    )
  }
}

export default Sidebar