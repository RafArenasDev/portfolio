import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from 'react'

/** Staggers each direct child's entrance, like output streaming line-by-line in a terminal. */
export function StreamLines({
  children,
  stepMs = 180,
  baseDelayMs = 0,
}: {
  children: ReactNode
  stepMs?: number
  baseDelayMs?: number
}) {
  return (
    <>
      {Children.toArray(children).map((child, i) => {
        if (!isValidElement<{ className?: string; style?: CSSProperties }>(child)) return child
        return cloneElement(child, {
          className: `${child.props.className ?? ''} animate-command-reveal`.trim(),
          style: { ...child.props.style, ['--stream-delay' as string]: `${baseDelayMs + i * stepMs}ms` },
        })
      })}
    </>
  )
}
