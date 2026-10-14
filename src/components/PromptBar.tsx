import { useEffect, useState, type ReactNode } from 'react'

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

/** One oh-my-posh "atomic"-style segment: flat rectangle, rounded cap only at the group's outer edge, a sharp powerline triangle tying it to its neighbor. */
function Segment({
  bg,
  fg,
  text,
  first = false,
  last = false,
  tail = 'none',
}: {
  bg: string
  fg: string
  text: ReactNode
  first?: boolean
  last?: boolean
  tail?: 'none' | 'right' | 'left'
}) {
  return (
    <div
      className={`relative flex h-7 items-center whitespace-nowrap px-3 text-[11px] font-semibold ${
        first ? 'rounded-l-full pl-4' : ''
      } ${last ? 'rounded-r-full pr-4' : ''}`}
      style={{ background: bg, color: fg, zIndex: tail !== 'none' ? 2 : 1 }}
    >
      {tail === 'left' && (
        <span
          className="absolute -left-[1px] top-0 z-10 h-0 w-0 border-y-[14px] border-y-transparent border-r-[10px]"
          style={{ borderRightColor: bg }}
        />
      )}
      {text}
      {tail === 'right' && (
        <span
          className="absolute -right-[1px] top-0 z-10 h-0 w-0 border-y-[14px] border-y-transparent border-l-[10px]"
          style={{ borderLeftColor: bg }}
        />
      )}
    </div>
  )
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
      <path d="M16.37 1.43c0 1.14-.46 2.1-1.18 2.84-.8.83-2.1 1.46-3.1 1.38-.12-1.1.46-2.25 1.17-2.96.79-.8 2.17-1.4 3.1-1.26ZM20.9 17.55c-.5 1.15-.74 1.66-1.38 2.68-.9 1.43-2.16 3.21-3.74 3.22-1.4.02-1.76-.92-3.66-.91-1.9.01-2.3.93-3.7.92-1.58-.01-2.78-1.62-3.68-3.05C2.54 17.3 1.9 12.5 3.6 9.5c.9-1.6 2.5-2.6 4.2-2.63 1.4-.02 2.73.95 3.6.95.86 0 2.47-1.17 4.17-1 .7.03 2.7.28 3.98 2.1-.1.06-2.37 1.38-2.35 4.12.03 3.27 2.86 4.36 2.9 4.38Z" />
    </svg>
  )
}

const TYPE_SPEED_MS = 110

interface PromptLineProps {
  path: string
  /** increments to (re)play the typing animation; omit/0 keeps the terminal blank, exactly like one never run yet */
  bootToken?: number
  onTypedDone?: () => void
  command: string
}

/**
 * Two-line shell prompt styled after the Oh My Posh "atomic" theme: a
 * left-aligned user/path segment pair, a right-aligned OS-mark/date pair,
 * then the continuation line with the actual command. The terminal stays
 * visually blank — no command text at all — until `bootToken` first fires.
 */
export function PromptLine({ path, command, bootToken, onTypedDone }: PromptLineProps) {
  const now = useClock()
  const [typed, setTyped] = useState('')
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

  const dateLabel = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`

  if (!bootToken) {
    return <div className="mb-4 h-[52px]" aria-hidden />
  }

  return (
    <div className="mb-4 select-text">
      <div className="flex flex-wrap items-center justify-between gap-y-1">
        <div className="flex">
          <Segment bg="#0077c2" fg="#ffffff" text=" rafarenasdev " first tail="right" />
          <Segment bg="#ff9248" fg="#2a2a2a" text={` ${path} `} last />
        </div>
        <div className="flex">
          <Segment bg="#0a3d66" fg="#ffffff" text={<AppleMark />} first tail="right" />
          <Segment bg="#8ecbf2" fg="#0a2f4a" text={` ${dateLabel} `} last />
        </div>
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
