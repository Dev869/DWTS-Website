import { useState } from "react";
import { Link } from "react-router-dom";

const accentColors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A", "#037B7E", "#049B9F"];

export default function ProjectCard({ project, index }) {
  const { title, description, tags, category, slug, image } = project;
  const accent = accentColors[index % accentColors.length];
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/project/${slug}`}
      className="animate-fade-up retro-card group relative block border-2 border-[#2C2C2C]/8 bg-[#F5F0E3] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px] focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        animationDelay: `${0.1 * index}s`,
        "--tw-shadow-color": accent,
        cursor: "pointer",
      }}
    >
      {/* Index stamp — top right */}
      <span
        className="absolute -top-2.5 -right-2.5 z-10 flex h-7 w-7 items-center justify-center text-xs font-bold text-white"
        style={{ background: accent }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Preview image */}
      <div className="relative overflow-hidden border-b-2 border-dashed border-[#2C2C2C]/8">
        {image && !imgError ? (
          <div className="relative h-40 w-full overflow-hidden bg-[#EDE6D6]">
            <img
              src={image}
              alt={`Preview of ${title}`}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
            {/* Scan-line overlay for retro feel */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
          </div>
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-[#EDE6D6]">
            <div className="flex flex-col items-center gap-2 text-[#2C2C2C]/25">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider">Preview</span>
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* Top accent bar */}
        <div className="mb-4 flex gap-1">
          <span className="h-1.5 w-10" style={{ background: accent }} />
          <span className="h-1.5 w-5" style={{ background: accent, opacity: 0.4 }} />
          <span className="h-1.5 w-2" style={{ background: accent, opacity: 0.2 }} />
        </div>

        {/* Category */}
        <span
          className="mb-2 inline-block border-b border-current pb-0.5 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{ color: accent }}
        >
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

        {/* CTA indicator */}
        <span
          className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.06em]"
          style={{ color: accent }}
        >
          View Project
          <span className="transition-transform duration-200 group-hover:translate-x-1">&raquo;</span>
        </span>
      </div>
    </Link>
  );
}
