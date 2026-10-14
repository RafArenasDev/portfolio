import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from 'react'

/** Staggers each direct child's entrance, like output streaming line-by-line in a terminal. */
export function StreamLines({ children, stepMs = 55 }: { children: ReactNode; stepMs?: number }) {
  return (
    <>
      {Children.toArray(children).map((child, i) => {
        if (!isValidElement<{ className?: string; style?: CSSProperties }>(child)) return child
        return cloneElement(child, {
          className: `${child.props.className ?? ''} animate-command-reveal`.trim(),
          style: { ...child.props.style, ['--stream-delay' as string]: `${i * stepMs}ms` },
        })
      })}
    </>
  )
}
