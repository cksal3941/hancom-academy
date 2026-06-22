import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <p className="footer__logo">HANCOM EDUCATION</p>
            <p className="footer__copy">© 2026 Hancom Inc. All rights reserved.</p>
          </div>
          <nav className="footer__nav">
            <ul>
              <li><Link to="/">회사소개</Link></li>
              <li><Link to="/">이용약관</Link></li>
              <li><Link to="/">개인정보처리방침</Link></li>
              <li><Link to="/">고객센터</Link></li>
            </ul>
          </nav>
          <div className="footer__contact">
            <p>고객센터 <strong>1588-0000</strong></p>
            <p>평일 09:00 – 18:00 (점심 12:00 – 13:00)</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
