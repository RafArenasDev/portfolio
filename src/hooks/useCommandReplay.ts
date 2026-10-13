import { useEffect, useState } from 'react'
import { usePortfolioUI, type PendingCommand, type SectionId } from '../context/PortfolioUIContext'

const HOLD_AFTER_TYPE_MS = 320

export function useCommandReplay(sectionId: SectionId) {
  const { pendingCommand, clearCommand } = usePortfolioUI()
  const [phase, setPhase] = useState<'idle' | 'loading'>('idle')

  const isTarget = pendingCommand?.targetId === sectionId
  const replayKey = isTarget ? pendingCommand : undefined

  useEffect(() => {
    // content clears the instant this section becomes the target, in sync
    // with the command retyping, so nothing "already loaded" sits behind it
    if (isTarget) setPhase('loading')
  }, [isTarget, pendingCommand])

  const handleTypedDone = (command: PendingCommand) => {
    window.setTimeout(() => {
      setPhase('idle')
      clearCommand(command)
    }, HOLD_AFTER_TYPE_MS)
  }

  return { replayKey, phase, handleTypedDone }
}
