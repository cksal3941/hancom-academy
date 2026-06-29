import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BsTelephoneFill } from 'react-icons/bs'
import {
  IoChatbubbleEllipses,
  IoClose,
  IoLocationOutline,
  IoSend,
} from 'react-icons/io5'
import { FaInstagram } from 'react-icons/fa'
import { SiNaver } from 'react-icons/si'
import quickMenuData from '../data/quickMenuData'
import './FloatingQuickMenu.css'

const ICONS = {
  phone: <BsTelephoneFill />,
  chatbot: <IoChatbubbleEllipses />,
  instagram: <FaInstagram />,
  blog: <SiNaver size={18} />,
}

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: '안녕하세요. 한글과 컴퓨터 학원 챗봇입니다. 궁금한 내용을 남겨주시면 상담 연결을 도와드릴게요.',
  },
]

export default function FloatingQuickMenu({ mobileOnly = false }) {
  const [hidden, setHidden] = useState(false)
  const [academy, setAcademy] = useState(false)
  const [location, setLocation] = useState(false)
  const [inVisual, setInVisual] = useState(false)
  const [slideTheme, setSlideTheme] = useState(
    () => window.__slideTheme || 'light',
  )
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatText, setChatText] = useState('')
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  const footerRef = useRef(null)
  const academyRef = useRef(null)
  const locationRef = useRef(null)
  const visualRef = useRef(null)
  const inputRef = useRef(null)

  const { pathname } = useLocation()

  useEffect(() => {
    footerRef.current = document.querySelector('.footer')
    academyRef.current = document.querySelector('.academy-intro')
    locationRef.current = document.querySelector('.location')
    visualRef.current = document.querySelector('.main-visual')
    window.dispatchEvent(new Event('scroll'))
  }, [pathname])

  useEffect(() => {
    const check = () => {
      const footerEl = footerRef.current
      const academyEl = academyRef.current
      const locationEl = locationRef.current
      const visualEl = visualRef.current

      const vh = window.innerHeight

      if (footerEl) {
        const r = footerEl.getBoundingClientRect()
        setHidden(r.top < vh * 0.95)
      }

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
    const onDropdown = (e) => setDropdownOpen(e.detail.open)
    window.addEventListener('header-theme', onTheme)
    window.addEventListener('header-dropdown', onDropdown)

    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      window.removeEventListener('header-theme', onTheme)
      window.removeEventListener('header-dropdown', onDropdown)
    }
  }, [])

  useEffect(() => {
    if (!chatOpen) return undefined

    inputRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setChatOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [chatOpen])

  const handleChatSubmit = (event) => {
    event.preventDefault()

    const trimmed = chatText.trim()
    if (!trimmed) return

    const nextId = Date.now()
    setMessages((current) => [
      ...current,
      { id: nextId, sender: 'user', text: trimmed },
      {
        id: nextId + 1,
        sender: 'bot',
        text: '문의가 접수되었습니다. 빠른 상담은 전화 문의를 이용해 주세요.',
      },
    ])
    setChatText('')
  }

  const handleQuickMenuClick = (event, item) => {
    if (item.action !== 'chatbot') return

    event.preventDefault()
    setChatOpen((open) => !open)
  }

  const slideDark = inVisual && slideTheme === 'dark'

  return (
    <>
      <aside
        className={[
          'fqm',
          mobileOnly ? 'fqm--mobile-only' : '',
          hidden || dropdownOpen ? 'fqm--hidden' : '',
          academy || location ? 'fqm--academy' : '',
          inVisual && !academy && !location ? 'fqm--visual' : '',
          slideDark && !academy && !location ? 'fqm--slide-dark' : '',
        ].filter(Boolean).join(' ')}
        aria-label="퀵메뉴"
      >
        {quickMenuData.map((item) => {
          const isChatbot = item.action === 'chatbot'

          if (isChatbot) {
            return (
              <button
                key={item.id}
                type="button"
                className={[
                  'fqm__item',
                  chatOpen ? 'fqm__item--active' : '',
                ].filter(Boolean).join(' ')}
                aria-label={item.label}
                aria-expanded={chatOpen}
                aria-controls="floating-chatbot"
                onClick={(event) => handleQuickMenuClick(event, item)}
              >
                <span className="fqm__icon">{ICONS[item.type]}</span>
                <span className="fqm__label">{item.label}</span>
              </button>
            )
          }

          return (
            <a
              key={item.id}
              href={item.href}
              className="fqm__item"
              aria-label={item.label}
              {...(item.href && item.href !== '#' && !item.href.startsWith('tel')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <span className="fqm__icon">{ICONS[item.type]}</span>
              <span className="fqm__label">{item.label}</span>
            </a>
          )
        })}
      </aside>

      {chatOpen && (
        <>
          <button
            type="button"
            className="chatbot-backdrop"
            aria-label="챗봇 닫기"
            onClick={() => setChatOpen(false)}
          />
          <section
            id="floating-chatbot"
            className="chatbot-panel"
            aria-label="챗봇 문의"
          >
            <header className="chatbot-panel__header">
              <div>
                <strong>챗봇 문의</strong>
                <span>한글과 컴퓨터 학원 상담 도우미</span>
              </div>
              <button
                type="button"
                className="chatbot-panel__close"
                aria-label="챗봇 닫기"
                onClick={() => setChatOpen(false)}
              >
                <IoClose />
              </button>
            </header>

            <div className="chatbot-panel__body" role="log" aria-live="polite">
              {messages.map((message) => (
                <p
                  key={message.id}
                  className={[
                    'chatbot-message',
                    `chatbot-message--${message.sender}`,
                  ].join(' ')}
                >
                  {message.text}
                </p>
              ))}
            </div>

            <div className="chatbot-panel__quick">
              <a href="tel:02-6953-0995">
                <BsTelephoneFill />
                전화 상담
              </a>
              <a href="/about/location">
                <IoLocationOutline />
                오시는 길
              </a>
            </div>

            <form className="chatbot-panel__form" onSubmit={handleChatSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={chatText}
                onChange={(event) => setChatText(event.target.value)}
                placeholder="문의 내용을 입력하세요"
                aria-label="문의 내용"
              />
              <button type="submit" aria-label="문의 보내기">
                <IoSend />
              </button>
            </form>
          </section>
        </>
      )}
    </>
  )
}
