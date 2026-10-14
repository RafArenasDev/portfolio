import { useEffect, useState } from 'react'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** One oh-my-posh "atomic"-style segment: flat rectangle, rounded cap only at the group's outer edge, a sharp powerline arrow pointing into the next segment. */
function Segment({
  bg,
  fg,
  text,
  first = false,
  last = false,
}: {
  bg: string
  fg: string
  text: string
  first?: boolean
  last?: boolean
}) {
  return (
    <div
      className={`relative flex h-7 items-center whitespace-nowrap px-3 text-[11px] font-semibold ${
        first ? 'rounded-l-full pl-4' : ''
      } ${last ? 'rounded-r-full pr-4' : ''}`}
      style={{ background: bg, color: fg }}
    >
      {text}
      {!last && (
        <span
          className="absolute -right-[1px] top-0 z-10 h-0 w-0 border-y-[14px] border-y-transparent border-l-[7px]"
          style={{ borderLeftColor: bg }}
        />
      )}
    </div>
  )
}

const TYPE_SPEED_MS = 85

interface PromptLineProps {
  path: string
  command: string
  /** increments to (re)play the typing animation; 0 (or omitted) renders the command statically */
  bootToken?: number
  onTypedDone?: () => void
}

/**
 * Two-line shell prompt styled after the Oh My Posh "atomic" theme:
 * segment row (shell / path / exec time, date right-aligned) then the
 * continuation line with the actual command, mirroring a real pwsh prompt.
 * Each time `bootToken` increments, the command (re)types itself character
 * by character, exactly like a command entered live in that terminal.
 */
export function PromptLine({ path, command, bootToken, onTypedDone }: PromptLineProps) {
  const now = useClock()
  const [typed, setTyped] = useState(bootToken ? '' : command)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!bootToken) return
    setTyped('')
    setTyping(true)
    let i = 0
    const timer = window.setInterval(() => {
      i += 1
      setTyped(command.slice(0, i))
      if (i >= command.length) {
        window.clearInterval(timer)
        setTyping(false)
        onTypedDone?.()
      }
    }, TYPE_SPEED_MS)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootToken])

  const execMs = Math.max(6, command.length * 6)
  const dateLabel = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`

  return (
    <div className="mb-4 select-text">
      <div className="flex flex-wrap items-center justify-between gap-y-1">
        <div className="flex">
          <span className="mr-1 font-mono text-[13px] text-(--color-text-faint)">╭─</span>
          <Segment bg="#0077c2" fg="#ffffff" text=" rafarenasdev " first />
          <Segment bg="#ff9248" fg="#2a2a2a" text={` ${path} `} />
          <Segment bg="#83769c" fg="#ffffff" text={` ${execMs}ms `} last />
        </div>
        <span className="pl-2 font-mono text-[11px] font-semibold" style={{ color: '#40c4ff' }}>
          {dateLabel}
        </span>
      </div>
      <div className="mt-1 font-mono text-[13px] sm:text-sm">
        <span className="text-(--color-text-faint)">╰─ </span>
        <span className="text-(--color-accent)">❯</span>{' '}
        <span className="text-(--color-text)">{typed}</span>
        {typing && (
          <span
            className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle"
            style={{ height: '1em' }}
          />
        )}
      </div>
    </div>
  )
}
