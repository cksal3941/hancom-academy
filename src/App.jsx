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
      once: true,
      mirror: false,
      offset: 80,
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    AOS.refresh()
  }, [location.pathname])

  // 모바일 하단 고정 퀵바 높이만큼 페이지 하단 여백 확보 (index.css 참조)
  useEffect(() => {
    document.body.classList.toggle('has-quickbar', !isAuthPage)
    return () => document.body.classList.remove('has-quickbar')
  }, [isAuthPage])

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
