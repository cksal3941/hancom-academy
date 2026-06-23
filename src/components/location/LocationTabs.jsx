import './LocationTabs.css'

export default function LocationTabs({ locations, selectedId, onSelect }) {
  return (
    <div className="location-tabs">
      {locations.map(loc => (
        <button
          key={loc.id}
          className={`location-tab${selectedId === loc.id ? ' location-tab--active' : ''}`}
          onClick={() => onSelect(loc.id)}
          type="button"
        >
          {loc.tabLabel}
        </button>
      ))}
    </div>
  )
}
