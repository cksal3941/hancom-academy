import { useEffect, useRef, useState } from 'react'
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

export default function FloatingQuickMenu() {
  const [hidden, setHidden]         = useState(false)
  const [academy, setAcademy]       = useState(false)
  const [location, setLocation]     = useState(false)
  const [inVisual, setInVisual]     = useState(false) // MainVisual 영역 진입 여부
  const [slideTheme, setSlideTheme] = useState('light') // 슬라이드 테마
  const footerRef                   = useRef(null)
  const academyRef                  = useRef(null)
  const locationRef                 = useRef(null)
  const visualRef                   = useRef(null)

  useEffect(() => {
    footerRef.current   = document.querySelector('.footer')
    academyRef.current  = document.querySelector('.academy-intro')
    locationRef.current = document.querySelector('.location')
    visualRef.current   = document.querySelector('.main-visual')

    const observers = []

    if (footerRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => setHidden(entry.isIntersecting),
        { threshold: 0.05 }
      )
      obs.observe(footerRef.current)
      observers.push(obs)
    }

    if (academyRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => setAcademy(entry.isIntersecting),
        { threshold: 0.1 }
      )
      obs.observe(academyRef.current)
      observers.push(obs)
    }

    if (locationRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => setLocation(entry.isIntersecting),
        { threshold: 0.1 }
      )
      obs.observe(locationRef.current)
      observers.push(obs)
    }

    if (visualRef.current) {
      const obs = new IntersectionObserver(
        ([entry]) => setInVisual(entry.isIntersecting),
        { threshold: 0.1 }
      )
      obs.observe(visualRef.current)
      observers.push(obs)
    }

    const onTheme = (e) => setSlideTheme(e.detail.theme)
    window.addEventListener('header-theme', onTheme)

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('header-theme', onTheme)
    }
  }, [])

  const slideDark = inVisual && slideTheme === 'dark'

  return (
    <aside
      className={[
        'fqm',
        hidden                        ? 'fqm--hidden'     : '',
        academy || location           ? 'fqm--academy'    : '',
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
