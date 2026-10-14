export function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-3 flex items-baseline gap-3">
      <span className="font-mono text-xs text-(--color-text-faint)">// {String(index).padStart(2, '0')}</span>
      <h2 className="font-sans text-lg font-bold tracking-tight text-(--color-text) sm:text-xl">{title}</h2>
    </div>
  )
}
