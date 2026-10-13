import { useEffect, useState } from 'react'
import { usePortfolioUI } from '../context/PortfolioUIContext'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const TYPE_SPEED_MS = 38
const EXEC_HOLD_MS = 320

export function CommandOverlay() {
  const { pendingCommand, clearCommand } = usePortfolioUI()
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<'typing' | 'executing'>('typing')

  useEffect(() => {
    if (!pendingCommand) return

    if (prefersReducedMotion) {
      document.getElementById(pendingCommand.targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      clearCommand()
      return
    }

    setTyped('')
    setPhase('typing')

    const { command, targetId } = pendingCommand
    let i = 0
    let execTimeout: number

    const typeTimer = window.setInterval(() => {
      i += 1
      setTyped(command.slice(0, i))
      if (i >= command.length) {
        window.clearInterval(typeTimer)
        setPhase('executing')
        execTimeout = window.setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.setTimeout(clearCommand, 260)
        }, EXEC_HOLD_MS)
      }
    }, TYPE_SPEED_MS)

    return () => {
      window.clearInterval(typeTimer)
      window.clearTimeout(execTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingCommand])

  if (!pendingCommand || prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-28 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-xl border border-(--color-border-strong) bg-(--color-panel)/90 shadow-[0_0_60px_-10px_rgba(56,189,248,0.4)]">
        <div className="flex items-center gap-2 border-b border-(--color-border) px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-red)" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-amber)" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-green)" />
        </div>
        <div className="p-5 font-mono text-sm text-(--color-text)">
          <span className="text-(--color-accent)">❯</span>{' '}
          <span>{typed}</span>
          <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: '1em' }} />
          {phase === 'executing' && (
            <p className="mt-2 text-xs text-(--color-text-faint)">ejecutando…</p>
          )}
        </div>
      </div>
    </div>
  )
}
