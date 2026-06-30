import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import seminarData from '../data/seminarData'
import './SeminarSection.css'

const getThumb = (videoId) =>
  videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null

export default function SeminarSection() {
  return (
    <section className="seminar">
      <div className="seminar__head">
        <p className="seminar__label" data-aos="fade-up">INFO SESSION</p>
        <h2 className="seminar__title" data-aos="fade-up" data-aos-delay="100">교육 설명회</h2>
        <p className="seminar__desc" data-aos="fade-up" data-aos-delay="200">
          한글과 컴퓨터 학원의 수업 방식과 학습 과정을 설명회 영상으로 확인해보세요.
        </p>
      </div>

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
          {seminarData.map(item => {
            const thumb = getThumb(item.videoId)
            const CardWrapper = item.youtubeUrl ? 'a' : 'div'
            const linkProps = item.youtubeUrl
              ? { href: item.youtubeUrl, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <SwiperSlide key={item.id} className="seminar__slide">
                <CardWrapper
                  className="seminar__card"
                  aria-label={item.title}
                  {...linkProps}
                >
                  <div className="seminar__card-thumb">
                    {thumb && (
                      <img src={thumb} alt={item.title} className="seminar__card-img" />
                    )}
                    {!item.youtubeUrl && (
                      <div className="seminar__card-coming">준비 중</div>
                    )}
                  </div>
                  <div className="seminar__card-body">
                    <h3 className="seminar__card-title">{item.title}</h3>
                    <p className="seminar__card-desc">{item.description}</p>
                  </div>
                </CardWrapper>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
