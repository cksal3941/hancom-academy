import educationFieldsData from '../../data/educationFieldsData'
import EducationFieldCard from '../cards/EducationFieldCard'
import './EducationFieldSection.css'

export default function EducationFieldSection() {
  return (
    <section className="edu-field">
      <div className="edu-field__inner">
        <div className="edu-field__head">
          <p className="edu-field__label">COURSES</p>
          <h2 className="edu-field__title">전문 교육 분야</h2>
          <p className="edu-field__desc">한글과 컴퓨터 학원의 주요 교육 과정을 확인해 보세요.</p>
        </div>
        <div className="edu-field__cards">
          {educationFieldsData.map(item => (
            <EducationFieldCard
              key={item.id}
              image={item.image}
              description={item.description}
              title={item.title}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
