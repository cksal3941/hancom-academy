import MainVisual from '../sections/MainVisual'
import SeminarSection from '../sections/SeminarSection'
import EducationFieldSection from '../components/home/EducationFieldSection'
import AcademyIntroSection from '../components/home/AcademyIntroSection'
import LocationSection from '../components/home/LocationSection'
import NewsNoticeSection from '../components/home/NewsNoticeSection'
import './HomePage.css'

export default function HomePage() {
  return (
    <>
      {/* Header + MainVisual + NewsNoticeSection = 100vh */}
      <div className="above-fold snap-section snap-section--full">
        <MainVisual />
        <NewsNoticeSection />
      </div>

      {/* 이하 각 섹션 = 100vh */}
      <EducationFieldSection />
      <AcademyIntroSection />
      <SeminarSection />
      <LocationSection />
    </>
  )
}
