import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiEdit3, FiHome, FiLock, FiSearch } from 'react-icons/fi'
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

const categoryOptions = ['전체', '수업안내', '운영안내', '대회일정', '이벤트']
const searchOptions = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
  { label: '작성자', value: 'author' },
]

export default function NoticePage() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const [category, setCategory] = useState('전체')
  const [searchField, setSearchField] = useState('title')
  const [keyword, setKeyword] = useState('')
  const isAdmin = isAdminUser(user)

  const filteredNotices = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return noticeData.filter((notice) => {
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
  }, [category, keyword, searchField])

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

              {isAdmin && (
                <div className="notice-board__admin">
                  <button type="button" className="notice-board__write">
                    <FiEdit3 aria-hidden="true" />
                    글쓰기
                  </button>
                </div>
              )}

              <div className="notice-board__table" role="table" aria-label="공지사항 목록">
                {filteredNotices.map((notice) => (
                  <Link
                    key={notice.id}
                    to={notice.path}
                    className="notice-board__row"
                    role="row"
                  >
                    <span className="notice-board__no">{notice.id}</span>
                    <span className="notice-board__title">
                      <em>{notice.category}</em>
                      {notice.title}
                    </span>
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

              <div className="notice-board__pagination" aria-label="페이지">
                <button type="button" className="notice-board__page notice-board__page--active">
                  1
                </button>
              </div>
        </div>
      </section>
    </div>
  )
}
