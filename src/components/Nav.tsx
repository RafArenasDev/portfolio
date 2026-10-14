import { useState } from 'react'
import avatar from '../assets/avatar.png'
import { usePortfolioUI, type SectionId } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const SECTION_ORDER: SectionId[] = ['whoami', 'stack', 'experience', 'education', 'projects', 'connect']

export function Nav() {
  const { t, locale, toggleLocale } = useLocale()
  const { activeSection } = usePortfolioUI()
  const [menuOpen, setMenuOpen] = useState(false)

  const titleFor: Record<SectionId, string> = {
    whoami: t.hero.title,
    stack: t.stack.title,
    experience: t.experience.title,
    education: t.education.title,
    projects: t.projects.title,
    connect: t.contact.title,
  }
  const goHome = () => {
    window.location.href = '/'
  }

  const goTo = (id: SectionId) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-2.5">
        <button type="button" onClick={goHome} className="group flex shrink-0 items-center gap-2" aria-label="Home">
          <img
            src={avatar}
            alt=""
            className="h-8 w-8 rounded-md object-cover ring-1 ring-(--color-border-strong) transition-[box-shadow] group-hover:ring-(--color-accent)"
          />
          <span className="hidden font-sans text-base font-bold tracking-tight text-(--color-accent) [text-shadow:0_0_14px_rgba(56,189,248,0.55)] sm:inline">
            Rafael Arenas
          </span>
        </button>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 font-sans text-[13px] lg:flex">
          {SECTION_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              className={`shrink-0 rounded-md px-1 py-0.5 transition-all ${
                activeSection === id
                  ? 'font-semibold text-(--color-accent) [text-shadow:0_0_12px_rgba(56,189,248,0.75)]'
                  : 'text-(--color-text-dim) hover:text-(--color-accent-strong)'
              }`}
            >
              {titleFor[id]}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-md border border-(--color-border-strong) px-2 py-1 font-mono text-[11px] text-(--color-text-dim) transition-colors hover:border-(--color-accent) hover:text-(--color-accent) sm:px-2.5 sm:text-xs"
            aria-label="Toggle language"
          >
            --lang={locale}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-(--color-border-strong) text-(--color-text-dim) hover:border-(--color-accent) hover:text-(--color-accent) lg:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-(--color-border) px-5 py-3 font-sans text-sm lg:hidden">
          {SECTION_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              className={`py-2 text-left transition-all ${
                activeSection === id
                  ? 'font-semibold text-(--color-accent) [text-shadow:0_0_12px_rgba(56,189,248,0.75)]'
                  : 'text-(--color-text-dim)'
              }`}
            >
              {titleFor[id]}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
