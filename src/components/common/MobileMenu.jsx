import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoChevronUp, IoChevronDown, IoClose } from 'react-icons/io5'
import logoImg from '../../assets/hancom_logo.png'
import mobileMenuData from '../../data/mobileMenuData'
import './MobileMenu.css'

export default function MobileMenu({ isOpen, onClose }) {
  const [activeId, setActiveId] = useState('about')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC 키 닫기
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const toggle = (id) => {
    setActiveId(prev => (prev === id ? null : id))
  }

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="모바일 메뉴">
      {/* 상단 헤더 */}
      <div className="mobile-menu__header">
        <Link to="/" className="mobile-menu__logo" onClick={onClose}>
          <img src={logoImg} alt="한글과 컴퓨터 학원" />
        </Link>
        <button
          type="button"
          className="mobile-menu__close"
          onClick={onClose}
          aria-label="메뉴 닫기"
        >
          <IoClose />
        </button>
      </div>

      {/* 아코디언 네비게이션 */}
      <nav className="mobile-menu__nav">
        {mobileMenuData.map(item => {
          const open = activeId === item.id
          return (
            <div key={item.id} className="mobile-menu__group">
              <button
                type="button"
                className={`mobile-menu__parent${open ? ' mobile-menu__parent--open' : ''}`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.label}</span>
                {open ? <IoChevronUp /> : <IoChevronDown />}
              </button>

              <div className={`mobile-menu__children${open ? ' mobile-menu__children--open' : ''}`}>
                <div className="mobile-menu__children-inner">
                  {item.children.map(child => (
                    <Link
                      key={child.id}
                      to={child.path}
                      className="mobile-menu__child"
                      onClick={onClose}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      {/* 하단 링크 */}
      <div className="mobile-menu__bottom">
        <Link to="/login" className="mobile-menu__bottom-link" onClick={onClose}>
          로그인
        </Link>
        <Link to="/online" className="mobile-menu__bottom-link" onClick={onClose}>
          온라인수업 입장
        </Link>
      </div>
    </div>
  )
}
