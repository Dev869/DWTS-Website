import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getSegmentBySlug, SEGMENTS } from "../data/segments";
import {
  PALETTE,
  SERIF,
  MONO,
  EASE,
  PillNav,
  FooterBlock,
  BookCallButton,
} from "./_shared.jsx";

// Scaffolding page — copy lives in src/data/segments.js (currently stubs).
// See docs/portfolio-strategy.md before filling in.
export default function Segment() {
  const { slug } = useParams();
  const segment = getSegmentBySlug(slug);

  if (!segment) return <Navigate to="/" replace />;

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        <section className="px-6 pt-28 pb-20 md:px-12 md:pt-32 md:pb-28 lg:px-20">
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
              className="text-[48px] leading-[1.02] tracking-[-0.02em] text-[#2A2D28] md:text-[72px]"
            >
              {segment.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              style={SERIF}
              className="mt-6 max-w-2xl text-[20px] leading-[1.45] text-[#2A2D28]/80 md:text-[22px]"
            >
              {segment.subheadline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
              style={MONO}
              className="mt-6 text-[12px] uppercase tracking-[0.22em] text-[#1a1a18]/55"
            >
              {segment.engagement}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="mt-10"
            >
              <BookCallButton label={segment.ctaLabel} />
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <p style={MONO} className="text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/45">
              · Other practices
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {SEGMENTS.filter((s) => s.slug !== segment.slug).map((s) => (
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
