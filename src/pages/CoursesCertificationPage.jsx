import { Link } from 'react-router-dom'
import {
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiHome,
  FiMonitor,
  FiRefreshCw,
  FiTrendingUp,
  FiUser,
  FiVideo,
} from 'react-icons/fi'
import { IoChevronForward } from 'react-icons/io5'
import SubPageHero from '../components/common/SubPageHero'
import './CoursesCertificationPage.css'

const heroTabs = [
  { label: '영재고·과학고 내신', to: '/courses/gifted' },
  { label: '정보올림피아드', to: '/courses/olympiad' },
  { label: 'OA·자격증', to: '/courses/certification', active: true },
]

const certs = [
  {
    badge: '컴활',
    name: '컴퓨터활용능력',
    tone: 'blue',
    desc: '스프레드시트와 데이터베이스 활용 능력을 평가하는 자격증입니다. 엑셀의 기본 기능부터 함수, 데이터 분석, 차트, 실기 문제 해결까지 단계적으로 학습합니다.',
    points: ['셀 서식과 표 작성', '기본 함수와 중첩 함수', '데이터 정렬·필터', '차트와 피벗 테이블'],
  },
  {
    badge: 'ITQ',
    name: 'ITQ',
    tone: 'green',
    desc: '한글, 엑셀, 파워포인트 등 사무 프로그램의 실제 활용 능력을 평가합니다. 초보자도 단계적으로 시작할 수 있어 기초 OA 자격증 과정으로 적합합니다.',
    points: ['한글 문서 작성', '엑셀 함수와 데이터 처리', '파워포인트 슬라이드 구성', '시험 유형별 실전 연습'],
  },
  {
    badge: 'MOS',
    name: 'MOS',
    tone: 'purple',
    desc: 'Microsoft Office 프로그램의 활용 능력을 평가하는 국제 자격 과정입니다. Word, Excel, PowerPoint의 기능을 정확하고 빠르게 사용하는 능력을 준비합니다.',
    points: ['Word 문서 구성과 편집', 'Excel 수식과 데이터 관리', 'PowerPoint 프레젠테이션 제작', '작업형 문제 풀이'],
  },
  {
    badge: '워드',
    name: '워드프로세서',
    tone: 'orange',
    desc: '문서 작성과 편집, 출력에 필요한 기초 사무 능력을 평가하는 자격증입니다. 문서 편집의 기본기를 체계적으로 익히고 실기 시험에 필요한 정확성과 속도를 훈련합니다.',
    points: ['문서 입력과 편집', '표 작성과 차트 삽입', '글자·문단 서식', '실전 문서 작성'],
  },
]

const processSteps = [
  { step: '01', title: '프로그램 기초', desc: '화면 구성과 기본 기능부터 시작합니다. 파일 열기·저장, 메뉴, 단축키를 익힙니다.' },
  { step: '02', title: '핵심 기능 학습', desc: '문서 서식, 표, 함수, 데이터 정리 등 시험과 실무에서 자주 쓰는 기능을 항목별로 익힙니다.' },
  { step: '03', title: '유형별 문제 풀이', desc: '자격증 시험에 반복 출제되는 유형을 기능별로 나누어 연습하며 빠른 적용 방법을 익힙니다.' },
  { step: '04', title: '시간 제한 실전 훈련', desc: '실제 시험과 동일한 시간으로 처음부터 끝까지 문제를 해결하는 훈련을 합니다.' },
  { step: '05', title: '모의시험·오답 보완', desc: '실전 모의시험으로 부족한 기능과 반복 실수를 확인하고 합격 기준을 충족할 때까지 반복합니다.' },
]

const reasons = [
  { icon: <FiBookOpen />, title: '학교생활', desc: '보고서, 발표 자료, 수행평가 등 학교 과제의 완성도와 작업 속도를 높일 수 있습니다.' },
  { icon: <FiMonitor />, title: '대학생활', desc: '리포트 작성, 데이터 정리, 발표 자료 제작 등 대학 과제에 필요한 기본 역량을 준비합니다.' },
  { icon: <FiTrendingUp />, title: '취업 준비', desc: '사무직·공공기관·기업 채용에서 요구되는 기본 컴퓨터 활용 능력을 증명할 수 있습니다.' },
  { icon: <FiBarChart2 />, title: '실무 활용', desc: '문서 작성과 데이터 정리 시간을 줄이고 업무의 정확성과 효율성을 높일 수 있습니다.' },
]

const operations = [
  { icon: <FiUser />, number: '01', title: '학생별 개별 진도', description: '컴퓨터 경험과 목표 자격증에 따라 시작 단계와 속도를 개별 설계' },
  { icon: <FiBookOpen />, number: '02', title: '자격증별 맞춤 교재', description: '각 자격증 시험 유형에 맞춘 교재와 기출문제 중심 학습' },
  { icon: <FiCode />, number: '03', title: '기출문제 중심 실습', description: '실제 시험과 동일한 환경에서 기출문제를 반복 실습' },
  { icon: <FiRefreshCw />, number: '04', title: '반복 오류 집중 보완', description: '학생별 반복되는 실수 유형을 분석해 집중 보완 진행' },
  { icon: <FiClock />, number: '05', title: '시험 일정 맞춤 진도', description: '시험 날짜를 기준으로 역산해 단계별 진도를 설계' },
  { icon: <FiVideo />, number: '06', title: '온·오프라인 수업', description: 'Zoom 화면 공유를 활용한 실시간 온라인 수업과 대면 수업 병행' },
]

