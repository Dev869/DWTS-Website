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

const PRINCIPLES = [
  {
    kicker: "01",
    title: "Fit over features",
    body:
      "Most tools are 20% of what you need and 80% of what you don't. I'd rather build something narrow and sharp than wide and hollow.",
  },
  {
    kicker: "02",
    title: "Ship small, ship often",
    body:
      "Long roadmaps lie. The fastest way to learn whether a system is right is to get a rough version into someone's hands this week.",
  },
  {
    kicker: "03",
    title: "Keep the seams visible",
    body:
      "Code should tell the truth about what it does. No magic layers, no clever abstractions that only the author understands.",
  },
  {
    kicker: "04",
    title: "Design for the edges",
    body:
      "The golden path is easy. The interesting work is in the off-ramps, the failure modes, the weird Tuesday-afternoon edge case.",
  },
];

const TIMELINE = [
  { year: "2026", label: "DW Tailored Systems", detail: "Independent practice — product engineering + AI integration" },
  { year: "2025", label: "B.S. Biological Sciences", detail: "UC Davis — started in Computer Science, graduated in Bio Sci" },
  { year: "2025", label: "Fluorescence Pipeline", detail: "Summer research toolkit, Loma Linda University" },
  { year: "2024", label: "Pulse Wave Analysis", detail: "Undergraduate research, M&M Lab, UC Davis" },
];

const STACK = [
  { label: "React & Next.js", color: PALETTE.teal },
  { label: "TypeScript", color: PALETTE.tealDark },
  { label: "Node & Python", color: PALETTE.orange },
  { label: "PostgreSQL", color: PALETTE.gold },
  { label: "Anthropic & OpenAI", color: PALETTE.olive },
  { label: "Vercel & Firebase", color: PALETTE.tealLight },
];

