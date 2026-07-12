import { motion, useReducedMotion } from "framer-motion";
import projects from "../data/projects";
import {
  PALETTE,
  SERIF,
  MONO,
  EASE,
  PillNav,
  BookCallButton,
} from "./_shared.jsx";

function AccentStrip() {
  return (
    <div aria-hidden className="flex h-1 w-[200px] gap-1">
      <span className="flex-[2]" style={{ background: PALETTE.teal }} />
      <span className="flex-1" style={{ background: PALETTE.orange }} />
      <span className="flex-1" style={{ background: PALETTE.gold }} />
      <span className="flex-1" style={{ background: PALETTE.olive }} />
    </div>
  );
}

function ProjectCard({ project, rise }) {
  const Tag = project.link ? motion.a : motion.article;
  const linkProps = project.link
    ? { href: project.link, target: "_blank", rel: "noreferrer" }
    : {};
  return (
    <Tag
      {...linkProps}
      {...rise}
      className="group flex aspect-square flex-col border border-[#1a1a18]/35 p-6 text-[#1a1a18] no-underline transition-colors duration-200 hover:border-[#1a1a18] hover:bg-[#F5F3ED] focus-visible:border-[#1a1a18] focus-visible:bg-[#F5F3ED]"
    >
      <span
        style={MONO}
        className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#1a1a18]/55"
      >
        {project.tags.join(" / ")}
      </span>
      <h2
        style={SERIF}
        className="mt-auto max-w-[14ch] text-[clamp(24px,2.2vw,30px)] font-medium leading-[1.12]"
      >
        {project.title}
      </h2>
      <hr
        className="my-3.5 h-0.5 w-8 border-none transition-[width] duration-300 group-hover:w-14 motion-reduce:transition-none"
        style={{ background: PALETTE.tealDark }}
      />
      <p
        style={MONO}
        className="m-0 text-[12px] leading-[1.7] tracking-[0.02em] text-[#1a1a18]/70"
      >
        {project.desc}
      </p>
    </Tag>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const rise = (delay = 0) =>
    reduced
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <div className="min-h-screen bg-[#ECE9E2] text-[#1a1a18]">
      <PillNav />
      <main className="mx-auto max-w-[1080px] px-5 pb-16 pt-28 sm:px-8 md:pt-32 lg:px-12">
        <header>
          <h1 className="m-0 flex items-center gap-5">
            <img
              src="/logo-mark.png"
              alt="DW"
              className="h-16 w-auto sm:h-20"
              fetchPriority="high"
            />
            <span
              style={SERIF}
              className="text-[clamp(17px,2.2vw,26px)] font-medium uppercase leading-[1.2] tracking-[0.14em]"
            >
              Tailored
              <br />
              Systems
            </span>
          </h1>
          <p
            style={MONO}
            className="mt-4 max-w-[62ch] text-[13px] leading-[1.8] tracking-[0.04em] text-[#1a1a18]/70"
          >
            Custom tools and automations that save time without cutting corners.
          </p>
        </header>

        <div className="mb-9 mt-7">
          <AccentStrip />
        </div>

        <section
          aria-label="Projects"
          className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} rise={rise(i * 0.06)} />
          ))}
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[#1a1a18]/15 pt-8">
          <div className="flex flex-wrap items-center gap-5">
            <BookCallButton label="Book a 20-minute intro call" />
            <a
              href="mailto:devin@dwtailored.com"
              style={{ ...MONO, color: PALETTE.tealDark }}
              className="text-[12px] underline-offset-4 hover:underline"
            >
              devin@dwtailored.com
            </a>
          </div>
          <span style={MONO} className="text-[11px] text-[#1a1a18]/55">
            Devin Wilson &middot; Redlands, CA &middot; &copy; {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </div>
  );
}
