import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import ComingSoonPage from './pages/ComingSoonPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'opening-news', element: <ComingSoonPage /> },
      { path: 'opening-news/*', element: <ComingSoonPage /> },
      { path: 'notice', element: <ComingSoonPage /> },
      { path: 'notice/*', element: <ComingSoonPage /> },
      { path: 'news', element: <ComingSoonPage /> },
      { path: 'news/*', element: <ComingSoonPage /> },
      { path: '*', element: <ComingSoonPage /> },
    ],
  },
])

export default router
