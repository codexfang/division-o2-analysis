import { useState } from 'react'

const SEVERITY_STYLES = {
  high: 'bg-red-500/10 text-red-400 ring-red-500/25',
  medium: 'bg-amber-500/10 text-amber-400 ring-amber-500/25',
  low: 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/25',
}

export default function RisksCard({ risks = [] }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-100">Risk Assessment</h3>
        <span className="rounded-lg bg-red-500/15 px-2.5 py-1 text-sm font-bold text-red-400 ring-1 ring-inset ring-red-500/30">
          {risks.length}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-400">
        Simulated risk factors from market structure and idea positioning heuristics.
      </p>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 text-xs font-medium text-zinc-500 hover:text-zinc-300"
      >
        {expanded ? 'Collapse' : 'Expand'} risks
      </button>
      {expanded && (
        <ul className="mt-3 space-y-3">
          {risks.map((risk) => (
            <li
              key={risk.title}
              className="rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-zinc-200">{risk.title}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ring-1 ring-inset ${SEVERITY_STYLES[risk.severity] || SEVERITY_STYLES.medium}`}
                >
                  {risk.severity}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{risk.description}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
