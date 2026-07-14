import './App.css'
import { AgentCard } from './components/AgentCard'
import { EventFeed } from './components/EventFeed'
import { GuardrailCard } from './components/GuardrailCard'
import { OpportunityCard } from './components/OpportunityCard'
import { agents, opportunities, policyGuardrails } from './data/scenario'
import { useSimulation } from './hooks/useSimulation'
import { formatCurrency, formatPercent } from './lib/format'

const differentiators = [
  {
    title: 'Capital does not sit idle',
    body: 'Treasury funds earn in yield until a real crosschain opportunity or margin event demands them.',
  },
  {
    title: 'CCTP is the core rail',
    body: 'Native USDC moves where it is needed most, without the product feeling like another generic bridge wrapper.',
  },
  {
    title: 'Trading and defense live together',
    body: 'The same system that deploys for carry can also rescue stressed positions before liquidation becomes real.',
  },
]

const productLanes = [
  'Treasury agent governs idle capital and reserve policy.',
  'Opportunity agent scores carry, yield, and risk dislocations crosschain.',
  'Execution agent routes CCTP transfers and triggers destination actions.',
]

const buildMilestones = [
  'Landing page for pitch clarity and judge storytelling.',
  'Operator dashboard for live simulation and strategy state.',
  'Next: live CCTP transfer service and protocol adapters.',
]

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
      <section className="landing-panel">
        <div className="topbar">
          <div>
            <div className="brand-mark">Sweepify</div>
            <div className="brand-subtitle">Crosschain capital autopilot for native USDC</div>
          </div>
          <div className="topbar-links">
            <a href="#thesis">Why now</a>
            <a href="#dashboard">Dashboard</a>
          </div>
        </div>

        <div className="landing-hero">
          <div className="landing-copy">
            <div className="eyebrow">Circle x Encode Hackathon</div>
            <h1>
              Move capital like a trading desk,
              <span> not like a stranded wallet.</span>
            </h1>
            <p className="hero-text">
              Sweepify is a multi-agent crosschain treasury and trading system that
              keeps native USDC productive, routes it to the best risk-adjusted
              opportunity, and rescues margin before liquidation using CCTP.
            </p>
            <div className="cta-row">
              <a className="primary-button button-link" href="#dashboard">
                Enter operator dashboard
              </a>
              <button type="button" className="secondary-button" onClick={toggleAutoPlay}>
                {isAutoPlaying ? 'Pause live demo' : 'Autoplay live demo'}
              </button>
            </div>
            <div className="signal-strip">
              {productLanes.map((lane) => (
                <div key={lane} className="signal-chip">
                  {lane}
                </div>
              ))}
            </div>
          </div>

          <div className="landing-preview">
            <div className="preview-card gradient-card">
              <span className="preview-label">Live thesis</span>
              <strong>{step.phase}</strong>
              <p>{step.route}</p>
            </div>
            <div className="preview-grid">
              {stats.map((stat) => (
                <article key={stat.label} className="metric-card preview-metric">
                  <span>{stat.label}</span>
                  <strong>
                    {stat.label === 'Health factor'
                      ? stat.value.toFixed(2)
                      : formatCurrency(stat.value)}
                  </strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="thesis" className="landing-grid">
        <article className="panel pitch-panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Why this wins</span>
              <h3>Three reasons judges will remember it</h3>
            </div>
          </div>
          <div className="pitch-grid">
            {differentiators.map((item) => (
              <article key={item.title} className="pitch-card">
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel milestone-panel">
          <div className="section-header">
            <div>
              <span className="eyebrow small">Build status</span>
              <h3>What exists right now</h3>
            </div>
          </div>
          <ul className="thesis-list compact-list">
            {buildMilestones.map((milestone) => (
              <li key={milestone}>{milestone}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="dashboard" className="dashboard-shell">
        <div className="dashboard-header">
          <div>
            <div className="eyebrow">Operator dashboard</div>
            <h2>The live control surface for Sweepify</h2>
          </div>
          <div className="hero-actions horizontal-actions">
            <button type="button" className="primary-button" onClick={next}>
              {nextLabel}
            </button>
            <button type="button" className="ghost-button" onClick={reset}>
              Reset to treasury state
            </button>
          </div>
        </div>

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
      </section>
    </main>
  )
}

export default App
