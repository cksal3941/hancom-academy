import './AcademyIntroCard.css'

export default function AcademyIntroCard({ label, title, description, image }) {
  return (
    <div className="academy-card">
      <div className="academy-card__body">
        <span className="academy-card__label">{label}</span>
        <h3 className="academy-card__title">{title}</h3>
        <p className="academy-card__desc">{description}</p>
      </div>
      <div className="academy-card__icon">
        <img src={image} alt={title} />
      </div>
    </div>
  )
}
