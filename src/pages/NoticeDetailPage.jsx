import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiEdit3, FiHome, FiTrash2 } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import { deleteNotice, fetchNoticeById, incrementNoticeViews } from '../services/noticeService'
import './NoticePage.css'

const heroTabs = [
  { label: '공지사항', to: '/notice', active: true },
  { label: '개강소식', to: '/notice/start' },
  { label: '뉴스', to: '/notice/news' },
]

export default function NoticeDetailPage() {
  const { noticeId } = useParams()
  const navigate = useNavigate()
  const [notice, setNotice] = useState(null)
  const [loading, setLoading] = useState(true)
  const viewedRef = useRef(false)

  const handleDelete = async () => {
    if (!window.confirm('이 게시글을 삭제하시겠습니까?')) return
    try {
      await deleteNotice(noticeId)
      navigate('/notice')
    } catch {
      alert('삭제에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  useEffect(() => {
    fetchNoticeById(noticeId).then((data) => {
      setNotice(data)
      setLoading(false)
      if (!viewedRef.current) {
        viewedRef.current = true
        incrementNoticeViews(noticeId)
      }
    })
  }, [noticeId])

  if (loading) {
    return (
      <div className="notice-page">
        <div className="notice-board">
          <div className="notice-board__inner">
            <div className="notice-board__auth">
              <span className="notice-board__spinner" aria-label="불러오는 중" />
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              {notice.images?.length > 0 && (
                <div className="notice-detail__images">
                  {notice.images.map((url) => (
                    <img key={url} src={url} alt="" className="notice-detail__img" />
                  ))}
                </div>
              )}
            </div>

            <div className="notice-detail__actions">
              <Link to="/notice" className="notice-detail__back">
                <FiArrowLeft aria-hidden="true" />
                목록으로
              </Link>
              <div className="notice-detail__actions-right">
                <button type="button" className="notice-board__delete" onClick={handleDelete}>
                  <FiTrash2 aria-hidden="true" />
                  삭제하기
                </button>
                <Link to={`/notice/${noticeId}/edit`} className="notice-board__write">
                  <FiEdit3 aria-hidden="true" />
                  수정하기
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
