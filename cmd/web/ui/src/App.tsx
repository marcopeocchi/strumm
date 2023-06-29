import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './store/redux'

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}