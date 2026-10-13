import type { ReactNode } from 'react'

interface TerminalWindowProps {
  title: string
  active?: boolean
  children: ReactNode
  className?: string
}

export function TerminalWindow({ title, active = false, children, className = '' }: TerminalWindowProps) {
  return (
    <div
      className={`rounded-xl border bg-(--color-bg) transition-[filter,opacity,border-color,box-shadow] duration-500 ease-out ${
        active
          ? 'border-(--color-accent) opacity-100 shadow-[0_0_50px_-10px_rgba(56,189,248,0.55)] [filter:none]'
          : 'border-(--color-border) opacity-80 shadow-[0_0_40px_-18px_rgba(56,189,248,0.2)] [filter:blur(1.5px)_brightness(0.6)]'
      } ${className}`}
    >
      <div className="relative flex items-center border-b border-(--color-border) px-4 py-2">
        <div className="flex shrink-0 gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-red)" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-amber)" />
          <span className="h-2.5 w-2.5 rounded-full bg-(--color-mac-green)" />
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-[12px] text-(--color-text-faint)">
          {title}
        </span>
      </div>
      <div className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed sm:p-6">{children}</div>
    </div>
  )
}
