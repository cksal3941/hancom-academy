import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import seminarData from '../data/seminarData'
import './SeminarSection.css'

export default function SeminarSection() {
  return (
    <section className="seminar">
      {/* 타이틀 영역 — 중앙 정렬, max-width 제한 */}
      <div className="seminar__head">
        <p className="seminar__label">INFO SESSION</p>
        <h2 className="seminar__title">교육 설명회</h2>
        <p className="seminar__desc">
          한글과 컴퓨터 학원의 수업 방식과 학습 과정을 설명회 영상으로 확인해보세요.
        </p>
      </div>

      {/* 슬라이드 영역 — 100vw, max-width 없음 */}
      <div className="seminar__slider-wrap">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={140}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="seminar__swiper"
        >
          {seminarData.map(item => (
            <SwiperSlide key={item.id} className="seminar__slide">
              <div className="seminar__card">
                <div className="seminar__card-thumb">
                  <img src={item.image} alt={item.title} className="seminar__card-img" />
                </div>
                <div className="seminar__card-body">
                  <h3 className="seminar__card-title">{item.title}</h3>
                  <p className="seminar__card-desc">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
