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
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <main className='bg-white dark:bg-black text-neutral-900 dark:text-neutral-50 h-screen'>
      <Navbar />
      <div className='flex flex-row'>
        <Sidebar.Container>
          <Sidebar.Section title="Discover">
            <Sidebar.Action icon={<Shuffle size={16} />}>
              Random
            </Sidebar.Action>
            <Sidebar.Action icon={<LayoutGrid size={16} />}>
              Explore
            </Sidebar.Action>
          </Sidebar.Section>
          <Sidebar.Section title="Library">
            <Link to="/albums">
              <Sidebar.Action icon={<Disc3 size={16} />}>
                Albums
              </Sidebar.Action>
            </Link>
            <Link to="/artists">
              <Sidebar.Action icon={<Mic2 size={16} />}>
                Artists
              </Sidebar.Action>
            </Link>
            <Link to="/songs">
              <Sidebar.Action icon={<Music2 size={16} />}>
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
