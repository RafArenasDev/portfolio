import { BitPortrait } from '../components/BitPortrait'
import { CommandBlock } from '../components/CommandBlock'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { StreamLines } from '../components/StreamLines'
import { TerminalWindow } from '../components/TerminalWindow'
import { TypingText } from '../components/TypingText'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'

export function Hero() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const h = t.hero

  return (
    <section id="whoami" className="mx-auto max-w-5xl px-5 pt-10 pb-8 sm:pt-16">
      <SectionHeading index={1} title={h.title} />
      <Reveal>
        <TerminalWindow path={h.path} active={activeSection === 'whoami'}>
          <CommandBlock sectionId="whoami" path={h.path} command={h.command}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-[auto_1fr]">
              <BitPortrait className="mx-auto w-[260px] sm:mx-0 sm:w-[300px]" />

              <div className="min-w-0 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                <StreamLines stepMs={130}>
                  <p className="font-bold text-(--color-accent)">profile:</p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">subject: </span>
                    <span className="text-lg font-bold text-(--color-accent) [text-shadow:0_0_16px_rgba(56,189,248,0.6)]">
                      {h.name}
                    </span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">role: </span>
                    <span className="font-semibold text-(--color-text)">
                      <TypingText lines={[h.role]} />
                    </span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">origin: </span>
                    <span className="text-(--color-text)">{h.origin}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">experience: </span>
                    <span className="text-(--color-text)">{h.experienceValue}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">focus: </span>
                    <span className="text-(--color-text)">{h.focus}</span>
                  </p>

                  <p className="mt-2 font-bold text-(--color-accent)">stack:</p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">frontend: </span>
                    <span className="text-(--color-text)">{h.stackFrontend}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">backend: </span>
                    <span className="text-(--color-text)">{h.stackBackend}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">mobile: </span>
                    <span className="text-(--color-text)">{h.stackMobile}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">database: </span>
                    <span className="text-(--color-text)">{h.stackDatabase}</span>
                  </p>

                  <p className="mt-2 font-bold text-(--color-accent)">certifications:</p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">cisco: </span>
                    <span className="text-(--color-text)">{h.certsLine}</span>
                  </p>

                  <p className="mt-2 font-bold text-(--color-accent)">contact:</p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">linkedin: </span>
                    <span className="text-(--color-text)">{h.contactLinkedin}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">github: </span>
                    <span className="text-(--color-text)">{h.contactGithub}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">email: </span>
                    <span className="text-(--color-text)">{h.contactEmail}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-(--color-accent-strong)">timezone: </span>
                    <span className="text-(--color-text)">{h.contactTimezone}</span>
                  </p>
                </StreamLines>
              </div>
            </div>
          </CommandBlock>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