export default function About() {
  const rise = useRise();

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        {/* Hero / intro */}
        <section className="relative px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="mb-6 text-[11px] uppercase tracking-[0.28em]"
            >
              · About
            </motion.p>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:items-end">
              <div>
                <motion.h1
                  {...rise(0.1)}
                  style={SERIF}
                  className="text-[56px] leading-[0.95] tracking-[-0.02em] text-[#2A2D28] md:text-[120px]"
                >
                  Hey, I&rsquo;m
                  <br />
                  <span className="italic" style={{ color: PALETTE.teal }}>
                    Devin.
                  </span>
                </motion.h1>

                <motion.p
                  {...rise(0.2)}
                  style={{ ...MONO, color: PALETTE.teal }}
                  className="mt-8 text-[11px] uppercase tracking-[0.28em]"
                >
                  · Forward Deployed Engineer
                </motion.p>

                <motion.p
                  {...rise(0.25)}
                  style={SERIF}
                  className="mt-6 max-w-xl text-[20px] leading-[1.5] text-[#2A2D28]/85 md:text-[24px]"
                >
                  I embed with teams and build the specific internal tools
                  they actually need. Research labs, restaurants, logistics
                  companies — if there&rsquo;s a workflow a sharper piece of
                  software could untangle, I want to build it.
                </motion.p>

                <motion.div {...rise(0.35)} className="mt-8 flex flex-wrap items-center gap-4">
                  <BookCallButton label="Book a call" />
                </motion.div>
              </div>

              {/* Larger portrait — framed, warm border */}
              <motion.div
                {...rise(0.35)}
                className="relative mx-auto md:ml-auto md:mr-0"
              >
                <div
                  className="absolute -inset-3 rounded-[28px]"
                  style={{ background: `${PALETTE.teal}12` }}
                />
                <div
                  className="relative overflow-hidden rounded-[22px] border bg-white"
                  style={{ borderColor: `${PALETTE.ink}15` }}
                >
                  <img
                    src="/devin.jpg"
                    alt="Devin Wilson"
                    className="block h-[340px] w-[280px] object-cover md:h-[440px] md:w-[340px]"
                  />
                </div>
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border bg-white px-4 py-1.5 shadow-sm"
                  style={{ borderColor: `${PALETTE.ink}15` }}
                >
                  <span
                    style={MONO}
                    className="text-[10px] uppercase tracking-[0.22em] text-[#1a1a18]/65"
                  >
                    Redlands, CA
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div {...rise(0.5)} className="mt-16 max-w-sm">
              <StripeBar />
            </motion.div>
          </div>
        </section>

        {/* Story / long-form */}
        <section className="border-t px-6 py-24 md:px-12 md:py-32 lg:px-20" style={{ borderColor: `${PALETTE.ink}10` }}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="text-[11px] uppercase tracking-[0.25em]"
            >
              · The story
            </motion.p>

            <div>
              <motion.p
                {...rise(0.05)}
                style={SERIF}
                className="text-[22px] leading-[1.55] text-[#2A2D28] md:text-[26px]"
              >
                I came to software through a side door. I started at UC
                Davis in Computer Science and switched into Biological
                Sciences, which is how I ended up with a foot in both worlds
                — and how I landed my first real programming job stitching
                together analysis scripts for a research lab drowning in
                fluorescence microscopy images. The &ldquo;tool&rdquo; they
                were using was a spreadsheet and a pile of Python snippets
                nobody wanted to touch. A few weeks later, runs that used to
                take a day finished in fifteen minutes. That was the hook.
              </motion.p>
              <motion.p
                {...rise(0.15)}
                className="mt-8 max-w-2xl text-[16px] leading-relaxed text-[#1a1a18]/70"
              >
                Since then I&rsquo;ve kept ending up in the same place:
                operations teams tracking deliveries in spreadsheets,
                researchers gluing six apps together to run one experiment,
                founders paying for SaaS that fits 60% of their workflow.
                Most of what I do now under{" "}
                <span className="font-medium" style={{ color: PALETTE.tealDark }}>
                  DW Tailored Systems
                </span>{" "}
                is the same move — build the specific system that replaces the
                duct tape.
              </motion.p>
              <motion.p
                {...rise(0.25)}
                className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#1a1a18]/70"
              >
                I work across product engineering, AI integration, and systems
                architecture. I&rsquo;m comfortable owning a project from the
                blank-page conversation to the thing running in production.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section
          className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20"
          style={{ background: PALETTE.paperDeep }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0">
            <StripeBar />
          </div>

          <div className="mx-auto max-w-6xl">
            <motion.div {...rise(0)} className="mb-12 flex items-end justify-between gap-6">
              <h2
                style={SERIF}
                className="text-[40px] leading-none tracking-tight text-[#2A2D28] md:text-[64px]"
              >
                How I work
              </h2>
              <span style={MONO} className="hidden text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/50 md:block">
                · Four principles
              </span>
            </motion.div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border md:grid-cols-2" style={{ borderColor: `${PALETTE.ink}15`, background: `${PALETTE.ink}12` }}>
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.kicker}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                  className="group relative bg-[#F1EEE6] p-8 md:p-10"
                >
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 ease-out group-hover:w-full"
                    style={{ background: STRIPE_ACCENT(i) }}
                  />
                  <span style={{ ...MONO, color: STRIPE_ACCENT(i) }} className="text-[11px] uppercase tracking-[0.25em]">
                    {p.kicker}
                  </span>
                  <h3 style={SERIF} className="mt-3 text-[24px] leading-tight text-[#2A2D28] md:text-[28px]">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#1a1a18]/65">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="text-[11px] uppercase tracking-[0.25em]"
            >
              · Selected history
            </motion.p>

            <div className="relative">
              <div
                className="absolute left-[72px] top-2 bottom-2 w-px md:left-[88px]"
                style={{ background: `${PALETTE.ink}20` }}
              />
              <ul className="space-y-8">
                {TIMELINE.map((t, i) => (
                  <motion.li
                    key={t.label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                    className="relative grid grid-cols-[72px_1fr] items-baseline gap-6 md:grid-cols-[88px_1fr]"
                  >
                    <span style={{ ...MONO, color: PALETTE.teal }} className="text-[13px] tracking-[0.1em]">
                      {t.year}
                    </span>
                    <div className="relative pl-6">
                      <span
                        className="absolute left-[-3px] top-2 h-2 w-2 rounded-full"
                        style={{ background: STRIPE_ACCENT(i) }}
                      />
                      <h3 style={SERIF} className="text-[22px] leading-tight text-[#2A2D28] md:text-[26px]">
                        {t.label}
                      </h3>
                      <p className="mt-1 text-[14px] text-[#1a1a18]/60">{t.detail}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section
          className="border-t px-6 py-20 md:px-12 md:py-24 lg:px-20"
          style={{ borderColor: `${PALETTE.ink}10` }}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="text-[11px] uppercase tracking-[0.25em]"
            >
              · Stack
            </motion.p>

            <div>
              <motion.p
                {...rise(0.1)}
                style={SERIF}
                className="max-w-2xl text-[22px] leading-[1.45] text-[#2A2D28] md:text-[26px]"
              >
                The tools I reach for most often. I&rsquo;m tool-agnostic — if
                something else fits the problem better, we use that.
              </motion.p>
              <motion.div {...rise(0.2)} className="mt-8 flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s.label}
                    style={{ ...MONO, borderColor: `${s.color}45`, color: s.color }}
                    className="rounded-full border bg-white/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5"
                  >
                    {s.label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <FooterBlock />
      </div>
    </div>
  );
}

function STRIPE_ACCENT(i) {
  const arr = [
    PALETTE.teal,
    PALETTE.orange,
    PALETTE.gold,
    PALETTE.olive,
    PALETTE.tealDark,
  ];
  return arr[i % arr.length];
}
