import { useEffect, useState } from 'react'
import { usePortfolioUI } from '../context/PortfolioUIContext'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const TYPE_SPEED_MS = 58
const EXEC_HOLD_MS = 550

export function CommandOverlay() {
  const { pendingCommand, clearCommand } = usePortfolioUI()
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<'typing' | 'executing'>('typing')
  const [materialized, setMaterialized] = useState(false)

  useEffect(() => {
    if (!pendingCommand) {
      setMaterialized(false)
      return
    }

    setTyped('')
    setPhase('typing')
    const raf = requestAnimationFrame(() => setMaterialized(true))

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
          setMaterialized(false)
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.setTimeout(clearCommand, 280)
        }, EXEC_HOLD_MS)
      }
    }, TYPE_SPEED_MS)

    return () => {
      cancelAnimationFrame(raf)
      window.clearInterval(typeTimer)
      window.clearTimeout(execTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingCommand])

  if (!pendingCommand) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] transition-[backdrop-filter,background-color] duration-300"
      style={{
        backgroundColor: materialized ? 'rgba(5, 8, 14, 0.65)' : 'rgba(5, 8, 14, 0)',
        backdropFilter: materialized ? 'blur(14px)' : 'blur(0px)',
      }}
    >
      <div
        className="w-full max-w-lg origin-top rounded-xl border border-(--color-border-strong) bg-(--color-panel)/95 shadow-[0_20px_80px_-10px_rgba(56,189,248,0.5)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: materialized ? 1 : 0,
          transform: materialized
            ? 'scale(1) translateY(0)'
            : prefersReducedMotion
              ? 'none'
              : 'scale(0.94) translateY(-8px)',
        }}
      >
        <div className="flex items-center gap-2 border-b border-(--color-border) px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-red)" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-amber)" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-green)" />
        </div>
        <div className="p-5 font-mono text-sm text-(--color-text)">
          <span className="text-(--color-accent)">❯</span> <span>{typed}</span>
          <span
            className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle"
            style={{ height: '1em' }}
          />
          {phase === 'executing' && (
            <p className="mt-2 text-xs text-(--color-text-faint)">ejecutando…</p>
          )}
        </div>
      </div>
    </div>
  )
}
