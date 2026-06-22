import './TopButton.css'

export default function TopButton() {
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button className="top-btn" onClick={handleClick} aria-label="맨 위로 이동">
      ↑
    </button>
  )
}
