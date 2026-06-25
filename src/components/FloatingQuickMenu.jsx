import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BsTelephoneFill } from 'react-icons/bs'
import { IoChatbubbleEllipses } from 'react-icons/io5'
import { FaInstagram } from 'react-icons/fa'
import quickMenuData from '../data/quickMenuData'
import './FloatingQuickMenu.css'

const ICONS = {
  phone:     <BsTelephoneFill />,
  chatbot:   <IoChatbubbleEllipses />,
  instagram: <FaInstagram />,
  blog:      <span className="fqm__blog-n">N</span>,
}

export default function FloatingQuickMenu({ mobileOnly = false }) {
  const [hidden, setHidden]         = useState(false)
  const [academy, setAcademy]       = useState(false)
  const [location, setLocation]     = useState(false)
  const [inVisual, setInVisual]     = useState(false)
  const [slideTheme, setSlideTheme] = useState(
    () => window.__slideTheme || 'light',
  )

  const footerRef   = useRef(null)
  const academyRef  = useRef(null)
  const locationRef = useRef(null)
  const visualRef   = useRef(null)

  const { pathname } = useLocation()

  // 경로가 바뀔 때마다 DOM 요소 참조를 갱신 (SPA 내비게이션 대응)
  useEffect(() => {
    footerRef.current   = document.querySelector('.footer')
    academyRef.current  = document.querySelector('.academy-intro')
    locationRef.current = document.querySelector('.location')
    visualRef.current   = document.querySelector('.main-visual')
    // 갱신된 ref로 즉시 위치 체크를 실행
    window.dispatchEvent(new Event('scroll'))
  }, [pathname])

  useEffect(() => {
    const check = () => {
      const footerEl   = footerRef.current
      const academyEl  = academyRef.current
      const locationEl = locationRef.current
      const visualEl   = visualRef.current

      const vh = window.innerHeight

      if (footerEl) {
        const r = footerEl.getBoundingClientRect()
        setHidden(r.top < vh * 0.95)
      }

      // 섹션이 뷰포트의 95% 이상을 채웠을 때 전환
      const inSec = (el) => {
        if (!el) return false
        const r = el.getBoundingClientRect()
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0)
        return visible >= vh * 0.95
      }
      setAcademy(inSec(academyEl))
      setLocation(inSec(locationEl))

      if (visualEl) {
        const r = visualEl.getBoundingClientRect()
        setInVisual(r.bottom > 0 && r.top < vh)
      } else {
        setInVisual(false)
      }
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })

    const onTheme = (e) => setSlideTheme(e.detail.theme)
    window.addEventListener('header-theme', onTheme)

    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      window.removeEventListener('header-theme', onTheme)
    }
  }, [])

  const slideDark = inVisual && slideTheme === 'dark'

  return (
    <aside
      className={[
        'fqm',
        mobileOnly                         ? 'fqm--mobile-only' : '',
        hidden                             ? 'fqm--hidden'     : '',
        academy || location                ? 'fqm--academy'    : '',
        inVisual && !academy && !location  ? 'fqm--visual'     : '',
        slideDark && !academy && !location ? 'fqm--slide-dark' : '',
      ].filter(Boolean).join(' ')}
      aria-label="퀵메뉴"
    >
      {quickMenuData.map(item => (
        <a
          key={item.id}
          href={item.href}
          className="fqm__item"
          aria-label={item.label}
          {...(item.href !== '#' && !item.href.startsWith('tel')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          <span className="fqm__icon">{ICONS[item.type]}</span>
          <span className="fqm__label">{item.label}</span>
        </a>
      ))}
    </aside>
  )
}
