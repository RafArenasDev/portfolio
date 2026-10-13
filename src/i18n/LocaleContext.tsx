import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { translations, type Locale, type Translations } from './translations'

interface LocaleContextValue {
  locale: Locale
  t: Translations
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = 'portfolio-locale'

function readInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') return stored
  } catch {
    // localStorage unavailable (private mode, etc.) — fall back silently
  }
  return 'es'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: translations[locale],
      toggleLocale: () => {
        setLocale((current) => {
          const next = current === 'es' ? 'en' : 'es'
          try {
            localStorage.setItem(STORAGE_KEY, next)
          } catch {
            // ignore persistence failures
          }
          return next
        })
      },
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
