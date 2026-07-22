import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import './MainVisual.css'

import slide1 from '../assets/hero_slide1.png'
import slide2 from '../assets/hero_slide2.png'
import slide3 from '../assets/hero_slide3.png'
import slide4 from '../assets/hero_slide4.png'
import slide5 from '../assets/hero_slide5.png'
import slide1m from '../assets/hero_slide1_m.png'
import slide2m from '../assets/hero_slide2_m.png'
import slide3m from '../assets/hero_slide3_m.png'
import slide4m from '../assets/hero_slide4_m.png'
import slide5m from '../assets/hero_slide5_m.png'

const slides = [
  {
    src: slide1, mobileSrc: slide1m, theme: 'dark', headerTheme: 'light', align: 'left',
    objectPosition: 'right 65%',
    eyebrow: 'HANCOM ACADEMY',
    title: '미래를 이끄는\n인재를 키웁니다',
    desc: '영재고·과학고부터 정보올림피아드까지\n체계적인 커리큘럼으로 함께합니다',
  },
  {
    src: slide2, mobileSrc: slide2m, theme: 'dark', headerTheme: 'light', align: 'left', largeEyebrow: true, accentLabel: true,
    objectPosition: 'center 50%',
    eyebrow: '영재고 · 과학고 내신',
    title: '상위 1%를 위한\n특별한 교육',
    desc: '알고리즘 사고력과 문제 해결력\n집중 심화 과정으로 목표를 달성합니다',
  },
  {
    src: slide3, mobileSrc: slide3m, theme: 'dark', headerTheme: 'light', align: 'right', largeEyebrow: true, accentLabel: true,
    objectPosition: 'center 65%',
    eyebrow: '정보올림피아드',
    title: '전국 대회 수상\n명문 학원',
    desc: '체계적인 대회 준비와 실전 경험으로\n전국 최상위 성과를 만들어갑니다',
  },
  {
    src: slide4, mobileSrc: slide4m, theme: 'dark', headerTheme: 'light', align: 'left', largeEyebrow: true, accentLabel: true,
    objectPosition: 'center 70%',
    eyebrow: '맞춤형 학습',
    title: '1:1 개인 맞춤\n커리큘럼',
    desc: '학생 수준별로 설계된 맞춤 과정\n확실한 실력 향상을 보장합니다',
  },
  {
    src: slide5, mobileSrc: slide5m, theme: 'dark', headerTheme: 'light', align: 'right', largeEyebrow: true, accentLabel: true,
    objectPosition: 'center 55%',
    eyebrow: 'OA · 자격증',
    title: '자격증 취득부터\n실무 능력까지',
    desc: '컴퓨터 활용능력 자격증 취득\n실무 중심 체계적 교육 과정',
  },
]

const dispatchTheme = (swiper) => {
  const slide = slides[swiper.realIndex]
  const theme = slide?.headerTheme ?? slide?.theme ?? 'dark'
  window.__slideTheme = theme
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
                  <img
                    src={slide.src}
                    alt={`메인 슬라이드 ${index + 1}`}
                    fetchPriority={index === 0 ? 'high' : undefined}
                    style={{ objectPosition: slide.objectPosition }}
                  />
                </picture>
                <div className={`main-visual__overlay main-visual__overlay--${slide.align} main-visual__overlay--${slide.theme}`} />
                <div className={`main-visual__copy main-visual__copy--${slide.align ?? 'left'} main-visual__copy--${slide.theme}`}>
                  {slide.title && <h2 className="main-visual__copy-title">{slide.title}</h2>}
                  {slide.desc && <p className="main-visual__copy-desc">{slide.desc}</p>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="main-visual__controls" data-aos="zoom-in" data-aos-delay="200">
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
