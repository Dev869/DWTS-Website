import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import { getProjectHighlights } from "../data/projects.js";
import ProjectArtwork from "../components/ProjectArtwork.jsx";
import {
  PALETTE,
  STRIPE_COLORS,
  SERIF,
  MONO,
  EASE,
  PillNav,
  StripeBar,
  FooterBlock,
  ProjectBadges,
  ProjectLinks,
} from "./_shared.jsx";

function useRise() {
  const reduced = useReducedMotion();
  return (delay = 0) =>
    reduced
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.65, ease: EASE, delay },
        };
}

function ProjectRow({ project, index }) {
  const reverse = index % 2 === 1;
  const accent = STRIPE_COLORS[index % STRIPE_COLORS.length];
  const highlights = getProjectHighlights(project, 4);
  const description =
    project.headline ||
    project.description?.slice(0, 140) ||
    "A bespoke system built to fit the exact shape of the problem.";

  return (
    <article className="relative py-16 md:py-24">
      {/* Index marker: big background number */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.045 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: EASE }}
        style={SERIF}
        className={`pointer-events-none absolute top-8 select-none text-[110px] font-light leading-none tracking-tight text-[#1a1a18] sm:text-[160px] md:text-[280px] ${
          reverse ? "right-2 md:right-12" : "left-2 md:left-12"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <div
        className={`relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative"
        >
          <Link
            to={`/project/${project.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(26,26,24,0.35)] transition-shadow duration-700 hover:shadow-[0_40px_90px_-30px_rgba(26,26,24,0.45)]"
          >
            {/* Soft accent halo behind card */}
            <div
              className="absolute -inset-6 -z-10 rounded-[36px] opacity-60"
              style={{ background: `${accent}14` }}
            />

            {/* Vector artwork fills the card */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <ProjectArtwork project={project} index={index} variant="card" />
            </motion.div>

            {/* Status badges: always visible on card */}
            {(project.beta || project.openSource || /github\.com/i.test(project.link || "")) && (
              <div className="pointer-events-none absolute right-4 top-4 z-20">
                <ProjectBadges project={project} />
              </div>
            )}

            {/* Arrow badge */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.6, x: 10, y: 10 }}
              whileHover={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              className="absolute bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full shadow-[0_12px_28px_-8px_rgba(26,26,24,0.4)]"
              style={{ background: "#F5F1E6", color: PALETTE.ink }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M0 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>

        {/* Content column */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            {/* Kicker: index + category */}
            <div className="mb-5 flex items-center gap-4">
              <span style={{ ...MONO, color: accent }} className="text-[13px] tracking-[0.2em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8" style={{ background: `${accent}70` }} />
              {project.category && (
                <span style={MONO} className="text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/55">
                  {project.category}
                </span>
              )}
            </div>

            {/* Title */}
            <Link to={`/project/${project.slug}`} className="group inline-block">
              <motion.h2
                style={SERIF}
                className="text-[38px] leading-[0.95] tracking-[-0.01em] text-[#2A2D28] transition-colors duration-500 group-hover:text-[#049B9F] sm:text-[48px] md:text-[72px]"
              >
                {project.title}
              </motion.h2>
            </Link>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              style={SERIF}
              className="mt-6 max-w-xl text-[17px] leading-[1.55] text-[#2A2D28]/80 sm:text-[19px] md:text-[22px]"
            >
              {description}
            </motion.p>

            {/* Outcome highlights — what this delivers, not what it's built with. */}
            {highlights.length > 0 && (
              <motion.dl
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
                }}
                className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 sm:gap-x-8"
              >
                {highlights.map((h, i) => (
                  <motion.div
                    key={`${h.value}-${h.label}-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className="border-t pt-3"
                    style={{ borderColor: `${PALETTE.ink}1A` }}
                  >
                    {h.value && (
                      <dd
                        style={{ ...SERIF, color: accent }}
                        className="text-[26px] leading-[1] tracking-[-0.02em] sm:text-[30px]"
                      >
                        {h.value}
                      </dd>
                    )}
                    <dt
                      style={MONO}
                      className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#1a1a18]/65"
                    >
                      {h.label}
                    </dt>
                  </motion.div>
                ))}
              </motion.dl>
            )}

            {(project.link || project.demoUrl) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
                className="mt-8"
              >
                <ProjectLinks project={project} />
              </motion.div>
            )}

            {/* Read more */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="mt-10"
            >
              <Link
                to={`/project/${project.slug}`}
                style={MONO}
                className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.25em] text-[#1a1a18]/75 transition-colors duration-500 hover:text-[#049B9F]"
              >
                Read more
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#049B9F]/50 group-hover:bg-[#049B9F]/8"
                  style={{ borderColor: `${PALETTE.ink}20` }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M0 8h14M14 8l-5-5M14 8l-5 5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        className="mt-16 h-px origin-left md:mt-24"
        style={{ background: `${PALETTE.ink}15` }}
      />
    </article>
  );
}

export default function Work() {
  const { projects, loading } = useProjects();

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        {/* Title block */}
        <section className="relative overflow-hidden px-5 pt-28 pb-10 sm:px-6 sm:pt-32 md:px-12 md:pt-40 md:pb-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{ ...MONO, color: PALETTE.teal }}
              className="mb-5 text-[11px] uppercase tracking-[0.28em]"
            >
              · Portfolio
            </motion.p>

            <div className="flex flex-wrap items-end justify-between gap-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                style={SERIF}
                className="text-[56px] leading-[0.9] tracking-[-0.03em] text-[#2A2D28] sm:text-[80px] md:text-[144px] lg:text-[176px]"
              >
                My work
                <span style={{ color: PALETTE.teal }}>.</span>
              </motion.h1>

              {/* Counter */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
                className="mb-6 flex items-center gap-4"
              >
                <div className="hidden h-12 w-px md:block" style={{ background: `${PALETTE.ink}20` }} />
                <div>
                  <span style={MONO} className="text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/45">
                    Selected projects
                  </span>
                  <div style={MONO} className="mt-1 text-[14px] tracking-[0.1em] text-[#2A2D28]">
                    <span style={{ color: PALETTE.teal }}>{String(projects.length).padStart(2, "0")}</span>
                    <span className="text-[#1a1a18]/35"> / ongoing</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              style={SERIF}
              className="mt-8 max-w-2xl text-[17px] leading-[1.5] text-[#2A2D28]/80 sm:text-[20px] md:text-[24px]"
            >
              A selection of systems I&rsquo;ve shipped: research toolkits,
              operations platforms, and internal tools built to fit the exact
              shape of the problem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
              className="mt-10 max-w-xs"
            >
              <StripeBar />
            </motion.div>
          </div>
        </section>

        {/* Project rows */}
        <section className="relative px-5 pb-16 sm:px-6 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto max-w-6xl">
            {loading ? (
              <div className="py-20">
                <div className="h-[360px] animate-pulse rounded-2xl bg-[#EFEDE7]" />
              </div>
            ) : (
              projects.map((p, i) => <ProjectRow key={p.id} project={p} index={i} />)
            )}
          </div>
        </section>

        <FooterBlock />
      </div>
    </div>
  );
}
