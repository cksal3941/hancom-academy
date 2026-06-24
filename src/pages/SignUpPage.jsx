import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { FaApple } from 'react-icons/fa'
import { signUpWithEmail, loginWithGoogle, loginWithApple } from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { isAppleAuthEnabled } from '../firebase/firebase'
import { getFirebaseErrorMessage } from '../utils/firebaseErrorMessage'
import './LoginPage.css'
import './SignUpPage.css'

export default function SignUpPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [confirm, setConfirm]         = useState('')
  const [showPw, setShowPw]           = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [terms, setTerms]             = useState(false)
  const [privacy, setPrivacy]         = useState(false)
  const [submitting, setSubmitting]   = useState(false)
  const [error, setError]             = useState('')

  useEffect(() => {
    if (!loading && user) navigate('/', { replace: true })
  }, [user, loading, navigate])

  const validate = () => {
    if (!name.trim())  return '이름을 입력해 주세요.'
    if (!email.trim()) return '이메일을 입력해 주세요.'
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,16}$/.test(password))
      return '비밀번호는 영문과 숫자를 포함해 8~16자로 입력해 주세요.'
    if (password !== confirm) return '비밀번호가 일치하지 않습니다.'
    if (!terms || !privacy) return '필수 약관에 모두 동의해 주세요.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const msg = validate()
    if (msg) { setError(msg); return }
    setError('')
    setSubmitting(true)
    try {
      await signUpWithEmail(name.trim(), email.trim(), password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getFirebaseErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const runSocial = async (fn) => {
    setError('')
    setSubmitting(true)
    try {
      await fn()
      navigate('/', { replace: true })
    } catch (err) {
      setError(getFirebaseErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="login-page">
        <span className="login-page__spinner" aria-label="불러오는 중" />
      </div>
    )
  }

  return (
    <div className="login-page signup-page">
      <div className="login-page__wrap">
        <h1 className="login-page__title">회원가입</h1>
        <p className="login-page__subtitle">한글과컴퓨터학원의 학습 서비스를 이용해 보세요.</p>

        <div className="login-page__social">
          <button
            type="button"
            className="login-page__social-btn"
            onClick={() => runSocial(loginWithGoogle)}
            disabled={submitting}
          >
            <svg className="login-page__social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google로 가입하기
          </button>

          {isAppleAuthEnabled && (
            <button
              type="button"
              className="login-page__social-btn"
              onClick={() => runSocial(loginWithApple)}
              disabled={submitting}
            >
              <FaApple className="login-page__social-icon login-page__social-icon--apple" aria-hidden="true" />
              Apple로 가입하기
            </button>
          )}
        </div>

        <div className="login-page__divider"><span>이메일로 가입하기</span></div>

        <form onSubmit={handleSubmit} className="login-page__form" noValidate>
          {/* 이름 */}
          <div className="login-page__field">
            <label className="login-page__label" htmlFor="signup-name">이름</label>
            <input
              id="signup-name"
              type="text"
              className="login-page__input"
              placeholder="이름을 입력해 주세요."
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="name"
              autoFocus
            />
          </div>

          {/* 이메일 */}
          <div className="login-page__field">
            <label className="login-page__label" htmlFor="signup-email">이메일</label>
            <input
              id="signup-email"
              type="email"
              className="login-page__input"
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* 비밀번호 */}
          <div className="login-page__field">
            <label className="login-page__label" htmlFor="signup-password">비밀번호</label>
            <div className="login-page__pw-wrap">
              <input
                id="signup-password"
                type={showPw ? 'text' : 'password'}
                className="login-page__input"
                placeholder="8~16자리 / 영문, 숫자 조합"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="login-page__pw-toggle"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                tabIndex={-1}
              >
                {showPw ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="login-page__field">
            <label className="login-page__label" htmlFor="signup-confirm">비밀번호 확인</label>
            <div className="login-page__pw-wrap">
              <input
                id="signup-confirm"
                type={showConfirm ? 'text' : 'password'}
                className="login-page__input"
                placeholder="비밀번호를 다시 입력해 주세요."
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="login-page__pw-toggle"
                onClick={() => setShowConfirm(v => !v)}
                aria-label={showConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
                tabIndex={-1}
              >
                {showConfirm ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {/* 약관 동의 */}
          <div className="signup-agreements">
            <label className="signup-agreements__item">
              <input
                type="checkbox"
                className="login-page__checkbox"
                checked={terms}
                onChange={e => setTerms(e.target.checked)}
              />
              <span>
                <a href="/terms" className="signup-agreements__link" target="_blank" rel="noopener noreferrer">이용약관</a>에 동의합니다. <span className="signup-agreements__required">(필수)</span>
              </span>
            </label>
            <label className="signup-agreements__item">
              <input
                type="checkbox"
                className="login-page__checkbox"
                checked={privacy}
                onChange={e => setPrivacy(e.target.checked)}
              />
              <span>
                <a href="/privacy" className="signup-agreements__link" target="_blank" rel="noopener noreferrer">개인정보 처리방침</a>에 동의합니다. <span className="signup-agreements__required">(필수)</span>
              </span>
            </label>
          </div>

          {error && <p className="login-page__error" role="alert">{error}</p>}

          <button type="submit" className="login-page__submit" disabled={submitting}>
            {submitting ? '가입 중...' : '가입하기'}
          </button>
        </form>

        <p className="login-page__signup">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="login-page__signup-link">로그인하기</Link>
        </p>
      </div>
    </div>
  )
}
