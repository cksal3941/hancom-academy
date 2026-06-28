import { useRef } from 'react'
import { FiHome } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import DecadeTabs from '../components/awards/DecadeTabs'
import AwardsTimeline from '../components/awards/AwardsTimeline'
import { awardsData, decades } from '../data/awardsData'
import { useTimelineProgress } from '../hooks/useTimelineProgress'
import { useActiveTimelineYear } from '../hooks/useActiveTimelineYear'
import './AwardsPage.css'

const heroTabs = [
  { label: '학원 소개', to: '/about/intro' },
  { label: '강사진 소개', to: '/about/teachers' },
  { label: '수상 실적', to: '/about/awards', active: true },
  { label: '오시는 길', to: '/about/location' },
]

export default function AwardsPage() {
  const containerRef = useRef(null)
  const yearRefs = useRef({})

  const progress = useTimelineProgress(containerRef)
  const { activeYear } = useActiveTimelineYear(yearRefs, awardsData[0]?.year)

  const activeDecade = activeYear
    ? `${Math.floor(activeYear / 10) * 10}s`
    : decades[0]

  const scrollToDecade = (decade) => {
    const firstYearInDecade = awardsData.find((d) => d.decade === decade)
    if (!firstYearInDecade) return

    const el = yearRefs.current[firstYearInDecade.year]
    if (!el) return

    const offset = el.getBoundingClientRect().top + window.scrollY - 160
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }

  return (
    <div className="awards-page">
      <SubPageHero eyebrow="학원 소개" title="수상 실적" tabs={heroTabs} />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>학원 소개</span>
          <span className="subpage-breadcrumb__chevron">&gt;</span>
          <strong>수상 실적</strong>
        </div>
      </div>

      <DecadeTabs
        decades={decades}
        activeDecade={activeDecade}
        onDecadeClick={scrollToDecade}
      />

      <section className="awards-page__timeline-section" ref={containerRef}>
        <div className="container">
          <AwardsTimeline
            data={awardsData}
            yearRefs={yearRefs}
            activeYear={activeYear}
            progress={progress}
          />
        </div>
      </section>
    </div>
  )
}
