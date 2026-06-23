import openingNewsData from '../../data/openingNewsData'
import noticeData from '../../data/noticeData'
import newsData from '../../data/newsData'
import NewsNoticeColumn from '../cards/NewsNoticeColumn'
import './NewsNoticeSection.css'

const columns = [
  { title: '개강소식', data: openingNewsData, linkPath: '/opening-news' },
  { title: '공지사항', data: noticeData,      linkPath: '/notice'       },
  { title: '뉴스',    data: newsData,         linkPath: '/news'         },
]

export default function NewsNoticeSection() {
  return (
    <section className="news-notice">
      <div className="news-notice__inner">
        {columns.map(({ title, data, linkPath }, i) => (
          <NewsNoticeColumn
            key={title}
            title={title}
            items={data.slice(0, 2)}
            linkPath={linkPath}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          />
        ))}
      </div>
    </section>
  )
}
