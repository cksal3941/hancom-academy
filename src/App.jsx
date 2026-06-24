import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingQuickMenu from './components/FloatingQuickMenu'
import TopButton from './components/TopButton'

export default function App() {
  const location = useLocation()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)
  const isSubPage = location.pathname !== '/'

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: false,   // 요소가 보일 때마다 재실행. true로 바꾸면 최초 1회만 실행
      mirror: false,
      offset: 80,
    })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [location])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {!isAuthPage && <FloatingQuickMenu mobileOnly={isSubPage} />}
      {!isAuthPage && <TopButton />}
    </>
  )
}
