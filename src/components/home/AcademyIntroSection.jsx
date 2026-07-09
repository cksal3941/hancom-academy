import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import academyIntroData from '../../data/academyIntroData'
import AcademyIntroCard from '../cards/AcademyIntroCard'
import './AcademyIntroSection.css'

// 셰이더는 장식용 배경이므로 청크 로드 실패 시 앱을 죽이지 않고
// CSS radial-gradient 폴백만 남긴다
const AcademyIntroShader = lazy(() =>
  import('./AcademyIntroShader').catch(() => ({ default: () => null }))
)

const MARQUEE_ITEMS = Array.from({ length: 16 }, (_, i) => i)

export default function AcademyIntroSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [shaderLoaded, setShaderLoaded] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        // 섹션이 한 번이라도 보이면 셰이더 청크(three.js) 로딩 시작
        if (entry.isIntersecting) setShaderLoaded(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="academy-intro" ref={sectionRef}>
      <div className={`academy-intro__canvas-wrap${visible ? ' academy-intro__canvas-wrap--visible' : ''}`}>
        {shaderLoaded && (
          <Suspense fallback={null}>
            <AcademyIntroShader />
          </Suspense>
        )}
      </div>

      <div className="academy-intro__overlay" aria-hidden="true" />

      {/* 수직 마퀴 텍스트 — AOS 제외 */}
      <div className="academy-intro__marquee" aria-hidden="true">
        <div className="academy-intro__marquee-track">
          {MARQUEE_ITEMS.map(i => (
            <span key={i} className="academy-intro__marquee-text">
              Hangul &amp; Computer Academy
            </span>
          ))}
        </div>
      </div>

      <div className="academy-intro__inner">
        {/* 왼쪽 콘텐츠 */}
        <div className="academy-intro__left">
          <p className="academy-intro__label" data-aos="fade-right">&nbsp;WHY US</p>
          <h2 className="academy-intro__title" data-aos="fade-right" data-aos-delay="100">
            검증된 교육 시스템
          </h2>
          <p className="academy-intro__desc" data-aos="fade-right" data-aos-delay="200">
            한글과 컴퓨터 학원은 20여 년간 알고리즘과 코딩 교육을<br />
             이어오며 정보올림피아드, 국제대회, 입시, IT 분야에서<br />
             두각을 나타내는 인재들을 배출해왔습니다.
          </p>
          <p className="academy-intro__desc" data-aos="fade-right" data-aos-delay="200">
            검증된 교육 경험과 최상위권 멘토진을 바탕으로,<br /> 체계적인 문제 분석 및 논리적 사고 중심의<br /> 알고리즘 수업을 통해 여러분의 성장을 이끌겠습니다.
          </p>
        </div>

        {/* 오른쪽 카드 목록 — wrapper div로 AOS 분리 */}
        <div className="academy-intro__right">
          {academyIntroData.map((item, i) => (
            <div key={item.id} data-aos="fade-up" data-aos-delay={i * 100}>
              <AcademyIntroCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
