import { Link, useRouteError } from 'react-router-dom'
import logo from '../assets/hancom_logo.png'
import './ErrorPage.css'

export default function ErrorPage() {
  const error = useRouteError()
  console.error('[ErrorPage]', error)

  return (
    <div className="error-page">
      <img src={logo} alt="한글과컴퓨터학원" className="error-page__logo" />
      <h1 className="error-page__title">일시적인 오류가 발생했습니다</h1>
      <p className="error-page__desc">
        페이지를 불러오는 중 문제가 생겼습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <div className="error-page__actions">
        <button
          type="button"
          className="error-page__btn error-page__btn--ghost"
          onClick={() => window.location.reload()}
        >
          새로고침
        </button>
        <Link to="/" className="error-page__btn" reloadDocument>
          홈으로 이동
        </Link>
      </div>
    </div>
  )
}
