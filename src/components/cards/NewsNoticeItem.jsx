import { Link } from 'react-router-dom'
import './NewsNoticeItem.css'

export default function NewsNoticeItem({ title, summary, path }) {
  return (
    <Link to={path} className="news-notice-item">
      <p className="news-notice-item__title">{title}</p>
    </Link>
  )
}
