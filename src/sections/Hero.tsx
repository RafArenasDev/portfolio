import { BitPortrait } from '../components/BitPortrait'
import { PromptLine } from '../components/PromptBar'
import { Reveal } from '../components/Reveal'
import { TerminalWindow } from '../components/TerminalWindow'
import { TypingText } from '../components/TypingText'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

export function Hero() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const h = t.hero

  return (
    <section id="whoami" className="mx-auto max-w-5xl px-5 pt-10 pb-16 sm:pt-16">
      <Reveal>
        <TerminalWindow title="rafael — zsh — ~/whoami" active={activeSection === 'whoami'}>
          <PromptLine path="~/rafael" command={h.command} />

          <h1 className="font-mono text-2xl font-semibold text-(--color-text) sm:text-3xl">{h.name}</h1>
          <p className="mt-1 min-h-[1.4em] font-mono text-sm font-semibold text-(--color-accent-strong) sm:text-base">
            <TypingText lines={[h.role]} />
          </p>

          <div className="mt-5 space-y-1.5">
            <p>
              <span className="text-(--color-text-faint)">{h.contextLabel} </span>
              <span className="text-(--color-accent-strong)">{h.location}</span>
            </p>
            <p>
              <span className="text-(--color-text-faint)">{h.experienceLabel} </span>
              <span className="text-(--color-text)">{h.experienceValue}</span>
            </p>
            <p>
              <span className="text-(--color-text-faint)">{h.missionLabel} </span>
              <span className="text-(--color-text)">{h.missionValue}</span>
            </p>
          </div>

          <div className="mt-6 border-t border-(--color-border) pt-5">
            <PromptLine path="~/rafael" command="cat profile.md" />
            <p className="max-w-prose text-[13px] leading-relaxed text-(--color-text-dim) sm:text-sm">
              {h.summary}
            </p>
          </div>

          <div className="mt-6 border-t border-(--color-border) pt-5">
            <PromptLine path="~/rafael" command="ls -la expertise/" />
            <p>
              <span className="text-(--color-accent-strong)">{h.fullstackLabel}</span>{' '}
              <span className="text-(--color-text)">{h.fullstackValue}</span>
            </p>
          </div>

          <div className="mt-6 border-t border-(--color-border) pt-5">
            <PromptLine path="~/rafael" command={h.neofetchCommand} />
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
              <div className="row-span-full">
                <BitPortrait className="w-[200px] sm:w-[240px]" />
              </div>
              <div className="space-y-1 self-center text-[12.5px] sm:text-[13px]">
                <p className="font-bold text-(--color-accent)">rafael@portfolio</p>
                <p className="text-(--color-text-faint)">------------------</p>
                <p>
                  <span className="text-(--color-accent-strong)">OS: </span>
                  <span className="text-(--color-text)">{h.role}</span>
                </p>
                <p>
                  <span className="text-(--color-accent-strong)">Host: </span>
                  <span className="text-(--color-text)">{h.location}</span>
                </p>
                <p>
                  <span className="text-(--color-accent-strong)">Uptime: </span>
                  <span className="text-(--color-text)">{h.experienceValue}</span>
                </p>
                <p>
                  <span className="text-(--color-accent-strong)">Shell: </span>
                  <span className="text-(--color-text)">{h.fullstackValue}</span>
                </p>
                <p>
                  <span className="text-(--color-accent-strong)">Certs: </span>
                  <span className="text-(--color-text)">{h.certsLine}</span>
                </p>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
