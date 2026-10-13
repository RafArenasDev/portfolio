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
          <PromptLine path="~/rafael" command={h.neofetchCommand} />

          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-[auto_1fr]">
            <BitPortrait className="mx-auto w-[220px] sm:mx-0 sm:w-[260px]" />

            <div className="space-y-1.5 text-[12.5px] sm:self-center sm:text-[13px]">
              <p className="font-mono text-lg font-bold text-(--color-accent) sm:text-xl">
                {h.name}
                <span className="text-(--color-text-faint)">@portfolio</span>
              </p>
              <p className="min-h-[1.3em] font-semibold text-(--color-accent-strong)">
                <TypingText lines={[h.role]} />
              </p>
              <p className="text-(--color-text-faint)">------------------------</p>

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
                <span className="text-(--color-accent-strong)">Goal: </span>
                <span className="text-(--color-text)">{h.missionValue}</span>
              </p>
              <p>
                <span className="text-(--color-accent-strong)">Certs: </span>
                <span className="text-(--color-text)">{h.certsLine}</span>
              </p>

              <p className="pt-2">
                <span className="text-(--color-accent-strong)">Bio: </span>
                <span className="text-(--color-text-dim)">{h.summary}</span>
              </p>
            </div>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
