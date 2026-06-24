import './LocationInfoCard.css'

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
)

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.4 21 3 14.6 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02L6.6 10.8z"/>
  </svg>
)

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <polyline points="12 7 12 12 15.5 15.5"/>
  </svg>
)

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const items = [
  { icon: <IconPin />,      key: 'address', label: '주소' },
  { icon: <IconPhone />,    key: 'phone',   label: '전화번호' },
  { icon: <IconClock />,    key: 'hours',   label: '운영시간' },
  { icon: <IconCalendar />, key: 'closed',  label: '휴무일' },
]

export default function LocationInfoCard({ location }) {
  return (
    <div className="location-card">
      <h3 className="location-card__name">{location.name}</h3>

      <ul className="location-card__list">
        {items.map(({ icon, key, label }) => (
          <li key={key} className="location-card__item">
            <span className="location-card__icon">{icon}</span>
            <span className="location-card__item-body">
              <span className="location-card__item-label">{label}</span>
              <span className="location-card__item-value">{location[key]}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
