export default function Header() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-semibold tracking-tight text-zinc-50">
              Division O2 Analysis
            </h1>
            <p className="text-xs text-zinc-500">Startup Intelligence</p>
          </div>
        </div>
        <span className="hidden text-xs text-zinc-600 sm:inline">YC-Style Idea Screening</span>
      </div>
    </header>
  )
}
