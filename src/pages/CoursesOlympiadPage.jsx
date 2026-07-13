import { Link } from 'react-router-dom'
import {
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
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
import './CoursesOlympiadPage.css'

const heroTabs = [
  { label: '영재고·과학고 내신', to: '/courses/gifted' },
  { label: '정보올림피아드', to: '/courses/olympiad', active: true },
  { label: 'OA·자격증', to: '/courses/certification' },
]

const contests = [
  {
    badge: 'KOI',
    name: '한국정보올림피아드',
    tone: 'blue',
    desc: '국내에서 가장 권위 있는 청소년 알고리즘 대회입니다. 문제 해결력, 알고리즘 설계 능력, 구현 정확도를 종합적으로 평가하며 영재학교·과학고 진학에도 활용됩니다.',
  },
  {
    badge: 'IOI',
    name: '국제정보올림피아드',
    tone: 'gold',
    desc: '각 국가의 대표 학생들이 참가하는 세계 최고 수준의 알고리즘 대회입니다. 국가대표 선발을 위해 고난도 자료구조와 안정적인 구현 능력이 필요합니다.',
  },
  {
    badge: 'NYPC',
    name: '넥슨 청소년 프로그래밍 챌린지',
    tone: 'green',
    desc: '창의적인 문제와 높은 상금, 다양한 혜택으로 인기가 높은 청소년 프로그래밍 대회입니다. 기초 구현부터 사고력 중심 문제까지 폭넓게 출제됩니다.',
  },
  {
    badge: 'USACO',
    name: '미국 정보올림피아드',
    tone: 'purple',
    desc: 'Bronze · Silver · Gold · Platinum 단계로 구성된 온라인 대회입니다. 자신의 수준에 맞는 단계부터 시작해 상위 등급으로 단계적으로 진급합니다.',
  },
]

const achievements = [
  { value: '12년 연속', label: '한국정보올림피아드 대상' },
  { value: '7년 연속', label: 'NYPC 대상' },
  { value: '4명 중 3명', label: '2024 IOI 국가대표 배출' },
  { value: '전원 금메달', label: '2024 IOI 대표팀 성과' },
]

const processSteps = [
  { icon: <FiSearch />, title: '실력 진단', description: '구현 속도, 정답률, 오답 유형을 기준으로 실제 문제 해결 수준을 확인하고 시작 단계를 결정합니다.' },
  { icon: <FiCpu />, title: '문제 분석', description: '입력·출력·조건·제한 사항을 구분하고, 바로 코드를 작성하기 전에 해결 구조를 먼저 정리합니다.' },
  { icon: <FiCode />, title: '알고리즘 설계·구현', description: '문제에 적합한 알고리즘을 선택하고, 학생이 직접 설계한 해결 방법을 코드로 구현합니다.' },
  { icon: <FiRefreshCw />, title: '채점·오답 복습', description: '온라인 채점으로 결과를 검증하고 오답 원인을 분석한 뒤 유사 문제에 같은 방법을 적용합니다.' },
]

const curriculum = [
  {
    badge: 'BASIC',
    step: '1단계',
    label: '기초 프로그래밍',
    tone: 'gray',
    points: ['변수와 자료형', '조건문·반복문', '배열과 함수', '기본 구현 문제'],
  },
  {
    badge: 'BEGINNER',
    step: '2단계',
    label: '기초 알고리즘',
    tone: 'green',
    points: ['완전 탐색', '시뮬레이션·정렬', '문자열', '온라인 저지 활용'],
  },
  {
    badge: 'INTERMEDIATE',
    step: '3단계',
    label: '자료구조·알고리즘',
    tone: 'blue',
    points: ['스택·큐·이분 탐색', '그리디·백트래킹', '그래프 탐색', '기초 동적 계획법'],
  },
  {
    badge: 'ADVANCED',
    step: '4단계',
    label: '심화 대회 준비',
    tone: 'purple',
    points: ['최단 경로·MST', '고급 동적 계획법', '세그먼트 트리', '대회 실전 모의고사'],
  },
  {
    badge: 'NATIONAL',
    step: '5단계',
    label: '국가대표 과정',
    tone: 'gold',
    points: ['고급 자료구조', '정수론·조합론', '국제대회 기출 분석', '시간 제한 실전 훈련'],
  },
]

const operations = [
  { icon: <FiUser />, number: '01', title: '1:1 개별 진도 지도', description: '학생의 수준과 목표 대회에 맞춘 맞춤형 커리큘럼 설계' },
  { icon: <FiMonitor />, number: '02', title: '온라인 저지 기반 풀이', description: '실제 채점 환경에서 문제를 풀고 결과를 즉시 검증' },
  { icon: <FiBookOpen />, number: '03', title: '단계별 통과 기준 적용', description: '정답률과 문제 수준 기준으로 다음 단계 진입 여부 결정' },
  { icon: <FiBarChart2 />, number: '04', title: '오답 유형·정답률 관리', description: '반복되는 오답 유형을 분석해 집중적으로 보완' },
  { icon: <FiUsers />, number: '05', title: '대회 일정 실전 훈련', description: '대회 일정에 맞춰 실전 모의고사와 시간 관리 훈련 진행' },
  { icon: <FiVideo />, number: '06', title: 'Zoom 실시간 온라인 수업', description: '화면 공유를 활용한 실시간 풀이 피드백과 코드 리뷰' },
]

export default function CoursesOlympiadPage() {
  return (
    <div className="courses-olympiad-page">
      <SubPageHero
        eyebrow="교육과정"
        title="정보올림피아드"
        tabs={heroTabs}
      />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome />
          <Link to="/">홈</Link>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <span>교육과정</span>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <strong>정보올림피아드</strong>
        </div>
      </div>

      <main className="courses-olympiad-page__body">

        {/* ── 인트로 ── */}
        <section className="co-intro" aria-labelledby="olympiad-intro-title">
          <div className="co-intro__lead" data-aos="fade-up">
            <p className="co-kicker">알고리즘 실력은 문제를 많이 푼다고 완성되지 않습니다</p>
            <h2 id="olympiad-intro-title">정답이 아니라 문제를 해결하는 힘을 기릅니다.</h2>
          </div>
          <div className="co-intro__body">
            <div className="co-intro__copy" data-aos="fade-up" data-aos-delay="150">
              <p>
                정보올림피아드는 단순한 코딩 대회가 아닙니다. 주어진 문제를 정확하게 분석하고,
                적절한 알고리즘을 설계하고, 제한 시간과 메모리 안에서 구현하는 능력을 평가합니다.
              </p>
              <p>
                문법을 알고 있는 것과 대회 문제를 해결하는 것은 전혀 다른 단계입니다.
                입학 후 처음 시작하면 부담이 커질 수 있습니다.
              </p>
            </div>
            <p className="co-intro__callout" data-aos="fade-up" data-aos-delay="250">
              정보올림피아드 준비의 핵심은 정답 코드를 외우는 것이 아니라
              새로운 문제를 해결하는 힘을 기르는 것입니다.
            </p>
          </div>
        </section>

        {/* ── 실적 ── */}
        <section className="co-achievements-section" aria-labelledby="achievement-title">
          <div className="co-achievements-section__inner">
            <p className="co-achievements-section__label" data-aos="fade-up">Track Record</p>
            <h2 id="achievement-title" data-aos="fade-up" data-aos-delay="80">결과로 검증된 알고리즘 교육</h2>
            <div className="co-achievements" data-aos="fade-up" data-aos-delay="180">
              {achievements.map((item) => (
                <div key={item.label} className="co-achievement__item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 주요 대회 ── */}
        <section className="co-section" aria-labelledby="contest-title">
          <div className="co-section__head" data-aos="fade-up">
            <span>Competition</span>
            <h2 id="contest-title">주요 대회</h2>
          </div>
          <div className="co-contests">
            {contests.map((contest, index) => (
              <article
                key={contest.badge}
                className={`co-contest__card co-contest__card--${contest.tone}`}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <em className="co-contest__badge">{contest.badge}</em>
                <h3>{contest.name}</h3>
                <p>{contest.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── 대회 준비 과정 ── */}
        <section className="co-section" aria-labelledby="process-title">
          <div className="co-section__head" data-aos="fade-up">
            <span>Learning Flow</span>
            <h2 id="process-title">대회 준비 과정</h2>
          </div>
          <div className="co-process">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="co-process__item"
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                <div className="co-process__icon">
                  {step.icon}
                  <em>{String(index + 1).padStart(2, '0')}</em>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <p className="co-note" data-aos="fade-up">
            <FiBarChart2 />
            문제 분석 → 알고리즘 설계 → 구현 → 채점 → 오류 수정, 이 과정을 반복하며 실력을 높입니다.
          </p>
        </section>

        {/* ── 단계별 커리큘럼 ── */}
        <section className="co-section" aria-labelledby="curriculum-title">
          <div className="co-section__head" data-aos="fade-up">
            <span>Curriculum</span>
            <h2 id="curriculum-title">단계별 커리큘럼</h2>
          </div>
          <div className="co-curriculum">
            {curriculum.map((item, index) => (
              <article
                key={item.badge}
                className={`co-curriculum__card co-curriculum__card--${item.tone}`}
                data-aos="fade-up"
                data-aos-delay={index * 90}
              >
                <span>{item.badge}</span>
                <strong>{item.step}</strong>
                <em>{item.label}</em>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <FiCheckCircle />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="co-curriculum__caption" data-aos="fade-up" data-aos-delay="100">
            학생의 현재 수준과 목표 대회를 기준으로 시작 단계를 결정합니다.
          </p>
        </section>

        {/* ── 수업 운영 방식 ── */}
        <section className="co-section co-section--operation" aria-labelledby="operation-title">
          <div className="co-section__head" data-aos="fade-up">
            <span>Operation</span>
            <h2 id="operation-title">수업 운영 방식</h2>
            <p>학생의 현재 실력과 목표 대회에 맞는 개별 수업으로 문제 해결 능력을 체계적으로 키워갑니다.</p>
          </div>
          <div className="co-operation">
            {operations.map((item, index) => (
              <article
                key={item.number}
                className="co-operation__card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="co-operation__icon" aria-hidden="true">{item.icon}</div>
                <strong>{item.number}</strong>
                <h3>{item.title}</h3>
                <span />
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <p className="co-note co-note--operation" data-aos="fade-up">
            <FiBarChart2 />
            진도는 수업 시간이 아니라 학생이 해결한 문제의 수준으로 결정됩니다.
          </p>
        </section>

      </main>
    </div>
  )
}
