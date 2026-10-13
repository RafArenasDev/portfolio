import { BitPortrait } from '../components/BitPortrait'
import { CommandBlock } from '../components/CommandBlock'
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
          <CommandBlock sectionId="whoami" path="~/rafael" command={h.command}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-[auto_1fr]">
              <BitPortrait className="mx-auto w-[300px] sm:mx-0 sm:w-[360px]" />

              <div className="space-y-1.5 text-[12.5px] sm:self-center sm:text-[13px]">
                <p className="font-mono text-lg font-bold text-(--color-accent) sm:text-xl">{h.name}</p>
                <p className="min-h-[1.3em] font-semibold text-(--color-accent-strong)">
                  <TypingText lines={[h.role]} />
                </p>
                <p className="text-(--color-text-faint)">------------------------</p>

                <p>
                  <span className="text-(--color-accent-strong)">Location: </span>
                  <span className="text-(--color-text)">{h.location}</span>
                </p>
                <p>
                  <span className="text-(--color-accent-strong)">Experience: </span>
                  <span className="text-(--color-text)">{h.experienceValue}</span>
                </p>
                <p>
                  <span className="text-(--color-accent-strong)">Stack: </span>
                  <span className="text-(--color-text)">{h.fullstackValue}</span>
                </p>
                <p>
                  <span className="text-(--color-accent-strong)">Mission: </span>
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
          </CommandBlock>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
