import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  BookCallButton,
  Portrait,
  ProjectBadges,
  ProjectLinks,
} from "./_shared.jsx";

function useMotion() {
  const reduced = useReducedMotion();
  return {
    fade: reduced ? { initial: false } : { initial: { opacity: 0 }, animate: { opacity: 1 } },
    rise: (delay = 0) =>
      reduced
        ? { initial: false }
        : {
            initial: { opacity: 0, y: 12 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.1 },
            transition: { duration: 0.65, ease: EASE, delay },
          },
  };
}

function Hero() {
  const m = useMotion();
  return (
    <section id="top" className="relative px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:px-12 md:pt-32 md:pb-28 lg:px-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          {/* LEFT: positioning + CTAs */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{ ...MONO, color: PALETTE.teal }}
              className="mb-5 text-[11px] uppercase tracking-[0.28em]"
            >
              · AI Automation for Labs
            </motion.p>

            <motion.h1
              style={SERIF}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="text-[44px] leading-[0.98] tracking-[-0.02em] text-[#2A2D28] sm:text-[56px] md:text-[80px] lg:text-[96px]"
            >
              I build AI automations for{" "}
              <span className="relative inline-block italic" style={{ color: PALETTE.teal }}>
                research and clinical labs
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
                  className="absolute -bottom-1 left-0 block h-[3px] w-full origin-left md:-bottom-2 md:h-[4px]"
                  style={{ background: PALETTE.teal }}
                />
              </span>
              .
            </motion.h1>

            <motion.p
              {...m.rise(0.35)}
              style={SERIF}
              className="mt-7 max-w-xl text-[18px] leading-[1.45] text-[#2A2D28]/85 sm:text-[20px] md:text-[24px]"
            >
              Biology degree, working code. Most pilots ship in{" "}
              <span className="italic" style={{ color: PALETTE.teal }}>
                two weeks.
              </span>
            </motion.p>

            <motion.div {...m.rise(0.5)} className="mt-10 flex flex-wrap items-center gap-4">
              {/* TODO: replace href with Loom URL once 60-second demo is recorded.
                  Falls back to scrolling to #what-i-automate so it never dead-ends. */}
              <a
                href="#what-i-automate"
                style={MONO}
                className="group inline-flex items-center gap-3 rounded-full bg-[#049B9F] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-[#F8F6F0] shadow-[0_10px_30px_-12px_rgba(4,155,159,0.5)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#037B7E]"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6.5 5.5v5l4-2.5-4-2.5Z" fill="currentColor" />
                </svg>
                <span>Watch a 60-second demo</span>
              </a>
              <BookCallButton label="Book a free 20-minute lab audit" variant="ghost" />
            </motion.div>

            <motion.div {...m.rise(0.6)} className="mt-10 max-w-xs">
              <StripeBar />
            </motion.div>

            <motion.p
              {...m.rise(0.7)}
              style={MONO}
              className="mt-6 text-[11px] uppercase tracking-[0.22em] text-[#1a1a18]/55"
            >
              Devin Wilson &nbsp;·&nbsp; B.S. Biological Sciences, UC Davis
            </motion.p>
          </div>

          {/* RIGHT: prominent portrait, sits up top so it's visible above the fold */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="relative mx-auto mt-4 md:ml-auto md:mr-0 md:mt-12"
          >
            <div
              className="absolute -inset-4 rounded-[28px]"
              style={{ background: `${PALETTE.teal}14` }}
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
              className="absolute -left-3 top-8 bottom-8 w-1 origin-top rounded-full"
              style={{ background: PALETTE.teal }}
            />
            <div
              className="relative overflow-hidden rounded-[22px] border bg-white shadow-[0_30px_70px_-30px_rgba(26,26,24,0.35)]"
              style={{ borderColor: `${PALETTE.ink}15` }}
            >
              <Portrait
                id={1}
                alt="Devin Wilson"
                eager
                sizes="(min-width: 768px) 360px, 280px"
                className="block h-[300px] w-[240px] object-cover sm:h-[340px] sm:w-[280px] md:h-[440px] md:w-[360px]"
              />
            </div>
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border bg-white px-4 py-1.5 shadow-sm"
              style={{ borderColor: `${PALETTE.ink}15` }}
            >
              <span style={MONO} className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-[#1a1a18]/65">
                Redlands, CA &nbsp;·&nbsp; 2026
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NavIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, className: "h-4 w-4" };
  switch (name) {
    case "user":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      );
    case "bookmark":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 3h12v18l-6-4-6 4V3Z" />
        </svg>
      );
    case "pencil":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M14 4l6 6-10 10H4v-6L14 4Z" />
        </svg>
      );
    default:
      return null;
  }
}

