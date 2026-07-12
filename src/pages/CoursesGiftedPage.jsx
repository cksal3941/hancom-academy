import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCpu,
  FiHome,
  FiMonitor,
  FiRefreshCw,
  FiSearch,
  FiUser,
  FiUsers,
  FiVideo,
} from 'react-icons/fi'
import { IoChevronForward } from 'react-icons/io5'
import SubPageHero from '../components/common/SubPageHero'
import './CoursesGiftedPage.css'

const heroTabs = [
  { label: '영재고·과학고 내신', to: '/courses/gifted', active: true },
  { label: '정보올림피아드', to: '/courses/olympiad' },
  { label: 'OA·자격증', to: '/courses/certification' },
]

const schools = [
  {
    name: '경기과학고',
    summary: '알고리즘 난도가 높고 수행평가 및 과제가 정보올림피아드 수준으로 출제됩니다.',
    points: ['C언어 기반 프로그래밍', '자료구조 및 알고리즘 심화', '고난도 문제 해결 훈련', '정보올림피아드 수행평가 대비'],
  },
  {
    name: '서울과학고',
    summary: '수학적 사고와 구현 정확도를 함께 요구하는 과제형 평가에 대비합니다.',
    points: ['문제 분석 훈련', '코드 설계와 디버깅', '수행평가 보고서 정리', '학교별 기출 유형 관리'],
  },
  {
    name: '한국과학영재학교',
    summary: '탐구형 프로젝트와 심화 알고리즘을 연결해 학교 과제 대응력을 높입니다.',
    points: ['프로젝트형 과제 대비', 'AI·데이터 분석 기초', '알고리즘 구현력 강화', '개별 산출물 피드백'],
  },
  {
    name: '대전과학고',
    summary: '기초 문법부터 심화 문제 해결까지 단계별로 빈틈을 점검합니다.',
    points: ['기초 문법 진단', '반복 구현 훈련', '수행평가 유형 정리', '시험 전 집중 보강'],
  },
  {
    name: '인천과학예술영재학교',
    summary: '융합형 과제와 데이터 활용 수업에 맞춰 사고 과정과 결과물을 함께 관리합니다.',
    points: ['융합 프로젝트 설계', '데이터 처리 실습', '발표 자료 구성', '개별 피드백 관리'],
  },
  {
    name: '세종·대구·충주 영재학교',
    summary: '학교별 커리큘럼 차이를 반영해 내신과 수행평가를 균형 있게 준비합니다.',
    points: ['학교별 진도 분석', '과제 제출 전 검토', '개념 보완 수업', '오답 기반 재훈련'],
  },
]

const processSteps = [
  { icon: <FiSearch />, title: '진단', description: '학생의 현재 수준과 목표를 확인합니다.' },
  { icon: <FiCpu />, title: '문제 분석·설계', description: '문제의 조건을 이해하고 해결 방법을 설계합니다.' },
  { icon: <FiCode />, title: '구현·채점', description: '코드를 작성하고 온라인 채점으로 결과를 검증합니다.' },
  { icon: <FiRefreshCw />, title: '오류 수정', description: '오답 원인을 분석하고 다시 해결합니다.' },
]

const curriculum = [
  {
    badge: 'BASIC',
    step: '1단계',
    label: '기초 프로그래밍',
    title: 'C언어·Python 기본 문법과 구현 능력',
    tone: 'green',
  },
  {
    badge: 'ALGORITHM',
    step: '2단계',
    label: '문제 해결 알고리즘',
    title: '자료구조와 알고리즘을 활용한 문제 풀이',
    tone: 'blue',
  },
  {
    badge: 'SCHOOL ADVANCED',
    step: '3단계',
    label: '학교별 심화 대비',
    title: '영재고·과학고 내신, 수행평가, 대회 준비',
    tone: 'purple',
  },
]

const operations = [
  { icon: <FiUser />, number: '01', title: '1:1 개별 진도 지도', description: '학생별 수준과 목표에 맞춘 맞춤형 커리큘럼 및 진도 관리' },
  { icon: <FiClock />, number: '02', title: '주 4/8/12/16시간 맞춤 수업', description: '학원의 학습 목표와 일정에 맞춰 수업 시간 선택 가능' },
  { icon: <FiMonitor />, number: '03', title: '온라인 채점 활용', description: '문제 풀이와 자동 채점을 통해 실력을 정확히 확인' },
  { icon: <FiBookOpen />, number: '04', title: '학교별 내신 및 수행평가 대비', description: '학교별 교육과정과 평가 방식에 맞춘 맞춤 대비 수업' },
  { icon: <FiUsers />, number: '05', title: '필요 시 팀 수업 및 대회 준비', description: '대회 목표에 맞춘 수업과 실전 대비 훈련 진행' },
  { icon: <FiVideo />, number: '06', title: 'Zoom 실시간 온라인 수업', description: '화면 공유를 통한 실시간 피드백과 맞춤 지도 제공' },
]

