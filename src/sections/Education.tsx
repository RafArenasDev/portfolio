import { CommandBlock } from '../components/CommandBlock'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

export function Education() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const e = t.education

  return (
    <section id="education" className="mx-auto max-w-5xl px-5 py-8">
      <SectionHeading index={4} title={e.title} />
      <Reveal>
        <TerminalWindow active={activeSection === 'education'}>
          <CommandBlock sectionId="education" path={e.path} command={e.command}>
            <p className="text-(--color-accent-strong)">{e.academicTitle}</p>
            <div className="mt-1.5 space-y-2.5 pl-4">
              {e.academic.map((item) => (
                <p key={item.title}>
                  <span className="text-(--color-accent)">- </span>
                  <span className="text-(--color-text)">{item.title}</span>
                  <span className="text-(--color-text-faint)"> · {item.institution} · {item.date}</span>
                </p>
              ))}
            </div>

            <p className="mt-4 text-(--color-accent-strong)">{e.certTitle}</p>
            <div className="mt-1.5 space-y-2.5 pl-4">
              {e.certs.map((item) => (
                <p key={item.title}>
                  <span className="text-(--color-accent)">- </span>
                  <span className="text-(--color-text)">{item.title}</span>
                  <span className="text-(--color-text-faint)"> · {item.institution} · {item.date}</span>
                </p>
              ))}
            </div>

            <p className="mt-4 text-(--color-accent-strong)">{e.profileTitle}</p>
            <div className="mt-1.5 space-y-1 pl-4">
              {e.softSkills.map((skill) => (
                <p key={skill} className="text-(--color-text-dim)">
                  <span className="text-(--color-accent)">- </span>
                  {skill}
                </p>
              ))}
            </div>

            <p className="mt-4 text-(--color-accent-strong)">{e.languagesLabel}</p>
            <p className="pl-4 text-(--color-text-dim)">{e.languages}</p>
          </CommandBlock>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
