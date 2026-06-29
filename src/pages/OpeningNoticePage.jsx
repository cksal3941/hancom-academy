import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit3, FiHome, FiSearch } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import openingNewsData from '../data/openingNewsData'
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

export default function OpeningNoticePage() {
  const [searchField, setSearchField] = useState('title')
  const [keyword, setKeyword] = useState('')

  const filteredData = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return openingNewsData
    return openingNewsData.filter((item) =>
      String(item[searchField] ?? item.summary ?? '').toLowerCase().includes(q),
    )
  }, [keyword, searchField])

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
              <Link to="/notice/start/write" className="notice-board__write">
                <FiEdit3 aria-hidden="true" />
                글쓰기
              </Link>
            </div>
          </div>

          <div className="notice-board__table" role="table" aria-label="개강소식 목록">
            {filteredData.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="notice-board__row"
                role="row"
              >
                <span className="notice-board__no">{item.id}</span>
                <span className="notice-board__title">
                  <em>{item.category}</em>
                  {item.title}
                </span>
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
