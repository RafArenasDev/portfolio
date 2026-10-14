import type { ReactNode } from 'react'
import type { SectionId } from '../context/PortfolioUIContext'
import { useCommandReplay } from '../hooks/useCommandReplay'
import { PromptLine } from './PromptBar'

interface CommandBlockProps {
  sectionId: SectionId
  path: string
  command: string
  children: ReactNode
}

/** A prompt line that retypes its command on first scroll-into-view (or on nav replay); output reveals once it finishes — no spinner. */
export function CommandBlock({ sectionId, path, command, children }: CommandBlockProps) {
  const { token, revealed, handleTypedDone, containerRef } = useCommandReplay(sectionId)

  return (
    <div ref={containerRef}>
      <PromptLine path={path} command={command} bootToken={token} onTypedDone={handleTypedDone} />
      {revealed && <div className="animate-command-reveal">{children}</div>}
    </div>
  )
}
