import './App.css'
import { AgentCard } from './components/AgentCard'
import { EventFeed } from './components/EventFeed'
import { GuardrailCard } from './components/GuardrailCard'
import { OpportunityCard } from './components/OpportunityCard'
import { agents, opportunities, policyGuardrails } from './data/scenario'
import { useSimulation } from './hooks/useSimulation'
import { formatCurrency, formatPercent } from './lib/format'

function App() {
  const {
    step,
    stepIndex,
    steps,
    progress,
    stats,
    timelineEvents,
    isAutoPlaying,
    next,
    reset,
    jumpTo,
    toggleAutoPlay,
  } = useSimulation()

  const nextLabel = stepIndex === steps.length - 1 ? 'Replay flow' : 'Advance simulation'

  return (
    <main className="shell">
      <section className="hero-panel">
        <div className="eyebrow">Circle x Encode Hackathon MVP</div>
        <div className="hero-copy">
          <div>
            <h1>SweepFi</h1>
            <p className="hero-text">
              A multi-agent crosschain treasury and trading system that keeps native
              USDC productive, routes it to the best risk-adjusted opportunity, and
              rescues margin before liquidation using CCTP.
            </p>
          </div>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={next}>
              {nextLabel}
            </button>
            <button type="button" className="secondary-button" onClick={toggleAutoPlay}>
              {isAutoPlaying ? 'Pause autoplay' : 'Autoplay live demo'}
            </button>
            <button type="button" className="ghost-button" onClick={reset}>
              Reset to treasury state
            </button>
          </div>
        </div>
        <div className="hero-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="metric-card">
              <span>{stat.label}</span>
              <strong>
                {stat.label === 'Health factor'
                  ? stat.value.toFixed(2)
                  : formatCurrency(stat.value)}
              </strong>
            </article>
          ))}
        </div>
      </section>

      <section className="story-grid">
        <article className="story-card signal-card">
          <div className="card-topline">
            <span className="pill pill-amber">{step.phase}</span>
            <span className="muted">
              Step {stepIndex + 1} / {steps.length}
            </span>
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
            <strong>{formatPercent((step.yield / step.treasury) * 100)}</strong>
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
        <article className="panel operator-panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Operator console</span>
              <h3>Transfer and execution state</h3>
            </div>
            <span className="muted">CCTP-first workflow</span>
          </div>
          <div className="operator-grid">
            <div className="operator-block emphasis">
              <span>Transfer state</span>
              <strong>{step.transferState}</strong>
              <p>{step.expectedArrival}</p>
            </div>
            <div className="operator-block">
              <span>Transfer amount</span>
              <strong>{formatCurrency(step.transferAmount)}</strong>
              <p>Current routing amount through the treasury lane.</p>
            </div>
            <div className="operator-block full-width">
              <span>Execution action</span>
              <strong>{step.action}</strong>
              <p>{step.riskNote}</p>
            </div>
          </div>
        </article>

        <article className="panel timeline-panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Capital loop</span>
              <h3>Simulation timeline</h3>
            </div>
            <span className="muted">Jump to any scene</span>
          </div>
          <ol className="timeline-list">
            {steps.map((item, index) => (
              <li
                key={item.id}
                className={index === stepIndex ? 'active' : index < stepIndex ? 'complete' : ''}
              >
                <button type="button" className="timeline-button" onClick={() => jumpTo(index)}>
                  <span className="timeline-index">0{index + 1}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.title}</p>
                  </div>
                </button>
              </li>
            ))}
          </ol>
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
              <AgentCard key={agent.name} agent={agent} />
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
              <OpportunityCard key={item.name} item={item} />
            ))}
          </div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Risk policy</span>
              <h3>Guardrails before autonomy</h3>
            </div>
            <span className="muted">Why judges trust it</span>
          </div>
          <div className="guardrail-grid">
            {policyGuardrails.map((item) => (
              <GuardrailCard key={item.label} item={item} />
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Live event feed</span>
              <h3>Decision trail</h3>
            </div>
            <span className="muted">Agent accountability</span>
          </div>
          <EventFeed events={timelineEvents} />
        </article>
      </section>

      <section className="bottom-grid bottom-grid-tight">
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

        <article className="panel thesis-panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Next integration step</span>
              <h3>What we wire in next</h3>
            </div>
          </div>
          <ul className="thesis-list">
            <li>Swap the scenario hook for live CCTP transfer state and attestations.</li>
            <li>Connect one source yield venue on Arbitrum and one destination strategy on Base.</li>
            <li>Add policy-edit controls for reserve ratio, margin threshold, and edge floor.</li>
            <li>Persist agent decisions so the demo becomes a real operator console.</li>
          </ul>
        </article>
      </section>
    </main>
  )
}

export default App
