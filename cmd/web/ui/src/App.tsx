import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { router } from './router'

export default function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}