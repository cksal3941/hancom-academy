import { Link, useLocation } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import './ComingSoonPage.css'

const SECTION_TABS = {
  about: [
    { label: '학원 소개',   to: '/about/intro' },
    { label: '강사진 소개', to: '/about/teachers' },
    { label: '수상 실적',   to: '/about/awards' },
    { label: '오시는 길',   to: '/about/location' },
  ],
  courses: [
    { label: '영재고·과학고 내신', to: '/courses/gifted' },
    { label: '정보올림피아드',     to: '/courses/olympiad' },
    { label: 'OA·자격증',         to: '/courses/certification' },
  ],
  notice: [
    { label: '공지사항', to: '/notice/announcement' },
    { label: '개강소식', to: '/notice/start' },
    { label: '뉴스',     to: '/notice/news' },
  ],
}

const PATH_META = [
  { prefix: '/about/location',      eyebrow: '학원 소개',    title: '오시는 길',  section: 'about'   },
  { prefix: '/courses',             eyebrow: '교육과정',     title: '교육과정',   section: 'courses' },
  { prefix: '/notice',              eyebrow: '공지 및 소식', title: '공지사항',   section: 'notice'  },
  { prefix: '/opening-news',        eyebrow: '공지 및 소식', title: '개강소식',   section: 'notice'  },
  { prefix: '/news',                eyebrow: '공지 및 소식', title: '뉴스',       section: 'notice'  },
]

function getMeta(pathname) {
  const match = PATH_META.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(prefix + '/'),
  )
  return match ?? { eyebrow: '', title: '준비 중입니다', section: null }
}

export default function ComingSoonPage() {
  const { pathname } = useLocation()
  const { eyebrow, title, section } = getMeta(pathname)

  const tabs = section
    ? (SECTION_TABS[section] ?? []).map((tab) => ({
        ...tab,
        active: pathname === tab.to || pathname.startsWith(tab.to + '/'),
      }))
    : []

  return (
    <div className="coming-soon-page">
      <SubPageHero eyebrow={eyebrow} title={title} tabs={tabs} />
      {eyebrow && (
        <div className="subpage-breadcrumb">
          <div className="subpage-breadcrumb__inner">
            <FiHome aria-hidden="true" />
            <span>{eyebrow}</span>
            <span className="subpage-breadcrumb__chevron">›</span>
            <strong>{title}</strong>
          </div>
        </div>
      )}
      <div className="coming-soon">
        <div className="coming-soon__icon">🚧</div>
        <p className="coming-soon__desc">빠른 시일 내에 오픈할 예정입니다.</p>
        <Link to="/" className="coming-soon__btn">홈으로 돌아가기</Link>
      </div>
    </div>
  )
}
