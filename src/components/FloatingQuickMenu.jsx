import { useEffect, useState } from 'react'
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

  useEffect(() => {
    let footerEl   = null
    let academyEl  = null
    let locationEl = null
    let visualEl   = null

    const init = () => {
      footerEl   = document.querySelector('.footer')
      academyEl  = document.querySelector('.academy-intro')
      locationEl = document.querySelector('.location')
      visualEl   = document.querySelector('.main-visual')
    }

    const check = () => {
      if (!footerEl) init()

      const vh = window.innerHeight
      const cx = vh / 2

      if (footerEl) {
        const r = footerEl.getBoundingClientRect()
        setHidden(r.top < vh * 0.95)
      }

      // 섹션 중심이 뷰포트 중앙을 지나칠 때 활성
      const inSec = (el) => {
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top < cx && r.bottom > cx
      }
      setAcademy(inSec(academyEl))
      setLocation(inSec(locationEl))

      if (visualEl) {
        const r = visualEl.getBoundingClientRect()
        setInVisual(r.bottom > 0 && r.top < vh)
      }
    }

    init()
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
