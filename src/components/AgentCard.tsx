import type { AgentProfile } from '../types'

export function AgentCard({ agent }: { agent: AgentProfile }) {
  return (
    <article className="agent-card">
      <div className="agent-role">{agent.role}</div>
      <h4>{agent.name}</h4>
      <p>{agent.summary}</p>
      <div className="agent-decision">{agent.decision}</div>
    </article>
  )
}
