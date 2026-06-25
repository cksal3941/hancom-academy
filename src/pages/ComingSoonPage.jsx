import { Link, useLocation } from 'react-router-dom'
import SubPageHero from '../components/common/SubPageHero'
import './ComingSoonPage.css'

const PATH_META = [
  { prefix: '/opening-news', eyebrow: '공지 및 소식', title: '개강소식'  },
  { prefix: '/notice',       eyebrow: '공지 및 소식', title: '공지사항'  },
  { prefix: '/news',         eyebrow: '공지 및 소식', title: '뉴스'      },
  { prefix: '/about/awards', eyebrow: '학원 소개',    title: '수상 실적' },
  { prefix: '/about/location', eyebrow: '학원 소개',  title: '오시는 길' },
  { prefix: '/education',    eyebrow: '교육과정',     title: '교육과정'  },
  { prefix: '/seminar',      eyebrow: '교육설명회',   title: '교육설명회'},
]

function getMeta(pathname) {
  const match = PATH_META.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(prefix + '/'),
  )
  return match ?? { eyebrow: '', title: '준비 중입니다' }
}

export default function ComingSoonPage() {
  const { pathname } = useLocation()
  const { eyebrow, title } = getMeta(pathname)

  return (
    <div className="coming-soon-page">
      <SubPageHero eyebrow={eyebrow} title={title} />
      <div className="coming-soon">
        <div className="coming-soon__icon">🚧</div>
        <p className="coming-soon__desc">빠른 시일 내에 오픈할 예정입니다.</p>
        <Link to="/" className="coming-soon__btn">홈으로 돌아가기</Link>
      </div>
    </div>
  )
}
