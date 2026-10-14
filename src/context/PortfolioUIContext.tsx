import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

export const SECTION_IDS = ['whoami', 'stack', 'experience', 'education', 'projects', 'connect'] as const
export type SectionId = (typeof SECTION_IDS)[number]

interface PortfolioUIValue {
  activeSection: string
}

const PortfolioUIContext = createContext<PortfolioUIValue | null>(null)

export function PortfolioUIProvider({ children }: { children: ReactNode }) {
  const activeSection = useScrollSpy([...SECTION_IDS])
  const value = useMemo(() => ({ activeSection }), [activeSection])
  return <PortfolioUIContext.Provider value={value}>{children}</PortfolioUIContext.Provider>
}

export function usePortfolioUI() {
  const ctx = useContext(PortfolioUIContext)
  if (!ctx) throw new Error('usePortfolioUI must be used within PortfolioUIProvider')
  return ctx
}

export type { PortfolioUIValue }
