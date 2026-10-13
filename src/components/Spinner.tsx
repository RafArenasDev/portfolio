import { useEffect, useState } from 'react'

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export function Spinner({ label = 'cargando…' }: { label?: string }) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 80)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className="text-(--color-accent)">
      {FRAMES[frame]} <span className="text-(--color-text-faint)">{label}</span>
    </p>
  )
}
