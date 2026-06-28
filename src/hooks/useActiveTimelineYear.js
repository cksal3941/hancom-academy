import { useEffect, useRef, useState } from 'react'

export function useActiveTimelineYear(yearRefs, initialYear) {
  const [activeYear, setActiveYear] = useState(initialYear)
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length === 0) return
        const entry = intersecting[0]
        const year = Number(entry.target.dataset.year)
        if (year) setActiveYear(year)
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      },
    )

    const refs = yearRefs.current
    Object.values(refs).forEach((el) => {
      if (el) observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [yearRefs])

  return { activeYear, setActiveYear }
}
