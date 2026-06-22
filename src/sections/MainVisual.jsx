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

const slides = [slide1, slide2, slide3, slide4, slide5]

export default function MainVisual() {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(1)
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
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onAutoplayTimeLeft={(_, __, ratio) => setProgress(ratio)}
          className="main-visual__swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="main-visual__slide">
                <img src={slide} alt={`메인 슬라이드 ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="main-visual__controls">
          <button
            type="button"
            className="main-visual__control-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <div className="main-visual__pagination">
            {String(activeIndex + 1).padStart(2, '0')} - {String(slides.length).padStart(2, '0')}
          </div>
          <div className="main-visual__progress-bar">
            <div
              className="main-visual__progress-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <button
            type="button"
            className="main-visual__control-btn"
            onClick={handleNext}
          >
            Next
          </button>
          <button
            type="button"
            className="main-visual__control-btn"
            onClick={togglePlay}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </section>
  )
}
