import { useMemo, useState } from 'react'
import './App.css'

type Step = {
  title: string
  phase: string
  detail: string
  treasury: number
  yield: number
  deployed: number
  health: number
  route: string
  label: string
}

type Opportunity = {
  name: string
  chain: string
  edge: string
  summary: string
  urgency: 'Watch' | 'Live' | 'Critical'
}

const steps: Step[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
]

const opportunities: Opportunity[] = [
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

const agents = [
  {
    name: 'Treasury Agent',
    role: 'Capital governor',
    summary: 'Allocates idle USDC, enforces budget limits, and decides how much can move without starving the reserve.',
  },
  {
    name: 'Opportunity Agent',
    role: 'Market scanner',
    summary: 'Tracks yield spread, funding, and risk dislocations across chains after transfer cost and latency.',
  },
  {
    name: 'Execution Agent',
    role: 'Crosschain operator',
    summary: 'Pushes CCTP transfers, triggers destination hooks, and confirms position open, unwind, or margin defense.',
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: value >= 1000000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 1000000 ? 1 : 0,
  }).format(value)
}

function App() {
  const [stepIndex, setStepIndex] = useState(0)

  const step = steps[stepIndex]
  const nextLabel = stepIndex === steps.length - 1 ? 'Replay flow' : 'Advance simulation'

  const stats = useMemo(
    () => [
      { label: 'Treasury size', value: formatCurrency(step.treasury) },
      { label: 'In yield', value: formatCurrency(step.yield) },
      { label: 'Deployed crosschain', value: formatCurrency(step.deployed) },
      { label: 'Health factor', value: step.health.toFixed(2) },
    ],
    [step],
  )

  const handleAdvance = () => {
    setStepIndex((current) => (current === steps.length - 1 ? 0 : current + 1))
  }

  const progress = ((stepIndex + 1) / steps.length) * 100

  return (
    <main className="shell">
      <section className="hero-panel">
        <div className="eyebrow">Circle x Encode Hackathon MVP</div>
        <div className="hero-copy">
          <div>
            <h1>SweepFi</h1>
            <p className="hero-text">
              A multi-agent crosschain treasury that keeps native USDC productive,
              deploys it to the best opportunity, and rescues margin before
              liquidation using CCTP.
            </p>
          </div>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={handleAdvance}>
              {nextLabel}
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setStepIndex(0)}
            >
              Reset to treasury state
            </button>
          </div>
        </div>
        <div className="hero-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="metric-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="story-grid">
        <article className="story-card signal-card">
          <div className="card-topline">
            <span className="pill pill-amber">{step.phase}</span>
            <span className="muted">Step {stepIndex + 1} / {steps.length}</span>
          </div>
          <h2>{step.title}</h2>
          <p>{step.detail}</p>
          <div className="progress-rail" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="route-box">{step.route}</div>
        </article>

        <article className="story-card chain-card">
          <div className="card-topline">
            <span className="pill pill-green">Arbitrum</span>
            <span className="muted">Treasury + yield lane</span>
          </div>
          <div className="chain-balance">{formatCurrency(step.yield)}</div>
          <p>Primary idle-capital pool parked in stable yield until another chain needs it.</p>
          <div className="chain-meter">
            <label>Vault utilization</label>
            <strong>{Math.round((step.yield / step.treasury) * 100)}%</strong>
          </div>
        </article>

        <article className="story-card chain-card accent">
          <div className="card-topline">
            <span className="pill pill-blue">Base</span>
            <span className="muted">Opportunity + risk lane</span>
          </div>
          <div className="chain-balance">{formatCurrency(step.deployed)}</div>
          <p>Destination capital for carry execution, margin support, and rapid repositioning.</p>
          <div className="chain-meter">
            <label>Position health</label>
            <strong className={step.health < 1.2 ? 'danger' : ''}>{step.health.toFixed(2)}</strong>
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Three-agent system</span>
              <h3>Operational roles</h3>
            </div>
            <span className="muted">Separation of duties</span>
          </div>
          <div className="agents-list">
            {agents.map((agent) => (
              <article key={agent.name} className="agent-card">
                <div className="agent-role">{agent.role}</div>
                <h4>{agent.name}</h4>
                <p>{agent.summary}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Opportunity radar</span>
              <h3>What the system acts on</h3>
            </div>
            <span className="muted">Net of fees and latency</span>
          </div>
          <div className="opportunity-list">
            {opportunities.map((item) => (
              <article key={item.name} className="opportunity-card">
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
            ))}
          </div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel timeline-panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Capital loop</span>
              <h3>Simulation timeline</h3>
            </div>
            <span className="muted">Why CCTP matters</span>
          </div>
          <ol className="timeline-list">
            {steps.map((item, index) => (
              <li key={item.title} className={index === stepIndex ? 'active' : index < stepIndex ? 'complete' : ''}>
                <span className="timeline-index">0{index + 1}</span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel thesis-panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Hackathon angle</span>
              <h3>Why this can win</h3>
            </div>
          </div>
          <ul className="thesis-list">
            <li>Uses CCTP as essential infrastructure, not just a bridge checkbox.</li>
            <li>Combines yield, trading, and liquidation defense in one believable loop.</li>
            <li>Shows clear agent roles instead of a vague all-purpose AI trader.</li>
            <li>Delivers a high-drama live demo judges can understand in under two minutes.</li>
          </ul>
        </article>
      </section>
    </main>
  )
}

export default App
