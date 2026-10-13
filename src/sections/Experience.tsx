import { PromptLine } from '../components/PromptBar'
import { Reveal } from '../components/Reveal'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

export function Experience() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const e = t.experience

  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-8">
      <Reveal>
        <TerminalWindow title="rafael — zsh — ~/experience" active={activeSection === 'experience'}>
          <PromptLine path={e.path} command={e.command} />

          <div className="space-y-5">
            {e.jobs.map((job, i) => (
              <div key={`${job.company}-${job.role}`} className={i > 0 ? 'border-t border-(--color-border) pt-5' : ''}>
                <p className="text-(--color-text-faint)">
                  [<span className="text-(--color-accent-strong)">{job.period}</span>]{' '}
                  <span className="text-(--color-text)">{job.company}</span>{' '}
                  <span className="text-(--color-text-faint)">::</span>{' '}
                  <span className="text-(--color-accent)">{job.role}</span>
                </p>
                <ul className="mt-1.5 space-y-1 pl-4">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="text-(--color-text-dim)">
                      <span className="text-(--color-accent)">- </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
