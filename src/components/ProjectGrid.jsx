import ProjectCard from "./ProjectCard";
import { useProjects } from "../hooks/useProjects";

export default function ProjectGrid() {
  const { projects } = useProjects();
  return (
    <section id="portfolio" className="relative w-full px-6 pb-20 md:px-12 lg:px-20">
      {/* Decorative side line */}
      <div className="absolute top-0 left-6 hidden h-full w-px bg-gradient-to-b from-[#049B9F]/0 via-[#049B9F]/10 to-[#049B9F]/0 lg:left-12 lg:block" />

      {/* Floating cross */}
      <div className="absolute top-20 right-[10%] hidden lg:block">
        <span className="block h-6 w-px bg-[#049B9F]/20" />
        <span className="absolute top-2.5 left-[-2.5px] block h-px w-6 bg-[#049B9F]/20" />
      </div>

<div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <div className="animate-fade-up mb-10 flex items-end gap-6">
          <h2 className="font-[Bungee] text-4xl text-[#2C2C2C] md:text-5xl">
            PORTFOLIO.
          </h2>
          <div className="mb-2 flex gap-1">
            <span className="h-1.5 w-12 bg-[#049B9F]" />
            <span className="h-1.5 w-6 bg-[#C05A30]" />
            <span className="h-1.5 w-3 bg-[#D4A843]" />
          </div>
          <span className="mb-2 hidden text-sm font-medium uppercase tracking-[0.2em] text-[#049B9F] md:inline">
            {projects.length} projects
          </span>
        </div>

        {/* Dashed outline box around grid */}
        <div className="relative border-2 border-dashed border-[#049B9F]/12 p-4 md:p-6">
          {/* Corner squares */}
          <span className="absolute -top-1.5 -left-1.5 h-3 w-3 bg-[#049B9F]" />
          <span className="absolute -top-1.5 -right-1.5 h-3 w-3 bg-[#037B7E]" />
          <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#06B5B9]" />
          <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#03888B]" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom flourish */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#049B9F]/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#049B9F]/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#037B7E]/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#06B5B9]/15" />
          <span className="h-px w-8 bg-[#049B9F]/20" />
        </div>
      </div>
    </section>
  );
}
