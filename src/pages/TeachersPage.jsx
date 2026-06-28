import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import aboutHeroImage from '../assets/about-hero-3d.png'
import { teacherData } from '../data/teacherData'
import './TeachersPage.css'

const tabs = [
  { label: '학원 소개', to: '/about/intro' },
  { label: '강사진 소개', to: '/about/teachers', active: true },
  { label: '수상 실적', to: '/about/awards' },
  { label: '오시는 길', to: '/about/location' },
]

export default function TeachersPage() {
  return (
    <div className="teachers-page">
      <section className="teachers-hero">
        <picture className="teachers-hero__image" aria-hidden="true">
          <img src={aboutHeroImage} alt="" />
        </picture>
        <div className="teachers-hero__shade" />
        <div className="teachers-hero__content">
          <p>학원 소개</p>
          <h1>강사진 소개</h1>

          <nav className="teachers-tabs" aria-label="학원 소개 메뉴">
            {tabs.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                className={`teachers-tabs__item${tab.active ? ' teachers-tabs__item--active' : ''}`}
                aria-current={tab.active ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="teachers-breadcrumb">
        <div className="teachers-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>학원 소개</span>
          <span className="teachers-breadcrumb__chevron">›</span>
          <strong>강사진 소개</strong>
        </div>
      </div>

      <section className="teachers-list">
        <div className="teachers-list__heading" data-aos="fade-up">
          <p>EXPERT FACULTY</p>
          <h2>학생의 가능성을 발견하는<br />한컴의 교육 전문가</h2>
        </div>

        <div className="teachers-grid">
          {teacherData.map((teacher, index) => (
            <article
              key={teacher.id}
              className="teacher-card"
              tabIndex="0"
              data-aos="fade-up"
              data-aos-delay={(index % 2) * 100}
            >
              <img
                src={teacher.image}
                alt={`${teacher.name} ${teacher.role}`}
                className="teacher-card__photo"
                loading="lazy"
              />

              <div className="teacher-card__content">
                <p className="teacher-card__field">{teacher.field}</p>
                <div className="teacher-card__name">
                  <h3>{teacher.name}</h3>
                  <span>{teacher.role}</span>
                </div>
                <div className="teacher-card__career">
                  {teacher.career.map((career) => <p key={career}>{career}</p>)}
                </div>
                <a href={`mailto:${teacher.email}`} className="teacher-card__email">
                  {teacher.email}
                </a>
                <div className="teacher-card__campuses">
                  {teacher.campuses.map((campus) => <span key={campus}>{campus}</span>)}
                </div>
              </div>

              <div className="teacher-card__overlay" aria-hidden="true">
                <span>HANCOM EDUCATOR</span>
                <p>{teacher.message}</p>
                <strong>{teacher.name} {teacher.role}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
