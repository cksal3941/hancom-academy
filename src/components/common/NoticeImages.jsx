import { useEffect, useRef, useState } from 'react'

const ZOOM_STEPS = [1, 1.5, 2, 3]

export default function NoticeImages({ images }) {
  const [lightbox, setLightbox] = useState(null)
  const [zoomIdx, setZoomIdx] = useState(0)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)
  const imgRef = useRef(null)
  const zoom = ZOOM_STEPS[zoomIdx]

  const openLightbox = (url) => {
    setLightbox(url)
    setZoomIdx(0)
    setPan({ x: 0, y: 0 })
  }

  const closeLightbox = () => setLightbox(null)

  // pan 초기화 when zoom resets to 1
  useEffect(() => {
    if (zoomIdx === 0) setPan({ x: 0, y: 0 })
  }, [zoomIdx])

  // ESC 닫기 + 스크롤 잠금
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  // 스크롤 휠 줌 (passive: false 필수)
  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      if (e.deltaY < 0) {
        setZoomIdx(i => Math.min(ZOOM_STEPS.length - 1, i + 1))
      } else {
        setZoomIdx(i => Math.max(0, i - 1))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [lightbox])

  const handlePointerDown = (e) => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y, moved: false }
  }

  const handlePointerMove = (e) => {
    const d = dragRef.current
    if (!d || zoom <= 1) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true
    if (d.moved) setPan({ x: d.panX + dx, y: d.panY + dy })
  }

  const handlePointerUp = () => {
    const d = dragRef.current
    dragRef.current = null
    if (!d || d.moved) return
    // 드래그 아닌 클릭 → 다음 줌 단계로 (마지막이면 1x로 리셋)
    setZoomIdx(i => (i + 1) % ZOOM_STEPS.length)
  }

  if (!images?.length) return null

  return (
    <>
      <div className="notice-detail__images">
        {images.map((url) => (
          <img
            key={url}
            src={url}
            alt=""
            className="notice-detail__img"
            onClick={() => openLightbox(url)}
          />
        ))}
      </div>

      {lightbox && (
        <div className="notice-lightbox" onClick={closeLightbox}>
          <button
            type="button"
            className="notice-lightbox__close"
            onClick={closeLightbox}
            aria-label="닫기"
          >
            ✕
          </button>
<img
            ref={imgRef}
            src={lightbox}
            alt=""
            className="notice-lightbox__img"
            draggable={false}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? 'grab' : 'zoom-in',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
