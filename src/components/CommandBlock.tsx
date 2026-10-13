import type { ReactNode } from 'react'
import type { SectionId } from '../context/PortfolioUIContext'
import { useCommandReplay } from '../hooks/useCommandReplay'
import { PromptLine } from './PromptBar'
import { Spinner } from './Spinner'

interface CommandBlockProps {
  sectionId: SectionId
  path: string
  command: string
  children: ReactNode
}

/** A prompt line whose command replays live, with its output hidden behind a spinner while it "runs". */
export function CommandBlock({ sectionId, path, command, children }: CommandBlockProps) {
  const { replayKey, phase, handleTypedDone } = useCommandReplay(sectionId)

  return (
    <>
      <PromptLine path={path} command={command} replayKey={replayKey} onTypedDone={handleTypedDone} />
      {phase === 'loading' ? <Spinner /> : <div className="animate-command-reveal">{children}</div>}
    </>
  )
}
