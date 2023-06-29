import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from './views/Home'
import Album from './views/Album'
import Songs from './views/Songs'
import Artists from './views/Artists'
import Albums from './views/Albums'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: () => <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/album/:id',
        element: <Album />
      },
      {
        path: '/songs',
        element: <Songs />
      },
      {
        path: '/albums',
        element: <Albums />
      },
      {
        path: '/artists',
        element: <Artists />
      },
    ]
  },
])