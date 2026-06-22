import { Link } from 'react-router-dom'
import NewsNoticeItem from './NewsNoticeItem'
import './NewsNoticeColumn.css'

export default function NewsNoticeColumn({ title, items, linkPath }) {
  return (
    <div className="news-notice-col">
      <h3 className="news-notice-col__title">{title}</h3>
      <div className="news-notice-col__items">
        {items.map((item) => (
          <NewsNoticeItem
            key={item.id}
            title={item.title}
            summary={item.summary}
            path={item.path}
          />
        ))}
      </div>
      <Link to={linkPath} className="news-notice-col__more">
        바로가기
        <span className="news-notice-col__more-icon">
          <i className="fas fa-chevron-right" />
        </span>
      </Link>
    </div>
  )
}
