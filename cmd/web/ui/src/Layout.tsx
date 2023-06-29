import Bottom from './components/Bottom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {
  LayoutGrid,
  Shuffle,
  Disc3,
  Mic2,
  Music2,
  Settings,
  ServerCog,
} from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <main className='bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 h-screen'>
      <Navbar />
      <div className='flex flex-row'>
        <Sidebar.Container>
          <Sidebar.Section title="Discover">
            <Sidebar.Action icon={<Shuffle size={16} />}>
              Random
            </Sidebar.Action>
            <Link to="/">
              <Sidebar.Action icon={<LayoutGrid size={16} />} active={pathname === '/'}>
                Explore
              </Sidebar.Action>
            </Link>
          </Sidebar.Section>
          <Sidebar.Section title="Library">
            <Link to="/albums">
              <Sidebar.Action icon={<Disc3 size={16} />} active={pathname === '/albums'}>
                Albums
              </Sidebar.Action>
            </Link>
            <Link to="/artists">
              <Sidebar.Action icon={<Mic2 size={16} />} active={pathname === '/artists'}>
                Artists
              </Sidebar.Action>
            </Link>
            <Link to="/songs">
              <Sidebar.Action icon={<Music2 size={16} />} active={pathname === '/songs'}>
                Songs
              </Sidebar.Action>
            </Link>
          </Sidebar.Section>
          <Sidebar.Section title="Settings">
            <Sidebar.Action icon={<Settings size={16} />}>
              Client settings
            </Sidebar.Action>
            <Sidebar.Action icon={<ServerCog size={16} />}>
              Server settings
            </Sidebar.Action>
          </Sidebar.Section>
        </Sidebar.Container>
        <div className="
          w-full 
          md:w-5/6 
          h-[calc(100vh-3.15rem)] 
          overflow-scroll overflow-x-hidden"
        >
          <Outlet />
        </div>
      </div>
      <Bottom />
    </main>
  )
}
