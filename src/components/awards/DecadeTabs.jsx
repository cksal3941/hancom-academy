import './DecadeTabs.css'

export default function DecadeTabs({ decades, activeDecade, onDecadeClick }) {
  return (
    <div className="decade-tabs" role="tablist" aria-label="연대별 수상 실적">
      <div className="decade-tabs__list">
        {decades.map((decade) => (
          <button
            key={decade}
            role="tab"
            className={`decade-tabs__btn${activeDecade === decade ? ' decade-tabs__btn--active' : ''}`}
            aria-selected={activeDecade === decade}
            onClick={() => onDecadeClick(decade)}
          >
            {decade}
          </button>
        ))}
      </div>
    </div>
  )
}
