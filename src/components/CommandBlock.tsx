import type { ReactNode } from 'react'
import type { SectionId } from '../context/PortfolioUIContext'
import { useCommandReplay } from '../hooks/useCommandReplay'
import { PromptLine } from './PromptBar'
import { StreamLines } from './StreamLines'

interface CommandBlockProps {
  sectionId: SectionId
  path: string
  command: string
  children: ReactNode
}

/** A prompt line that retypes its command on first scroll-into-view (or on nav replay); output streams in line by line once it finishes — nothing shown beforehand. */
export function CommandBlock({ sectionId, path, command, children }: CommandBlockProps) {
  const { token, revealed, handleTypedDone, containerRef } = useCommandReplay(sectionId)

  return (
    <div ref={containerRef}>
      <PromptLine path={path} command={command} bootToken={token} onTypedDone={handleTypedDone} />
      {revealed && <StreamLines>{children}</StreamLines>}
    </div>
  )
}
