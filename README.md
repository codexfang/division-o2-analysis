# Division O2 Analysis

**Division O2 Analysis** is a static startup intelligence MVP that evaluates early-stage business ideas using a fully local, heuristic “mock intelligence engine.” It simulates YC-style internal idea screening—market saturation, competition, viability, risks, and a proceed / validate / avoid recommendation—without any backend, APIs, or database.

## Features

- **Idea input form** — description, industry, target audience, optional competitors
- **Mock market analyzer** — keyword and rule-based scoring in `src/mock/marketAnalyzer.js`
- **Results dashboard** — expandable metric cards with color-coded risk tones
- **Sample ideas** — AI dating, crypto analytics, food delivery, SaaS productivity
- **Export PDF** — client-side report download via `jspdf`

## Tech stack

- React 19 + Vite 8
- Tailwind CSS 4
- jsPDF (PDF export)

### SPA / routing

The app is a single-page application with no client router. All assets use the `/division-o2-analysis/` base path. No server rewrites are required for the default flow.

## Use case

Product teams, accelerators, or founders can use Division O2 as a **offline workshop tool** to structure idea critique conversations—comparing wedges, saturation, and competitive framing before spending cycles on customer discovery.

## License

MIT