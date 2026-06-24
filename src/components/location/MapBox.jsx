import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './MapBox.css'

// Vite 환경에서 Leaflet 기본 마커 아이콘 경로 오류 수정
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

export default function MapBox({ lat, lng, name }) {
  const containerRef = useRef(null)
  const mapInstance = useRef(null)
  const markerInstance = useRef(null)

  useEffect(() => {
    if (!lat || !lng || !containerRef.current) return

    if (!mapInstance.current) {
      mapInstance.current = L.map(containerRef.current, { center: [lat, lng], zoom: 16 })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance.current)
      markerInstance.current = L.marker([lat, lng])
        .addTo(mapInstance.current)
        .bindPopup(name ?? '')
    } else {
      mapInstance.current.setView([lat, lng], 16)
      markerInstance.current.setLatLng([lat, lng]).bindPopup(name ?? '')
    }
  }, [lat, lng, name])

  useEffect(() => {
    return () => {
      mapInstance.current?.remove()
      mapInstance.current = null
      markerInstance.current = null
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
