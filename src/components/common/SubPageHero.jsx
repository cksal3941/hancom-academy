import { Link } from 'react-router-dom'
import heroImage from '../../assets/about-hero-3d.png'
import './SubPageHero.css'

export default function SubPageHero({ eyebrow, title, tabs }) {
  return (
    <section className="subpage-hero">
      <picture className="subpage-hero__image" aria-hidden="true">
        <img src={heroImage} alt="" />
      </picture>
      <div className="subpage-hero__shade" />
      <div className="subpage-hero__content">
        {eyebrow && <p className="subpage-hero__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {tabs?.length > 0 && (
          <nav
            className="subpage-hero__tabs"
            aria-label="섹션 메뉴"
            style={{ '--tab-count': tabs.length }}
          >
            {tabs.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                className={`subpage-hero__tab${tab.active ? ' subpage-hero__tab--active' : ''}`}
                aria-current={tab.active ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
