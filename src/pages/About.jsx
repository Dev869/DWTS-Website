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
  Portrait,
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

const TOOLS = [
  { label: "Claude Code", color: PALETTE.teal },
  { label: "n8n", color: PALETTE.tealDark },
  { label: "Python", color: PALETTE.orange },
  { label: "Anthropic API", color: PALETTE.gold },
  { label: "Vercel", color: PALETTE.olive },
  { label: "Postgres", color: PALETTE.tealLight },
];

export default function About() {
  const rise = useRise();

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        <section className="relative px-5 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24 md:px-12 md:pt-40 md:pb-32 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="mb-6 text-[11px] uppercase tracking-[0.28em]"
            >
              · About
            </motion.p>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:items-start">
              <div>
                <motion.h1
                  {...rise(0.1)}
                  style={SERIF}
                  className="text-[44px] leading-[0.95] tracking-[-0.02em] text-[#2A2D28] sm:text-[56px] md:text-[96px]"
                >
                  Hey, I&rsquo;m{" "}
                  <span className="italic" style={{ color: PALETTE.teal }}>
                    Devin.
                  </span>
                </motion.h1>

                <motion.p
                  {...rise(0.2)}
                  style={SERIF}
                  className="mt-8 max-w-xl text-[20px] leading-[1.55] text-[#2A2D28]/85 md:text-[22px]"
                >
                  B.S. in Biological Sciences from UC Davis. I started in
                  Computer Science and switched into Bio Sci, which is how I
                  ended up with a foot in both worlds, and how I landed my
                  first real programming job stitching analysis scripts for a
                  research lab drowning in fluorescence microscopy images. A
                  few weeks later, runs that used to take a day finished in
                  fifteen minutes. That was the hook. I do that for labs
                  full-time now.
                </motion.p>

                <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
                  <BookCallButton label="Book a free 20-minute lab audit" />
                </motion.div>

                <motion.div {...rise(0.4)} className="mt-12">
                  <p style={{ ...MONO, color: PALETTE.teal }} className="text-[10px] uppercase tracking-[0.28em]">
                    · Tools I reach for
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {TOOLS.map((s) => (
                      <span
                        key={s.label}
                        style={{ ...MONO, borderColor: `${s.color}45`, color: s.color }}
                        className="rounded-full border bg-white/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5"
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...rise(0.5)} className="mt-12 max-w-xs">
                  <StripeBar />
                </motion.div>
              </div>

              {/* Portrait */}
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
                  <Portrait
                    id={2}
                    alt="Devin Wilson"
                    eager
                    sizes="(min-width: 768px) 340px, 280px"
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
          </div>
        </section>

        <FooterBlock />
      </div>
    </div>
  );
}
