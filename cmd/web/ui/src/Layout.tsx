import {
  Disc3,
  LayoutGrid,
  Mic2,
  Music2,
  ServerCog,
  Settings
} from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import NavigateRandom from './components/NavigateRandom'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import ThemeLoader from './loaders/ThemeLoader'
import Credits from './components/Credits'
import Queue from './components/Queue'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <main className="
      bg-white dark:bg-black 
      text-neutral-900 dark:text-neutral-100 
      h-screen"
    >
      <ThemeLoader>
        <Navbar />
        <div className="flex flex-row">
          <Sidebar.Container>
            <Sidebar.Section title="Discover">
              <NavigateRandom />
              <Link to="/">
                <Sidebar.Action
                  icon={<LayoutGrid size={16} />}
                  active={pathname === '/'}
                >
                  Explore
                </Sidebar.Action>
              </Link>
            </Sidebar.Section>
            <Sidebar.Section title="Library">
              <Link to="/albums">
                <Sidebar.Action
                  icon={<Disc3 size={16} />}
                  active={pathname === '/albums'}
                >
                  Albums
                </Sidebar.Action>
              </Link>
              <Link to="/artists">
                <Sidebar.Action
                  icon={<Mic2 size={16} />}
                  active={pathname === '/artists'}
                >
                  Artists
                </Sidebar.Action>
              </Link>
              <Link to="/songs">
                <Sidebar.Action
                  icon={<Music2 size={16} />}
                  active={pathname === '/songs'}
                >
                  Songs
                </Sidebar.Action>
              </Link>
            </Sidebar.Section>
            <Sidebar.Section title="Settings">
              <Link to="/settings">
                <Sidebar.Action
                  icon={<Settings size={16} />}
                >
                  Client settings
                </Sidebar.Action>
              </Link>
              <Sidebar.Action
                icon={<ServerCog size={16} />}
              >
                Server settings
              </Sidebar.Action>
            </Sidebar.Section>
            <Credits className='p-6 h-full flex items-end' />
          </Sidebar.Container>
          <div className="
            w-full 
            md:w-5/6 
            h-[calc(100vh-3.15rem)] 
            overflow-auto overflow-x-hidden"
          >
            <Outlet />
          </div>
          <Queue />
        </div>
        <Player />
      </ThemeLoader>
    </main>
  )
}
