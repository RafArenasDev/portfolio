import { PromptLine } from '../components/PromptBar'
import { Reveal } from '../components/Reveal'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { formatPwshDateTime } from '../data/projectsMeta'
import { useGithubRepo } from '../hooks/useGithubRepo'
import { useLocale } from '../i18n/LocaleContext'
import type { Translations } from '../i18n/translations'

function ProjectRow({ project }: { project: Translations['projects']['items'][number] }) {
  const meta = useGithubRepo(project.repo)
  const { date, time } = formatPwshDateTime(meta.pushedAt)

  return (
    <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer" className="group block">
      <p className="whitespace-pre text-(--color-text-dim)">
        {'d----      '}
        {date.padEnd(10)}
        {'  '}
        {time.padEnd(11)}
        {' '.repeat(18)}
        <span className="font-bold text-(--color-accent-strong) group-hover:text-(--color-accent) group-hover:underline">
          {project.name}/
        </span>
      </p>
      <p className="pl-[23ch] text-[12px] text-(--color-text-faint)">
        # {project.description}
      </p>
      <p className="pl-[23ch] text-[11.5px] text-(--color-text-faint)">
        {project.stack}
      </p>
    </a>
  )
}

export function Projects() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const p = t.projects

  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-8">
      <Reveal>
        <TerminalWindow title="rafael — zsh — ~/projects" active={activeSection === 'projects'}>
          <PromptLine path={p.path} command={p.command} />

          <p className="text-(--color-text-dim)">{'    '}Directorio: {p.path}</p>
          <p className="mt-2 text-(--color-text-faint)">Mode                LastWriteTime         Length Name</p>
          <p className="text-(--color-text-faint)">----                -------------         ------ ----</p>

          <div className="mt-1.5 space-y-3.5">
            {p.items.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
