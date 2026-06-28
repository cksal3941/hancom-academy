import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { FiArrowLeft, FiEdit3, FiHome, FiLock } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import { useAuth } from '../hooks/useAuth'
import noticeData from '../data/noticeData'
import { isAdminUser } from '../utils/admin'
import './NoticePage.css'

const heroTabs = [
  { label: '공지사항', to: '/notice', active: true },
  { label: '개강소식', to: '/notice/start' },
  { label: '뉴스', to: '/notice/news' },
]

export default function NoticeDetailPage() {
  const { noticeId } = useParams()
  const { user, loading } = useAuth()
  const location = useLocation()
  const notice = noticeData.find((item) => String(item.id) === String(noticeId))
  const isAdmin = isAdminUser(user)

  if (!notice) {
    return <Navigate to="/notice" replace />
  }

  return (
    <div className="notice-page">
      <SubPageHero eyebrow="공지 및 소식" title="공지사항" tabs={heroTabs} />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>공지 및 소식</span>
          <span className="subpage-breadcrumb__chevron">&gt;</span>
          <strong>공지사항</strong>
        </div>
      </div>

      <section className="notice-board">
        <div className="notice-board__inner">
          {loading ? (
            <div className="notice-board__auth">
              <span className="notice-board__spinner" aria-label="불러오는 중" />
            </div>
          ) : !user ? (
            <div className="notice-board__auth">
              <FiLock aria-hidden="true" />
              <h2>로그인이 필요한 게시글입니다.</h2>
              <p>공지사항 게시글은 로그인한 회원만 확인할 수 있습니다.</p>
              <Link to="/login" state={{ from: location.pathname }} className="notice-board__login">
                로그인하기
              </Link>
            </div>
          ) : (
            <article className="notice-detail">
              <div className="notice-detail__head">
                <p>{notice.category}</p>
                <h2>{notice.title}</h2>
                <div className="notice-detail__meta">
                  <span>{notice.author}</span>
                  <span>조회 {notice.views}</span>
                  <time dateTime={notice.date}>{notice.date}</time>
                </div>
              </div>

              <div className="notice-detail__body">
                {notice.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="notice-detail__actions">
                <Link to="/notice" className="notice-detail__back">
                  <FiArrowLeft aria-hidden="true" />
                  목록으로
                </Link>
                {isAdmin && (
                  <button type="button" className="notice-board__write">
                    <FiEdit3 aria-hidden="true" />
                    수정
                  </button>
                )}
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  )
}
