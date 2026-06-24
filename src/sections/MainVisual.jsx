import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import './MainVisual.css'

import slide1 from '../assets/main_slide1_d.png'
import slide2 from '../assets/main_slide2_d.png'
import slide3 from '../assets/main_slide3_d.png'
import slide4 from '../assets/main_slide4_d.png'
import slide5 from '../assets/main_slide5_d.png'
import slideM1 from '../assets/main_slide1_m.png'
import slideM2 from '../assets/main_slide2_m.png'
import slideM3 from '../assets/main_slide3_m.png'
import slideM4 from '../assets/main_slide4_m.png'
import slideM5 from '../assets/main_slide5_m.png'

const slides = [
  { src: slide1, mobileSrc: slideM1, theme: 'light' },
  { src: slide2, mobileSrc: slideM2, theme: 'dark' },
  { src: slide3, mobileSrc: slideM3, theme: 'dark' },
  { src: slide4, mobileSrc: slideM4, theme: 'dark' },
  { src: slide5, mobileSrc: slideM5, theme: 'dark' },
]

const dispatchTheme = (swiper) => {
  const theme = slides[swiper.realIndex]?.theme ?? 'dark'
  window.__slideTheme = theme // 늦게 마운트되는 컴포넌트가 읽을 수 있도록 보존
  window.dispatchEvent(new CustomEvent('header-theme', { detail: { theme } }))
}

export default function MainVisual() {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [fillKey, setFillKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const handlePrev = () => {
    if (!swiperRef.current) return
    swiperRef.current.slidePrev()
    if (isPlaying) swiperRef.current.autoplay.start()
  }

  const handleNext = () => {
    if (!swiperRef.current) return
    swiperRef.current.slideNext()
    if (isPlaying) swiperRef.current.autoplay.start()
  }

  const togglePlay = () => {
    if (!swiperRef.current) return
    if (isPlaying) {
      swiperRef.current.autoplay.stop()
      setIsPlaying(false)
    } else {
      swiperRef.current.autoplay.start()
      setIsPlaying(true)
    }
  }

  return (
    <section className="main-visual">
      <div className="main-visual__slider-wrap">
        <Swiper
          modules={[Autoplay, EffectFade]}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            dispatchTheme(swiper)
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
            setFillKey(k => k + 1)
            dispatchTheme(swiper)
          }}
          className="main-visual__swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="main-visual__slide">
                <picture>
                  <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
                  <img src={slide.src} alt={`메인 슬라이드 ${index + 1}`} />
                </picture>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="main-visual__controls" data-aos="fade-up" data-aos-delay="200">
          <div className="main-visual__progress-bar">
            <div
              key={fillKey}
              className={`main-visual__progress-fill${isPlaying ? '' : ' main-visual__progress-fill--paused'}`}
            />
          </div>
          <button
            type="button"
            className="main-visual__control-btn"
            onClick={handlePrev}
            aria-label="이전 슬라이드"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <div className="main-visual__pagination">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
          <button
            type="button"
            className="main-visual__control-btn"
            onClick={handleNext}
            aria-label="다음 슬라이드"
          >
            <i className="fas fa-chevron-right" />
          </button>
          <button
            type="button"
            className="main-visual__control-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? '일시정지' : '재생'}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
          </button>
        </div>
      </div>
    </section>
  )
}
