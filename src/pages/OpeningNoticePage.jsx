import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit3, FiHome, FiSearch } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import openingNewsData from '../data/openingNewsData'
import { fetchOpeningNotices } from '../services/noticeService'
import './NoticePage.css'

const heroTabs = [
  { label: '공지사항', to: '/notice/announcement' },
  { label: '개강소식', to: '/notice/start', active: true },
  { label: '뉴스', to: '/notice/news' },
]

const searchOptions = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
]

const PAGE_SIZE = 10

export default function OpeningNoticePage() {
  const [items, setItems] = useState(openingNewsData)
  const [searchField, setSearchField] = useState('title')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchOpeningNotices().then(setItems).catch(() => {})
  }, [])

  useEffect(() => { setCurrentPage(1) }, [keyword, searchField])

  const filteredData = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) =>
      String(item[searchField] ?? item.summary ?? '').toLowerCase().includes(q),
    )
  }, [items, keyword, searchField])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE))
  const pagedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => Math.abs(p - currentPage) <= 2)

  return (
    <div className="notice-page">
      <SubPageHero eyebrow="공지 및 소식" title="개강소식" tabs={heroTabs} />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>공지 및 소식</span>
          <span className="subpage-breadcrumb__chevron">&gt;</span>
          <strong>개강소식</strong>
        </div>
      </div>

      <section className="notice-board">
        <div className="notice-board__inner">
          <div className="notice-board__top">
            <p className="notice-board__total">
              총 <strong>{filteredData.length}</strong>건
            </p>

            <div className="notice-board__tools">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                aria-label="검색 기준"
              >
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
            </div>
          </div>

          <div className="notice-board__table" role="table" aria-label="개강소식 목록">
            <div className="notice-board__head" role="row">
              <span className="notice-board__no">번호</span>
              <span className="notice-board__category">구분</span>
              <span className="notice-board__title">제목</span>
              <span className="notice-board__author">작성자</span>
              <span className="notice-board__views">조회수</span>
              <span className="notice-board__date">등록일</span>
            </div>
            {pagedData.map((item, index) => (
              <Link
                key={item.id}
                to={item.path}
                className="notice-board__row"
                role="row"
              >
                <span className="notice-board__no">
                  {filteredData.length - (currentPage - 1) * PAGE_SIZE - index}
                </span>
                <span className="notice-board__category">{item.category}</span>
                <span className="notice-board__title">{item.title}</span>
                <span className="notice-board__author">{item.author}</span>
                <span className="notice-board__views">{item.views}</span>
                <time className="notice-board__date" dateTime={item.date}>
                  {item.date}
                </time>
              </Link>
            ))}

            {filteredData.length === 0 && (
              <p className="notice-board__empty">검색 결과가 없습니다.</p>
            )}
          </div>

          <div className="notice-board__write-row">
            <Link to="/notice/start/write" className="notice-board__write">
              <FiEdit3 aria-hidden="true" />
              글쓰기
            </Link>
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
