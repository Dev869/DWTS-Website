const accentColors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A", "#037B7E", "#049B9F"];

export default function ProjectCard({ project, index }) {
  const { title, description, tags, category, link } = project;
  const accent = accentColors[index % accentColors.length];

  return (
    <article
      className="animate-fade-up retro-card group relative border-2 border-[#2C2C2C]/8 bg-[#F5F0E3] p-6"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {/* Index stamp — top right */}
      <span
        className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center text-xs font-bold text-white"
        style={{ background: accent }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Top accent bar */}
      <div className="mb-4 flex gap-1">
        <span className="h-1.5 w-10" style={{ background: accent }} />
        <span className="h-1.5 w-5" style={{ background: accent, opacity: 0.4 }} />
        <span className="h-1.5 w-2" style={{ background: accent, opacity: 0.2 }} />
      </div>

      {/* Category */}
      <span className="mb-2 inline-block border-b border-current pb-0.5 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>
        {category}
      </span>

      {/* Title */}
      <h3 className="font-[Bungee] mb-3 text-base leading-snug text-[#2C2C2C]">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-[14px] leading-relaxed text-[#2C2C2C]">
        {description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#EDE6D6] px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-[#2C2C2C]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Dashed separator */}
      <div className="mb-3 border-t border-dashed border-[#2C2C2C]/10" />

      {/* Link */}
      <a
        href={link}
        className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.06em] transition-colors duration-200 hover:underline"
        style={{ color: accent }}
      >
        View Project
        <span className="transition-transform duration-200 group-hover:translate-x-1">&raquo;</span>
      </a>
    </article>
  );
}
