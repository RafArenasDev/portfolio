import { useEffect, useState } from 'react'
import { usePortfolioUI, type PendingCommand, type SectionId } from '../context/PortfolioUIContext'

export function useCommandReplay(sectionId: SectionId) {
  const { pendingCommand, clearCommand } = usePortfolioUI()
  const [revealed, setRevealed] = useState(true)

  const isTarget = pendingCommand?.targetId === sectionId
  const replayKey = isTarget ? pendingCommand : undefined

  useEffect(() => {
    // hide output the instant this section becomes the target, in sync with
    // the command retyping — there's nothing to show until it "runs"
    if (isTarget) setRevealed(false)
  }, [isTarget, pendingCommand])

  const handleTypedDone = (command: PendingCommand) => {
    // a real shell prints output the instant the command finishes — no spinner
    setRevealed(true)
    clearCommand(command)
  }

  return { replayKey, revealed, handleTypedDone }
}
