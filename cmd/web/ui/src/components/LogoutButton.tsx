import { LogOut } from 'lucide-react'
import { hostFmt } from '../utils/url'

interface Props extends React.BaseHTMLAttributes<HTMLBaseElement> { }

const LogoutButton: React.FC<Props> = ({ className }) => {
  const logout = async () => {
    const res = await fetch(hostFmt`/logout`)
    if (res.ok) {
      window.location.reload()
    }
  }

  return (
    <button
      className={`
        border 
        dark:border-neutral-700 
        rounded-lg 
        p-1.5 ${className}`
      }
      onClick={logout}
    >
      <LogOut size={16} />
    </button>
  )
}

export default LogoutButton