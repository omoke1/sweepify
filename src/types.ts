export type Urgency = 'Watch' | 'Live' | 'Critical'

export type SimulationStep = {
  id: string
  title: string
  phase: string
  detail: string
  treasury: number
  yield: number
  deployed: number
  health: number
  route: string
  label: string
  transferState: 'Parked' | 'Queued' | 'Bridging' | 'Executed' | 'At Risk' | 'Recovered'
  transferAmount: number
  expectedArrival: string
  action: string
  riskNote: string
}

export type Opportunity = {
  name: string
  chain: string
  edge: string
  summary: string
  urgency: Urgency
}

export type AgentProfile = {
  name: string
  role: string
  summary: string
  decision: string
}

export type PolicyGuardrail = {
  label: string
  value: string
  helper: string
}

export type EventLog = {
  timestamp: string
  title: string
  summary: string
  tone: 'neutral' | 'positive' | 'warning'
}
