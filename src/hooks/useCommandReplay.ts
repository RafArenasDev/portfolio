import { useEffect, useRef, useState } from 'react'
import { usePortfolioUI, type SectionId } from '../context/PortfolioUIContext'

/**
 * Drives one terminal's boot sequence, tied to whether it's the section
 * currently in focus (per scrollspy): the command retypes and output
 * streams in every time this section BECOMES the active one — by scroll or
 * by nav click, no difference — and resets to fully blank the moment it's
 * no longer active. Nothing persists once you scroll away.
 */
export function useCommandReplay(sectionId: SectionId) {
  const { activeSection } = usePortfolioUI()
  const isActive = activeSection === sectionId
  const wasActive = useRef(false)
  const [bootCount, setBootCount] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (isActive && !wasActive.current) {
      wasActive.current = true
      setRevealed(false)
      setBootCount((c) => c + 1)
    } else if (!isActive) {
      wasActive.current = false
      setRevealed(false)
    }
  }, [isActive])

  const handleTypedDone = () => setRevealed(true)

  return { bootToken: isActive ? bootCount : 0, revealed: isActive && revealed, handleTypedDone }
}
