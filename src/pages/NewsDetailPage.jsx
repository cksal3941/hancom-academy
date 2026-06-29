import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiEdit3, FiHome, FiTrash2 } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import { deleteNews, fetchNewsById, incrementNewsViews } from '../services/newsService'
import './NoticePage.css'

const heroTabs = [
  { label: '공지사항', to: '/notice' },
  { label: '개강소식', to: '/notice/start' },
  { label: '뉴스', to: '/news', active: true },
]

export default function NewsDetailPage() {
  const { newsId } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const viewedRef = useRef(false)

  const handleDelete = async () => {
    if (!window.confirm('이 게시글을 삭제하시겠습니까?')) return
    try {
      await deleteNews(newsId)
      navigate('/notice/news')
    } catch {
      alert('삭제에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  useEffect(() => {
    fetchNewsById(newsId).then((data) => {
      setNews(data)
      setLoading(false)
      if (!viewedRef.current) {
        viewedRef.current = true
        incrementNewsViews(newsId)
      }
    })
  }, [newsId])

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

  if (!news) return <Navigate to="/news" replace />

  const paragraphs = news.content ?? [news.summary].filter(Boolean)

  return (
    <div className="notice-page">
      <SubPageHero eyebrow="공지 및 소식" title="뉴스" tabs={heroTabs} />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>공지 및 소식</span>
          <span className="subpage-breadcrumb__chevron">&gt;</span>
          <strong>뉴스</strong>
        </div>
      </div>

      <section className="notice-board">
        <div className="notice-board__inner">
          <article className="notice-detail">
            <div className="notice-detail__head">
              <p>{news.category}</p>
              <h2>{news.title}</h2>
              <div className="notice-detail__meta">
                <span>{news.author}</span>
                <span>조회 {news.views}</span>
                <time dateTime={news.date}>{news.date}</time>
              </div>
            </div>

            <div className="notice-detail__body">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {news.images?.length > 0 && (
                <div className="notice-detail__images">
                  {news.images.map((url) => (
                    <img key={url} src={url} alt="" className="notice-detail__img" />
                  ))}
                </div>
              )}
            </div>

            <div className="notice-detail__actions">
              <Link to="/notice/news" className="notice-detail__back">
                <FiArrowLeft aria-hidden="true" />
                목록으로
              </Link>
              <div className="notice-detail__actions-right">
                <button type="button" className="notice-board__delete" onClick={handleDelete}>
                  <FiTrash2 aria-hidden="true" />
                  삭제하기
                </button>
                <Link to={`/notice/news/${newsId}/edit`} className="notice-board__write">
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
