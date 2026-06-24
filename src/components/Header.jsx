import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../assets/hancom_logo.png'
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
  const [isTop, setIsTop] = useState(true)
  const [slideTheme, setSlideTheme] = useState('dark')
  const [activeMenu, setActiveMenu] = useState(null)
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
  }

  const handleHeaderLeave = () => {
    setActiveMenu(null)
  }

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY === 0)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => setSlideTheme(e.detail.theme)
    window.addEventListener('header-theme', handler)
    return () => window.removeEventListener('header-theme', handler)
  }, [])

  useEffect(() => {
    updateDropdownPosition()
    window.addEventListener('resize', updateDropdownPosition)

    return () => window.removeEventListener('resize', updateDropdownPosition)
  }, [])

  const isOpen = activeMenu !== null

  return (
    <header
      ref={headerRef}
      className={[
        'header',
        isOpen || !isTop ? 'header--scrolled' : `header--top header--slide-${slideTheme}`,
        isOpen ? 'header--open' : '',
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

          <Link to="/login" className="header__button header__button--primary">
            로그인
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="header__dropdown">
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
      )}
    </header>
  )
}