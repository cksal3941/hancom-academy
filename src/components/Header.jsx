import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IoChevronUp, IoChevronDown } from 'react-icons/io5'
import logoImg from '../assets/hancom_logo.png'
import { useAuth } from '../hooks/useAuth'
import { logout } from '../services/authService'
import './Header.css'

const MENU_WIDTH = 200

const navItems = [
  {
    label: '학원소개',
    to: '/about',
    submenu: [
      { label: '한글과컴퓨터학원 소개', to: '/about/intro' },
      { label: '강사진소개', to: '/about/teachers' },
      { label: '수상실적', to: '/about/awards' },
      { label: '오시는길', to: '/about/location' },
    ],
  },
  {
    label: '교육과정',
    to: '/courses',
    submenu: [
      { label: '영재고·과학고 내신', to: '/courses/gifted' },
      { label: '정보올림피아드', to: '/courses/olympiad' },
      { label: 'OA·자격증', to: '/courses/certification' },
    ],
  },
  {
    label: '공지 및 소식',
    to: '/notice',
    submenu: [
      { label: '공지사항', to: '/notice/announcement' },
      { label: '개강소식', to: '/notice/start' },
      { label: '뉴스', to: '/notice/news' },
    ],
  },
  {
    label: '교육설명회',
    to: '/orientation',
    submenu: [
      {
        label: '영재고·과학고 내신 대비',
        href: 'https://www.youtube.com/hancomacademy',
        external: true,
      },
      {
        label: '정보올림피아드',
        href: 'https://www.youtube.com/hancomacademy',
        external: true,
      },
      {
        label: '코딩교육',
        href: 'https://www.youtube.com/hancomacademy',
        external: true,
      },
    ],
  },
]

const zoomUrl = 'https://zoom.us'

