export function FolderIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.17a1.5 1.5 0 0 1 1.06.44L11 6.7a1.5 1.5 0 0 0 1.06.44h7.44A1.5 1.5 0 0 1 21 8.64v8.86A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        fill="#60a5fa"
        stroke="#93c5fd"
        strokeWidth="1"
      />
    </svg>
  )
}

/** Resolves a per-tech icon URL, falling back off skillicons.dev for techs it doesn't cover (e.g. mssql). */
export function techIconUrl(icon: string): string {
  if (icon === 'mssql') return 'https://cdn.simpleicons.org/microsoftsqlserver/cbd5e1'
  return `https://skillicons.dev/icons?i=${icon}&theme=dark`
}
