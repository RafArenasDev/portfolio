import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

export const SECTION_IDS = ['whoami', 'stack', 'experience', 'education', 'projects', 'connect'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export interface PendingCommand {
  command: string
  targetId: SectionId
}

interface PortfolioUIValue {
  activeSection: string
  pendingCommand: PendingCommand | null
  runCommand: (targetId: SectionId, command: string) => void
  clearCommand: (which: PendingCommand) => void
}

const PortfolioUIContext = createContext<PortfolioUIValue | null>(null)

export function PortfolioUIProvider({ children }: { children: ReactNode }) {
  const activeSection = useScrollSpy([...SECTION_IDS])
  const [pendingCommand, setPendingCommand] = useState<PendingCommand | null>(null)

  const runCommand = useCallback((targetId: SectionId, command: string) => {
    const next = { targetId, command }
    setPendingCommand(next)
    // scroll immediately so the command types inside the terminal you land on,
    // the same way a real shell command happens in the window you're looking at
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // guards against a second nav click clobbering a pending clear from the first
  const clearCommand = useCallback((which: PendingCommand) => {
    setPendingCommand((current) => (current === which ? null : current))
  }, [])

  const value = useMemo(
    () => ({ activeSection, pendingCommand, runCommand, clearCommand }),
    [activeSection, pendingCommand, runCommand, clearCommand],
  )

  return <PortfolioUIContext.Provider value={value}>{children}</PortfolioUIContext.Provider>
}

export function usePortfolioUI() {
  const ctx = useContext(PortfolioUIContext)
  if (!ctx) throw new Error('usePortfolioUI must be used within PortfolioUIProvider')
  return ctx
}

export type { PortfolioUIValue }
