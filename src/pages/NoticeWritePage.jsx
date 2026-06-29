import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiHome, FiImage, FiX } from 'react-icons/fi'
import SubPageHero from '../components/common/SubPageHero'
import { addNotice } from '../services/noticeService'
import './NoticePage.css'
import './NoticeWritePage.css'

const heroTabs = [
  { label: '공지사항', to: '/notice', active: true },
  { label: '개강소식', to: '/notice/start' },
  { label: '뉴스', to: '/notice/news' },
]

const categories = ['수업안내', '운영안내', '대회일정', '이벤트']

export default function NoticeWritePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [category, setCategory] = useState(categories[0])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const next = {}
    if (!title.trim()) next.title = '제목을 입력해 주세요.'
    if (!content.trim()) next.content = '내용을 입력해 주세요.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    const next = [...imageFiles, ...files].slice(0, 5)
    setImageFiles(next)
    setPreviews(next.map((f) => URL.createObjectURL(f)))
    e.target.value = ''
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index])
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError('')
    try {
      const newId = await addNotice({ category, title, content, imageFiles })
      setToast(true)
      setTimeout(() => navigate('/notice'), 1500)
    } catch (err) {
      console.error('[NoticeWrite] 등록 실패:', err)
      setSubmitError(err.message || '등록에 실패했습니다. 다시 시도해 주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="notice-page">
      {toast && (
        <div className="nw-toast">
          <span className="nw-toast__icon">✓</span>
          게시글이 등록되었습니다. 이동 중…
        </div>
      )}

      <SubPageHero eyebrow="공지 및 소식" title="공지사항" tabs={heroTabs} />

      <div className="subpage-breadcrumb">
        <div className="subpage-breadcrumb__inner">
          <FiHome aria-hidden="true" />
          <span>공지 및 소식</span>
          <span className="subpage-breadcrumb__chevron">&gt;</span>
          <Link to="/notice">공지사항</Link>
          <span className="subpage-breadcrumb__chevron">&gt;</span>
          <strong>글쓰기</strong>
        </div>
      </div>

      <section className="notice-board">
        <div className="notice-board__inner">
          <form className="nw-form" onSubmit={handleSubmit} noValidate>
              <div className="nw-form__row">
                <label className="nw-form__label" htmlFor="nw-category">분류</label>
                <select
                  id="nw-category"
                  className="nw-form__select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="nw-form__row nw-form__row--full">
                <label className="nw-form__label" htmlFor="nw-title">제목</label>
                <div className="nw-form__field">
                  <input
                    id="nw-title"
                    className={`nw-form__input${errors.title ? ' nw-form__input--error' : ''}`}
                    type="text"
                    placeholder="제목을 입력해 주세요."
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      if (errors.title) setErrors((p) => ({ ...p, title: '' }))
                    }}
                    maxLength={100}
                  />
                  {errors.title && <p className="nw-form__error">{errors.title}</p>}
                </div>
              </div>

              <div className="nw-form__row">
                <span className="nw-form__label">이미지</span>
                <div className="nw-form__field">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="nw-images__input"
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    className="nw-images__trigger"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiImage aria-hidden="true" />
                    이미지 추가 {imageFiles.length > 0 && `(${imageFiles.length}/5)`}
                  </button>
                  {previews.length > 0 && (
                    <ul className="nw-images__preview">
                      {previews.map((src, i) => (
                        <li key={src} className="nw-images__thumb">
                          <img src={src} alt={`첨부 이미지 ${i + 1}`} />
                          <button
                            type="button"
                            className="nw-images__remove"
                            aria-label="이미지 제거"
                            onClick={() => removeImage(i)}
                          >
                            <FiX />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="nw-images__hint">최대 5장, JPG·PNG·GIF·WEBP 지원</p>
                </div>
              </div>

              <div className="nw-form__row nw-form__row--content nw-form__row--full">
                <label className="nw-form__label" htmlFor="nw-content">내용</label>
                <div className="nw-form__field">
                  <textarea
                    id="nw-content"
                    className={`nw-form__textarea${errors.content ? ' nw-form__input--error' : ''}`}
                    placeholder="내용을 입력해 주세요."
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                      if (errors.content) setErrors((p) => ({ ...p, content: '' }))
                    }}
                  />
                  {errors.content && <p className="nw-form__error">{errors.content}</p>}
                </div>
              </div>

              {submitError && <p className="nw-form__error nw-form__error--global">{submitError}</p>}

              <div className="nw-form__actions">
                <button
                  type="button"
                  className="nw-form__btn nw-form__btn--cancel"
                  onClick={() => navigate('/notice')}
                >
                  <FiArrowLeft aria-hidden="true" />
                  취소
                </button>
                <button
                  type="submit"
                  className="nw-form__btn nw-form__btn--submit"
                  disabled={submitting}
                >
                  {submitting ? '등록 중…' : '등록하기'}
                </button>
              </div>
            </form>
        </div>
      </section>
    </div>
  )
}
