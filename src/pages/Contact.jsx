import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  useCalCom,
  CAL_LINK,
  CAL_NAMESPACE,
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

// Inline Cal.com embed, uses the same loaded script as BookCallButton
function CalInline() {
  useCalCom();
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    // Give the Cal script a tick to attach onto window.Cal.ns
    const id = setInterval(() => {
      if (window.Cal?.ns?.[CAL_NAMESPACE]) {
        window.Cal.ns[CAL_NAMESPACE]("inline", {
          elementOrSelector: "#cal-inline",
          calLink: CAL_LINK,
          layout: "month_view",
          config: { theme: "light" },
        });
        mounted.current = true;
        clearInterval(id);
      }
    }, 150);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      id="cal-inline"
      className="relative min-h-[640px] w-full overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: `${PALETTE.ink}12` }}
    />
  );
}

const CONTACT_CHANNELS = [
  {
    label: "Email",
    value: "devin@dwtailored.com",
    href: "mailto:devin@dwtailored.com",
    color: PALETTE.teal,
    icon: "mail",
    detail: "Best for longer briefs or anything with attachments.",
  },
  {
    label: "GitHub",
    value: "github.com/Dev869",
    href: "https://github.com/Dev869",
    color: PALETTE.orange,
    icon: "github",
    detail: "Code, forks, and the usual.",
  },
];

function ChannelIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, className: "h-4 w-4" };
  switch (name) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.8c.85.01 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.91.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
      );
    default:
      return null;
  }
}

const FAQ = [
  {
    q: "What kinds of projects fit best?",
    a: "Research labs automating repetitive analysis, restaurants and logistics teams outgrowing spreadsheets, or founders who need a purpose-built internal tool in weeks rather than quarters.",
  },
  {
    q: "How do engagements usually work?",
    a: "Most start with a 30-minute call to sketch the problem. If it's a good fit, we scope a small first milestone, usually 2 to 4 weeks, and go from there.",
  },
  {
    q: "Can you work with an existing team?",
    a: "Yes. I often embed alongside an internal team, owning the one thing nobody else has bandwidth for.",
  },
  {
    q: "Timezones?",
    a: "I'm based in Redlands, CA (Pacific). Happy to sync with teams across North America and Europe.",
  },
];

export default function Contact() {
  const rise = useRise();

  return (
    <div className="text-[#1a1a18]">
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        {/* Booking + channels */}
        <section className="px-6 pt-32 pb-16 md:px-12 md:pt-36 md:pb-20 lg:px-20">
          <div className="mx-auto mb-10 flex max-w-6xl items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span style={{ ...MONO, color: PALETTE.teal }} className="text-[11px] uppercase tracking-[0.28em]">
                · Contact
              </span>
              <span style={MONO} className="hidden text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/45 md:inline">
                Replies within 24h
              </span>
            </div>
            <div className="hidden max-w-[140px] md:block">
              <StripeBar />
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
              {/* Channels */}
              <motion.div {...rise(0)}>
                <p style={{ ...MONO, color: PALETTE.teal }} className="text-[11px] uppercase tracking-[0.28em]">
                  · Where to find me
                </p>
                <h2 style={SERIF} className="mt-4 text-[32px] leading-tight text-[#2A2D28] md:text-[42px]">
                  Pick your channel.
                </h2>

                <ul className="mt-8 space-y-3">
                  {CONTACT_CHANNELS.map((c, i) => (
                    <motion.li
                      key={c.label}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                    >
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                        className="group flex items-start gap-4 rounded-2xl border bg-white/55 p-5 backdrop-blur transition-all duration-700 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(26,26,24,0.18)]"
                        style={{ borderColor: `${PALETTE.ink}12` }}
                      >
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 group-hover:scale-[1.06]"
                          style={{ borderColor: `${c.color}45`, color: c.color, background: `${c.color}10` }}
                        >
                          <ChannelIcon name={c.icon} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span style={{ ...MONO, color: c.color }} className="text-[10px] uppercase tracking-[0.25em]">
                              {c.label}
                            </span>
                          </div>
                          <div
                            style={SERIF}
                            className="mt-0.5 truncate text-[18px] text-[#2A2D28] transition-colors duration-500 group-hover:text-[#049B9F]"
                          >
                            {c.value}
                          </div>
                          <p className="mt-1 text-[13px] leading-relaxed text-[#1a1a18]/55">
                            {c.detail}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          style={{ color: c.color }}
                          className="mt-2 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Response expectation */}
                <motion.div
                  {...rise(0.3)}
                  className="mt-8 rounded-2xl border bg-white/40 p-5 backdrop-blur"
                  style={{ borderColor: `${PALETTE.ink}12` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full" style={{ background: `${PALETTE.teal}80` }} />
                      <span className="relative inline-block h-2 w-2 rounded-full" style={{ background: PALETTE.teal }} />
                    </span>
                    <span style={MONO} className="text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/65">
                      Usually replies within 24h
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#1a1a18]/65">
                    Based in Redlands, CA (Pacific). Currently taking on new
                    engagements, and open to short discovery calls any
                    weekday.
                  </p>
                </motion.div>
              </motion.div>

              {/* Inline calendar */}
              <motion.div {...rise(0.1)}>
                <div className="mb-4 flex items-center justify-between">
                  <p style={{ ...MONO, color: PALETTE.teal }} className="text-[11px] uppercase tracking-[0.28em]">
                    · Book a call
                  </p>
                  <span style={MONO} className="text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/45">
                    30 minutes &nbsp;·&nbsp; video
                  </span>
                </div>
                <CalInline />
                <p className="mt-4 text-[12px] leading-relaxed text-[#1a1a18]/55">
                  The form above is a live Cal.com embed. Pick any open slot
                  and you&rsquo;ll get a calendar invite automatically.{" "}
                  <BookCallButton label="Or open in a popup" variant="ghost" className="ml-1 !py-2 !px-4 !text-[10px]" />
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20" style={{ background: PALETTE.paperDeep }}>
          <div className="pointer-events-none absolute inset-x-0 top-0">
            <StripeBar />
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
            <motion.p
              {...rise(0)}
              style={{ ...MONO, color: PALETTE.teal }}
              className="text-[11px] uppercase tracking-[0.25em]"
            >
              · Before we talk
            </motion.p>

            <div>
              <motion.h2
                {...rise(0)}
                style={SERIF}
                className="text-[40px] leading-tight tracking-tight text-[#2A2D28] md:text-[56px]"
              >
                A few common questions.
              </motion.h2>
              <ul className="mt-10 divide-y" style={{ borderColor: `${PALETTE.ink}18` }}>
                {FAQ.map((f, i) => (
                  <motion.li
                    key={f.q}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                    className="grid grid-cols-[auto_1fr] gap-6 border-t py-7"
                    style={{ borderColor: `${PALETTE.ink}15` }}
                  >
                    <span style={{ ...MONO, color: STRIPE_COLORS[i % STRIPE_COLORS.length] }} className="text-[13px] tracking-[0.12em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 style={SERIF} className="text-[22px] leading-tight text-[#2A2D28] md:text-[26px]">
                        {f.q}
                      </h3>
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#1a1a18]/65">
                        {f.a}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FooterBlock />
      </div>
    </div>
  );
}
