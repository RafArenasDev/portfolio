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

/** A prompt line whose command retypes live in place; output appears the instant it finishes — no spinner. */
export function CommandBlock({ sectionId, path, command, children }: CommandBlockProps) {
  const { replayKey, revealed, handleTypedDone } = useCommandReplay(sectionId)

  return (
    <>
      <PromptLine path={path} command={command} replayKey={replayKey} onTypedDone={handleTypedDone} />
      {revealed && <div className={replayKey ? 'animate-command-reveal' : ''}>{children}</div>}
    </>
  )
}
