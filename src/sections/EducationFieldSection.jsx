import './EducationFieldSection.css'

export default function EducationFieldSection() {
  return (
    <section className="edu-field">
      <div className="container">
        <span className="skeleton-tag">Section 2 | EducationFieldSection</span>
        <div className="ph" style={{ height: 18, width: 120, marginBottom: 8 }} />
        <div className="ph" style={{ height: 36, width: 220, marginBottom: 40 }} />
        <div className="edu-field__grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="edu-field__card">
              <div className="ph edu-field__icon" />
              <div className="ph" style={{ height: 18, width: '60%', marginTop: 16 }} />
              <div className="ph" style={{ height: 14, width: '80%', marginTop: 8 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
