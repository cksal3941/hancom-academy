import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import ComingSoonPage from './pages/ComingSoonPage'
import SignUpPage from './pages/SignUpPage'
import AboutPage from './pages/AboutPage'
import TeachersPage from './pages/TeachersPage'

const LoginPage = lazy(() => import('./pages/LoginPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'login',
        element: (
          <Suspense fallback={null}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      { path: 'about', element: <AboutPage /> },
      { path: 'about/intro', element: <AboutPage /> },
      { path: 'about/teachers', element: <TeachersPage /> },
      { path: 'about/awards', element: <ComingSoonPage /> },
      { path: 'about/location', element: <ComingSoonPage /> },
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
