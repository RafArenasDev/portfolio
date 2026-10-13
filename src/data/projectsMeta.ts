export interface RepoMeta {
  sizeKb: number
  pushedAt: string
  language: string
}

/**
 * Snapshot fetched from the GitHub API, used as the first paint and as a
 * fallback if the live request fails (rate limit, offline, etc.).
 */
export const PROJECT_META_FALLBACK: Record<string, RepoMeta> = {
  'RafArenasDev/Nestwork': { sizeKb: 1830, pushedAt: '2026-09-21T00:25:56Z', language: 'TypeScript' },
  'RafArenasDev/Inventory-Manager': { sizeKb: 6077, pushedAt: '2026-09-09T23:16:38Z', language: 'TypeScript' },
  'RafArenasDev/Kardux-Battle': { sizeKb: 14956, pushedAt: '2026-10-01T20:58:46Z', language: 'TypeScript' },
}

export function formatSize(sizeKb: number): string {
  if (sizeKb < 1024) return `${sizeKb}K`
  return `${(sizeKb / 1024).toFixed(1)}M`
}

export function formatPwshDateTime(iso: string): { date: string; time: string } {
  const d = new Date(iso)
  const date = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d)
  const time = new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
  return { date, time }
}
