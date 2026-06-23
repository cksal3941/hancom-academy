import { Link } from 'react-router-dom'
import './EducationFieldCard.css'

export default function EducationFieldCard({ image, description, title, path }) {
  return (
    <Link to={path} className="edu-card">
      <div className="edu-card__img-wrap">
        <img src={image} alt={title} className="edu-card__img" />
      </div>
      <p className="edu-card__desc">{description}</p>
      <h3 className="edu-card__title">{title}</h3>
    </Link>
  )
}
