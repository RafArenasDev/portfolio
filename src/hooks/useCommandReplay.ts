import { useEffect, useRef, useState } from 'react'
import type { SectionId } from '../context/PortfolioUIContext'
import { triggerSection, useBootToken } from '../lib/bootStore'

/**
 * Drives one terminal's "boot sequence": its command retypes and its output
 * reveals either the first time it scrolls into view, or whenever nav
 * explicitly retriggers it — same behavior either way. Reads its token from
 * an external store (not React context) so one section's typing animation
 * never re-renders the other five.
 */
export function useCommandReplay(sectionId: SectionId) {
  const token = useBootToken(sectionId)
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const booted = useRef(false)
  // compare against the last-seen VALUE, not a one-shot boolean flag —
  // StrictMode double-invokes mount effects, which breaks "have I run
  // before" booleans but leaves value comparisons idempotent and safe
  const prevToken = useRef(token)

  useEffect(() => {
    if (token !== prevToken.current) {
      prevToken.current = token
      booted.current = true
      setRevealed(false)
    }
  }, [token])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !booted.current) {
          booted.current = true
          triggerSection(sectionId)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTypedDone = () => setRevealed(true)

  return { token, revealed, handleTypedDone, containerRef }
}
