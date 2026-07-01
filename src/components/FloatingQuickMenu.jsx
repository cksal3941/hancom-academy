import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BsTelephoneFill } from 'react-icons/bs'
import {
  IoChatbubbleEllipses,
  IoClose,
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
    text: '안녕하세요. 한글과컴퓨터학원 상담 챗봇입니다. 수업, 개강 일정, 상담 예약, 위치 중 궁금한 항목을 선택하거나 직접 입력해 주세요.',
  },
]

const QUICK_QUESTIONS = [
  { id: 'course', label: '수업 과정', text: '수업 과정이 궁금해요' },
  { id: 'start', label: '개강 일정', text: '개강 일정 알려주세요' },
  { id: 'consult', label: '상담 예약', text: '상담 예약하고 싶어요' },
  { id: 'location', label: '오시는 길', text: '학원 위치가 궁금해요' },
]

const getBotReply = (text) => {
  const normalized = text.replace(/\s/g, '')

  if (/개강|일정|시간표|수업시간|시작/.test(normalized)) {
    return '개강 일정은 공지 및 소식의 개강소식에서 확인할 수 있습니다. 정확한 반 배정과 보강 일정은 지점 데스크에서 상담 후 안내드립니다.'
  }

  if (/상담|예약|방문|문의|등록/.test(normalized)) {
    return '상담은 전화로 먼저 예약하시면 가장 빠릅니다. 학생 학년, 희망 과정, 현재 학습 상황을 알려주시면 맞춤 상담으로 연결해 드릴게요.'
  }

  if (/위치|오시는길|주소|지점|주차/.test(normalized)) {
    return '학원 위치와 지점 정보는 오시는 길 페이지에서 확인할 수 있습니다. 방문 전 전화로 상담 가능 시간을 확인해 주세요.'
  }

  if (/과정|수업|코딩|정보|올림피아드|내신|초등|중등|고등/.test(normalized)) {
    return '학생 수준과 목표에 따라 정규 과정, 특강, 내신 대비, 심화 과정으로 상담이 나뉩니다. 학년과 관심 분야를 입력해 주시면 더 구체적으로 안내해 드릴게요.'
  }

  if (/비용|수강료|가격|수업료/.test(normalized)) {
    return '수강료는 과정, 수업 횟수, 반 구성에 따라 달라질 수 있어 전화 상담으로 안내드립니다. 빠른 확인은 전화 상담 버튼을 이용해 주세요.'
  }

  return '문의 내용을 확인했습니다. 더 정확한 안내를 위해 학생 학년, 관심 과정, 희망 상담 시간을 함께 남겨 주세요. 빠른 답변이 필요하면 전화 상담을 이용해 주세요.'
}

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
  const logRef = useRef(null)
  const nextMessageIdRef = useRef(2)

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

  useEffect(() => {
    if (!chatOpen || !logRef.current) return
    logRef.current.scrollTop = logRef.current.scrollHeight
  }, [chatOpen, messages])

  const sendChatMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const nextId = nextMessageIdRef.current
    nextMessageIdRef.current += 2
    setMessages((current) => [
      ...current,
      { id: nextId, sender: 'user', text: trimmed },
      {
        id: nextId + 1,
        sender: 'bot',
        text: getBotReply(trimmed),
      },
    ])
    setChatText('')
  }

  const handleChatSubmit = (event) => {
    event.preventDefault()
    sendChatMessage(chatText)
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
        aria-label="빠른 메뉴"
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
                <span>한글과컴퓨터학원 상담 도우미</span>
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

            <div className="chatbot-panel__body" role="log" aria-live="polite" ref={logRef}>
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

            <div className="chatbot-panel__suggestions" aria-label="빠른 질문">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => sendChatMessage(question.text)}
                >
                  {question.label}
                </button>
              ))}
            </div>

            <div className="chatbot-panel__quick">
              <a href="tel:02-6953-0995">
                <BsTelephoneFill />
                전화 상담
              </a>
            </div>

            <form className="chatbot-panel__form" onSubmit={handleChatSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={chatText}
                onChange={(event) => setChatText(event.target.value)}
                placeholder="예: 중등 코딩 수업 상담하고 싶어요"
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
