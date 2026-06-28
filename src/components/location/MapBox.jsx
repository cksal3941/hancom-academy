import { useEffect, useRef, useState } from 'react'
import './MapBox.css'

const APP_KEY = import.meta.env.VITE_KAKAO_MAP_APP_KEY
const SCRIPT_ID = 'kakao-maps-script'
const SCRIPT_TIMEOUT_MS = 10000

let kakaoMapsPromise

function loadKakaoScript() {
  if (window.kakao?.maps) return Promise.resolve()
  if (kakaoMapsPromise) return kakaoMapsPromise

  kakaoMapsPromise = new Promise((resolve, reject) => {
    if (!APP_KEY) {
      reject(new Error('카카오 지도 JavaScript 키가 설정되지 않았습니다.'))
      return
    }

    const clearAndReject = message => {
      kakaoMapsPromise = undefined
      reject(new Error(message))
    }
    const timeoutId = window.setTimeout(() => {
      clearAndReject('카카오 지도 SDK 응답이 지연되고 있습니다.')
    }, SCRIPT_TIMEOUT_MS)
    const finish = () => {
      window.clearTimeout(timeoutId)

      if (!window.kakao?.maps?.load) {
        clearAndReject('카카오 지도 SDK를 불러왔지만 지도 객체를 찾을 수 없습니다.')
        return
      }

      window.kakao.maps.load(() => {
        if (window.kakao?.maps) {
          resolve()
          return
        }

        clearAndReject('카카오 지도 객체를 초기화하지 못했습니다.')
      })
    }
    const fail = () => {
      window.clearTimeout(timeoutId)
      clearAndReject('카카오 지도 SDK를 불러오지 못했습니다.')
    }

    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', finish, { once: true })
      existing.addEventListener('error', fail, { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    script.async = true
    script.onload = finish
    script.onerror = fail
    document.head.appendChild(script)
  })

  return kakaoMapsPromise
}

export default function MapBox({ lat, lng, name }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!lat || !lng || !containerRef.current) return

    let cancelled = false

    setStatus('loading')
    setErrorMessage('')

    loadKakaoScript().then(() => {
      if (cancelled || !containerRef.current) return

      const { kakao } = window
      const position = new kakao.maps.LatLng(lat, lng)

      if (!mapRef.current) {
        mapRef.current = new kakao.maps.Map(containerRef.current, {
          center: position,
          level: 3,
        })
        markerRef.current = new kakao.maps.Marker({
          position,
          map: mapRef.current,
          title: name ?? '',
        })
      } else {
        mapRef.current.setCenter(position)
        markerRef.current.setPosition(position)
      }

      setStatus('ready')
    }).catch(error => {
      if (cancelled) return

      setStatus('error')
      setErrorMessage(error.message)
    })

    return () => {
      cancelled = true
    }
  }, [lat, lng, name])

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
      {status === 'loading' && (
        <div className="mapbox__fallback">지도를 불러오는 중입니다.</div>
      )}
      {status === 'error' && (
        <div className="mapbox__fallback mapbox__fallback--error">
          <strong>지도를 불러오지 못했습니다.</strong>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}
