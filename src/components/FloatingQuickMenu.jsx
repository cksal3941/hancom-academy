import './FloatingQuickMenu.css'

export default function FloatingQuickMenu() {
  return (
    <aside className="floating-menu">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="floating-menu__item ph" />
      ))}
    </aside>
  )
}