function SectionRule({ left, right, accent = PALETTE.teal }) {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 md:px-12 lg:px-20">
      <span style={{ ...MONO, color: accent }} className="text-[11px] uppercase tracking-[0.25em]">
        {left}
      </span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="h-px flex-1 origin-left"
        style={{ background: `${PALETTE.ink}25` }}
      />
      <span style={MONO} className="text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/55">
        {right}
      </span>
    </div>
  );
}

function FeaturedCase({ project, index = 0, flip = false, accent = PALETTE.teal }) {
  const cardBody =
    project.cardText ||
    project.quote ||
    project.headline ||
    project.description?.slice(0, 160);
  const asQuote = (project.cardTextStyle || "quote") === "quote";
  const kicker = project.cardKicker || (asQuote ? "From the case study" : "About the project");
  const highlights = getProjectHighlights(project, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mx-auto mt-10 max-w-6xl px-5 sm:px-6 md:px-12 lg:px-20"
    >
      <div
        className={`grid grid-cols-1 overflow-hidden rounded-3xl border shadow-[0_30px_80px_-40px_rgba(26,26,24,0.35)] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] ${
          flip ? "md:[&>*:first-child]:order-2" : ""
        }`}
        style={{ borderColor: `${PALETTE.ink}15` }}
      >
        {/* Dark side: higher contrast, larger body text, clearer hierarchy */}
        <div
          className="group relative flex flex-col justify-between overflow-hidden px-6 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16"
          style={{ background: PALETTE.tealDeep }}
        >
          {/* Subtle radial glow behind title */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-3xl transition-opacity duration-700 group-hover:opacity-55"
            style={{ background: `${accent}60` }}
          />

          <div className="relative">
            {/* Title is rendered on the artwork side now; lead with the kicker. */}
            <div className="flex flex-wrap items-center gap-3">
              <p style={MONO} className="text-[11px] uppercase tracking-[0.28em]">
                <span style={{ color: `${PALETTE.paper}85` }}>{kicker}</span>
              </p>
              <ProjectBadges project={project} compact />
            </div>

            <div
              className="mt-6 h-px w-12"
              style={{ background: `${PALETTE.paper}40` }}
            />

            {/* Card body: renders with decorative quote marks, or as plain
                serif prose depending on cardTextStyle. */}
            {asQuote ? (
              <blockquote
                style={SERIF}
                className="mt-5 max-w-md text-[19px] leading-[1.55] text-[#F5F1E6] md:text-[22px]"
              >
                <span aria-hidden className="select-none" style={{ color: accent, fontSize: "1.1em", marginRight: "0.08em" }}>
                  &ldquo;
                </span>
                {cardBody}
                <span aria-hidden className="select-none" style={{ color: accent, fontSize: "1.1em", marginLeft: "0.04em" }}>
                  &rdquo;
                </span>
              </blockquote>
            ) : (
              <p
                style={SERIF}
                className="mt-5 max-w-md text-[19px] leading-[1.55] text-[#F5F1E6] md:text-[22px]"
              >
                {cardBody}
              </p>
            )}
          </div>

          <div className="relative mt-12">
            {/* Outcome highlights — what the project delivers, in customer language. */}
            {highlights.length > 0 && (
              <dl className="grid grid-cols-3 gap-x-5 gap-y-2 border-t pt-5" style={{ borderColor: "rgba(245, 241, 230, 0.18)" }}>
                {highlights.map((h, i) => (
                  <div key={`${h.value}-${h.label}-${i}`}>
                    {h.value && (
                      <dd
                        style={{ ...SERIF, color: "#F5F1E6" }}
                        className="text-[26px] leading-[1] tracking-[-0.02em] sm:text-[30px]"
                      >
                        {h.value}
                      </dd>
                    )}
                    <dt
                      style={{ ...MONO, color: "rgba(245, 241, 230, 0.65)" }}
                      className="mt-1 text-[10px] uppercase tracking-[0.2em]"
                    >
                      {h.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}

            {(project.link || project.demoUrl) && (
              <div className="mt-6">
                <ProjectLinks project={project} variant="dark" />
              </div>
            )}

            {/* Link CTA: brighter paper color + consistent arrow */}
            <Link
              to={`/project/${project.slug}`}
              style={MONO}
              className="group/link mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.25em] text-[#F5F1E6] transition-colors duration-500 hover:text-[#ffffff]"
            >
              Read case study
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 group-hover/link:translate-x-1"
                style={{ borderColor: `${PALETTE.paper}40` }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M0 8h14M14 8l-5-5M14 8l-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Vector artwork side */}
        <Link
          to={`/project/${project.slug}`}
          className="group relative block min-h-[260px] overflow-hidden sm:min-h-[320px] md:min-h-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 180, damping: 22 } }}
          >
            <ProjectArtwork project={project} index={index} variant="card" />
          </motion.div>

          {/* Corner ticks: subtle frame markers */}
          <span className="pointer-events-none absolute top-6 left-6 z-10 h-4 w-4 border-t-2 border-l-2" style={{ borderColor: `${PALETTE.paper}55` }} />
          <span className="pointer-events-none absolute bottom-6 right-6 z-10 h-4 w-4 border-b-2 border-r-2" style={{ borderColor: `${PALETTE.paper}55` }} />
        </Link>
      </div>
    </motion.div>
  );
}

const CARD_W = 280;
const CARD_H = 360;
const GAP = 40;
const SPRING = { type: "spring", stiffness: 200, damping: 30, mass: 1 };

function CarouselCard({ project, index = 0, distance, isActive, accent }) {
  const abs = Math.abs(distance);
  const x = distance * (CARD_W + GAP);
  const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : abs === 2 ? 0.68 : 0.56;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : abs === 2 ? 0.28 : 0.1;
  const grayscale = abs === 0 ? 0 : Math.min(0.4 + abs * 0.25, 1);
  const saturate = abs === 0 ? 1 : Math.max(1 - abs * 0.45, 0.15);
  const highlights = getProjectHighlights(project, 3);

  // 3D tilt: track pointer, feed springs for rotateX/Y
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springCfg = { stiffness: 220, damping: 28, mass: 0.7 };
  const rotateY = useSpring(useTransform(mx, [0, 1], [6, -6]), springCfg);
  const rotateX = useSpring(useTransform(my, [0, 1], [-5, 5]), springCfg);

  // When a card stops being active, reset hover + pointer state so it doesn't
  // carry lingering tilt / hovering into the non-active transition.
  useEffect(() => {
    if (!isActive && hovering) setHovering(false);
    if (!isActive) {
      mx.set(0.5);
      my.set(0.5);
    }
  }, [isActive, hovering, mx, my]);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovering(false);
  };

  return (
    <motion.div
      animate={{ x, scale, opacity }}
      transition={{
        x: SPRING,
        scale: SPRING,
        opacity: { duration: 0.5, ease: EASE },
      }}
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        marginLeft: -(CARD_W / 2),
        width: CARD_W,
        zIndex: 10 - abs,
        willChange: "transform, opacity",
      }}
      className="pointer-events-none"
    >
      {/* Tinted glow: only renders when active; AnimatePresence handles exit on handoff */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="glow"
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: hovering ? 0.55 : 0.18, scale: hovering ? 1.06 : 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35, ease: EASE } }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              position: "absolute",
              inset: -24,
              zIndex: -1,
              background: `radial-gradient(ellipse at center, ${accent}55, transparent 65%)`,
              filter: "blur(32px)",
              pointerEvents: "none",
              willChange: "opacity, transform",
            }}
          />
        )}
      </AnimatePresence>

      {/* Card: tilts in 3D when active+hovering */}
      <motion.div
        onMouseEnter={isActive ? () => setHovering(true) : undefined}
        onMouseMove={isActive ? handleMove : undefined}
        onMouseLeave={isActive ? handleLeave : undefined}
        onClick={isActive ? () => (window.location.href = `/project/${project.slug}`) : undefined}
        animate={{
          filter: `grayscale(${grayscale}) saturate(${saturate})`,
          boxShadow: isActive
            ? hovering
              ? `0 50px 100px -30px ${accent}55, 0 20px 40px -15px rgba(26,26,24,0.35)`
              : "0 40px 80px -30px rgba(26,26,24,0.45), 0 12px 24px -12px rgba(26,26,24,0.25)"
            : "0 10px 30px -15px rgba(26,26,24,0.2)",
        }}
        transition={{
          filter: { duration: 0.6, ease: EASE },
          boxShadow: { duration: 0.5, ease: EASE },
        }}
        style={{
          height: CARD_H,
          borderColor: `${PALETTE.ink}15`,
          background: "#fff",
          // Always pass the MotionValue; when not active we've already reset
          // mx/my to 0.5 in useEffect so the springs settle to 0. This avoids
          // the snap that occurred when switching between MotionValue and literal.
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 1200,
          pointerEvents: isActive ? "auto" : "none",
          cursor: isActive ? "pointer" : "default",
          willChange: "transform",
        }}
        className="relative overflow-hidden rounded-[22px]"
      >
        {/* Vector artwork fills the card */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isActive && hovering ? 1.04 : 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <ProjectArtwork project={project} index={index} variant="portrait" />
        </motion.div>

        {/* Subtle wash on hover for arrow contrast */}
        <motion.div
          aria-hidden
          animate={{ opacity: isActive && hovering ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 55%, rgba(26,26,24,0.28) 100%)`,
          }}
        />

        {/* Specular shine: static centered (tracking cursor via .get() was non-reactive
            and caused gradient string re-creation on every render, which compounded hops) */}
        <AnimatePresence>
          {isActive && hovering && (
            <motion.div
              key="shine"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.28 }}
              exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6), transparent 45%)",
                mixBlendMode: "overlay",
              }}
            />
          )}
        </AnimatePresence>

        {/* Arrow badge: springs in from bottom-right corner */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{
            opacity: isActive && hovering ? 1 : 0,
            scale: isActive && hovering ? 1 : 0.4,
            x: isActive && hovering ? 0 : 12,
            y: isActive && hovering ? 0 : 12,
            rotate: isActive && hovering ? 0 : -45,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 22, mass: 0.7 }}
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full shadow-[0_12px_30px_-8px_rgba(26,26,24,0.45)]"
          style={{ background: accent, color: "#F8F6F0" }}
        >
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            animate={{ x: isActive && hovering ? [0, 3, 0] : 0 }}
            transition={{ duration: 1.6, ease: EASE, repeat: Infinity, repeatDelay: 0.3 }}
          >
            <path d="M0 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.7" />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Title is now on the artwork; reserve space for tags on the active card. */}
      <div className="mt-6 min-h-[64px] text-center">
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-baseline justify-center gap-x-5 gap-y-2 px-4"
            >
              {highlights.map((h, i) => (
                <motion.div
                  key={`${h.value}-${h.label}-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.05 }}
                  className="text-center"
                >
                  {h.value && (
                    <div style={{ ...SERIF, color: accent }} className="text-[22px] leading-none tracking-[-0.02em]">
                      {h.value}
                    </div>
                  )}
                  <div style={{ ...MONO, color: "#1a1a1885" }} className="mt-1 text-[9px] uppercase tracking-[0.18em]">
                    {h.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PillButton({ direction, onClick, disabled, label }) {
  const isBack = direction === "back";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      style={MONO}
      className={`flex items-center gap-3 rounded-full border px-6 py-3 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${
        disabled
          ? "cursor-not-allowed border-[#1a1a18]/8 bg-transparent text-[#1a1a18]/25"
          : "border-[#1a1a18]/15 bg-white/70 text-[#1a1a18]/75 backdrop-blur hover:border-[#049B9F]/50 hover:text-[#049B9F]"
      }`}
    >
      {isBack && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M16 8H2M2 8l5-5M2 8l5 5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
      {label}
      {!isBack && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M0 8h14M14 8l-5-5M14 8l-5 5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </motion.button>
  );
}

function AllWorkRow({ projects }) {
  const [active, setActive] = useState(0);
  const total = projects.length;
  const touchStartX = useRef(null);

  const next = () => setActive((i) => Math.min(i + 1, total - 1));
  const prev = () => setActive((i) => Math.max(i - 1, 0));

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: PALETTE.paperDeep }}
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <StripeBar />
      </div>

      {/* Title */}
      <div className="mx-auto max-w-6xl px-6 text-center md:px-12 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          style={SERIF}
          className="relative inline-block text-[44px] leading-none tracking-tight text-[#2A2D28] sm:text-[56px] md:text-[96px]"
        >
          All work
          <sup style={MONO} className="absolute -right-7 top-1 text-[12px] font-normal tracking-[0.1em] sm:-right-10 sm:top-2 sm:text-[14px]">
            <span style={{ color: PALETTE.teal }}>{total}</span>
          </sup>
        </motion.h2>
      </div>

      {/* Carousel stage */}
      <div
        className="relative mx-auto mt-16 touch-pan-y md:mt-20"
        style={{ height: CARD_H + 140, perspective: "1200px" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Clickable region for arrow nav via arrows */}
        {projects.map((p, i) => (
          <CarouselCard
            key={p.id}
            project={p}
            index={i}
            distance={i - active}
            isActive={i === active}
            accent={STRIPE_COLORS[i % STRIPE_COLORS.length]}
          />
        ))}

        {/* Click regions on neighbors to navigate */}
        {active > 0 && (
          <button
            type="button"
            aria-label="Previous project"
            onClick={prev}
            className="absolute left-1/2 top-0 z-10"
            style={{
              width: CARD_W * 0.84,
              height: CARD_H * 0.84,
              marginLeft: -((CARD_W + GAP) + CARD_W * 0.84 / 2),
              top: (CARD_H - CARD_H * 0.84) / 2,
              cursor: "w-resize",
            }}
          />
        )}
        {active < total - 1 && (
          <button
            type="button"
            aria-label="Next project"
            onClick={next}
            className="absolute left-1/2 z-10"
            style={{
              width: CARD_W * 0.84,
              height: CARD_H * 0.84,
              marginLeft: (CARD_W + GAP) - CARD_W * 0.84 / 2,
              top: (CARD_H - CARD_H * 0.84) / 2,
              cursor: "e-resize",
            }}
          />
        )}
      </div>

      {/* Progress bar + pill controls */}
      <div className="mx-auto mt-12 flex max-w-5xl items-center gap-6 px-6 md:mt-16 md:px-12 lg:px-20">
        <PillButton direction="back" label="Back" onClick={prev} disabled={active === 0} />

        <div className="relative flex-1">
          <div className="h-px w-full" style={{ background: `${PALETTE.ink}20` }} />
          <motion.div
            animate={{ width: `${((active + 1) / total) * 100}%` }}
            transition={SPRING}
            className="absolute left-0 top-0 h-[2px]"
            style={{ background: PALETTE.ink, marginTop: -0.5 }}
          />
          {/* Tick marks */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
            {projects.map((_, i) => (
              <motion.button
                type="button"
                key={i}
                onClick={() => setActive(i)}
                animate={{
                  scale: i === active ? 1.4 : 1,
                  backgroundColor: i <= active ? PALETTE.ink : `${PALETTE.ink}35`,
                }}
                transition={{ duration: 0.4, ease: EASE }}
                aria-label={`Go to project ${i + 1}`}
                className="pointer-events-auto h-1.5 w-1.5 rounded-full"
              />
            ))}
          </div>
        </div>

        <PillButton direction="next" label="Next" onClick={next} disabled={active === total - 1} />
      </div>

      {/* Counter */}
      <div className="mt-6 text-center">
        <span style={MONO} className="text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/45">
          <span style={{ color: PALETTE.ink }}>{String(active + 1).padStart(2, "0")}</span>
          {" / "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

// Bento-style editorial gallery. Mixes screenshot tiles with outcome-metric
// tiles so the section sells (numbers) and showcases (images) at the same time.
// Tile composition is built once from the project list — image tiles become
// project links, metric tiles are typographic.
function buildSelectedTiles(projects) {
  const accents = [PALETTE.teal, PALETTE.orange, PALETTE.gold, PALETTE.olive];
  const tiles = [];
  projects.forEach((p, pIdx) => {
    const accent = accents[pIdx % accents.length];
    const galleryImgs = (p.gallery || [])
      .map((g) => g?.src)
      .filter(Boolean);
    const heroImg = p.previewImage || p.image || galleryImgs[0];

    if (heroImg) {
      tiles.push({
        kind: "image",
        key: `${p.slug}-hero`,
        slug: p.slug,
        src: heroImg,
        title: p.title,
        kicker: p.cardKicker || p.category,
        accent,
        weight: "feature",
      });
    }

    const result = (p.results || [])[0];
    if (result?.metric) {
      tiles.push({
        kind: "metric",
        key: `${p.slug}-result-0`,
        slug: p.slug,
        title: p.title,
        metric: result.metric,
        label: result.label,
        accent,
        weight: "wide",
      });
    }

    galleryImgs.slice(1, 3).forEach((src, i) => {
      tiles.push({
        kind: "image",
        key: `${p.slug}-g${i}`,
        slug: p.slug,
        src,
        title: p.title,
        kicker: p.gallery[i + 1]?.caption,
        accent,
        weight: "regular",
      });
    });

    if (!heroImg && !result?.metric) {
      tiles.push({
        kind: "text",
        key: `${p.slug}-text`,
        slug: p.slug,
        title: p.title,
        headline: p.headline,
        accent,
        weight: "regular",
      });
    }
  });
  return tiles;
}

function tileSpanClasses(weight, idx) {
  // Asymmetric rhythm on md+: alternating feature/wide/regular spans.
  // Mobile collapses to single column.
  if (weight === "feature") return "md:col-span-4 md:row-span-2";
  if (weight === "wide") return "md:col-span-2";
  // regular tiles: every 3rd one slightly wider for variety
  return idx % 5 === 0 ? "md:col-span-3" : "md:col-span-2";
}

function SelectedWork({ projects }) {
  // Featured projects lead so the hero tile is whatever the admin promotes.
  const ordered = [...projects].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  );
  const tiles = buildSelectedTiles(ordered);
  // TODO: replace with the first paid pilot case study once shipped.
  tiles.push({
    kind: "pilot-cta",
    key: "pilot-openings",
    accent: PALETTE.teal,
    weight: "wide",
  });
  if (tiles.length === 0) return null;

  return (
    <section
      id="selected"
      className="relative px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20"
      style={{ background: PALETTE.paperDeep }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ ...MONO, color: PALETTE.teal }}
              className="text-[11px] uppercase tracking-[0.28em]"
            >
              · Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              style={SERIF}
              className="mt-3 text-[36px] leading-[1.02] tracking-[-0.02em] text-[#2A2D28] sm:text-[48px] md:text-[64px]"
            >
              Real systems.{" "}
              <span className="italic" style={{ color: PALETTE.teal }}>
                Real outcomes.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="max-w-sm text-[14px] leading-[1.55] text-[#1a1a18]/65"
          >
            A working sample of the tools I&rsquo;ve shipped — screens from production, with the
            numbers that matter.
          </motion.p>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:auto-rows-[200px] md:grid-cols-6">
          {tiles.map((t, i) => (
            <SelectedTile key={t.key} tile={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedTile({ tile, index }) {
  const span = tileSpanClasses(tile.weight, index);
  const baseMotion = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, ease: EASE, delay: Math.min(index * 0.04, 0.4) },
  };

  if (tile.kind === "image") {
    return (
      <motion.div {...baseMotion} className={`group relative overflow-hidden rounded-2xl ${span}`}>
        <Link to={`/project/${tile.slug}`} className="block h-full w-full">
          <div className="absolute inset-0 bg-[#1a1a18]/5" />
          <img
            src={tile.src}
            alt={tile.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a18]/70 via-[#1a1a18]/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            {tile.kicker && (
              <p
                style={MONO}
                className="text-[10px] uppercase tracking-[0.24em] text-white/70"
              >
                {tile.kicker}
              </p>
            )}
            <h3
              style={SERIF}
              className="mt-1 text-[20px] leading-tight text-white md:text-[26px]"
            >
              {tile.title}
            </h3>
            <span
              style={MONO}
              className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/80 transition-all duration-500 group-hover:gap-3"
              aria-hidden
            >
              View case <span>&rarr;</span>
            </span>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (tile.kind === "metric") {
    return (
      <motion.div
        {...baseMotion}
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/70 p-6 backdrop-blur ${span}`}
        style={{ borderColor: `${PALETTE.ink}10` }}
      >
        <p
          style={MONO}
          className="text-[10px] uppercase tracking-[0.24em]"
          aria-hidden
        >
          <span style={{ color: tile.accent }}>·</span>{" "}
          <span className="text-[#1a1a18]/55">Outcome &middot; {tile.title}</span>
        </p>
        <div>
          <div
            style={{ ...SERIF, color: tile.accent }}
            className="text-[44px] leading-none tracking-tight md:text-[64px]"
          >
            {tile.metric}
          </div>
          <p
            style={SERIF}
            className="mt-3 max-w-[20ch] text-[15px] leading-snug text-[#2A2D28]/85 md:text-[17px]"
          >
            {tile.label}
          </p>
        </div>
        <Link
          to={`/project/${tile.slug}`}
          style={MONO}
          className="text-[10px] uppercase tracking-[0.22em] text-[#1a1a18]/55 transition-colors duration-500 hover:text-[#049B9F]"
        >
          See how &rarr;
        </Link>
      </motion.div>
    );
  }

  if (tile.kind === "pilot-cta") {
    return (
      <motion.div
        {...baseMotion}
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 ${span}`}
        style={{ background: PALETTE.tealDeep }}
      >
        <p style={MONO} className="text-[10px] uppercase tracking-[0.24em] text-[#F5F1E6]/70">
          · Pilot openings available
        </p>
        <div>
          <h3
            style={SERIF}
            className="text-[24px] leading-[1.1] tracking-tight text-[#F5F1E6] md:text-[30px]"
          >
            $1,500. 30 days.{" "}
            <span className="italic" style={{ color: "#7BE0E3" }}>
              One specific automation.
            </span>
          </h3>
          <p className="mt-2 max-w-md text-[13px] leading-[1.5] text-[#F5F1E6]/75">
            Half upfront. Limited spots while I&rsquo;m building case studies.
          </p>
        </div>
        <Link
          to="/engagement"
          style={MONO}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#F5F1E6] transition-all duration-500 hover:gap-3"
        >
          See engagement details &rarr;
        </Link>
      </motion.div>
    );
  }

  // text fallback
  return (
    <motion.div
      {...baseMotion}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/60 p-6 backdrop-blur ${span}`}
      style={{ borderColor: `${PALETTE.ink}10` }}
    >
      <p style={MONO} className="text-[10px] uppercase tracking-[0.24em]" aria-hidden>
        <span style={{ color: tile.accent }}>·</span>{" "}
        <span className="text-[#1a1a18]/55">In progress</span>
      </p>
      <div>
        <h3 style={SERIF} className="text-[24px] leading-tight text-[#2A2D28] md:text-[28px]">
          {tile.title}
        </h3>
        {tile.headline && (
          <p className="mt-2 text-[14px] leading-[1.5] text-[#1a1a18]/65">{tile.headline}</p>
        )}
      </div>
      <Link
        to={`/project/${tile.slug}`}
        style={MONO}
        className="text-[10px] uppercase tracking-[0.22em] text-[#049B9F]"
      >
        Read more &rarr;
      </Link>
    </motion.div>
  );
}

const AUTOMATIONS = [
  {
    kicker: "01",
    title: "Instrument & assay output",
    body:
      "Parsing plate reader exports, qPCR runs, mass spec output, and pushing the cleaned data into your ELN or LIMS without copy-paste.",
    accent: PALETTE.teal,
  },
  {
    kicker: "02",
    title: "Sample, reagent & inventory ops",
    body:
      "Reconciling reagent inventory, auditing sample logs, flagging chain-of-custody gaps, and generating recall reminders before reagents expire.",
    accent: PALETTE.orange,
  },
  {
    kicker: "03",
    title: "Reports, intake & follow-up",
    body:
      "Turning intake forms and ELN entries into the weekly report, the insurance claim follow-up, the PI update — drafted and ready for review.",
    accent: PALETTE.gold,
  },
];

function WhatIAutomate() {
  const m = useMotion();
  return (
    <section
      id="what-i-automate"
      className="relative px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...m.rise(0)}
          style={{ ...MONO, color: PALETTE.teal }}
          className="text-[11px] uppercase tracking-[0.28em]"
        >
          · What I automate
        </motion.p>
        <motion.h2
          {...m.rise(0.05)}
          style={SERIF}
          className="mt-3 max-w-3xl text-[36px] leading-[1.02] tracking-[-0.02em] text-[#2A2D28] sm:text-[48px] md:text-[64px]"
        >
          The hours your team{" "}
          <span className="italic" style={{ color: PALETTE.teal }}>
            already knows
          </span>{" "}
          should be running themselves.
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border md:grid-cols-3"
          style={{ borderColor: `${PALETTE.ink}15`, background: `${PALETTE.ink}12` }}
        >
          {AUTOMATIONS.map((a, i) => (
            <motion.div
              key={a.kicker}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group relative bg-[#F1EEE6] p-8 md:p-10"
            >
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 ease-out group-hover:w-full"
                style={{ background: a.accent }}
              />
              <span style={{ ...MONO, color: a.accent }} className="text-[11px] uppercase tracking-[0.25em]">
                {a.kicker}
              </span>
              <h3 style={SERIF} className="mt-3 text-[24px] leading-tight text-[#2A2D28] md:text-[28px]">
                {a.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#1a1a18]/70">
                {a.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...m.rise(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/engagement"
            style={MONO}
            className="inline-flex items-center gap-2 border-b border-[#049B9F] pb-1 text-[11px] uppercase tracking-[0.25em] text-[#049B9F] transition-colors hover:text-[#037B7E]"
          >
            How I engage with labs &rarr;
          </Link>
          <Link
            to="/about"
            style={MONO}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/55 transition-colors hover:text-[#049B9F]"
          >
            More about me &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function isLabProject(p) {
  const tags = (p.tags || []).map((t) => t.toLowerCase());
  if (tags.some((t) => ["biotech", "lab", "clinical", "research"].includes(t))) return true;
  if ((p.category || "").toLowerCase() === "analytics") return true;
  if (p.segment === "labs") return true;
  return false;
}

export default function Mockup() {
  const { projects, loading } = useProjects();
  const labProjects = projects.filter(isLabProject);

  return (
    <div className="text-[#1a1a18]">
      {/* Nav rendered OUTSIDE the motion wrapper so no ancestor transform/will-change breaks `position: fixed` */}
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        <Hero />

        <WhatIAutomate />

        {!loading && labProjects.length > 0 && <AllWorkRow projects={labProjects} />}

        {!loading && labProjects.length > 0 && <SelectedWork projects={labProjects} />}

        <FooterBlock />
      </div>
    </div>
  );
}
