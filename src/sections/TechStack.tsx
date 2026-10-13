import { PromptLine } from '../components/PromptBar'
import { Reveal } from '../components/Reveal'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

function levelBar(level: number, max = 10) {
  return `${'█'.repeat(level)}${'░'.repeat(Math.max(0, max - level))} ${level}/${max}`
}

export function TechStack() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const s = t.stack

  return (
    <section id="stack" className="mx-auto max-w-5xl px-5 py-8">
      <Reveal>
        <TerminalWindow title="rafael — zsh — ~/tech-stack" active={activeSection === 'stack'}>
          <PromptLine path={s.path} command={s.command} />

          <div className="space-y-4">
            {s.groups.map((group, i) => (
              <div key={group.title}>
                <p className="text-(--color-text)">
                  <span className="text-(--color-text-faint)">
                    {i === s.groups.length - 1 ? '╰─' : '├─'}
                  </span>{' '}
                  <span className="text-(--color-accent-strong)">{group.title}</span>{' '}
                  <span className="text-(--color-text-faint)">{levelBar(group.level)}</span>
                </p>
                <img
                  src={`https://skillicons.dev/icons?i=${group.icons}&theme=dark`}
                  alt={group.items}
                  className="my-1.5 ml-5 h-8"
                />
                <p className="ml-5 text-[12.5px] text-(--color-text-dim)">{group.items}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-(--color-border) pt-4 text-[12px] text-(--color-text-faint)">
            {s.status}
          </p>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
