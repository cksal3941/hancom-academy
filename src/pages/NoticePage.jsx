import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { FiEdit3, FiHome, FiSearch } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import noticeData from '../data/noticeData'
import { fetchNotices } from '../services/noticeService'
import { useAuth } from '../hooks/useAuth'
import './NoticePage.css'

const heroTabs = [
  { label: '공지사항', to: '/notice', active: true },
  { label: '개강소식', to: '/notice/start' },
  { label: '뉴스', to: '/notice/news' },
]

const categoryOptions = ['전체', '수업안내', '운영안내', '대회일정', '이벤트']
const searchOptions = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
  { label: '작성자', value: 'author' },
]

const PAGE_SIZE = 10

export default function NoticePage() {
  const { user, loading: authLoading } = useAuth()
  const location = useLocation()
  const [notices, setNotices] = useState(noticeData)
  const [category, setCategory] = useState('전체')
  const [searchField, setSearchField] = useState('title')
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchNotices().then(setNotices).catch(() => {})
  }, [])

  useEffect(() => { setCurrentPage(1) }, [category, keyword, searchField])

  const filteredNotices = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return notices.filter((notice) => {
      const categoryMatched = category === '전체' || notice.category === category
      if (!categoryMatched) return false
      if (!normalizedKeyword) return true

      if (searchField === 'content') {
        return [
          notice.title,
          notice.summary,
          ...(notice.content ?? []),
        ].join(' ').toLowerCase().includes(normalizedKeyword)
      }

      return String(notice[searchField] ?? '').toLowerCase().includes(normalizedKeyword)
    })
  }, [notices, category, keyword, searchField])

  if (authLoading) {
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

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  const totalPages = Math.max(1, Math.ceil(filteredNotices.length / PAGE_SIZE))
  const pagedNotices = filteredNotices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => Math.abs(p - currentPage) <= 2)

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
          <div className="notice-board__top">
                <p className="notice-board__total">
                  총 <strong>{filteredNotices.length}</strong>건
                </p>

                <div className="notice-board__tools">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    aria-label="공지 분류"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <select
                    value={searchField}
                    onChange={(event) => setSearchField(event.target.value)}
                    aria-label="검색 기준"
                  >
                    {searchOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <label className="notice-board__search">
                    <span className="sr-only">검색어</span>
                    <input
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                      placeholder="검색어를 입력해 주세요."
                    />
                    <FiSearch aria-hidden="true" />
                  </label>
                </div>
              </div>

              <div className="notice-board__table" role="table" aria-label="공지사항 목록">
                <div className="notice-board__head" role="row">
                  <span className="notice-board__no">번호</span>
                  <span className="notice-board__category">구분</span>
                  <span className="notice-board__title">제목</span>
                  <span className="notice-board__author">작성자</span>
                  <span className="notice-board__views">조회수</span>
                  <span className="notice-board__date">등록일</span>
                </div>
                {pagedNotices.map((notice, index) => (
                  <Link
                    key={notice.id}
                    to={notice.path}
                    className="notice-board__row"
                    role="row"
                  >
                    <span className="notice-board__no">
                      {filteredNotices.length - (currentPage - 1) * PAGE_SIZE - index}
                    </span>
                    <span className="notice-board__category">{notice.category}</span>
                    <span className="notice-board__title">{notice.title}</span>
                    <span className="notice-board__author">{notice.author}</span>
                    <span className="notice-board__views">{notice.views}</span>
                    <time className="notice-board__date" dateTime={notice.date}>
                      {notice.date}
                    </time>
                  </Link>
                ))}

                {filteredNotices.length === 0 && (
                  <p className="notice-board__empty">검색 결과가 없습니다.</p>
                )}
              </div>

              <div className="notice-board__write-row">
                <Link to="/notice/write" className="notice-board__write">
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
