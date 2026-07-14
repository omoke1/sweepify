import type { PolicyGuardrail } from '../types'

export function GuardrailCard({ item }: { item: PolicyGuardrail }) {
  return (
    <article className="guardrail-card">
      <span>{item.label}</span>
      <strong>{item.value}</strong>
      <p>{item.helper}</p>
    </article>
  )
}
