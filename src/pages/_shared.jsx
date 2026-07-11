import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { usePageCopy } from "../hooks/useSiteCopy";

// Cal.com embed loader. Uses their official popup snippet; no npm package needed.
// Configure CAL_LINK to your actual handle (e.g. "devinwilson/intro-call").
export const CAL_LINK = "devin-wilson";
export const CAL_NAMESPACE = "intro-call";

let calInitialized = false;
function loadCal() {
  if (typeof window === "undefined" || calInitialized) return;
  calInitialized = true;
  // eslint-disable-next-line
  (function (C, A, L) {
    let p = function (a, ar) {
      a.q.push(ar);
    };
    let d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ar);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  window.Cal("init", CAL_NAMESPACE, { origin: "https://cal.com" });
  window.Cal.ns[CAL_NAMESPACE]("ui", {
    cssVarsPerTheme: { light: { "cal-brand": "#049B9F" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}

export function useCalCom() {
  useEffect(() => {
    loadCal();
  }, []);
}

export function BookCallButton({ className = "", variant = "solid", label = "Book a call" }) {
  useCalCom();
  const base =
    "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.22em] transition-all duration-500";
  const styles =
    variant === "solid"
      ? "bg-[#049B9F] text-[#F8F6F0] shadow-[0_10px_30px_-12px_rgba(4,155,159,0.5)] hover:bg-[#037B7E] hover:-translate-y-0.5"
      : "border border-[#1a1a18]/20 bg-white/60 text-[#1a1a18]/80 backdrop-blur hover:border-[#049B9F]/50 hover:text-[#049B9F]";
  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config='{"layout":"month_view"}'
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
      className={`${base} ${styles} ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6h12M6 1v3M10 1v3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span>{label}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="transition-transform duration-500 group-hover:translate-x-0.5"
      >
        <path d="M0 8h14M14 8l-5-5M14 8l-5 5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}

export const PALETTE = {
  teal: "#049B9F",
  tealDark: "#037B7E",
  tealLight: "#06B5B9",
  tealDeep: "#025D5F",
  orange: "#C05A30",
  gold: "#D4A843",
  olive: "#7A8B4A",
  ink: "#1a1a18",
  paper: "#F1EEE6",
  paperWarm: "#ECE9E2",
  paperDeep: "#E4E0D5",
};

export const STRIPE_COLORS = [
  PALETTE.teal,
  PALETTE.tealDark,
  PALETTE.orange,
  PALETTE.gold,
  PALETTE.olive,
];

export const SERIF = { fontFamily: "'Newsreader', 'Times New Roman', serif" };
export const MONO = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

export const EASE = [0.22, 1, 0.36, 1];

export const NAV_LINKS = [
  { label: "Contact", to: "/contact" },
  { label: "GitHub", to: "https://github.com/Dev869", external: true },
];

export function useScrollHideNav() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    if (y < 40) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
    lastY.current = y;
  });
  return hidden;
}

function MobileMenu({ open, onClose }) {
  const location = useLocation();
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const items = [
    { label: "Home", to: "/", hint: null },
    { label: "Contact", to: "/contact", hint: "Book a call or email" },
    { label: "GitHub", to: "https://github.com/Dev869", hint: "Code and repos", external: true },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#1a1a18]/35 backdrop-blur-sm md:hidden"
          />
          <motion.div
            key="mm-sheet"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed left-3 right-3 top-20 z-50 overflow-hidden rounded-2xl border border-[#1a1a18]/10 bg-[#F1EEE6]/97 p-2 shadow-[0_18px_50px_-20px_rgba(26,26,24,0.4)] backdrop-blur-xl md:hidden"
          >
            {items.map((item, i) => {
              const isActive = location.pathname === item.to;
              const Comp = item.external ? "a" : Link;
              const compProps = item.external
                ? { href: item.to, target: "_blank", rel: "noreferrer" }
                : { to: item.to };
              return (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.04 + i * 0.03 }}
                >
                  <Comp
                    {...compProps}
                    onClick={onClose}
                    className="group relative flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/80 active:bg-white"
                  >
                    <div className="flex flex-col">
                      <span
                        style={MONO}
                        className={`text-[12px] uppercase tracking-[0.22em] ${
                          isActive ? "text-[#049B9F]" : "text-[#1a1a18]/85"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.hint && (
                        <span className="mt-0.5 text-[11px] leading-tight text-[#1a1a18]/50">
                          {item.hint}
                        </span>
                      )}
                    </div>
                    <span aria-hidden className="text-[14px] text-[#049B9F]">&rarr;</span>
                  </Comp>
                </motion.div>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function PillNav() {
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const leaveTimer = useRef(null);
  const hidden = useScrollHideNav();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const currentKey = location.pathname === "/contact" ? "Contact" : null;

  // When hovering: show hovered pill. When not hovering: show current page's pill (if any).
  // The leave handler is delayed so the pill doesn't instantly vanish; attack/release feels natural.
  const activeKey = hovered ?? currentKey;

  const handleEnter = useCallback((key) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(key);
  }, []);
  const handleLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), 180);
  }, []);
  useEffect(() => () => leaveTimer.current && clearTimeout(leaveTimer.current), []);

  const pillTransition = {
    type: "spring",
    stiffness: 220,
    damping: 30,
    mass: 1.1,
  };

  return (
    <>
    <motion.div
      initial={false}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 30, mass: 0.9 }}
      className="fixed top-4 left-0 right-0 z-50 px-3 sm:px-4 md:top-6"
    >
      <nav
        onMouseLeave={handleLeave}
        className="mx-auto flex items-center rounded-full border border-[#1a1a18]/8 bg-[#ECE9E2]/85 px-2 py-2 shadow-[0_8px_30px_-15px_rgba(26,26,24,0.25)] backdrop-blur-md md:w-fit"
      >
        <Link
          to="/"
          aria-label="Home"
          onMouseEnter={() => handleEnter("home")}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center"
        >
          <AnimatePresence>
            {activeKey === "home" && (
              <motion.span
                layoutId="nav-pill"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.35, ease: EASE } }}
                transition={pillTransition}
                className="absolute inset-0 rounded-full bg-white/90 shadow-[0_4px_14px_-6px_rgba(26,26,24,0.28)]"
              />
            )}
          </AnimatePresence>
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            animate={{
              color: activeKey === "home" ? PALETTE.teal : `${PALETTE.ink}B5`,
              scale: activeKey === "home" ? 1.06 : 1,
            }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative h-5 w-5"
          >
            <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5Z" />
          </motion.svg>
        </Link>

        <div className="hidden items-center md:flex">
          {NAV_LINKS.map((l) => {
            const active = activeKey === l.label;
            const common = {
              onMouseEnter: () => handleEnter(l.label),
              style: MONO,
              className: `relative px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] md:text-[12px]`,
            };
            const content = (
              <>
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.35, ease: EASE } }}
                      transition={pillTransition}
                      className="absolute inset-0 rounded-full bg-white/90 shadow-[0_4px_14px_-6px_rgba(26,26,24,0.28)]"
                    />
                  )}
                </AnimatePresence>
                <motion.span
                  animate={{
                    color: active ? PALETTE.ink : `${PALETTE.ink}AA`,
                    y: active ? -0.5 : 0,
                    letterSpacing: active ? "0.24em" : "0.22em",
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="relative inline-flex items-center gap-1.5"
                >
                  {l.label}
                </motion.span>
              </>
            );
            if (l.external) {
              return (
                <a key={l.label} href={l.to} target="_blank" rel="noreferrer" {...common}>
                  {content}
                </a>
              );
            }
            return (
              <Link key={l.label} to={l.to} {...common}>
                {content}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1a1a18]/80 transition-colors hover:bg-white/60 md:hidden"
        >
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            className="h-5 w-5"
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </motion.svg>
        </button>
      </nav>
    </motion.div>
    <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

export function StripeBar({ className = "" }) {
  return (
    <div className={`flex h-1 overflow-hidden ${className}`}>
      {STRIPE_COLORS.map((c, i) => (
        <motion.span
          key={c}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.08 }}
          className="origin-left flex-1"
          style={{ background: c }}
        />
      ))}
    </div>
  );
}

