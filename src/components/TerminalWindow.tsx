import type { ReactNode } from 'react'

interface TerminalWindowProps {
  path: string
  active?: boolean
  children: ReactNode
  className?: string
}

/** An authentic macOS/Unix terminal window chrome — title shows user + cwd, like a real session; which section it is lives in the heading above it. */
export function TerminalWindow({ path, active = false, children, className = '' }: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-(--color-bg) shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-[filter,opacity,border-color,box-shadow] duration-500 ease-out ${
        active
          ? 'border-(--color-accent) opacity-100 shadow-[0_0_50px_-10px_rgba(56,189,248,0.55)] [filter:none]'
          : 'border-(--color-border) opacity-80 shadow-[0_0_40px_-18px_rgba(56,189,248,0.2)] [filter:blur(1.5px)_brightness(0.6)]'
      } ${className}`}
    >
      <div
        className="relative flex items-center border-b border-(--color-border) px-4 py-2.5"
        style={{ background: 'linear-gradient(to bottom, #1b2535, #121a28)' }}
      >
        <div className="flex shrink-0 gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-red) shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-amber) shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-green) shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 truncate px-16 font-sans text-[13px] font-medium text-(--color-text-dim)">
          rafarenasdev — {path}
        </span>
      </div>
      <div className="overflow-x-auto bg-(--color-bg) p-4 font-mono text-[13px] leading-relaxed sm:p-6">
        {children}
      </div>
    </div>
  )
}
