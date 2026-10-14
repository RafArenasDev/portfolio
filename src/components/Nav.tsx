import { usePortfolioUI, type SectionId } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'
import { triggerSection } from '../lib/bootStore'

const SECTIONS: { id: SectionId; navKey: 'whoami' | 'stack' | 'experience' | 'education' | 'projects' | 'connect' }[] = [
  { id: 'whoami', navKey: 'whoami' },
  { id: 'stack', navKey: 'stack' },
  { id: 'experience', navKey: 'experience' },
  { id: 'education', navKey: 'education' },
  { id: 'projects', navKey: 'projects' },
  { id: 'connect', navKey: 'connect' },
]

export function Nav() {
  const { t, locale, toggleLocale } = useLocale()
  const { activeSection } = usePortfolioUI()

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5">
        <span className="shrink-0 font-mono text-[13px] text-(--color-accent) sm:text-sm">
          rafarenasdev<span className="text-(--color-text-faint)">@</span>portfolio
          <span className="hidden text-(--color-text-faint) sm:inline">:~$</span>
        </span>

        <nav className="flex min-w-0 items-center gap-4 overflow-x-auto font-mono text-[12.5px] sm:gap-6 sm:text-[13px]">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => triggerSection(s.id, { scroll: true })}
              className={`shrink-0 transition-colors ${
                activeSection === s.id
                  ? 'text-(--color-accent)'
                  : 'text-(--color-text-dim) hover:text-(--color-accent-strong)'
              }`}
            >
              ./{t.nav[s.navKey]}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleLocale}
          className="shrink-0 rounded-md border border-(--color-border-strong) px-2 py-1 font-mono text-[11px] text-(--color-text-dim) transition-colors hover:border-(--color-accent) hover:text-(--color-accent) sm:px-2.5 sm:text-xs"
          aria-label="Toggle language"
        >
          --lang={locale}
        </button>
      </div>
    </header>
  )
}
