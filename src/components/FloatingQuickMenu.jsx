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
  const [hidden, setHidden]         = useState(false) // Footer 진입 시 숨김
  const [academy, setAcademy]       = useState(false) // AcademyIntroSection 진입 시 색상 변경
  const footerRef                   = useRef(null)
  const academyRef                  = useRef(null)

  useEffect(() => {
    footerRef.current  = document.querySelector('.footer')
    academyRef.current = document.querySelector('.academy-intro')

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

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <aside
      className={[
        'fqm',
        hidden  ? 'fqm--hidden'  : '',
        academy ? 'fqm--academy' : '',
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
