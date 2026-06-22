import './LocationSection.css'

export default function LocationSection() {
  return (
    <section className="location">
      <div className="container location__inner">
        <div className="location__info">
          <span className="skeleton-tag" style={{ color: '#fff' }}>Section 5 | LocationSection</span>
          <div className="ph ph--light" style={{ height: 18, width: 80, marginBottom: 8 }} />
          <div className="ph ph--light" style={{ height: 44, width: 180, marginBottom: 32 }} />
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="ph ph--light" style={{ height: 20, width: '75%', marginBottom: 12 }} />
          ))}
        </div>
        <div className="location__map">
          <div className="ph ph--light location__map-box" />
        </div>
      </div>
    </section>
  )
}
