export default function Header() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
            O2
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-zinc-50">
              Division O2 Analysis
            </h1>
            <p className="text-xs text-zinc-500">Startup intelligence · Mock validation engine</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/20">
            Offline
          </span>
          <span className="text-xs text-zinc-600">YC-style idea screening</span>
        </div>
      </div>
    </header>
  )
}