export default function Header() {
  const location = useLocation()
  const { user, loading: authLoading } = useAuth()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)
  const isHomePage = location.pathname === '/'
  const isSubPage  = !isHomePage && !isAuthPage
  const [isTop, setIsTop] = useState(true)
  const [slideTheme, setSlideTheme] = useState('dark')
  const [sectionDark, setSectionDark] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)

  const academyRef  = useRef(null)
  const locationRef = useRef(null)
  const footerRef   = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen]   = useState(false)
  const [mobileAccordion, setMobileAccordion]     = useState(null)
  const [indicatorLeft, setIndicatorLeft] = useState(0)
  const [dropdownContentStyle, setDropdownContentStyle] = useState({
    left: 0,
    width: navItems.length * MENU_WIDTH,
  })

  const headerRef = useRef(null)
  const navItemRefs = useRef([])

  const updateDropdownPosition = () => {
    const firstNavItem = navItemRefs.current[0]
    const header = headerRef.current

    if (!firstNavItem || !header) return

    const firstNavRect = firstNavItem.getBoundingClientRect()
    const headerRect = header.getBoundingClientRect()

    setDropdownContentStyle({
      left: firstNavRect.left - headerRect.left,
      width: navItems.length * MENU_WIDTH,
    })
  }

  const updateIndicator = (index) => {
    setIndicatorLeft(index * MENU_WIDTH)
  }

  const handleNavEnter = (index) => {
    updateDropdownPosition()
    setActiveMenu(index)
    updateIndicator(index)
    window.dispatchEvent(new CustomEvent('header-dropdown', { detail: { open: true } }))
  }

  const handleHeaderLeave = () => {
    setActiveMenu(null)
    window.dispatchEvent(new CustomEvent('header-dropdown', { detail: { open: false } }))
  }

  const handleLogout = async () => {
    await logout()
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY === 0)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const handler = (e) => setSlideTheme(e.detail.theme)
    window.addEventListener('header-theme', handler)
    return () => window.removeEventListener('header-theme', handler)
  }, [])

  // 경로 변경 시 DOM 요소 참조 갱신
  useEffect(() => {
    academyRef.current  = document.querySelector('.academy-intro')
    locationRef.current = document.querySelector('.location')
    footerRef.current   = document.querySelector('.footer')
  }, [location.pathname])

  // 스크롤 위치 기반 다크 섹션 감지
  useEffect(() => {
    const check = () => {
      const vh = window.innerHeight
      // 섹션이 뷰포트의 95% 이상을 채웠을 때 전환
      const inSec = (el) => {
        if (!el) return false
        const r = el.getBoundingClientRect()
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0)
        return visible >= vh * 0.95
      }
      const footerEl = footerRef.current
      const footerVisible = footerEl
        ? footerEl.getBoundingClientRect().top < window.innerHeight
        : false
      setSectionDark(inSec(academyRef.current) || inSec(locationRef.current) || footerVisible)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  useEffect(() => {
    updateDropdownPosition()
    window.addEventListener('resize', updateDropdownPosition)

    return () => window.removeEventListener('resize', updateDropdownPosition)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen)
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  const isOpen = activeMenu !== null

  return (
    <header
      ref={headerRef}
      className={[
        'header',
        isSubPage
          ? (isOpen || !isTop
              ? 'header--scrolled'
              : 'header--top header--slide-dark')
          : (isAuthPage || isOpen || !isTop
              ? `header--scrolled${sectionDark ? ' header--slide-dark' : ''}`
              : `header--top header--slide-${slideTheme}`),
        isOpen ? 'header--open' : '',
        isMobileMenuOpen ? 'header--mobile-open' : '',
      ].filter(Boolean).join(' ')}
      onMouseLeave={handleHeaderLeave}
    >
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img src={logoImg} alt="HANCOM Academy" className="header__logo-img" />
        </Link>

        <nav className="header__nav">
          <ul>
            {navItems.map((item, index) => (
              <li
                key={item.to}
                ref={(el) => {
                  navItemRefs.current[index] = el
                }}
                className={`header__nav-item${
                  activeMenu === index ? ' header__nav-item--active' : ''
                }`}
                onMouseEnter={() => handleNavEnter(index)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `header__nav-link${isActive ? ' active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a
            href={zoomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="header__button header__button--outline"
          >
            온라인수업
          </a>

          {!authLoading && (
            user ? (
              <button
                type="button"
                className="header__button header__button--primary"
                onClick={handleLogout}
                title={`${user.displayName || user.email || '회원'} 계정 로그아웃`}
              >
                로그아웃
              </button>
            ) : (
              <Link to="/login" className="header__button header__button--primary">
                로그인
              </Link>
            )
          )}
        </div>

        <button
          type="button"
          className={`header__hamburger${isMobileMenuOpen ? ' header__hamburger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(v => !v)}
          aria-label="메뉴 열기"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`header__dropdown${isOpen ? ' header__dropdown--visible' : ''}`}>
          <div className="header__dropdown-content" style={dropdownContentStyle}>
            <span
              className="header__dropdown-indicator"
              style={{ transform: `translateX(${indicatorLeft}px)` }}
            />

            {navItems.map((item, index) => (
              <div
                key={item.to}
                className={`header__submenu-column${
                  activeMenu === index ? ' header__submenu-column--active' : ''
                }`}
                onMouseEnter={() => handleNavEnter(index)}
              >
                <ul>
                  {item.submenu.map((sub, subIndex) => (
                    <li key={subIndex} className="header__submenu-item">
                      {sub.external ? (
                        <a
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="header__submenu-link"
                        >
                          {sub.label}
                          <i className="fas fa-external-link-alt header__submenu-ext" />
                        </a>
                      ) : (
                        <NavLink
                          to={sub.to}
                          className={({ isActive }) =>
                            `header__submenu-link${isActive ? ' active' : ''}`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      {isMobileMenuOpen && (
        <nav className="header__mobile-menu">
          <div className="header__mobile-nav">
            {navItems.map((item, index) => {
              const open = mobileAccordion === index
              return (
                <div key={item.to} className="header__mobile-group">
                  <button
                    type="button"
                    className={`header__mobile-parent${open ? ' header__mobile-parent--open' : ''}`}
                    onClick={() => setMobileAccordion(prev => prev === index ? null : index)}
                  >
                    <span>{item.label}</span>
                    {open ? <IoChevronUp /> : <IoChevronDown />}
                  </button>
                  <div className={`header__mobile-children${open ? ' header__mobile-children--open' : ''}`}>
                    <div className="header__mobile-children-inner">
                      {item.submenu?.map(sub => (
                        sub.external ? (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="header__mobile-sublink"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className="header__mobile-sublink"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </NavLink>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="header__mobile-bottom">
            {!authLoading && (
              user ? (
                <button
                  type="button"
                  className="header__mobile-bottom-link"
                  onClick={handleLogout}
                >
                  {user.displayName ? `${user.displayName}님 로그아웃` : '로그아웃'}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="header__mobile-bottom-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  로그인
                </Link>
              )
            )}
            <a
              href={zoomUrl}
              className="header__mobile-bottom-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              온라인수업 입장
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
