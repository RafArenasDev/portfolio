import { useEffect, useState } from 'react'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function DiamondSegment({
  bg,
  fg,
  text,
  first = false,
}: {
  bg: string
  fg: string
  text: string
  first?: boolean
}) {
  return (
    <div
      className="flex h-7 items-center whitespace-nowrap px-3 text-[11px] font-semibold"
      style={{
        background: bg,
        color: fg,
        marginLeft: first ? 0 : -9,
        clipPath: first
          ? 'polygon(0 0, 100% 0, 88% 100%, 0% 100%)'
          : 'polygon(11% 0, 100% 0, 88% 100%, 0% 100%)',
      }}
    >
      {text}
    </div>
  )
}

/**
 * Two-line shell prompt styled after the Oh My Posh "atomic" theme:
 * segment row (shell / path / exec time, time right-aligned) then the
 * continuation line with the actual command, mirroring a real pwsh prompt.
 */
export function PromptLine({ path, command }: { path: string; command: string }) {
  const now = useClock()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const execMs = Math.max(6, command.length * 6)

  return (
    <div className="mb-4 select-text">
      <div className="flex flex-wrap items-center justify-between gap-y-1">
        <div className="flex">
          <span className="mr-1 font-mono text-[13px] text-(--color-text-faint)">╭─</span>
          <DiamondSegment bg="#0077c2" fg="#ffffff" text=" rafael " first />
          <DiamondSegment bg="#ff9248" fg="#2a2a2a" text={` ${path} `} />
          <DiamondSegment bg="#83769c" fg="#ffffff" text={` ${execMs}ms `} />
        </div>
        <span className="pl-2 font-mono text-[11px] font-semibold" style={{ color: '#40c4ff' }}>
          {now.getDate()},{hh}:{mm}
        </span>
      </div>
      <div className="mt-1 font-mono text-[13px] sm:text-sm">
        <span className="text-(--color-text-faint)">╰─ </span>
        <span className="text-(--color-accent)">❯</span>{' '}
        <span className="text-(--color-text)">{command}</span>
      </div>
    </div>
  )
}
