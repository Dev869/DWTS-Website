import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getSegmentBySlug, SEGMENTS } from "../data/segments";
import { segmentCopyKey } from "../data/siteCopy";
import { useProjects } from "../hooks/useProjects";
import { usePageCopy } from "../hooks/useSiteCopy";
import {
  PALETTE,
  SERIF,
  MONO,
  EASE,
  PillNav,
  FooterBlock,
  BookCallButton,
} from "./_shared.jsx";

// Per-segment prose lives in src/data/siteCopy.js (so all on-page text is in
// one file). Structural fields (slug, theme, artwork, projectSlugs, hidden,
// comingSoon, name, audience) live in src/data/segments.js.
export default function Segment() {
  const { slug } = useParams();
  const segment = getSegmentBySlug(slug);
  const copyKey = segmentCopyKey(slug);
  const { c } = usePageCopy(copyKey);
  const { projects } = useProjects();

  if (!segment) return <Navigate to="/" replace />;

  const relatedProjects = (segment.projectSlugs || [])
    .map((s) => projects.find((p) => p.slug === s))
    .filter(Boolean);

  const whoFor = [c.whoFor1, c.whoFor2, c.whoFor3].filter(Boolean);
  const whoNotFor = [c.whoNotFor1, c.whoNotFor2, c.whoNotFor3].filter(Boolean);

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        <section className="px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:px-12 md:pt-32 md:pb-28 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ ...MONO, color: PALETTE.teal }}
              className="mb-5 text-[11px] uppercase tracking-[0.28em]"
            >
              · For {segment.name}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              style={SERIF}
              className="text-[36px] leading-[1.02] tracking-[-0.02em] text-[#2A2D28] sm:text-[48px] md:text-[72px]"
            >
              {c.headline}
            </motion.h1>

            {c.subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                style={SERIF}
                className="mt-6 max-w-2xl text-[17px] leading-[1.45] text-[#2A2D28]/80 sm:text-[20px] md:text-[22px]"
              >
                {c.subheadline}
              </motion.p>
            )}

            {c.engagement && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                style={MONO}
                className="mt-6 text-[12px] uppercase tracking-[0.22em] text-[#1a1a18]/55"
              >
                {c.engagement}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="mt-10"
            >
              {segment.comingSoon ? (
                <div className="inline-flex items-center gap-3 rounded-full border border-[#1a1a18]/15 bg-white/60 px-5 py-3 backdrop-blur">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ background: PALETTE.teal }}
                  />
                  <span
                    style={MONO}
                    className="text-[11px] uppercase tracking-[0.22em] text-[#1a1a18]/70"
                  >
                    Coming soon
                  </span>
                </div>
              ) : (
                <BookCallButton label={c.ctaLabel} />
              )}
            </motion.div>
          </div>
        </section>

        {(c.problem || c.solution) && (
          <section className="px-5 pb-16 sm:px-6 md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
              {c.problem && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <p
                    style={{ ...MONO, color: PALETTE.teal }}
                    className="text-[11px] uppercase tracking-[0.25em]"
                  >
                    · The problem
                  </p>
                  <p
                    style={SERIF}
                    className="mt-3 text-[17px] leading-[1.55] text-[#2A2D28]/85 md:text-[19px]"
                  >
                    {c.problem}
                  </p>
                </motion.div>
              )}
              {c.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                >
                  <p
                    style={{ ...MONO, color: PALETTE.teal }}
                    className="text-[11px] uppercase tracking-[0.25em]"
                  >
                    · How I help
                  </p>
                  <p
                    style={SERIF}
                    className="mt-3 text-[17px] leading-[1.55] text-[#2A2D28]/85 md:text-[19px]"
                  >
                    {c.solution}
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {(whoFor.length > 0 || whoNotFor.length > 0) && (
          <section className="px-5 pb-20 sm:px-6 md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
              {whoFor.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="rounded-2xl border border-[#1a1a18]/12 bg-white/60 p-6 backdrop-blur md:p-8"
                >
                  <p
                    style={{ ...MONO, color: PALETTE.teal }}
                    className="text-[11px] uppercase tracking-[0.25em]"
                  >
                    · Who it's for
                  </p>
                  <ul className="mt-4 space-y-3">
                    {whoFor.map((item, i) => (
                      <li
                        key={i}
                        style={SERIF}
                        className="flex gap-3 text-[15px] leading-[1.5] text-[#2A2D28]/85 md:text-[16px]"
                      >
                        <span aria-hidden style={{ color: PALETTE.teal }}>
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {whoNotFor.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                  className="rounded-2xl border border-[#1a1a18]/12 bg-white/60 p-6 backdrop-blur md:p-8"
                >
                  <p
                    style={{ ...MONO, color: PALETTE.orange }}
                    className="text-[11px] uppercase tracking-[0.25em]"
                  >
                    · Who it's not for
                  </p>
                  <ul className="mt-4 space-y-3">
                    {whoNotFor.map((item, i) => (
                      <li
                        key={i}
                        style={SERIF}
                        className="flex gap-3 text-[15px] leading-[1.5] text-[#2A2D28]/75 md:text-[16px]"
                      >
                        <span aria-hidden style={{ color: PALETTE.orange }}>
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {relatedProjects.length > 0 && (
          <section className="px-5 pb-20 sm:px-6 md:px-12 lg:px-20">
            <div className="mx-auto max-w-4xl">
              <p style={MONO} className="text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/45">
                · Related work
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/project/${p.slug}`}
                    className="group rounded-2xl border border-[#1a1a18]/12 bg-white/60 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-0.5 hover:border-[#049B9F]/40"
                  >
                    <h3 style={SERIF} className="text-[22px] leading-tight tracking-tight text-[#2A2D28]">
                      {p.title}
                    </h3>
                    {p.headline && (
                      <p className="mt-2 text-[14px] leading-[1.5] text-[#1a1a18]/65">
                        {p.headline}
                      </p>
                    )}
                    <span
                      style={MONO}
                      className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#049B9F]"
                    >
                      Read case study <span aria-hidden>&rarr;</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 pb-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p style={MONO} className="text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/45">
              · Other practices
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {SEGMENTS.filter((s) => !s.hidden && s.slug !== segment.slug).map((s) => (
                <Link
                  key={s.slug}
                  to={`/for/${s.slug}`}
                  style={MONO}
                  className="rounded-full border border-[#1a1a18]/15 bg-white/60 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#1a1a18]/70 backdrop-blur transition-colors duration-500 hover:border-[#049B9F]/50 hover:text-[#049B9F]"
                >
                  For {s.name} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FooterBlock />
      </div>
    </div>
  );
}
