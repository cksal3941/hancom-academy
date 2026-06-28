import { useState } from 'react'
import { FiHome } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import LocationTabs from '../components/location/LocationTabs'
import LocationInfoCard from '../components/location/LocationInfoCard'
import MapBox from '../components/location/MapBox'
import locationData from '../data/locationData'
import './LocationPage.css'

const heroTabs = [
  { label: '학원 소개', to: '/about/intro' },
  { label: '강사진 소개', to: '/about/teachers' },
  { label: '수상 실적', to: '/about/awards' },
  { label: '오시는 길', to: '/about/location', active: true },
]

export default function LocationPage() {
  const [selectedId, setSelectedId] = useState(locationData[0].id)
  const selected = locationData.find((loc) => loc.id === selectedId) ?? locationData[0]

  return (
    <div className="location-page">
      <SubPageHero eyebrow="학원 소개" title="오시는 길" tabs={heroTabs} />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>학원 소개</span>
          <span className="subpage-breadcrumb__chevron">&gt;</span>
          <strong>오시는 길</strong>
        </div>
      </div>

      <section className="location-page__section">
        <div className="location-page__inner">
          <header className="location-page__head" data-aos="fade-up">
            <p>LOCATION</p>
            <h2>한글과컴퓨터학원 지점 안내</h2>
          </header>

          <div className="location-page__content">
            <div className="location-page__info" data-aos="fade-right" data-aos-delay="150">
              <div className="location-page__tabs">
                <LocationTabs
                  locations={locationData}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
              <LocationInfoCard location={selected} />
            </div>
            <div className="location-page__map" data-aos="fade-left" data-aos-delay="200">
              <MapBox lat={selected.lat} lng={selected.lng} name={selected.name} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