export default function CoursesGiftedPage() {
  const [activeSchool, setActiveSchool] = useState(schools[0])

  return (
    <div className="courses-gifted-page">
      <SubPageHero
        eyebrow="교육과정"
        title="영재고·과학고 내신"
        tabs={heroTabs}
      />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome />
          <Link to="/">홈</Link>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <span>교육과정</span>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <strong>영재고·과학고 내신</strong>
        </div>
      </div>

      <main className="courses-gifted-page__body">
        <section className="cg-intro" aria-labelledby="gifted-intro-title">
          <div className="cg-intro__lead" data-aos="fade-up">
            <p className="cg-kicker">영재고·과학고 합격 후, 정보과학 준비는 되어 있나요?</p>
            <h2 id="gifted-intro-title">문법 암기가 아니라<br />문제 해결력을 준비합니다.</h2>
          </div>
          <div className="cg-intro__body">
            <div className="cg-intro__copy" data-aos="fade-up" data-aos-delay="150">
              <p>
                영재고·과학고의 정보과학은 C언어와 Python을 활용해 문제를 분석하고,
                알고리즘을 설계하고, 직접 구현하는 능력을 평가합니다.
              </p>
              <p>
                학교에 따라 알고리즘 대회 수준의 수행평가, 데이터 분석, AI 융합 수업까지
                진행되기 때문에 입학 후 처음 시작하면 부담이 커질 수 있습니다.
              </p>
            </div>
            <p className="cg-intro__callout" data-aos="fade-up" data-aos-delay="250">
              입학 전 준비해야 하는 것은 문법 암기가 아니라
              스스로 문제를 해결하는 능력입니다.
            </p>
          </div>
        </section>

        <section className="cg-section" aria-labelledby="school-feature-title">
          <div className="cg-section__head" data-aos="fade-up">
            <span>School Program</span>
            <h2 id="school-feature-title">학교별 교육과정 특징</h2>
          </div>

          <div className="cg-school-card" data-aos="fade-up" data-aos-delay="120">
            <div className="cg-school-tabs" role="tablist" aria-label="학교 선택">
              {schools.map((school) => (
                <button
                  key={school.name}
                  type="button"
                  className={school.name === activeSchool.name ? 'is-active' : ''}
                  onClick={() => setActiveSchool(school)}
                  role="tab"
                  aria-selected={school.name === activeSchool.name}
                >
                  {school.name}
                </button>
              ))}
            </div>

            <div className="cg-school-panel">
              <article>
                <div className="cg-school-panel__icon" aria-hidden="true">
                  <FiAward />
                </div>
                <div>
                  <h3>{activeSchool.name}</h3>
                  <p>{activeSchool.summary}</p>
                </div>
              </article>

              <aside>
                <strong>주요 학습 내용</strong>
                <ul>
                  {activeSchool.points.map((point) => (
                    <li key={point}>
                      <FiCheckCircle />
                      {point}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="cg-section" aria-labelledby="process-title">
          <div className="cg-section__head" data-aos="fade-up">
            <span>Learning Flow</span>
            <h2 id="process-title">문제 해결 학습 과정</h2>
          </div>

          <div className="cg-process">
            {processSteps.map((step, index) => (
              <article key={step.title} className="cg-process__item" data-aos="fade-up" data-aos-delay={index * 120}>
                <div className="cg-process__icon">
                  {step.icon}
                  <em>{String(index + 1).padStart(2, '0')}</em>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <p className="cg-note" data-aos="fade-up">
            <FiBarChart2 />
            문제 분석부터 구현과 오류 수정까지 반복하며 스스로 해결하는 힘을 기릅니다.
          </p>
        </section>

        <section className="cg-section" aria-labelledby="curriculum-title">
          <div className="cg-section__head" data-aos="fade-up">
            <span>Curriculum</span>
            <h2 id="curriculum-title">단계별 커리큘럼</h2>
          </div>

          <div className="cg-curriculum">
            {curriculum.map((item, index) => (
              <article key={item.badge} className={`cg-curriculum__card cg-curriculum__card--${item.tone}`} data-aos="fade-up" data-aos-delay={index * 130}>
                <span>{item.badge}</span>
                <strong>{item.step}</strong>
                <em>{item.label}</em>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>

          <p className="cg-curriculum__caption" data-aos="fade-up" data-aos-delay="200">
            영재고 과학고 입학 전 최소 기초 프로그래밍과 문제 해결 단계까지 준비하는 것을 권장합니다.
          </p>
        </section>

        <section className="cg-section cg-section--operation" aria-labelledby="operation-title">
          <div className="cg-section__head" data-aos="fade-up">
            <span>Operation</span>
            <h2 id="operation-title">수업 운영 방식</h2>
            <p>
              학생의 현재 실력과 목표에 맞는 개별 수업으로 문제 해결 능력을 체계적으로 키워갑니다.
            </p>
          </div>

          <div className="cg-operation">
            {operations.map((item, index) => (
              <article key={item.number} className="cg-operation__card" data-aos="fade-up" data-aos-delay={index * 80}>
                <div className="cg-operation__icon" aria-hidden="true">{item.icon}</div>
                <strong>{item.number}</strong>
                <h3>{item.title}</h3>
                <span />
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <p className="cg-note cg-note--operation" data-aos="fade-up">
            <FiBarChart2 />
            진도는 수업 시간이 아니라 학생의 문제 해결 결과를 기준으로 결정합니다.
          </p>
        </section>
      </main>
    </div>
  )
}
