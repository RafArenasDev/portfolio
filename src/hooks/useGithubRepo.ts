import { useEffect, useState } from 'react'
import { PROJECT_META_FALLBACK, type RepoMeta } from '../data/projectsMeta'

type RepoState = RepoMeta & { source: 'live' | 'cached'; loading: boolean }

export function useGithubRepo(repo: string): RepoState {
  const fallback = PROJECT_META_FALLBACK[repo]
  const [state, setState] = useState<RepoState>({ ...fallback, source: 'cached', loading: true })

  useEffect(() => {
    let cancelled = false

    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (cancelled) return
        setState({
          sizeKb: data.size ?? fallback.sizeKb,
          pushedAt: data.pushed_at ?? fallback.pushedAt,
          language: data.language ?? fallback.language,
          source: 'live',
          loading: false,
        })
      })
      .catch(() => {
        if (!cancelled) setState((prev) => ({ ...prev, loading: false }))
      })

    return () => {
      cancelled = true
    }
  }, [repo, fallback])

  return state
}
