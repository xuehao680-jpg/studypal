import { ProjectCard } from './ProjectCard'
import { projects } from '../data/projects'

export function ProjectSection() {
  return (
    <section
      id="projects"
      className="px-4 py-20"
      style={{ backgroundColor: 'var(--hero-bg-end)' }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-2 text-center text-3xl font-bold md:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          我的项目
        </h2>
        <p
          className="mb-12 text-center text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          一些我参与构建的作品
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
