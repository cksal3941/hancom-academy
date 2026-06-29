import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiBookOpen,
  FiHome,
  FiShield,
  FiStar,
} from 'react-icons/fi'
import aboutHeroImage from '../assets/about-hero-3d.png'
import aboutCtaImage from '../assets/about-cta-3d.png'
import teacher1Image from '../assets/teacher1.jpg'
import './AboutPage.css'

const PORTRAIT_IMAGE = teacher1Image

const tabs = [
  { label: '학원 소개', to: '/about/intro', active: true },
  { label: '강사진 소개', to: '/about/teachers' },
  { label: '수상 실적', to: '/about/awards' },
  { label: '오시는 길', to: '/about/location' },
]

const values = [
  {
    icon: <FiBookOpen />,
    title: 'EDUCATIONAL EXCELLENCE',
    description: '오랜 교육 경험과 검증된 학습 시스템으로 학생들의 확실한 성장과 성취를 만듭니다.',
  },
  {
    icon: <FiStar />,
    title: 'INNOVATIVE PROGRAM',
    description: '변화하는 교육 트렌드에 맞춘 독창적이고 효과적인 커리큘럼을 꾸준히 연구합니다.',
  },
  {
    icon: <FiShield />,
    title: 'TRUST & INTEGRITY',
    description: '학생과 학부모가 믿고 맡길 수 있는 정직하고 투명한 교육 환경을 약속합니다.',
  },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <picture className="about-hero__image" aria-hidden="true">
          <img src={aboutHeroImage} alt="" />
        </picture>
        <div className="about-hero__shade" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">학원 소개</p>
          <h1>한글과컴퓨터 학원소개</h1>

          <nav className="about-tabs" aria-label="학원 소개 메뉴">
            {tabs.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                className={`about-tabs__item${tab.active ? ' about-tabs__item--active' : ''}`}
                aria-current={tab.active ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="about-breadcrumb">
        <div className="about-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>학원 소개</span>
          <span className="about-breadcrumb__chevron">›</span>
          <strong>한글과컴퓨터 학원 소개</strong>
        </div>
      </div>

      <section className="about-intro">
        <div className="about-intro__inner">
          <header className="about-intro__heading" data-aos="fade-up">
            <p>기술을 넘어 세상을 바꿀 인재로</p>
            <h2>한컴에듀케이션(주)</h2>
          </header>

          <div className="about-intro__story">
            <figure className="about-intro__portrait" data-aos="fade-right">
              <img
                src={PORTRAIT_IMAGE}
                alt="한컴에듀케이션을 소개하는 교육 전문가"
              />
              <figcaption>
                <span>HANCOM EDUCATION</span>
                <strong>미래를 만드는 교육</strong>
              </figcaption>
            </figure>

            <div className="about-intro__copy" data-aos="fade-left">
              <p className="about-intro__lead">AI 시대가 시작되었습니다.</p>
              <p>
                그 중심에는 알고리즘과 코딩이 있습니다. 우리는 코딩 기술자가 아닌,
                문제를 분석하고 해결하는 인재를 키웁니다. 상상하는 것을 현실로
                만들고 대한민국의 스티브 잡스와 빌 게이츠를 키우는 것이 저희가
                추구하는 목표입니다.
              </p>
              <p>
                오랜 시간 기업과 학교를 대상으로 알고리즘 교육과 한글과컴퓨터학원을
                운영하며 수많은 IT 인재를 배출했습니다. 학생 한 명 한 명의 가능성을
                발견하고, 스스로 답을 찾아가는 힘을 기르는 교육을 이어가고 있습니다.
              </p>
              <p>
                정보올림피아드를 비롯한 각종 경시대회에서 우수한 성과를 만들어 왔으며,
                국내외 유수 IT 기업과 스타트업에서 활약하는 졸업생들이 한컴 교육의
                가치를 증명하고 있습니다.
              </p>
              <p>
                빠르게 변하는 시대일수록 탄탄한 기초와 창의적인 사고가 중요합니다.
                더 나은 세상, 더 좋은 교육을 향한 발걸음에 함께해 주세요.
              </p>
            </div>
          </div>

          <div className="about-values">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="about-values__card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <span className="about-values__icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-cta"
        style={{ '--about-cta-image': `url("${aboutCtaImage}")` }}
      >
        <div className="about-cta__inner" data-aos="fade-up">
          <p className="about-cta__eyebrow">한글과 컴퓨터 학원</p>
          <h2>한글과컴퓨터 학원이 만들어가는<br />교육의 미래</h2>
          <p>학원의 교육 철학과 특별한 교육과정을 확인해 보세요.</p>
          <Link to="/courses" className="about-cta__link">
            교육과정 바로가기
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
