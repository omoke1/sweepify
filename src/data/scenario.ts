import type { AgentProfile, EventLog, Opportunity, PolicyGuardrail, SimulationStep } from '../types'

export const simulationSteps: SimulationStep[] = [
  {
    id: 'idle-yield',
    title: 'Treasury sits in productive idle mode',
    phase: 'Idle Yield',
    detail:
      'Treasury Agent places 1.2M USDC into a conservative lending vault on Arbitrum while keeping policy headroom for crosschain deployment.',
    treasury: 1200000,
    yield: 960000,
    deployed: 0,
    health: 1.84,
    route: 'Arbitrum vault active. Base book on standby.',
    label: 'Yield parking',
    transferState: 'Parked',
    transferAmount: 0,
    expectedArrival: 'No transfer queued',
    action: 'Collect vault yield and keep 20% reserve liquid.',
    riskNote: 'Health is neutral because no destination position is live yet.',
  },
  {
    id: 'signal',
    title: 'Opportunity Agent flags a crosschain carry window',
    phase: 'Signal Detected',
    detail:
      'Funding and short-duration yield on Base beat the Arbitrum strategy after fees. The agent recommends moving 320k USDC.',
    treasury: 1200000,
    yield: 960000,
    deployed: 0,
    health: 1.84,
    route: 'Signal: Base carry spread +142 bps net of transfer cost.',
    label: 'Opportunity found',
    transferState: 'Queued',
    transferAmount: 320000,
    expectedArrival: '~45 sec with Fast Transfer',
    action: 'Prepare CCTP route and destination hook payload.',
    riskNote: 'Transfer only executes if net edge remains above 90 bps after fees.',
  },
  {
    id: 'bridging',
    title: 'Execution Agent triggers CCTP Fast Transfer',
    phase: 'Capital Teleport',
    detail:
      '320k USDC is burned on Arbitrum and minted natively on Base. Hooks prepare the destination action before funds arrive.',
    treasury: 1200000,
    yield: 640000,
    deployed: 320000,
    health: 1.84,
    route: 'CCTP route: Arbitrum -> Base in motion.',
    label: 'Fast transfer',
    transferState: 'Bridging',
    transferAmount: 320000,
    expectedArrival: '18 sec remaining',
    action: 'Execute bridge, stage destination deposit, monitor attestation.',
    riskNote: 'Treasury still satisfies reserve ratio even while capital is in flight.',
  },
  {
    id: 'position-live',
    title: 'Trade is opened and collateral is active',
    phase: 'Position Live',
    detail:
      'Funds land on Base, the strategy is opened, and the system keeps monitoring margin health, expected carry, and excess idle cash.',
    treasury: 1200000,
    yield: 640000,
    deployed: 320000,
    health: 1.46,
    route: 'Base carry book live. Margin monitor active.',
    label: 'Execution complete',
    transferState: 'Executed',
    transferAmount: 320000,
    expectedArrival: 'Arrived and deployed',
    action: 'Open the carry book and route residual cash to collateral buffer.',
    riskNote: 'Position is healthy but a volatility spike will require fast treasury response.',
  },
  {
    id: 'margin-stress',
    title: 'Risk spike hits the live position',
    phase: 'Margin Stress',
    detail:
      'Volatility compresses the safety buffer. The Margin Sweep Engine requests emergency top-up capital before liquidation risk becomes real.',
    treasury: 1200000,
    yield: 520000,
    deployed: 440000,
    health: 1.11,
    route: 'Margin sweep request: +120k USDC from treasury lane.',
    label: 'Risk event',
    transferState: 'At Risk',
    transferAmount: 120000,
    expectedArrival: '~20 sec top-up path',
    action: 'Promote the margin request above all non-critical deployment jobs.',
    riskNote: 'Without sweep support, liquidation bots gain an 11-minute window.',
  },
  {
    id: 'recovered',
    title: 'Treasury reroutes funds and the book stabilizes',
    phase: 'Recovered',
    detail:
      'A second CCTP transfer tops up the Base account, health recovers, and excess capital is marked for return to yield once the spread closes.',
    treasury: 1200000,
    yield: 780000,
    deployed: 180000,
    health: 1.63,
    route: 'Risk cleared. Capital scheduled back to Arbitrum yield.',
    label: 'Rescue complete',
    transferState: 'Recovered',
    transferAmount: 120000,
    expectedArrival: 'Return sweep scheduled in next rebalance window',
    action: 'Stabilize, reduce deployed risk, and refill the yield lane.',
    riskNote: 'System rotates back to productive idle mode once spread decays.',
  },
]