export default function CoursesCertificationPage() {
  return (
    <div className="courses-cert-page">
      <SubPageHero
        eyebrow="교육과정"
        title="OA·자격증"
        tabs={heroTabs}
      />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome />
          <Link to="/">홈</Link>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <span>교육과정</span>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <strong>OA·자격증</strong>
        </div>
      </div>

      <main className="courses-cert-page__body">

        {/* ── 인트로 ── */}
        <section className="ca-intro" aria-labelledby="cert-intro-title">
          <div className="ca-intro__lead" data-aos="fade-up">
            <p className="ca-kicker">문서 작성부터 데이터 관리까지</p>
            <h2 id="cert-intro-title">실무에 필요한 컴퓨터 활용 능력을<br />준비합니다</h2>
          </div>
          <div className="ca-intro__body">
            <div className="ca-intro__copy" data-aos="fade-up" data-aos-delay="100">
              <p>
                OA는 Office Automation의 약자로, 문서 작성, 데이터 정리, 발표 자료 제작 등
                학교와 직장에서 사용하는 기본적인 사무 역량을 의미합니다.
              </p>
              <p>
                OA 자격증 과정은 단순히 시험에 합격하는 데서 끝나지 않습니다.
                한글 문서를 정확하게 작성하고, 엑셀 데이터를 계산·분석하며,
                파워포인트 자료를 효과적으로 구성하는 실제 활용 능력을 함께 익힙니다.
              </p>
            </div>
            <p className="ca-intro__callout" data-aos="fade-up" data-aos-delay="200">
              자격증 취득과 실무 활용을 동시에 준비합니다.
            </p>
          </div>
        </section>

        {/* ── 주요 자격증 ── */}
        <section className="ca-section" aria-labelledby="cert-title">
          <div className="ca-section__head" data-aos="fade-up">
            <span>Certification</span>
            <h2 id="cert-title">주요 자격증 과정</h2>
          </div>
          <div className="ca-certs">
            {certs.map((cert, index) => (
              <article
                key={cert.badge}
                className={`ca-cert__card ca-cert__card--${cert.tone}`}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <em className="ca-cert__badge">{cert.badge}</em>
                <h3>{cert.name}</h3>
                <p>{cert.desc}</p>
                <ul>
                  {cert.points.map((point) => (
                    <li key={point}>
                      <FiCheckCircle />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── 단계별 교육과정 ── */}
        <section className="ca-section" aria-labelledby="process-title">
          <div className="ca-section__head" data-aos="fade-up">
            <span>Learning Flow</span>
            <h2 id="process-title">단계별 교육과정</h2>
          </div>
          <div className="ca-process">
            {processSteps.map((step, index) => (
              <article
                key={step.step}
                className="ca-process__item"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <em>{step.step}</em>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
          <p className="ca-note" data-aos="fade-up">
            <FiBarChart2 />
            기능 설명 → 직접 실습 → 기출문제 → 시간 훈련 → 모의시험, 이 순서로 반복하며 실력을 쌓습니다.
          </p>
        </section>

        {/* ── 자격증이 필요한 이유 ── */}
        <section className="ca-section" aria-labelledby="reason-title">
          <div className="ca-section__head" data-aos="fade-up">
            <span>Why OA</span>
            <h2 id="reason-title">OA 자격증이 필요한 이유</h2>
          </div>
          <div className="ca-reasons">
            {reasons.map((item, index) => (
              <article
                key={item.title}
                className="ca-reason__card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="ca-reason__icon" aria-hidden="true">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── 수업 운영 방식 ── */}
        <section className="ca-section ca-section--operation" aria-labelledby="operation-title">
          <div className="ca-section__head" data-aos="fade-up">
            <span>Operation</span>
            <h2 id="operation-title">수업 운영 방식</h2>
            <p>컴퓨터 활용 경험과 목표 자격증이 다르기 때문에 모든 학생에게 같은 속도로 수업하지 않습니다.</p>
          </div>
          <div className="ca-operation">
            {operations.map((item, index) => (
              <article
                key={item.number}
                className="ca-operation__card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="ca-operation__icon" aria-hidden="true">{item.icon}</div>
                <strong>{item.number}</strong>
                <h3>{item.title}</h3>
                <span />
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <p className="ca-note ca-note--operation" data-aos="fade-up">
            <FiBarChart2 />
            초보자는 기초 과정부터, 경험이 있는 학생은 부족한 영역을 중심으로 시험 대비 과정에 빠르게 진입합니다.
          </p>
        </section>

      </main>
    </div>
  )
}
