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
    <section id="top" className="relative px-6 pt-28 pb-20 md:px-12 md:pt-32 md:pb-28 lg:px-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          {/* LEFT: name + tagline + role + CTAs */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{ ...MONO, color: PALETTE.teal }}
              className="mb-5 text-[11px] uppercase tracking-[0.28em]"
            >
              · Systems Architect &nbsp;|&nbsp; Bespoke software for research
              labs &amp; business operations
            </motion.p>

            <motion.h1
              style={SERIF}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="text-[64px] leading-[0.92] tracking-[-0.02em] text-[#2A2D28] md:text-[96px] lg:text-[128px]"
            >
              Devin
              <br />
              <span className="relative inline-block">
                Wilson
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
                  className="absolute -bottom-1 left-0 block h-[3px] w-[48%] origin-left md:-bottom-2 md:h-[4px]"
                  style={{ background: PALETTE.teal }}
                />
              </span>
            </motion.h1>

            <motion.p
              {...m.rise(0.35)}
              style={SERIF}
              className="mt-8 max-w-xl text-[20px] leading-[1.45] text-[#2A2D28]/85 md:text-[24px]"
            >
              I embed with operations teams and build the specific internal
              tools they need — the{" "}
              <span className="italic" style={{ color: PALETTE.teal }}>
                ones nobody&rsquo;s selling off the shelf.
              </span>
            </motion.p>

            <motion.div {...m.rise(0.5)} className="mt-10 flex flex-wrap items-center gap-4">
              <BookCallButton label="Book a call" />
              <a
                href="#work"
                style={MONO}
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#1a1a18]/70 transition-colors duration-500 hover:text-[#049B9F]"
              >
                See the work
                <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </motion.div>

            <motion.div {...m.rise(0.6)} className="mt-10 max-w-xs">
              <StripeBar />
            </motion.div>
          </div>

          {/* RIGHT: prominent portrait — sits up top so it's visible above the fold */}
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
                className="block h-[340px] w-[280px] object-cover md:h-[440px] md:w-[360px]"
              />
            </div>
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border bg-white px-4 py-1.5 shadow-sm"
              style={{ borderColor: `${PALETTE.ink}15` }}
            >
              <span style={MONO} className="text-[10px] uppercase tracking-[0.22em] text-[#1a1a18]/65">
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

