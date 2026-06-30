import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit3, FiHome, FiSearch } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import newsData from '../data/newsData'
import { fetchNews } from '../services/newsService'
import './NoticePage.css'

const heroTabs = [
  { label: '공지사항', to: '/notice' },
  { label: '개강소식', to: '/notice/start' },
  { label: '뉴스', to: '/news', active: true },
]

const categoryOptions = ['전체', '수상소식', '인터뷰', '학원소식', '미디어']
const searchOptions = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
  { label: '작성자', value: 'author' },
]

const PAGE_SIZE = 10

export default function NewsPage() {
  const [news, setNews] = useState(newsData)
  const [category, setCategory] = useState('전체')
  const [searchField, setSearchField] = useState('title')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchNews().then(setNews).catch(() => {})
  }, [])

  useEffect(() => { setCurrentPage(1) }, [category, keyword, searchField])

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    return news.filter((item) => {
      const categoryMatched = category === '전체' || item.category === category
      if (!categoryMatched) return false
      if (!q) return true
      if (searchField === 'content') {
        return [item.title, item.summary, ...(item.content ?? [])].join(' ').toLowerCase().includes(q)
      }
      return String(item[searchField] ?? '').toLowerCase().includes(q)
    })
  }, [news, category, keyword, searchField])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pagedNews = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => Math.abs(p - currentPage) <= 2)

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
          <div className="notice-board__top">
            <p className="notice-board__total">
              총 <strong>{filtered.length}</strong>건
            </p>
            <div className="notice-board__tools">
              <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="뉴스 분류">
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <select value={searchField} onChange={(e) => setSearchField(e.target.value)} aria-label="검색 기준">
                {searchOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <label className="notice-board__search">
                <span className="sr-only">검색어</span>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="검색어를 입력해 주세요."
                />
                <FiSearch aria-hidden="true" />
              </label>
              <Link to="/news/write" className="notice-board__write">
                <FiEdit3 aria-hidden="true" />
                글쓰기
              </Link>
            </div>
          </div>

          <div className="notice-board__table" role="table" aria-label="뉴스 목록">
            {pagedNews.map((item, index) => (
              <Link key={item.id} to={item.path} className="notice-board__row" role="row">
                <span className="notice-board__no">
                  {filtered.length - (currentPage - 1) * PAGE_SIZE - index}
                </span>
                <span className="notice-board__title">
                  <em>{item.category}</em>
                  {item.title}
                </span>
                <span className="notice-board__author">{item.author}</span>
                <span className="notice-board__views">{item.views}</span>
                <time className="notice-board__date" dateTime={item.date}>{item.date}</time>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="notice-board__empty">검색 결과가 없습니다.</p>
            )}
          </div>

          <div className="notice-board__pagination" aria-label="페이지">
            <button
              type="button"
              className="notice-board__page notice-board__page--nav"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                type="button"
                className={`notice-board__page${p === currentPage ? ' notice-board__page--active' : ''}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className="notice-board__page notice-board__page--nav"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
