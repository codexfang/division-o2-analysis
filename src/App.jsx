import { useCallback, useState } from 'react'
import Header from './components/Header.jsx'
import InputForm from './components/InputForm.jsx'
import ResultsDashboard from './components/ResultsDashboard.jsx'
import { analyzeMarket } from './mock/marketAnalyzer.js'
import { SAMPLE_IDEAS } from '../data/sampleIdeas.js'

const EMPTY_FORM = {
  idea: '',
  industry: '',
  targetAudience: '',
  competitors: '',
}

function runAnalysis(values) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(analyzeMarket(values)), 480)
  })
}

export default function App() {
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sampleIndex, setSampleIndex] = useState(0)

  const fillSample = useCallback(() => {
    setSampleIndex((i) => {
      const sample = SAMPLE_IDEAS[i % SAMPLE_IDEAS.length]
      setForm({
        idea: sample.idea,
        industry: sample.industry,
        targetAudience: sample.targetAudience,
        competitors: sample.competitors,
      })
      return i + 1
    })
  }, [])

  const handleAnalyze = async () => {
    if (!form.idea?.trim()) return
    setLoading(true)
    try {
      const result = await runAnalysis(form)
      setReport(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Header />
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(320px,380px)_1fr] lg:items-start">
          <section className="flex h-[600px] max-h-[600px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 lg:sticky lg:top-6">
            <h2 className="mb-4 shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Idea Input
            </h2>
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <InputForm
                values={form}
                onChange={setForm}
                loading={loading}
                onAnalyze={handleAnalyze}
                onSample={fillSample}
              />
            </div>
          </section>

          <section className="flex h-[600px] max-h-[600px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <ResultsDashboard report={report} />
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
        Division O2 · Simulated intelligence only · No data leaves your browser
      </footer>
    </div>
  )
}
