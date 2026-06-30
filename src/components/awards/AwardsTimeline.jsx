import './AwardsTimeline.css'

function WinnerList({ winners }) {
  if (!winners || winners.length === 0) {
    return <span className="award-row__winner award-row__winner--empty">수상자 발표 예정</span>
  }

  return winners.map((winner, i) => (
    <span key={`${winner.name}-${i}`} className="award-row__winner">
      {winner.name}
      {winner.school && (
        <span className="award-row__school">({winner.school})</span>
      )}
      {i < winners.length - 1 && <span className="award-row__sep">, </span>}
    </span>
  ))
}

function AwardRow({ rank, winners }) {
  return (
    <div className="award-row">
      <span className="award-row__rank">{rank}</span>
      <span className="award-row__winners">
        <WinnerList winners={winners} />
      </span>
    </div>
  )
}

function CategoryBlock({ category }) {
  return (
    <div className="category">
      {category.title && (
        <h4 className="category__title">{category.title}</h4>
      )}
      <div className="category__awards">
        {category.awards.map((award) => (
          <AwardRow
            key={award.rank}
            rank={award.rank}
            winners={award.winners}
          />
        ))}
      </div>
    </div>
  )
}

function CompetitionBlock({ competition }) {
  return (
    <article className="competition">
      <h3 className="competition__title">{competition.title}</h3>
      {competition.categories.map((cat, i) => (
        <CategoryBlock key={cat.title ?? i} category={cat} />
      ))}
      {competition.notes?.map((note, i) => (
        <p key={i} className="competition__note">
          {note}
        </p>
      ))}
    </article>
  )
}

export default function AwardsTimeline({ data, yearRefs, activeYear, progress }) {
  return (
    <div className="awards-timeline">
      <div className="awards-timeline__track" aria-hidden="true" />
      <div
        className="awards-timeline__progress-line"
        aria-hidden="true"
        style={{ height: `calc(${progress * 100}% - 120px)` }}
      />

      {data.map((entry) => {
        const isActive = entry.year === activeYear

        return (
          <div
            key={entry.year}
            className={`timeline-year-block${isActive ? ' timeline-year-block--active' : ''}`}
            ref={(el) => {
              if (el) yearRefs.current[entry.year] = el
              else delete yearRefs.current[entry.year]
            }}
            data-year={entry.year}
          >
            <div className="timeline-year-block__year" aria-hidden="true">
              {entry.year}
            </div>

            <div className="timeline-marker" aria-hidden="true">
              {isActive && <span className="timeline-marker__pulse" />}
            </div>

            <div className="timeline-year-block__content">
              <p className="timeline-year-block__year-mobile" aria-hidden="true">
                {entry.year}
              </p>

              {entry.competitions.map((comp, i) => (
                <CompetitionBlock key={comp.title ?? i} competition={comp} />
              ))}

              {entry.notes?.map((note, i) => (
                <p key={i} className="year-block__note">
                  {note}
                </p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
