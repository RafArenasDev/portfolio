import { BitPortrait } from '../components/BitPortrait'
import { CommandBlock } from '../components/CommandBlock'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalWindow } from '../components/TerminalWindow'
import { TypingText } from '../components/TypingText'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

function yamlList(value: string) {
  return `[${value.split(' · ').join(', ')}]`
}

export function Hero() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const h = t.hero

  return (
    <section id="whoami" className="mx-auto max-w-5xl px-5 pt-10 pb-8 sm:pt-16">
      <SectionHeading index={1} title={h.title} />
      <Reveal>
        <TerminalWindow title="rafarenasdev — zsh — ~/whoami" active={activeSection === 'whoami'}>
          <CommandBlock sectionId="whoami" path={h.path} command={h.command}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-[auto_1fr]">
              <BitPortrait className="mx-auto w-[260px] sm:mx-0 sm:w-[300px]" />

              <div className="min-w-0 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                <p className="font-bold text-(--color-accent)">profile:</p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">name: </span>
                  <span className="text-(--color-text)">{h.name}</span>
                </p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">role: </span>
                  <span className="font-semibold text-(--color-text)">
                    <TypingText lines={[h.role]} />
                  </span>
                </p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">location: </span>
                  <span className="text-(--color-text)">{h.location}</span>
                </p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">experience: </span>
                  <span className="text-(--color-text)">{h.experienceValue}</span>
                </p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">stack: </span>
                  <span className="text-(--color-text)">{yamlList(h.fullstackValue)}</span>
                </p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">mission: </span>
                  <span className="text-(--color-text)">{h.missionValue}</span>
                </p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">certs: </span>
                  <span className="text-(--color-text)">{h.certsLine}</span>
                </p>
                <p className="pl-4">
                  <span className="text-(--color-accent-strong)">bio: &gt;</span>
                </p>
                <p className="pl-8 text-(--color-text-dim)">{h.bio}</p>
              </div>
            </div>
          </CommandBlock>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
