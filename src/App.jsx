import { useState } from 'react'
import Header from './components/Header.jsx'
import InputForm from './components/InputForm.jsx'
import ResultsDashboard from './components/ResultsDashboard.jsx'
import { analyzeMarket } from './mock/marketAnalyzer.js'

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
  const [formA, setFormA] = useState({ ...EMPTY_FORM })
  const [formB, setFormB] = useState({ ...EMPTY_FORM })
  const [reportA, setReportA] = useState(null)
  const [reportB, setReportB] = useState(null)
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)
  const [compareMode, setCompareMode] = useState(false)

  const handleAnalyze = async (form, setReport, setLoading) => {
    if (!form.idea?.trim()) return
    setLoading(true)
    try {
      const report = await runAnalysis(form)
      setReport(report)
    } finally {
      setLoading(false)
    }
  }

  const singlePanel = !compareMode

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Header />
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:py-8">
        <div
          className={`grid gap-6 ${singlePanel ? 'lg:grid-cols-[minmax(320px,380px)_1fr]' : 'lg:grid-cols-2'}`}
        >
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 lg:sticky lg:top-6 lg:self-start">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {compareMode ? 'Idea A — Input' : 'Idea Input'}
            </h2>
            <InputForm
              values={formA}
              onChange={setFormA}
              loading={loadingA}
              compareMode={compareMode}
              onCompareModeChange={setCompareMode}
              onAnalyze={() => handleAnalyze(formA, setReportA, setLoadingA)}
            />
          </section>

          {compareMode && (
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 lg:sticky lg:top-6 lg:self-start">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Idea B — Input
              </h2>
              <InputForm
                values={formB}
                onChange={setFormB}
                loading={loadingB}
                compareMode
                onCompareModeChange={setCompareMode}
                slotLabel="Comparison slot"
                onAnalyze={() => handleAnalyze(formB, setReportB, setLoadingB)}
              />
            </section>
          )}

          {singlePanel ? (
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 lg:min-h-[600px]">
              <ResultsDashboard report={reportA} />
            </section>
          ) : (
            <>
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-500/70">
                  Idea A — Report
                </p>
                <ResultsDashboard report={reportA} compact />
              </section>
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-500/70">
                  Idea B — Report
                </p>
                <ResultsDashboard report={reportB} compact />
              </section>
            </>
          )}
        </div>
      </main>
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
        Division O2 · Simulated intelligence only · No data leaves your browser
      </footer>
    </div>
  )
}
