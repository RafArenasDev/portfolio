import { CommandBlock } from '../components/CommandBlock'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

export function Contact() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const c = t.contact

  return (
    <section id="connect" className="mx-auto max-w-5xl px-5 py-8 pb-20">
      <SectionHeading index={6} title={c.title} />
      <Reveal>
        <TerminalWindow active={activeSection === 'connect'}>
          <CommandBlock sectionId="connect" path={c.path} command={c.command}>
            <p className="text-(--color-text-dim)"># {c.tagline}</p>

            <div className="mt-4 space-y-1.5">
              {c.links.map((link) => (
                <p key={link.label}>
                  <span className="text-(--color-accent)">→ </span>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="text-(--color-text) underline decoration-(--color-border-strong) underline-offset-4 transition-colors hover:text-(--color-accent) hover:decoration-(--color-accent)"
                  >
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          </CommandBlock>
        </TerminalWindow>
      </Reveal>

      <p className="mt-8 text-center font-mono text-xs text-(--color-text-faint)">{c.footer}</p>
    </section>
  )
}
