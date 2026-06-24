import { useEffect, useState } from 'react'
import { IoChevronUp } from 'react-icons/io5'
import './TopButton.css'

const SIZE = 60
const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function TopButton() {
  const [scrolled, setScrolled]           = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const [progress, setProgress]           = useState(0)

  const visible  = scrolled
  const complete = progress >= 0.999

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
      setScrolled(scrollTop > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <button
      className={[
        'top-button',
        visible       ? 'top-button--visible'  : '',
        visible       ? 'top-button--bounce'   : '',
        complete      ? 'top-button--complete' : '',
        footerVisible ? 'top-button--dark'     : '',
      ].filter(Boolean).join(' ')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로 이동"
    >
      <svg
        className="top-button__progress"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <circle
          className="top-button__track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
        />
        <circle
          className="top-button__bar"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <span className="top-button__icon">
        <IoChevronUp />
      </span>
    </button>
  )
}
