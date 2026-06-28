import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import ComingSoonPage from './pages/ComingSoonPage'
import SignUpPage from './pages/SignUpPage'
import AboutPage from './pages/AboutPage'
import TeachersPage from './pages/TeachersPage'
import AwardsPage from './pages/AwardsPage'
import LocationPage from './pages/LocationPage'
import NoticePage from './pages/NoticePage'
import NoticeDetailPage from './pages/NoticeDetailPage'

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
      { path: 'about/awards', element: <AwardsPage /> },
      { path: 'about/location', element: <LocationPage /> },
      { path: 'opening-news', element: <ComingSoonPage /> },
      { path: 'opening-news/*', element: <ComingSoonPage /> },
      { path: 'notice', element: <NoticePage /> },
      { path: 'notice/announcement', element: <NoticePage /> },
      { path: 'notice/start', element: <ComingSoonPage /> },
      { path: 'notice/news', element: <ComingSoonPage /> },
      { path: 'notice/:noticeId', element: <NoticeDetailPage /> },
      { path: 'news', element: <ComingSoonPage /> },
      { path: 'news/*', element: <ComingSoonPage /> },
      { path: '*', element: <ComingSoonPage /> },
    ],
  },
])

export default router