export function FooterBlock() {
  const reduced = useReducedMotion();
  const { c } = usePageCopy("footer");
  const rise = (delay = 0) =>
    reduced
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.65, ease: EASE, delay },
        };

  return (
    <footer
      className="relative border-t px-5 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20"
      style={{ borderColor: `${PALETTE.ink}15` }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <motion.p
            {...rise(0)}
            style={SERIF}
            className="text-[34px] leading-[1.05] tracking-tight text-[#2A2D28] sm:text-[44px] md:text-[72px]"
          >
            {c.headlineLead}
            <br />
            {c.headlineMid}{" "}
            <span className="italic" style={{ color: PALETTE.teal }}>
              {c.headlineAccent}
            </span>
          </motion.p>
          <motion.div {...rise(0.15)} className="mt-6 flex flex-wrap items-center gap-4">
            <BookCallButton label={c.ctaLabel} />
            <a
              href={`mailto:${c.contactEmail}`}
              style={MONO}
              className="group inline-flex items-center gap-2 border-b pb-1 text-[11px] uppercase tracking-[0.25em]"
            >
              <span style={{ color: PALETTE.teal, borderColor: PALETTE.teal }}>
                {c.contactLinkLabel}
              </span>
              <span
                aria-hidden
                style={{ color: PALETTE.teal }}
                className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <StripeBar className="w-40" />
          <div
            style={MONO}
            className="flex flex-col items-start gap-1 text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/55 md:items-end"
          >
            <span>{c.line1}</span>
            <span>{c.line2}</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
