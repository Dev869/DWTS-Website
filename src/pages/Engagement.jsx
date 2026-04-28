import { motion, useReducedMotion } from "framer-motion";
import {
  PALETTE,
  SERIF,
  MONO,
  EASE,
  PillNav,
  StripeBar,
  FooterBlock,
  BookCallButton,
} from "./_shared.jsx";
import { usePageCopy } from "../hooks/useSiteCopy";

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

const ENGAGEMENT_KEYS = [
  { id: "pilot", accent: PALETTE.teal },
  { id: "standard", accent: PALETTE.orange },
  { id: "ongoing", accent: PALETTE.gold },
];

function buildEngagements(c) {
  return ENGAGEMENT_KEYS.map((e) => ({
    accent: e.accent,
    kicker: c[`${e.id}Kicker`],
    title: c[`${e.id}Title`],
    price: c[`${e.id}Price`],
    duration: c[`${e.id}Duration`],
    body: c[`${e.id}Body`],
  }));
}

function buildSteps(c) {
  return [1, 2, 3, 4, 5].map((n) => ({
    n: String(n).padStart(2, "0"),
    title: c[`step${n}Title`],
    body: c[`step${n}Body`],
  }));
}

export default function Engagement() {
  const rise = useRise();
  const { c } = usePageCopy("engagement");
  const ENGAGEMENTS = buildEngagements(c);
  const STEPS = buildSteps(c);

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        {/* Hero */}
        <section className="relative px-5 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 md:px-12 md:pt-40 md:pb-20 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="mb-6 text-[11px] uppercase tracking-[0.28em]"
            >
              {c.heroEyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.05)}
              style={SERIF}
              className="max-w-4xl text-[44px] leading-[0.98] tracking-[-0.02em] text-[#2A2D28] sm:text-[56px] md:text-[88px]"
            >
              {c.heroHeadlineLead}{" "}
              <span className="italic" style={{ color: PALETTE.teal }}>
                {c.heroHeadlineAccent}
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.15)}
              style={SERIF}
              className="mt-6 max-w-2xl text-[18px] leading-[1.5] text-[#2A2D28]/80 md:text-[22px]"
            >
              {c.heroSubhead}
            </motion.p>

            <motion.div {...rise(0.3)} className="mt-10 max-w-xs">
              <StripeBar />
            </motion.div>
          </div>
        </section>

        {/* Three engagement cards */}
        <section className="px-5 pb-20 sm:px-6 sm:pb-24 md:px-12 md:pb-32 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
              {ENGAGEMENTS.map((e, i) => (
                <motion.article
                  key={e.kicker}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white/70 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(26,26,24,0.25)] md:p-10"
                  style={{ borderColor: `${PALETTE.ink}12` }}
                >
                  <div
                    className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                    style={{ background: e.accent }}
                  />
                  <span style={{ ...MONO, color: e.accent }} className="text-[10px] uppercase tracking-[0.28em]">
                    {e.kicker}
                  </span>
                  <h2 style={SERIF} className="mt-3 text-[26px] leading-tight text-[#2A2D28] md:text-[32px]">
                    {e.title}
                  </h2>
                  <p style={SERIF} className="mt-5 text-[20px] leading-tight text-[#2A2D28] md:text-[22px]">
                    {e.price}
                  </p>
                  <p style={MONO} className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#1a1a18]/55">
                    {e.duration}
                  </p>
                  <p className="mt-5 text-[14px] leading-[1.6] text-[#1a1a18]/70">
                    {e.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* How a typical project goes */}
        <section
          className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20"
          style={{ background: PALETTE.paperDeep }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0">
            <StripeBar />
          </div>

          <div className="mx-auto max-w-6xl">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="text-[11px] uppercase tracking-[0.28em]"
            >
              {c.processEyebrow}
            </motion.p>
            <motion.h2
              {...rise(0.05)}
              style={SERIF}
              className="mt-3 max-w-3xl text-[36px] leading-[1.02] tracking-[-0.02em] text-[#2A2D28] sm:text-[48px] md:text-[64px]"
            >
              {c.processHeadline}
            </motion.h2>

            <ol className="mt-12 space-y-px overflow-hidden rounded-2xl border" style={{ borderColor: `${PALETTE.ink}15`, background: `${PALETTE.ink}10` }}>
              {STEPS.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                  className="grid grid-cols-[64px_1fr] items-baseline gap-6 bg-[#F1EEE6] p-6 md:grid-cols-[88px_1fr] md:p-10"
                >
                  <span style={{ ...MONO, color: PALETTE.teal }} className="text-[14px] tracking-[0.1em]">
                    {s.n}
                  </span>
                  <div>
                    <h3 style={SERIF} className="text-[22px] leading-tight text-[#2A2D28] md:text-[28px]">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#1a1a18]/70">
                      {s.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h2
              {...rise(0)}
              style={SERIF}
              className="text-[36px] leading-[1.02] tracking-[-0.02em] text-[#2A2D28] sm:text-[48px] md:text-[64px]"
            >
              {c.ctaHeadlineLead}{" "}
              <span className="italic" style={{ color: PALETTE.teal }}>
                {c.ctaHeadlineAccent}
              </span>
            </motion.h2>
            <motion.p
              {...rise(0.1)}
              className="mt-5 text-[15px] leading-relaxed text-[#1a1a18]/65"
            >
              {c.ctaBody}
            </motion.p>
            <motion.div {...rise(0.2)} className="mt-8 flex justify-center">
              <BookCallButton label={c.ctaButtonLabel} />
            </motion.div>
          </div>
        </section>

        <FooterBlock />
      </div>
    </div>
  );
}
