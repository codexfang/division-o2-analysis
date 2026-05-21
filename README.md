# Division O2 Analysis

**Division O2 Analysis** is a static startup intelligence MVP that evaluates early-stage business ideas using a fully local, heuristic “mock intelligence engine.” It simulates YC-style internal idea screening—market saturation, competition, viability, risks, and a proceed / validate / avoid recommendation—without any backend, APIs, or database.

## Features

- **Idea input form** — description, industry, target audience, optional competitors
- **Mock market analyzer** — keyword and rule-based scoring in `src/mock/marketAnalyzer.js`
- **Results dashboard** — expandable metric cards with color-coded risk tones
- **Sample ideas** — AI dating, crypto analytics, food delivery, SaaS productivity
- **Compare mode** — side-by-side analysis of two ideas
- **Export PDF** — client-side report download via `jspdf`
- **GitHub Pages ready** — `npm run build` + `gh-pages` deployment

## Tech stack

- React 19 + Vite 8
- Tailwind CSS 4
- jsPDF (PDF export)
- gh-pages (static deploy)

## Quick start

```bash
git clone https://github.com/YOUR_USERNAME/division-o2-analysis.git
cd division-o2-analysis
npm install
npm run dev
```

Open [http://localhost:5173/division-o2-analysis/](http://localhost:5173/division-o2-analysis/) (Vite uses the same `base` path as production).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and publish `dist/` to `gh-pages` branch |

## GitHub Pages deployment

### First-time setup (required once)

`gh-pages` needs a GitHub repository to push to. If `npm run deploy` fails with **"Failed to get remote.origin.url"**, complete these steps:

1. **Create the repo** on GitHub: [github.com/new](https://github.com/new) → name it **`division-o2-analysis`** (must match Vite `base` in `vite.config.js`). Do not add a README if you already have one locally.

2. **Commit and push** your local project:

```bash
cd /Users/seraphicflare/Projects/division-o2-analysis
git add .
git commit -m "Initial commit: Division O2 Analysis MVP"
git branch -M main
git remote add origin https://github.com/seraphicflare/division-o2-analysis.git
git push -u origin main
```

3. **Deploy** (builds `dist/` and pushes to the `gh-pages` branch):

```bash
npm run deploy
```

The deploy script uses `-r https://github.com/seraphicflare/division-o2-analysis.git` so you do not need `origin` configured for `gh-pages` alone—but the repo must exist on GitHub and you must be authenticated (`gh auth login` or SSH/HTTPS credentials).

4. In the repo **Settings → Pages**, set source to branch **`gh-pages`**, folder **`/ (root)`**.

5. Live site: **https://seraphicflare.github.io/division-o2-analysis/**

If your GitHub username is not `seraphicflare`, change the URL in `package.json` (`deploy` script) and in `git remote add origin` above.

### SPA / routing

The app is a single-page application with no client router. All assets use the `/division-o2-analysis/` base path. No server rewrites are required for the default flow.

### Local production preview

```bash
npm run build
npm run preview
```

## Mock intelligence engine

All analysis runs in the browser via `src/mock/marketAnalyzer.js`:

| Signal | Effect |
|--------|--------|
| Keywords: `AI`, `crypto`, `delivery`, etc. | Increases **market saturation** |
| Industries: fintech, social media, consumer | Increases **competition** |
| Niche / vertical language, long specific ideas | Increases **opportunity** |
| Named competitors | Raises competition score |
| Idea length & keyword density | Influences **viability** (0–100) |

Outputs:

1. **Viability score** (0–100)
2. **Market saturation** — Low / Medium / High
3. **Competition level** — Weak / Moderate / Strong / Saturated
4. **Opportunity insight** — narrative paragraph
5. **Risks** — templated, context-triggered list
6. **Recommendation** — Proceed / Needs Validation / Avoid

> **Disclaimer:** Scores are simulated for demo and learning purposes. They are not investment advice or real market data.

## Project structure

```
division-o2-analysis/
├── data/
│   └── sampleIdeas.js       # Sample startup presets
├── public/
├── src/
│   ├── components/          # UI (forms, cards, dashboard)
│   ├── mock/
│   │   └── marketAnalyzer.js
│   ├── utils/
│   │   └── exportReport.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js           # base: /division-o2-analysis/
└── README.md
```

## Use case

Product teams, accelerators, or founders can use Division O2 as a **offline workshop tool** to structure idea critique conversations—comparing wedges, saturation, and competitive framing before spending cycles on customer discovery.

## License

MIT — use freely for demos and internal tooling.
