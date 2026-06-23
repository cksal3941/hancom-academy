import { useState } from 'react'
import locationData from '../../data/locationData'
import LocationTabs from '../location/LocationTabs'
import LocationInfoCard from '../location/LocationInfoCard'
import MapBox from '../location/MapBox'
import './LocationSection.css'

export default function LocationSection() {
  const [selectedId, setSelectedId] = useState(locationData[0].id)
  const selected = locationData.find(loc => loc.id === selectedId)

  return (
    <section className="location">
      <div className="location__overlay" aria-hidden="true" />

      <div className="location__inner">
        {/* 타이틀 영역 */}
        <div className="location__head">
          <p className="location__label">LOCATION</p>
          <h2 className="location__title">오시는 길</h2>
        </div>

        {/* 탭 */}
        <LocationTabs
          locations={locationData}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        {/* 지점 정보 + 지도 */}
        <div className="location__content">
          <div className="location__info">
            <LocationInfoCard location={selected} />
          </div>
          <div className="location__map">
            <MapBox lat={selected.lat} lng={selected.lng} name={selected.name} />
          </div>
        </div>
      </div>
    </section>
  )
}
