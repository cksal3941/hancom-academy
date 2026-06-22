import './SeminarSection.css'

export default function SeminarSection() {
  return (
    <section className="seminar">
      <div className="container seminar__inner">
        <div className="seminar__head">
          <span className="skeleton-tag">Section 4 | SeminarSection</span>
          <div className="ph" style={{ height: 20, width: 80, marginTop: 4 }} />
          <div className="ph" style={{ height: 32, width: 160, marginTop: 6 }} />
        </div>
        <div className="seminar__cards">
          <div className="ph seminar__card seminar__card--featured" />
          <div className="seminar__card-group">
            <div className="ph seminar__card" />
            <div className="ph seminar__card" />
          </div>
        </div>
      </div>
    </section>
  )
}
