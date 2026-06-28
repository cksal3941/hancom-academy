import { useEffect, useRef } from 'react'
import './MapBox.css'

const CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID

function loadNaverScript() {
  return new Promise((resolve, reject) => {
    if (window.naver?.maps) { resolve(); return }
    const existing = document.getElementById('naver-maps-script')
    if (existing) {
      existing.addEventListener('load', resolve)
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.id = 'naver-maps-script'
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function MapBox({ lat, lng, name }) {
  const containerRef = useRef(null)
  const mapRef    = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (!lat || !lng || !containerRef.current) return

    loadNaverScript().then(() => {
      const { naver } = window
      const position = new naver.maps.LatLng(lat, lng)

      if (!mapRef.current) {
        mapRef.current = new naver.maps.Map(containerRef.current, {
          center: position,
          zoom: 16,
        })
        markerRef.current = new naver.maps.Marker({
          position,
          map: mapRef.current,
          title: name ?? '',
        })
      } else {
        mapRef.current.setCenter(position)
        markerRef.current.setPosition(position)
      }
    })
  }, [lat, lng, name])

  useEffect(() => {
    return () => {
      mapRef.current?.destroy()
      mapRef.current = null
      markerRef.current = null
    }
  }, [])

  if (!lat || !lng) {
    return (
      <div className="mapbox-wrap">
        <div className="mapbox__fallback">좌표 정보가 필요합니다.</div>
      </div>
    )
  }

  return (
    <div className="mapbox-wrap">
      <div ref={containerRef} className="mapbox" />
    </div>
  )
}
