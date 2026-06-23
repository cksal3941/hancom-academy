import educationFieldsData from '../../data/educationFieldsData'
import EducationFieldCard from '../cards/EducationFieldCard'
import './EducationFieldSection.css'

export default function EducationFieldSection() {
  return (
    <section className="edu-field">
      <div className="edu-field__inner">
        <div className="edu-field__head">
          <p className="edu-field__label" data-aos="fade-up">COURSES</p>
          <h2 className="edu-field__title" data-aos="fade-up" data-aos-delay="100">전문 교육 분야</h2>
          <p className="edu-field__desc" data-aos="fade-up" data-aos-delay="200">한글과 컴퓨터 학원의 주요 교육 과정을 확인해 보세요.</p>
        </div>
        <div className="edu-field__cards">
          {educationFieldsData.map((item, i) => (
            <div
              key={item.id}
              className="edu-card-aos-wrap"
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              <EducationFieldCard
                image={item.image}
                description={item.description}
                title={item.title}
                path={item.path}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
