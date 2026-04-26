import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import {
  PALETTE,
  STRIPE_COLORS,
  SERIF,
  MONO,
  EASE,
  PillNav,
  StripeBar,
  FooterBlock,
  BookCallButton,
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

function SectionKicker({ number, label, color }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span style={{ ...MONO, color }} className="text-[13px] tracking-[0.2em]">
        {number}
      </span>
      <span className="h-px flex-1 max-w-[80px]" style={{ background: `${color}70` }} />
      <span style={{ ...MONO, color }} className="text-[11px] uppercase tracking-[0.25em]">
        · {label}
      </span>
    </div>
  );
}

function ProblemApproach({ problem, approach }) {
  const rise = useRise();
  if (!problem && !approach) return null;
  return (
    <section className="border-t px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          {problem && (
            <motion.div {...rise(0)}>
              <SectionKicker number="01" label="The problem" color={PALETTE.orange} />
              <p style={SERIF} className="text-[22px] leading-[1.5] text-[#2A2D28] md:text-[26px]">
                {problem}
              </p>
            </motion.div>
          )}
          {approach && (
            <motion.div {...rise(0.1)}>
              <SectionKicker number="02" label="The approach" color={PALETTE.teal} />
              <p style={SERIF} className="text-[22px] leading-[1.5] text-[#2A2D28] md:text-[26px]">
                {approach}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterBlock({ before, after }) {
  const rise = useRise();
  if (!before?.length && !after?.length) return null;
  return (
    <section className="border-t px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...rise(0)} style={SERIF} className="mb-12 text-[30px] leading-none tracking-tight text-[#2A2D28] sm:text-[40px] md:text-[64px]">
          Before &amp; after
        </motion.h2>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border md:grid-cols-2" style={{ borderColor: `${PALETTE.ink}15`, background: `${PALETTE.ink}15` }}>
          <motion.div {...rise(0.05)} className="bg-[#F1EEE6] p-8 md:p-10">
            <span style={{ ...MONO, color: PALETTE.orange }} className="text-[11px] uppercase tracking-[0.25em]">
              · Before
            </span>
            <ul className="mt-5 space-y-3">
              {(before || []).map((b, i) => (
                <li key={i} style={SERIF} className="flex gap-3 text-[17px] leading-[1.5] text-[#1a1a18]/70">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PALETTE.orange }} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...rise(0.12)} className="bg-[#F1EEE6] p-8 md:p-10">
            <span style={{ ...MONO, color: PALETTE.teal }} className="text-[11px] uppercase tracking-[0.25em]">
              · After
            </span>
            <ul className="mt-5 space-y-3">
              {(after || []).map((a, i) => (
                <li key={i} style={SERIF} className="flex gap-3 text-[17px] leading-[1.5] text-[#2A2D28]">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PALETTE.teal }} />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessBlock({ steps }) {
  const rise = useRise();
  if (!steps?.length) return null;
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20" style={{ background: PALETTE.paperDeep }}>
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <StripeBar />
      </div>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...rise(0)} style={SERIF} className="mb-12 text-[30px] leading-none tracking-tight text-[#2A2D28] sm:text-[40px] md:text-[64px]">
          How it flows
        </motion.h2>
        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 hidden w-px md:block" style={{ background: `${PALETTE.ink}20` }} />
          <ul className="space-y-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="relative grid grid-cols-[40px_1fr] items-start gap-4 md:grid-cols-[72px_1fr] md:gap-8"
              >
                <div className="relative flex items-center justify-center md:h-9">
                  <span
                    className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-[#F1EEE6] text-[11px] font-medium"
                    style={{ borderColor: STRIPE_COLORS[i % STRIPE_COLORS.length], color: STRIPE_COLORS[i % STRIPE_COLORS.length], fontFamily: MONO.fontFamily }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 style={SERIF} className="text-[22px] leading-tight text-[#2A2D28] md:text-[26px]">
                    {s.label}
                  </h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#1a1a18]/65">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ features }) {
  const rise = useRise();
  if (!features?.length) return null;
  return (
    <section className="border-t px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...rise(0)} style={SERIF} className="mb-12 text-[30px] leading-none tracking-tight text-[#2A2D28] sm:text-[40px] md:text-[64px]">
          What it does
        </motion.h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((f, i) => {
            const accent = STRIPE_COLORS[i % STRIPE_COLORS.length];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border bg-white/60 p-7 backdrop-blur transition-all duration-700 hover:-translate-y-0.5 hover:border-[#049B9F]/30 hover:shadow-[0_20px_40px_-20px_rgba(26,26,24,0.2)]"
                style={{ borderColor: `${PALETTE.ink}12` }}
              >
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 ease-out group-hover:w-full"
                  style={{ background: accent }}
                />
                <span style={{ ...MONO, color: accent }} className="text-[11px] uppercase tracking-[0.25em]">
                  · {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={SERIF} className="mt-3 text-[22px] leading-tight text-[#2A2D28] md:text-[24px]">
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1a1a18]/65">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Compact, dense feature list. Use when a project has many features
 * that would look bloated as full cards. Accepts:
 *   - array of strings: ["Invoicing", "Auto-categorization", …]
 *   - array of { title, desc }: [{ title: "Invoicing", desc: "…" }, …]
 */
function FeatureListBlock({ title = "Everything it does", items }) {
  const rise = useRise();
  if (!items?.length) return null;
  const normalized = items.map((it) =>
    typeof it === "string" ? { title: it, desc: "" } : it
  );
  return (
    <section
      className="border-t px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20"
      style={{ borderColor: `${PALETTE.ink}10` }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...rise(0)}
          style={SERIF}
          className="mb-12 text-[30px] leading-none tracking-tight text-[#2A2D28] sm:text-[40px] md:text-[64px]"
        >
          {title}
        </motion.h2>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {normalized.map((f, i) => {
            const accent = STRIPE_COLORS[i % STRIPE_COLORS.length];
            return (
              <motion.li
                key={f.title + i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 6) * 0.05 }}
                className="group relative border-t pt-5"
                style={{ borderColor: `${PALETTE.ink}15` }}
              >
                <span
                  className="absolute left-0 top-0 h-[2px] w-8 transition-all duration-500 group-hover:w-16"
                  style={{ background: accent }}
                />
                <h3
                  style={SERIF}
                  className="text-[18px] leading-tight text-[#2A2D28] md:text-[20px]"
                >
                  {f.title}
                </h3>
                {f.desc && (
                  <p className="mt-2 text-[14px] leading-relaxed text-[#1a1a18]/60">
                    {f.desc}
                  </p>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ResultsBlock({ results }) {
  const rise = useRise();
  if (!results?.length) return null;
  return (
    <section className="border-t px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...rise(0)} style={SERIF} className="mb-12 text-[30px] leading-none tracking-tight text-[#2A2D28] sm:text-[40px] md:text-[64px]">
          Results
        </motion.h2>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border md:grid-cols-3" style={{ borderColor: `${PALETTE.ink}15`, background: `${PALETTE.ink}15` }}>
          {results.map((r, i) => {
            const accent = STRIPE_COLORS[i % STRIPE_COLORS.length];
            return (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                className="relative bg-[#F1EEE6] p-8 text-center sm:p-10 md:p-12"
              >
                <div style={{ ...SERIF, color: accent }} className="text-[48px] leading-[0.9] tracking-tight sm:text-[64px] md:text-[88px]">
                  {r.metric}
                </div>
                <div style={MONO} className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/55">
                  {r.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuoteBlock({ quote, attribution }) {
  const rise = useRise();
  if (!quote) return null;
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20" style={{ background: PALETTE.tealDeep }}>
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <StripeBar />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <motion.span
          {...rise(0)}
          style={{ ...SERIF, color: `${PALETTE.teal}` }}
          className="block text-[80px] leading-[0.5] sm:text-[120px] md:text-[180px]"
        >
          &ldquo;
        </motion.span>
        <motion.p
          {...rise(0.1)}
          style={SERIF}
          className="-mt-6 text-[22px] italic leading-[1.4] text-[#F1EEE6] sm:text-[28px] md:text-[40px]"
        >
          {quote}
        </motion.p>
        {attribution && (
          <motion.p
            {...rise(0.2)}
            style={MONO}
            className="mt-8 text-[11px] uppercase tracking-[0.3em] text-[#F1EEE6]/55"
          >
            {attribution}
          </motion.p>
        )}
      </div>
    </section>
  );
}

function GalleryBlock({ gallery }) {
  const rise = useRise();
  if (!gallery?.length) return null;
  return (
    <section className="border-t px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...rise(0)} style={SERIF} className="mb-12 text-[30px] leading-none tracking-tight text-[#2A2D28] sm:text-[40px] md:text-[64px]">
          Gallery
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {gallery.map((g, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl border bg-white/50"
              style={{ borderColor: `${PALETTE.ink}12` }}
            >
              <div className="overflow-hidden">
                <img
                  src={g.src}
                  alt={g.caption || ""}
                  className="block w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              {g.caption && (
                <figcaption
                  style={MONO}
                  className="px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[#1a1a18]/55"
                >
                  {g.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechBlock({ techStack }) {
  const rise = useRise();
  if (!techStack?.length) return null;
  return (
    <section className="border-t px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <motion.p {...rise(0)} style={{ ...MONO, color: PALETTE.teal }} className="text-[11px] uppercase tracking-[0.25em]">
          · Built with
        </motion.p>
        <motion.div {...rise(0.1)} className="flex flex-wrap gap-2">
          {techStack.map((t, i) => {
            const accent = STRIPE_COLORS[i % STRIPE_COLORS.length];
            return (
              <span
                key={t}
                style={{ ...MONO, borderColor: `${accent}45`, color: accent }}
                className="rounded-full border bg-white/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5"
              >
                {t}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectHeader({ project }) {
  const accent = PALETTE.teal;
  return (
    <section className="relative overflow-hidden px-5 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:px-12 md:pt-36 md:pb-24 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/work"
          style={MONO}
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/55 transition-colors duration-500 hover:text-[#049B9F]"
        >
          <span aria-hidden className="inline-block transition-transform duration-500 group-hover:-translate-x-1">
            &larr;
          </span>
          All work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.category && (
            <span
              style={{ ...MONO, color: PALETTE.teal, borderColor: `${PALETTE.teal}40` }}
              className="rounded-full border bg-white/50 px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
            >
              {project.category}
            </span>
          )}
          <span style={MONO} className="text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/45">
            Case study
          </span>
          <ProjectBadges project={project} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          style={SERIF}
          className="mt-6 text-[40px] leading-[0.95] tracking-[-0.02em] text-[#2A2D28] sm:text-[56px] md:text-[96px] lg:text-[120px]"
        >
          {project.title}
        </motion.h1>

        {project.headline && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            style={SERIF}
            className="mt-8 max-w-3xl text-[18px] leading-[1.45] text-[#2A2D28]/80 sm:text-[22px] md:text-[28px]"
          >
            {project.headline}
          </motion.p>
        )}

        {(project.link || project.demoUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
            className="mt-8"
          >
            <ProjectLinks project={project} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mt-10 max-w-sm"
        >
          <StripeBar />
        </motion.div>

        {/* Hero image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="relative mt-14"
          >
            <div
              className="absolute -inset-4 rounded-[32px]"
              style={{ background: `${accent}10` }}
            />
            <div
              className="relative overflow-hidden rounded-[24px] border bg-white shadow-[0_40px_100px_-40px_rgba(26,26,24,0.4)]"
              style={{ borderColor: `${PALETTE.ink}15` }}
            >
              <img src={project.image} alt={project.title} className="block w-full object-cover" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCTA({ project }) {
  const rise = useRise();
  return (
    <section className="relative overflow-hidden border-t px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
      <div className="mx-auto max-w-5xl text-center">
        <motion.p {...rise(0)} style={{ ...MONO, color: PALETTE.teal }} className="text-[11px] uppercase tracking-[0.28em]">
          · Have a similar problem?
        </motion.p>
        <motion.h2
          {...rise(0.1)}
          style={SERIF}
          className="mt-6 text-[30px] leading-[1.05] tracking-tight text-[#2A2D28] sm:text-[40px] md:text-[64px]"
        >
          Let&rsquo;s build the system{" "}
          <span className="italic" style={{ color: PALETTE.teal }}>
            your team actually needs.
          </span>
        </motion.h2>
        <motion.div {...rise(0.2)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <BookCallButton label="Book a call" />
          <ProjectLinks project={project} />
        </motion.div>
      </div>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="text-[#1a1a18]">
        <PillNav />
        <div className="flex min-h-[60vh] items-center justify-center bg-[#F1EEE6]">
          <span style={MONO} className="text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/55">
            Loading…
          </span>
        </div>
      </div>
    );
  }

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="text-[#1a1a18]">
        <PillNav />
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#F1EEE6] to-[#E4E0D5] px-6">
          <h1 style={SERIF} className="text-[36px] tracking-tight text-[#2A2D28] sm:text-[48px] md:text-[72px]">
            Not found.
          </h1>
          <Link
            to="/"
            style={MONO}
            className="inline-flex items-center gap-2 border-b border-[#049B9F] pb-1 text-[11px] uppercase tracking-[0.25em] text-[#049B9F] transition-colors hover:text-[#037B7E]"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        <ProjectHeader project={project} />
        <ProblemApproach problem={project.problem} approach={project.approach} />
        <BeforeAfterBlock before={project.before} after={project.after} />
        <ProcessBlock steps={project.processSteps} />
        <FeatureBlock features={project.features} />
        <FeatureListBlock title={project.featureListTitle} items={project.featureList} />
        <QuoteBlock quote={project.quote} attribution={project.quoteAttribution} />
        <ResultsBlock results={project.results} />
        <GalleryBlock gallery={project.gallery} />
        <TechBlock techStack={project.techStack} />
        <ProjectCTA project={project} />
        <FooterBlock />
      </div>
    </div>
  );
}
