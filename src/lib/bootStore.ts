import { useSyncExternalStore } from 'react'
import { SECTION_IDS, type SectionId } from '../context/PortfolioUIContext'

/**
 * Per-section "boot token" store, outside React context on purpose: bumping
 * one section's token must only re-render that section's own subscribers,
 * never the other five terminals on the page (a shared context value would
 * re-render everyone on every keystroke of the typing animation).
 */
const tokens: Record<SectionId, number> = Object.fromEntries(SECTION_IDS.map((id) => [id, 0])) as Record<
  SectionId,
  number
>

const listeners: Record<SectionId, Set<() => void>> = Object.fromEntries(
  SECTION_IDS.map((id) => [id, new Set<() => void>()]),
) as Record<SectionId, Set<() => void>>

export function triggerSection(id: SectionId, opts?: { scroll?: boolean }) {
  tokens[id] += 1
  listeners[id].forEach((notify) => notify())
  if (opts?.scroll) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function useBootToken(id: SectionId): number {
  return useSyncExternalStore(
    (onStoreChange) => {
      listeners[id].add(onStoreChange)
      return () => listeners[id].delete(onStoreChange)
    },
    () => tokens[id],
  )
}
