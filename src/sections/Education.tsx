import { PromptLine } from '../components/PromptBar'
import { Reveal } from '../components/Reveal'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

export function Education() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const e = t.education

  return (
    <section id="education" className="mx-auto max-w-5xl px-5 py-8">
      <Reveal>
        <TerminalWindow title="rafael — zsh — ~/education" active={activeSection === 'education'}>
          <PromptLine path={e.path} command={e.command} />

          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <div>
              <p className="text-(--color-accent-strong)">{e.academicTitle}</p>
              <ul className="mt-1.5 space-y-2.5 pl-4">
                {e.academic.map((item) => (
                  <li key={item.title}>
                    <span className="text-(--color-accent)">- </span>
                    <span className="text-(--color-text)">{item.title}</span>
                    <span className="text-(--color-text-faint)"> · {item.institution} · {item.date}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-(--color-accent-strong)">{e.certTitle}</p>
              <ul className="mt-1.5 space-y-2.5 pl-4">
                {e.certs.map((item) => (
                  <li key={item.title}>
                    <span className="text-(--color-accent)">- </span>
                    <span className="text-(--color-text)">{item.title}</span>
                    <span className="text-(--color-text-faint)"> · {item.institution} · {item.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-(--color-accent-strong)">{e.profileTitle}</p>
              <ul className="mt-1.5 space-y-1 pl-4">
                {e.softSkills.map((skill) => (
                  <li key={skill} className="text-(--color-text-dim)">
                    <span className="text-(--color-accent)">- </span>
                    {skill}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-(--color-accent-strong)">{e.languagesLabel}</p>
              <p className="pl-4 text-(--color-text-dim)">{e.languages}</p>
            </div>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
