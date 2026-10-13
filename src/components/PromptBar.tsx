import { useEffect, useState } from 'react'
import type { PendingCommand } from '../context/PortfolioUIContext'

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

const TYPE_SPEED_MS = 55

interface PromptLineProps {
  path: string
  command: string
  /** pass the live PendingCommand to (re)play the typing animation; omit for a static prompt */
  replayKey?: PendingCommand
  onTypedDone?: (which: PendingCommand) => void
}

/**
 * Two-line shell prompt styled after the Oh My Posh "atomic" theme:
 * segment row (shell / path / exec time, date right-aligned) then the
 * continuation line with the actual command, mirroring a real pwsh prompt.
 * When `replayKey` is supplied, the command (re)types itself character by
 * character, exactly like a command entered live in that terminal.
 */
export function PromptLine({ path, command, replayKey, onTypedDone }: PromptLineProps) {
  const now = useClock()
  const [typed, setTyped] = useState(command)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!replayKey) return
    setTyped('')
    setTyping(true)
    let i = 0
    const timer = window.setInterval(() => {
      i += 1
      setTyped(command.slice(0, i))
      if (i >= command.length) {
        window.clearInterval(timer)
        setTyping(false)
        onTypedDone?.(replayKey)
      }
    }, TYPE_SPEED_MS)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayKey])

  const execMs = Math.max(6, command.length * 6)
  const dateLabel = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`

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
