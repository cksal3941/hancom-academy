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
import OpeningNoticePage from './pages/OpeningNoticePage'
import NoticeWritePage from './pages/NoticeWritePage'
import NoticeEditPage from './pages/NoticeEditPage'
import OpeningNoticeWritePage from './pages/OpeningNoticeWritePage'
import OpeningNoticeDetailPage from './pages/OpeningNoticeDetailPage'
import NewsPage from './pages/NewsPage'
import NewsWritePage from './pages/NewsWritePage'
import NewsDetailPage from './pages/NewsDetailPage'
import NewsEditPage from './pages/NewsEditPage'

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
      { path: 'notice/start', element: <OpeningNoticePage /> },
      { path: 'notice/start/write', element: <OpeningNoticeWritePage /> },
      { path: 'notice/start/:openingNoticeId', element: <OpeningNoticeDetailPage /> },
      { path: 'notice/write', element: <NoticeWritePage /> },
      { path: 'notice/news', element: <NewsPage /> },
      { path: 'notice/news/write', element: <NewsWritePage /> },
      { path: 'notice/news/:newsId', element: <NewsDetailPage /> },
      { path: 'notice/news/:newsId/edit', element: <NewsEditPage /> },
      { path: 'notice/:noticeId', element: <NoticeDetailPage /> },
      { path: 'notice/:noticeId/edit', element: <NoticeEditPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/write', element: <NewsWritePage /> },
      { path: 'news/:newsId', element: <NewsDetailPage /> },
      { path: 'news/:newsId/edit', element: <NewsEditPage /> },
      { path: '*', element: <ComingSoonPage /> },
    ],
  },
])

export default router