export const opportunities: Opportunity[] = [
  {
    name: 'Funding rotation',
    chain: 'Base',
    edge: '+142 bps net',
    summary: 'Shift idle USDC into a short-duration basis trade when net funding beats vault yield.',
    urgency: 'Live',
  },
  {
    name: 'Liquidation defense',
    chain: 'Base',
    edge: '11 min window',
    summary: 'Top up margin when health drifts below 1.18 before liquidation bots can react.',
    urgency: 'Critical',
  },
  {
    name: 'Return-to-yield sweep',
    chain: 'Arbitrum',
    edge: '4.8% vault',
    summary: 'Recycle excess collateral back into yield the moment opportunity risk falls.',
    urgency: 'Watch',
  },
]

export const agents: AgentProfile[] = [
  {
    name: 'Treasury Agent',
    role: 'Capital governor',
    summary: 'Allocates idle USDC, enforces budget limits, and decides how much can move without starving the reserve.',
    decision: 'Move 320k USDC while preserving a 20% treasury reserve and 1.25 minimum portfolio health floor.',
  },
  {
    name: 'Opportunity Agent',
    role: 'Market scanner',
    summary: 'Tracks yield spread, funding, and risk dislocations across chains after transfer cost and latency.',
    decision: 'Route only if expected carry beats vault yield by at least 90 bps net and volatility is within tolerance.',
  },
  {
    name: 'Execution Agent',
    role: 'Crosschain operator',
    summary: 'Pushes CCTP transfers, triggers destination hooks, and confirms position open, unwind, or margin defense.',
    decision: 'Prioritize margin rescue jobs above new opportunity deployment when health falls below 1.18.',
  },
]

export const policyGuardrails: PolicyGuardrail[] = [
  {
    label: 'Reserve ratio',
    value: '20%',
    helper: 'Minimum liquid treasury left behind before any new crosschain deployment.',
  },
  {
    label: 'Minimum health',
    value: '1.25',
    helper: 'If projected health falls below this line, the system shifts into defense-first mode.',
  },
  {
    label: 'Net edge threshold',
    value: '90 bps',
    helper: 'Opportunity Agent ignores signals that do not clear transfer cost and slippage.',
  },
  {
    label: 'Sweep SLA',
    value: '< 60 sec',
    helper: 'Execution Agent escalates any delayed transfer that threatens liquidation timing.',
  },
]

export const eventLog: EventLog[] = [
  {
    timestamp: '08:41 UTC',
    title: 'Vault rebalance complete',
    summary: 'Treasury capital consolidated on Arbitrum and the reserve lane validated.',
    tone: 'positive',
  },
  {
    timestamp: '08:48 UTC',
    title: 'Signal threshold crossed',
    summary: 'Base carry spread moves above the 90 bps net requirement.',
    tone: 'neutral',
  },
  {
    timestamp: '08:49 UTC',
    title: 'Fast transfer initiated',
    summary: '320k USDC routed through CCTP with a destination deposit hook.',
    tone: 'neutral',
  },
  {
    timestamp: '08:57 UTC',
    title: 'Margin alarm raised',
    summary: 'Health factor slipped to 1.11 and defense mode requested additional collateral.',
    tone: 'warning',
  },
  {
    timestamp: '08:58 UTC',
    title: 'Top-up confirmed',
    summary: 'Emergency CCTP sweep restored the position and queued idle capital for return.',
    tone: 'positive',
  },
]
