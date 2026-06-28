import { useEffect, useRef, useState } from 'react'

export function useTimelineProgress(containerRef) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const triggerPoint = window.innerHeight * 0.6
      const scrolled = triggerPoint - rect.top
      const p = Math.max(0, Math.min(1, scrolled / rect.height))
      setProgress(p)
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef])

  return progress
}
