import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

export const SECTION_IDS = ['whoami', 'stack', 'experience', 'education', 'projects', 'connect'] as const
export type SectionId = (typeof SECTION_IDS)[number]

interface PendingCommand {
  command: string
  targetId: SectionId
}

interface PortfolioUIValue {
  activeSection: string
  pendingCommand: PendingCommand | null
  runCommand: (targetId: SectionId, command: string) => void
  clearCommand: () => void
}

const PortfolioUIContext = createContext<PortfolioUIValue | null>(null)

export function PortfolioUIProvider({ children }: { children: ReactNode }) {
  const activeSection = useScrollSpy([...SECTION_IDS])
  const [pendingCommand, setPendingCommand] = useState<PendingCommand | null>(null)

  const runCommand = useCallback((targetId: SectionId, command: string) => {
    setPendingCommand({ targetId, command })
  }, [])

  const clearCommand = useCallback(() => setPendingCommand(null), [])

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
