import { useEffect, useRef, useState } from 'react'

const REFERENCE_LINE_PX = 140

/** Picks the section whose top has most recently crossed the reference line below the sticky nav. */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '')
  const idsKey = ids.join(',')
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const compute = () => {
      let best = elements[0]
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= REFERENCE_LINE_PX) best = el
      }
      setActiveId(best.id)
    }

    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        compute()
      })
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  return activeId
}
