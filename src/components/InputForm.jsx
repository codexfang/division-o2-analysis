import { INDUSTRY_OPTIONS } from '../../data/sampleIdeas.js'

const inputClass =
  'w-full rounded-lg border border-zinc-800 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30'

export default function InputForm({ values, onChange, onAnalyze, onSample, loading }) {
  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value })

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Startup idea
          </label>
          <textarea
            rows={5}
            value={values.idea}
            onChange={set('idea')}
            placeholder="Describe the problem, solution, and wedge..."
            className={`${inputClass} resize-y min-h-[120px]`}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">Industry</label>
          <select value={values.industry} onChange={set('industry')} className={inputClass}>
            <option value="">Select industry</option>
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Target audience
          </label>
          <input
            type="text"
            value={values.targetAudience}
            onChange={set('targetAudience')}
            placeholder="e.g. SMB finance teams, Gen Z creators..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Competitors <span className="text-zinc-600">(optional)</span>
          </label>
          <input
            type="text"
            value={values.competitors}
            onChange={set('competitors')}
            placeholder="Comma-separated: Acme, BetaCo, ..."
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading || !values.idea?.trim()}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? 'Analyzing…' : 'Analyze Idea'}
        </button>
        <button
          type="button"
          onClick={onSample}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800"
        >
          Try Sample Idea
        </button>
      </div>
    </div>
  )
}
