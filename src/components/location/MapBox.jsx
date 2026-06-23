import { useEffect, useRef, useState } from 'react'
import './MapBox.css'

export default function MapBox({ lat, lng, name }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markerInstance = useRef(null)
  const [status, setStatus] = useState('idle') // idle | loading | ready | no-key | no-coords | error

  const apiKey = import.meta.env.VITE_KAKAO_MAP_KEY

  useEffect(() => {
    if (!apiKey) {
      setStatus('no-key')
      return
    }
    if (!lat || !lng) {
      setStatus('no-coords')
      return
    }

    const initOrUpdate = () => {
      if (!mapRef.current) return
      window.kakao.maps.load(() => {
        console.log('[MapBox] 카카오 맵 초기화 시작', { lat, lng })
        const center = new window.kakao.maps.LatLng(lat, lng)
        if (!mapInstance.current) {
          mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
            center,
            level: 4,
          })
          markerInstance.current = new window.kakao.maps.Marker({
            position: center,
            map: mapInstance.current,
          })
        } else {
          mapInstance.current.setCenter(center)
          markerInstance.current.setPosition(center)
        }
        setStatus('ready')
      })
    }

    if (window.kakao?.maps) {
      initOrUpdate()
      return
    }

    const existing = document.querySelector('script[data-kakao-map]')
    if (existing) {
      existing.addEventListener('load', initOrUpdate)
      return () => existing.removeEventListener('load', initOrUpdate)
    }

    setStatus('loading')
    const script = document.createElement('script')
    script.dataset.kakaoMap = ''
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    script.onload = initOrUpdate
    script.onerror = (e) => {
      console.error('[MapBox] 카카오 스크립트 로드 실패:', e)
      setStatus('error')
    }
    document.head.appendChild(script)
  }, [apiKey, lat, lng])

  const fallbackMessage =
    status === 'no-key' || status === 'error' ? '지도를 불러올 수 없습니다.' :
    status === 'no-coords' ? '좌표 정보가 필요합니다.' :
    null

  return (
    <div className="mapbox-wrap">
      {fallbackMessage && (
        <div className="mapbox__fallback">{fallbackMessage}</div>
      )}
      <div
        ref={mapRef}
        className="mapbox"
        style={{ visibility: fallbackMessage ? 'hidden' : 'visible' }}
      />
    </div>
  )
}
