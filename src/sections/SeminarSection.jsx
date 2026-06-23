import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import seminarData from '../data/seminarData'
import './SeminarSection.css'

export default function SeminarSection() {
  return (
    <section className="seminar">
      {/* 타이틀 영역 */}
      <div className="seminar__head">
        <p className="seminar__label" data-aos="fade-up">INFO SESSION</p>
        <h2 className="seminar__title" data-aos="fade-up" data-aos-delay="100">교육 설명회</h2>
        <p className="seminar__desc" data-aos="fade-up" data-aos-delay="200">
          한글과 컴퓨터 학원의 수업 방식과 학습 과정을 설명회 영상으로 확인해보세요.
        </p>
      </div>

      {/* 슬라이드 wrapper에만 AOS 적용 — track/slide 내부 제외 */}
      <div className="seminar__slider-wrap" data-aos="fade-up" data-aos-delay="250">
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
              <a
                className="seminar__card"
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title}
              >
                <div className="seminar__card-thumb">
                  <img src={item.image} alt={item.title} className="seminar__card-img" />
                </div>
                <div className="seminar__card-body">
                  <h3 className="seminar__card-title">{item.title}</h3>
                  <p className="seminar__card-desc">{item.description}</p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
