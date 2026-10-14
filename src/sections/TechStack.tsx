import { CommandBlock } from '../components/CommandBlock'
import { FolderIcon, techIconUrl } from '../components/FolderIcon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalWindow } from '../components/TerminalWindow'
import { usePortfolioUI } from '../context/PortfolioUIContext'
import { useLocale } from '../i18n/LocaleContext'
import type { Translations } from '../i18n/translations'

function FolderGroup({
  group,
  isLastFolder,
}: {
  group: Translations['stack']['groups'][number]
  isLastFolder: boolean
}) {
  const folderBranch = isLastFolder ? '└── ' : '├── '
  const folderGuide = isLastFolder ? '    ' : '│   '

  return (
    <div className="whitespace-pre">
      <p className="flex items-center gap-1.5">
        <span className="text-(--color-text-faint)">{folderBranch}</span>
        <FolderIcon className="h-4 w-4 shrink-0" />
        <span className="font-bold text-(--color-accent-strong)">{group.folder}</span>
      </p>
      {group.files.map((file, i) => {
        const isLastFile = i === group.files.length - 1
        return (
          <p key={file.name} className="flex items-center gap-1.5">
            <span className="text-(--color-text-faint)">
              {folderGuide}
              {isLastFile ? '└── ' : '├── '}
            </span>
            {file.icon && <img src={techIconUrl(file.icon)} alt="" className="h-4 w-4 shrink-0" />}
            <span className="text-(--color-text)">{file.name}</span>
          </p>
        )
      })}
    </div>
  )
}

export function TechStack() {
  const { t } = useLocale()
  const { activeSection } = usePortfolioUI()
  const s = t.stack

  return (
    <section id="stack" className="mx-auto max-w-5xl px-5 py-8">
      <SectionHeading index={2} title={s.title} />
      <Reveal>
        <TerminalWindow active={activeSection === 'stack'}>
          <CommandBlock sectionId="stack" path={s.path} command={s.command}>
            <p className="text-(--color-text)">tech-stack/</p>
            {s.groups.map((group, i) => (
              <FolderGroup key={group.folder} group={group} isLastFolder={i === s.groups.length - 1} />
            ))}
          </CommandBlock>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
