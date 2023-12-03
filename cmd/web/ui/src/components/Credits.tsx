import { Github } from 'lucide-react'

type Props = {
  className?: string
}

const Credits: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <a
        href="https://github.com/marcopeocchi/github.com/marcopeocchi/strumm"
        className="
          text-xs 
          text-neutral-700 dark:text-neutral-300
          flex items-center 
          underline"
      >
        <Github size={16} /> github.com/marcopeocchi/strumm
      </a>
    </div>
  )
}

export default Credits