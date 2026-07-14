import type { Opportunity } from '../types'

export function OpportunityCard({ item }: { item: Opportunity }) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-topline">
        <strong>{item.name}</strong>
        <span className={`urgency urgency-${item.urgency.toLowerCase()}`}>{item.urgency}</span>
      </div>
      <div className="opportunity-meta">
        <span>{item.chain}</span>
        <span>{item.edge}</span>
      </div>
      <p>{item.summary}</p>
    </article>
  )
}
