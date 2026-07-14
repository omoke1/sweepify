# Sweepify

Sweepify is a hackathon MVP for a crosschain autonomous capital allocator built around Circle `USDC` and `CCTP`.

## Product thesis

Idle treasury should not sit stranded on the wrong chain.

Sweepify uses a three-agent system to keep capital productive in yield, spot better opportunities on another chain, move native `USDC` with `CCTP`, and top up margin before liquidation risk becomes critical.

## Current MVP

The current app is a demo-first frontend that shows:

- Treasury parking capital in yield on Arbitrum
- An opportunity agent spotting a better carry setup on Base
- An execution agent routing native `USDC` with `CCTP`
- A margin sweep event that rescues a stressed position
- The return of excess capital back into yield

## Agent roles

- `Treasury Agent`: manages idle capital, reserve policy, and transfer budgets
- `Opportunity Agent`: watches spreads, funding, and risk events across chains
- `Execution Agent`: triggers `CCTP`, destination hooks, and position actions

## Local development

```bash
npm install
npm run dev
```

## Build and lint

```bash
npm run build
npm run lint
```

## Next build steps

- Replace the simulation timeline with live strategy state
- Add real `CCTP` transfer orchestration and status tracking
- Integrate one yield venue and one destination protocol
- Add policy controls for treasury sizing and margin sweep thresholds
- Add a demo mode and operator mode for judging

