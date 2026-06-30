import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { IoChevronForward } from 'react-icons/io5'
import SubPageHero from '../components/common/SubPageHero'
import detail1 from '../assets/Course detail1.png'
import detail2 from '../assets/Course detail2.png'
import detail3 from '../assets/Course detail3.png'
import './CoursesGiftedPage.css'

const heroTabs = [
  { label: '영재고·과학고 내신', to: '/courses/gifted', active: true },
  { label: '정보올림피아드', to: '/courses/olympiad' },
  { label: 'OA·자격증', to: '/courses/certification' },
]

export default function CoursesGiftedPage() {
  return (
    <div className="courses-gifted-page">
      <SubPageHero
        eyebrow="교육과정"
        title="영재고·과학고 내신"
        tabs={heroTabs}
      />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome />
          <Link to="/">홈</Link>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <span>교육과정</span>
          <IoChevronForward className="subpage-breadcrumb__chevron" />
          <strong>영재고·과학고 내신</strong>
        </div>
      </div>

      <div className="courses-gifted-page__body">
        <img src={detail1} alt="영재고·과학고 내신 상세 1" className="courses-gifted-page__detail-img" />
        <img src={detail2} alt="영재고·과학고 내신 상세 2" className="courses-gifted-page__detail-img" />
        <img src={detail3} alt="영재고·과학고 내신 상세 3" className="courses-gifted-page__detail-img" />
      </div>
    </div>
  )
}
