import { useEffect, useState } from 'react'

interface TypingTextProps {
  lines: string[]
  className?: string
}

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const TYPE_SPEED_MS = 55
const DELETE_SPEED_MS = 30
const HOLD_MS = 1600

export function TypingText({ lines, className = '' }: TypingTextProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [text, setText] = useState(prefersReducedMotion ? lines[0] : '')

  useEffect(() => {
    if (prefersReducedMotion || lines.length === 0) return

    const currentLine = lines[lineIndex % lines.length]
    let timeout: number

    if (text.length < currentLine.length) {
      timeout = window.setTimeout(() => setText(currentLine.slice(0, text.length + 1)), TYPE_SPEED_MS)
    } else if (text === currentLine) {
      timeout = window.setTimeout(() => setText(currentLine.slice(0, -1)), HOLD_MS)
    } else {
      timeout = window.setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED_MS)
      if (text.length === 0) {
        setLineIndex((i) => (i + 1) % lines.length)
      }
    }

    return () => window.clearTimeout(timeout)
  }, [text, lineIndex, lines])

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: '1em' }} />
    </span>
  )
}
