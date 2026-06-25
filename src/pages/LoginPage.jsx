import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { FaApple } from 'react-icons/fa'
import { loginWithEmail, loginWithGoogle, loginWithApple, sendPasswordReset } from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { isAppleAuthEnabled } from '../firebase/firebase'
import { getFirebaseErrorMessage } from '../utils/firebaseErrorMessage'
import SubPageHero from '../components/common/SubPageHero'
import './LoginPage.css'

export default function LoginPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const [view, setView]             = useState('login') // 'login' | 'forgot'
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPw, setShowPw]         = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState('')

  useEffect(() => {
    if (!loading && user) navigate('/', { replace: true })
  }, [user, loading, navigate])

  const run = async (fn) => {
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

  const handleEmailLogin = (e) => {
    e.preventDefault()
    run(() => loginWithEmail(email, password, rememberMe))
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await sendPasswordReset(email)
      setSuccess('비밀번호 재설정 이메일을 발송했습니다.\n받은 편지함을 확인해 주세요.')
    } catch (err) {
      setError(getFirebaseErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const switchView = (v) => {
    setView(v)
    setError('')
    setSuccess('')
  }

  if (loading) {
    return (
      <div className="login-page">
        <SubPageHero eyebrow="회원 서비스" title="로그인" />
        <div className="login-page__body">
          <span className="login-page__spinner" aria-label="불러오는 중" />
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <SubPageHero eyebrow="회원 서비스" title="로그인" />
      <div className="login-page__body">
        <div className="login-page__wrap">

          {/* ── 비밀번호 찾기 뷰 ── */}
          {view === 'forgot' && (
            <>
              <h1 className="login-page__title">비밀번호 재설정</h1>
              <p className="login-page__subtitle">가입하신 이메일로 재설정 링크를 보내드립니다.</p>

              {success ? (
                <p className="login-page__success">{success}</p>
              ) : (
                <form onSubmit={handleForgotPassword} className="login-page__form" noValidate>
                  <div className="login-page__field">
                    <label className="login-page__label" htmlFor="forgot-email">이메일</label>
                    <input
                      id="forgot-email"
                      type="email"
                      className="login-page__input"
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                  {error && <p className="login-page__error" role="alert">{error}</p>}
                  <button type="submit" className="login-page__submit" disabled={submitting}>
                    {submitting ? '발송 중...' : '재설정 이메일 보내기'}
                  </button>
                </form>
              )}

              <button type="button" className="login-page__back" onClick={() => switchView('login')}>
                ← 로그인으로 돌아가기
              </button>
            </>
          )}

          {/* ── 로그인 뷰 ── */}
          {view === 'login' && (
            <>
              <h1 className="login-page__title">로그인</h1>
              <p className="login-page__subtitle">계정 정보를 입력해 주세요.</p>

              <form onSubmit={handleEmailLogin} className="login-page__form" noValidate>
                {/* 이메일 */}
                <div className="login-page__field">
                  <label className="login-page__label" htmlFor="login-email">이메일</label>
                  <input
                    id="login-email"
                    type="email"
                    className="login-page__input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                {/* 비밀번호 */}
                <div className="login-page__field">
                  <label className="login-page__label" htmlFor="login-password">비밀번호</label>
                  <div className="login-page__pw-wrap">
                    <input
                      id="login-password"
                      type={showPw ? 'text' : 'password'}
                      className="login-page__input"
                      placeholder="••••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
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
                  <button type="button" className="login-page__forgot" onClick={() => switchView('forgot')}>
                    비밀번호를 잊으셨나요?
                  </button>
                </div>

                {/* 로그인 상태 유지 */}
                <label className="login-page__remember">
                  <input
                    type="checkbox"
                    className="login-page__checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  로그인 상태 유지
                </label>

                {error && <p className="login-page__error" role="alert">{error}</p>}

                <button type="submit" className="login-page__submit" disabled={submitting}>
                  {submitting ? '로그인 중...' : '로그인'}
                </button>
              </form>

              {/* 간편 로그인 */}
              <div className="login-page__divider"><span>간편 로그인</span></div>

              <div className="login-page__social">
                <button
                  type="button"
                  className="login-page__social-btn"
                  onClick={() => run(loginWithGoogle)}
                  disabled={submitting}
                >
                  <svg className="login-page__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>

                {isAppleAuthEnabled && (
                  <button
                    type="button"
                    className="login-page__social-btn"
                    onClick={() => run(loginWithApple)}
                    disabled={submitting}
                  >
                    <FaApple className="login-page__social-icon login-page__social-icon--apple" aria-hidden="true" />
                    Apple
                  </button>
                )}
              </div>

              <p className="login-page__signup">
                아직 계정이 없으신가요?{' '}
                <Link to="/signup" className="login-page__signup-link">회원가입</Link>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
