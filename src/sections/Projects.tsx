import { CommandBlock } from '../components/CommandBlock'
import { FolderIcon } from '../components/FolderIcon'
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
  const url = `https://github.com/${project.repo}`

  return (
    <div className="whitespace-pre">
      <p className="flex items-center gap-1.5">
        <span className="text-(--color-text-faint)">{branch}</span>
        <FolderIcon className="h-4 w-4 shrink-0" />
        <span className="font-bold text-(--color-accent-strong)">{project.name}/</span>
      </p>
      <p className="text-[12px] text-(--color-text-dim)">
        <span className="text-(--color-text-faint)">{guide}├── stack: </span>
        {project.stack}
      </p>
      <p className="text-[12px] text-(--color-text-dim)">
        <span className="text-(--color-text-faint)">{guide}├── # </span>
        {project.description}
      </p>
      <p className="text-[12px]">
        <span className="text-(--color-text-faint)">{guide}└── preview: </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-(--color-accent-strong) underline decoration-(--color-border-strong) underline-offset-2 hover:text-(--color-accent) hover:decoration-(--color-accent)"
        >
          {url}
        </a>
      </p>
      <p className="pl-[3ch] text-[11px] text-(--color-text-faint)">updated {date}</p>
    </div>
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
        <TerminalWindow active={activeSection === 'projects'}>
          <CommandBlock sectionId="projects" path={p.path} command={p.command}>
            <p className="text-(--color-text)">projects/</p>
            {p.items.map((project, i) => (
              <ProjectNode key={project.slug} project={project} isLast={i === p.items.length - 1} />
            ))}
            <p className="mt-1 border-t border-(--color-border) pt-3 text-[11px] text-(--color-text-faint)">
              {p.items.length} {p.totalLabel}
            </p>
          </CommandBlock>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