function FeaturedCase({ project, flip = false, accent = PALETTE.teal }) {
  const previewSrc = project.previewImage || project.image;
  const hasImage = Boolean(previewSrc);
  const quote = project.quote || project.headline || project.description?.slice(0, 160);
  const tags = (project.techStack || project.tags || []).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mx-auto mt-10 max-w-6xl px-6 md:px-12 lg:px-20"
    >
      <div
        className={`grid grid-cols-1 overflow-hidden rounded-3xl border shadow-[0_30px_80px_-40px_rgba(26,26,24,0.35)] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] ${
          flip ? "md:[&>*:first-child]:order-2" : ""
        }`}
        style={{ borderColor: `${PALETTE.ink}15` }}
      >
        {/* Dark side — higher contrast, larger body text, clearer hierarchy */}
        <div
          className="group relative flex flex-col justify-between overflow-hidden px-10 py-14 md:px-14 md:py-16"
          style={{ background: PALETTE.tealDeep }}
        >
          {/* Subtle radial glow behind title */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-3xl transition-opacity duration-700 group-hover:opacity-55"
            style={{ background: `${accent}60` }}
          />

          <div className="relative">
            {/* Project name — serif, tight leading, brighter paper color for contrast */}
            <h3
              style={SERIF}
              className="text-[40px] leading-[1.02] tracking-tight text-[#F5F1E6] md:text-[56px]"
            >
              {project.title.split(" ")[0]}
            </h3>

            {/* Divider line for visual separation */}
            <div
              className="mt-8 h-px w-12"
              style={{ background: `${PALETTE.paper}40` }}
            />

            {/* Kicker — lighter paper tone, not the accent teal (which disappeared against the tealDeep bg) */}
            <p
              style={MONO}
              className="mt-6 text-[11px] uppercase tracking-[0.28em]"
            >
              <span style={{ color: `${PALETTE.paper}85` }}>From the case study</span>
            </p>

            {/* Quote — larger, brighter, more line-height for readability */}
            <blockquote
              style={SERIF}
              className="mt-5 max-w-md text-[19px] leading-[1.55] text-[#F5F1E6] md:text-[22px]"
            >
              <span aria-hidden className="select-none" style={{ color: `${accent}`, fontSize: "1.1em", marginRight: "0.08em" }}>
                &ldquo;
              </span>
              {quote}
              <span aria-hidden className="select-none" style={{ color: `${accent}`, fontSize: "1.1em", marginLeft: "0.04em" }}>
                &rdquo;
              </span>
            </blockquote>
          </div>

          <div className="relative mt-12">
            {/* Tags — high-contrast pills on a subtle paper tint */}
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    ...MONO,
                    color: PALETTE.paper,
                    background: "rgba(245, 241, 230, 0.08)",
                    borderColor: "rgba(245, 241, 230, 0.22)",
                  }}
                  className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Link CTA — brighter paper color + consistent arrow */}
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

        {/* Light/image side */}
        <div
          className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient || "from-[#EFEDE7] to-[#E4E0D5]"} p-10 md:p-14`}
        >
          <span className="absolute top-6 left-6 h-4 w-4 border-t-2 border-l-2" style={{ borderColor: `${accent}55` }} />
          <span className="absolute bottom-6 right-6 h-4 w-4 border-b-2 border-r-2" style={{ borderColor: `${accent}55` }} />
          {hasImage ? (
            <motion.img
              src={previewSrc}
              alt={project.title}
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              whileHover={{ scale: 1.025, y: -6, transition: { type: "spring", stiffness: 180, damping: 22 } }}
              className="max-h-[400px] w-auto rounded-md object-contain shadow-[0_25px_60px_-25px_rgba(26,26,24,0.35)] will-change-transform"
            />
          ) : (
            <div className="h-[280px] w-full rounded-md bg-white/40" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

const CARD_W = 280;
const CARD_H = 360;
const GAP = 40;
const SPRING = { type: "spring", stiffness: 200, damping: 30, mass: 1 };

function CarouselCard({ project, distance, isActive, accent }) {
  const abs = Math.abs(distance);
  const x = distance * (CARD_W + GAP);
  const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : abs === 2 ? 0.68 : 0.56;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : abs === 2 ? 0.28 : 0.1;
  const grayscale = abs === 0 ? 0 : Math.min(0.4 + abs * 0.25, 1);
  const saturate = abs === 0 ? 1 : Math.max(1 - abs * 0.45, 0.15);
  const tags = (project.tags || project.techStack || []).slice(0, 4);

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
      {/* Tinted glow — only renders when active; AnimatePresence handles exit on handoff */}
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

      {/* Card — tilts in 3D when active+hovering */}
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
          // Always pass the MotionValue — when not active we've already reset
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
        className="relative overflow-hidden rounded-[22px] border"
      >
        {(project.previewImage || project.image) ? (
          <motion.img
            src={project.previewImage || project.image}
            alt={project.title}
            draggable={false}
            animate={{ scale: isActive && hovering ? 1.06 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="h-full w-full object-cover will-change-transform"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${project.gradient || "from-[#EFEDE7] to-[#E4E0D5]"}`} />
        )}

        {/* Gradient wash — darkens bottom for arrow button contrast */}
        <motion.div
          aria-hidden
          animate={{ opacity: isActive && hovering ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 45%, ${accent}18 75%, ${accent}40 100%)`,
          }}
        />

        {/* Specular shine — static centered (tracking cursor via .get() was non-reactive
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

        {/* Arrow badge — springs in from bottom-right corner */}
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

      {/* Title + tags — height is reserved to prevent layout shift on active handoff */}
      <div className="mt-6 min-h-[110px] text-center">
        <motion.h3
          animate={{
            color: isActive ? "#1a1a18" : "#1a1a1850",
            opacity: isActive ? 1 : 0.85,
          }}
          transition={{
            color: { duration: 0.5, ease: EASE },
            opacity: { duration: 0.4, ease: EASE },
          }}
          style={{ ...SERIF, fontWeight: 600 }}
          className="text-[22px] leading-tight tracking-tight"
        >
          {project.title}
          {/* Underline that draws in on hover */}
          {isActive && (
            <motion.span
              aria-hidden
              animate={{ scaleX: hovering ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mx-auto mt-1 block h-[2px] w-10 origin-center"
              style={{ background: accent }}
            />
          )}
        </motion.h3>

        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-3 flex flex-wrap justify-center gap-1.5 px-4"
            >
              {tags.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.05 }}
                  style={{ ...MONO, borderColor: `${accent}40`, color: accent }}
                  className="rounded-full border bg-white/70 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em]"
                >
                  {t}
                </motion.span>
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

  const next = () => setActive((i) => Math.min(i + 1, total - 1));
  const prev = () => setActive((i) => Math.max(i - 1, 0));

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
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
          className="relative inline-block text-[56px] leading-none tracking-tight text-[#2A2D28] md:text-[96px]"
        >
          All work
          <sup style={MONO} className="absolute -right-10 top-2 text-[14px] font-normal tracking-[0.1em]">
            <span style={{ color: PALETTE.teal }}>{total}</span>
          </sup>
        </motion.h2>
      </div>

      {/* Carousel stage */}
      <div
        className="relative mx-auto mt-16 md:mt-20"
        style={{ height: CARD_H + 140, perspective: "1200px" }}
      >
        {/* Clickable region for arrow nav via arrows */}
        {projects.map((p, i) => (
          <CarouselCard
            key={p.id}
            project={p}
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

function About() {
  const m = useMotion();
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
        <motion.p {...m.rise(0)} style={{ ...MONO, color: PALETTE.teal }} className="text-[11px] uppercase tracking-[0.25em]">
          · About
        </motion.p>
        <div>
          <motion.p {...m.rise(0.1)} style={SERIF} className="text-[28px] leading-[1.35] text-[#2A2D28] md:text-[36px]">
            I work with teams that have a real problem and a rough idea —
            and turn it into something that actually{" "}
            <span style={{ color: PALETTE.teal }} className="italic">runs</span>.
            Research labs, restaurants, logistics companies, founders who
            hit the ceiling of what spreadsheets and generic SaaS can do.
          </motion.p>
          <motion.p {...m.rise(0.2)} className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[#1a1a18]/65">
            Most of what I do lives under{" "}
            <span className="font-medium" style={{ color: PALETTE.tealDark }}>
              DW Tailored Systems
            </span>{" "}
            — my independent practice for product engineering, AI integration,
            and systems architecture. Usually one engineer, sometimes a small
            crew, always close to the problem.
          </motion.p>

          <motion.div {...m.rise(0.25)} className="mt-6">
            <Link
              to="/about"
              style={MONO}
              className="inline-flex items-center gap-2 border-b border-[#049B9F] pb-1 text-[11px] uppercase tracking-[0.25em] text-[#049B9F] transition-colors hover:text-[#037B7E]"
            >
              More about me &rarr;
            </Link>
          </motion.div>

          <motion.div {...m.rise(0.3)} className="mt-10 flex flex-wrap gap-2">
            {[
              { label: "Product Engineering", color: PALETTE.teal },
              { label: "AI Integration", color: PALETTE.orange },
              { label: "Systems Architecture", color: PALETTE.gold },
              { label: "Data Platforms", color: PALETTE.olive },
            ].map((s) => (
              <span
                key={s.label}
                style={{ ...MONO, borderColor: `${s.color}45`, color: s.color }}
                className="rounded-full border bg-white/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5"
              >
                {s.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Mockup() {
  const { projects, loading } = useProjects();
  const featured = projects.slice(0, 2);
  const accents = [PALETTE.teal, PALETTE.orange, PALETTE.gold];

  return (
    <div className="text-[#1a1a18]">
      {/* Nav rendered OUTSIDE the motion wrapper so no ancestor transform/will-change breaks `position: fixed` */}
      <PillNav />
      <div className="min-h-screen bg-gradient-to-b from-[#F1EEE6] via-[#ECE9E2] to-[#E4E0D5]">
        <Hero />

        <section id="work" className="py-16">
          <SectionRule left="· Featured work" right="Curated projects" />
          {loading ? (
            <div className="mx-auto mt-10 h-[420px] max-w-6xl animate-pulse rounded-2xl bg-[#EFEDE7]" />
          ) : (
            featured.map((p, i) => <FeaturedCase key={p.id} project={p} flip={i % 2 === 1} accent={accents[i % accents.length]} />)
          )}
        </section>

        {!loading && projects.length > 0 && <AllWorkRow projects={projects} />}

        <About />
        <FooterBlock />
      </div>
    </div>
  );
}
