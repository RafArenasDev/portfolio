import { CommandBlock } from '../components/CommandBlock'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { formatPwshDateTime } from '../data/projectsMeta'
import { useGithubRepo } from '../hooks/useGithubRepo'
import { useLocale } from '../i18n/LocaleContext'
import type { Translations } from '../i18n/translations'

function ProjectNode({
  project,
  isLast,
}: {
  project: Translations['projects']['items'][number]
  isLast: boolean
}) {
  const meta = useGithubRepo(project.repo)
  const { date } = formatPwshDateTime(meta.pushedAt)
  const branch = isLast ? '└── ' : '├── '
  const guide = isLast ? '    ' : '│   '

  return (
    <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer" className="group block">
      <p className="whitespace-pre">
        <span className="text-(--color-text-faint)">{branch}</span>
        <span className="font-bold text-(--color-accent-strong) group-hover:text-(--color-accent) group-hover:underline">
          {project.name}/
        </span>
      </p>
      <p className="whitespace-pre text-[12px] text-(--color-text-dim)">
        <span className="text-(--color-text-faint)">{guide}├── </span>
        {project.stack}
      </p>
      <p className="whitespace-pre text-[12px] text-(--color-text-dim)">
        <span className="text-(--color-text-faint)">{guide}└── </span>
        {project.description}
      </p>
      <p className="pl-[3ch] text-[11px] text-(--color-text-faint)">updated {date}</p>
    </a>
  )
}

export function Projects() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const p = t.projects

  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-8">
      <SectionHeading index={5} title={p.title} />
      <Reveal>
        <TerminalWindow title="rafarenasdev — zsh — ~/projects" active={activeSection === 'projects'}>
          <CommandBlock sectionId="projects" path={p.path} command={p.command}>
            <p className="text-(--color-text)">projects/</p>
            <div className="space-y-2">
              {p.items.map((project, i) => (
                <ProjectNode key={project.slug} project={project} isLast={i === p.items.length - 1} />
              ))}
            </div>
            <p className="mt-3 border-t border-(--color-border) pt-3 text-[11px] text-(--color-text-faint)">
              {p.items.length} {p.totalLabel}
            </p>
          </CommandBlock>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
