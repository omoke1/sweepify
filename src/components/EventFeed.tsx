import type { EventLog } from '../types'

export function EventFeed({ events }: { events: EventLog[] }) {
  return (
    <div className="event-feed">
      {events.map((event) => (
        <article key={`${event.timestamp}-${event.title}`} className={`event-card tone-${event.tone}`}>
          <div className="event-meta">
            <span>{event.timestamp}</span>
            <strong>{event.title}</strong>
          </div>
          <p>{event.summary}</p>
        </article>
      ))}
    </div>
  )
}
