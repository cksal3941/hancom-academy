import heroImage from '../../assets/about-hero-3d.png'
import './SubPageHero.css'

export default function SubPageHero({ eyebrow, title }) {
  return (
    <section className="subpage-hero">
      <picture className="subpage-hero__image" aria-hidden="true">
        <img src={heroImage} alt="" />
      </picture>
      <div className="subpage-hero__shade" />
      <div className="subpage-hero__content">
        {eyebrow && <p className="subpage-hero__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
    </section>
  )
}
