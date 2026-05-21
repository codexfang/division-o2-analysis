import { useState } from 'react'

const TONE_STYLES = {
  positive: {
    badge: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400',
  },
  caution: {
    badge: 'bg-amber-500/15 text-amber-400 ring-amber-500/30',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
  },
  negative: {
    badge: 'bg-red-500/15 text-red-400 ring-red-500/30',
    border: 'border-red-500/20',
    accent: 'text-red-400',
  },
}

export default function MetricCard({
  title,
  score,
  level,
  explanation,
  details,
  tone = 'caution',
  showScore = true,
}) {
  const [expanded, setExpanded] = useState(false)
  const styles = TONE_STYLES[tone] || TONE_STYLES.caution

  return (
    <article
      className={`rounded-xl border bg-zinc-900/60 p-4 transition-colors ${styles.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-100">{title}</h3>
          {level && (
            <p className={`mt-0.5 text-xs font-medium uppercase tracking-wider ${styles.accent}`}>
              {level}
            </p>
          )}
        </div>
        {showScore && typeof score === 'number' && (
          <span
            className={`shrink-0 rounded-lg px-2.5 py-1 text-sm font-bold tabular-nums ring-1 ring-inset ${styles.badge}`}
          >
            {score}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{explanation}</p>
      {details && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-3 text-xs font-medium text-zinc-500 transition hover:text-zinc-300"
          >
            {expanded ? 'Hide details' : 'View details'}
          </button>
          {expanded && (
            <p className="mt-2 rounded-lg bg-zinc-950/80 p-3 text-xs leading-relaxed text-zinc-500">
              {details}
            </p>
          )}
        </>
      )}
    </article>
  )
}
