import { usePortfolioUI, type SectionId } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

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
  const { activeSection, runCommand } = usePortfolioUI()

  const commandFor = (id: SectionId): string => {
    switch (id) {
      case 'whoami':
        return t.hero.command
      case 'stack':
        return t.stack.command
      case 'experience':
        return t.experience.command
      case 'education':
        return t.education.command
      case 'projects':
        return t.projects.command
      case 'connect':
        return t.contact.command
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5">
        <span className="font-mono text-sm text-(--color-accent)">
          rafael<span className="text-(--color-text-faint)">@</span>portfolio
          <span className="text-(--color-text-faint)">:~$</span>
        </span>

        <nav className="hidden items-center gap-6 font-mono text-[13px] sm:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => runCommand(s.id, commandFor(s.id))}
              className={`transition-colors ${
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
          className="rounded-md border border-(--color-border-strong) px-2.5 py-1 font-mono text-xs text-(--color-text-dim) transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
          aria-label="Toggle language"
        >
          --lang={locale}
        </button>
      </div>
    </header>
  )
}
