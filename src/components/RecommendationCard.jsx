const ACTION_STYLES = {
  Proceed: { tone: 'positive', icon: '↑' },
  'Needs Validation': { tone: 'caution', icon: '◐' },
  Avoid: { tone: 'negative', icon: '✕' },
}

const TONE_BORDER = {
  positive: 'border-emerald-500/30 bg-emerald-500/5',
  caution: 'border-amber-500/30 bg-amber-500/5',
  negative: 'border-red-500/30 bg-red-500/5',
}

const TONE_TEXT = {
  positive: 'text-emerald-400',
  caution: 'text-amber-400',
  negative: 'text-red-400',
}

export default function RecommendationCard({ recommendation }) {
  const actionStyle = ACTION_STYLES[recommendation.action] || ACTION_STYLES['Needs Validation']
  const tone = recommendation.tone || actionStyle.tone

  return (
    <article className={`rounded-xl border p-5 ${TONE_BORDER[tone]}`}>
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        {recommendation.title}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <span className={`text-2xl font-light ${TONE_TEXT[tone]}`}>{actionStyle.icon}</span>
        <p className={`text-2xl font-bold tracking-tight ${TONE_TEXT[tone]}`}>
          {recommendation.action}
        </p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{recommendation.explanation}</p>
      {recommendation.details && (
        <p className="mt-3 rounded-lg bg-zinc-950/60 p-3 text-xs text-zinc-500">
          {recommendation.details}
        </p>
      )}
    </article>
  )
}
