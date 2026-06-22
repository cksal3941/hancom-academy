import { Link, useLocation } from 'react-router-dom'
import './ComingSoonPage.css'

export default function ComingSoonPage() {
  const { pathname } = useLocation()

  return (
    <div className="coming-soon">
      <div className="coming-soon__icon">🚧</div>
      <h1 className="coming-soon__title">준비 중입니다</h1>
      <p className="coming-soon__desc">
        <code>{pathname}</code> 페이지는 현재 준비 중입니다.<br />
        빠른 시일 내에 오픈할 예정입니다.
      </p>
      <Link to="/" className="coming-soon__btn">홈으로 돌아가기</Link>
    </div>
  )
}
