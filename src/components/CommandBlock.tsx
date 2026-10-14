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

/** A prompt line that retypes every time this section becomes the active one; output streams in line by line once it finishes, and the whole thing goes blank again the moment focus leaves. */
export function CommandBlock({ sectionId, path, command, children }: CommandBlockProps) {
  const { bootToken, revealed, handleTypedDone } = useCommandReplay(sectionId)

  return (
    <div>
      <PromptLine path={path} command={command} bootToken={bootToken} onTypedDone={handleTypedDone} />
      {revealed && <StreamLines>{children}</StreamLines>}
    </div>
  )
}
