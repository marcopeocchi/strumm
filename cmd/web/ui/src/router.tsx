import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from './views/Home'
import Album from './views/Album'

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
    ]
  },
])