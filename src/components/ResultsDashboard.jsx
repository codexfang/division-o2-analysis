import MetricCard from './MetricCard.jsx'
import RisksCard from './RisksCard.jsx'
import RecommendationCard from './RecommendationCard.jsx'
import { downloadReportPdf } from '../utils/exportReport.js'

function EmptyState() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 px-8 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/80 text-2xl text-zinc-500">
        ◈
      </div>
      <h3 className="text-lg font-semibold text-zinc-200">Awaiting analysis</h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Enter a startup idea and run Division O2 analysis to generate viability, saturation,
        and competitive insights.
      </p>
    </div>
  )
}

export default function ResultsDashboard({ report }) {
  if (!report) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Intelligence Report</h2>
          <p className="text-xs text-zinc-500">
            {new Date(report.analyzedAt).toLocaleString()}
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadReportPdf(report)}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800"
        >
          Export PDF
        </button>
      </div>

      <RecommendationCard recommendation={report.recommendation} />

      <div className="grid gap-3 md:grid-cols-2">
        <MetricCard {...report.viability} />
        <MetricCard {...report.marketSaturation} />
        <MetricCard {...report.competition} />
        <MetricCard {...report.opportunity} />
      </div>

      <RisksCard risks={report.risks} />
    </div>
  )
}
