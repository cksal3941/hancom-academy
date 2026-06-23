import { Link } from 'react-router-dom'
import { footerNavItems, companyInfoItems, socialLinks } from '../data/footerData'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── FooterTop: 메뉴 ── */}
        <div className="footer__top">
          <nav className="footer__nav">
            <ul className="footer__nav-list">
              {footerNavItems.map(item => (
                <li key={item.id} className="footer__nav-item">
                  <Link to={item.path} className="footer__nav-link">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── FooterBottom: 로고 + 정보 + SNS ── */}
        <div className="footer__bottom">

          {/* 좌측: 로고 · 회사정보 · 저작권 */}
          <div className="footer__info-area">
            <div className="footer__logo">
              <img src="/images/hancom_logo_w.png" alt="한글과컴퓨터학원 로고" />
            </div>

            <p className="footer__company-info">
              {companyInfoItems.map((item, idx) => (
                <span key={item.id}>
                  {idx !== 0 && <span className="footer__divider">|</span>}
                  <span className={item.bold ? 'footer__info-bold' : ''}>{item.text}</span>
                </span>
              ))}
            </p>

            <p className="footer__copy">©2019 한컴에듀케이션(주)</p>
          </div>

          {/* 우측: SNS */}
          <div className="footer__social">
            {socialLinks.map(item => (
              <a
                key={item.id}
                href={item.url}
                className={`footer__social-btn footer__social-btn--${item.label.toLowerCase()}`}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer__social-icon">{item.text}</span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}
