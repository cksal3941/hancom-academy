import './AcademyIntroSection.css'

export default function AcademyIntroSection() {
  return (
    <section className="academy-intro">
      <div className="container academy-intro__inner">
        <div className="academy-intro__left">
          <span className="skeleton-tag" style={{ color: '#fff' }}>Section 3 | AcademyIntroSection</span>
          <div className="ph ph--light" style={{ height: 18, width: 120, marginBottom: 8 }} />
          <div className="ph ph--light" style={{ height: 64, width: '80%', marginBottom: 16 }} />
          <div className="ph ph--light" style={{ height: 80, width: '90%', marginBottom: 24 }} />
          <div className="ph ph--light" style={{ height: 40, width: 140 }} />
        </div>
        <div className="academy-intro__right">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="ph ph--light academy-intro__card" />
          ))}
        </div>
      </div>
    </section>
  )
}
