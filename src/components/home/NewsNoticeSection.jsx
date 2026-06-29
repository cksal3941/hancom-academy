import { useEffect, useState } from 'react'
import openingNewsData from '../../data/openingNewsData'
import noticeData from '../../data/noticeData'
import newsData from '../../data/newsData'
import { fetchNotices } from '../../services/noticeService'
import NewsNoticeColumn from '../cards/NewsNoticeColumn'
import './NewsNoticeSection.css'

export default function NewsNoticeSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [latestNotices, setLatestNotices] = useState(noticeData)

  useEffect(() => {
    fetchNotices().then(setLatestNotices).catch(() => {})
  }, [])

  const columns = [
    { title: '개강소식', data: openingNewsData,   linkPath: '/opening-news' },
    { title: '공지사항', data: latestNotices,      linkPath: '/notice'       },
    { title: '뉴스',    data: newsData,            linkPath: '/news'         },
  ]

  return (
    <section className="news-notice">
      {/* 모바일 탭 바 (데스크탑에서는 CSS로 숨김) */}
      <div className="news-notice__tab-bar">
        {columns.map(({ title }, i) => (
          <button
            key={title}
            type="button"
            className={`news-notice__tab${activeTab === i ? ' news-notice__tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="news-notice__inner">
        {columns.map(({ title, data, linkPath }, i) => (
          <NewsNoticeColumn
            key={title}
            title={title}
            items={data.slice(0, 2)}
            linkPath={linkPath}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className={activeTab !== i ? 'news-notice-col--hidden-mobile' : ''}
          />
        ))}
      </div>
    </section>
  )
}
