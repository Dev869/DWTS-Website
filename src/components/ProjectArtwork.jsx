import { useId, useMemo } from "react";
import { motion } from "framer-motion";
import { PALETTE, SERIF, MONO, EASE } from "../pages/_shared.jsx";
import { getSegmentForProject, getProjectTheme, getProjectArtworkPool } from "../data/segments.js";

const PAPER = "#F5F1E6";

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const bigint = parseInt(value, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* Deterministic hash + RNG so every project always gets the same artwork. */
function hashSeed(input = "") {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const range = (rng, min, max) => min + rng() * (max - min);
const intRange = (rng, min, max) => Math.floor(range(rng, min, max + 1));
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

const VARIANT = {
  card:     { w: 400, h: 300 },
  hero:     { w: 800, h: 450 },
  portrait: { w: 280, h: 360 },
};

/* ---------- Motifs ---------- */

function OrbitMotif({ w, h, rng }) {
  const corner = pick(rng, [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: 0, y: h },
    { x: w, y: h },
  ]);
  const baseR = Math.min(w, h) * range(rng, 0.28, 0.4);
  const ringCount = intRange(rng, 6, 10);
  const step = Math.min(w, h) * range(rng, 0.09, 0.14);
  const accentA = intRange(rng, 1, ringCount - 2);
  const accentB = (accentA + intRange(rng, 2, 4)) % ringCount;
  const arcStartA = range(rng, 0, Math.PI * 2);
  const arcSpanA = range(rng, Math.PI * 0.18, Math.PI * 0.55);
  const arcStartB = range(rng, 0, Math.PI * 2);
  const arcSpanB = range(rng, Math.PI * 0.12, Math.PI * 0.4);

  const arcPath = (cx, cy, r, start, span) => {
    const x1 = cx + Math.cos(start) * r;
    const y1 = cy + Math.sin(start) * r;
    const x2 = cx + Math.cos(start + span) * r;
    const y2 = cy + Math.sin(start + span) * r;
    const large = span > Math.PI ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  const out = [];
  for (let i = 0; i < ringCount; i++) {
    const r = baseR + i * step;
    if (i === accentA) {
      out.push(
        <path
          key={`a${i}`}
          d={arcPath(corner.x, corner.y, r, arcStartA, arcSpanA)}
          fill="none"
          stroke={PAPER}
          strokeOpacity={0.62}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      );
    } else if (i === accentB) {
      out.push(
        <path
          key={`b${i}`}
          d={arcPath(corner.x, corner.y, r, arcStartB, arcSpanB)}
          fill="none"
          stroke={PAPER}
          strokeOpacity={0.42}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      );
    } else {
      out.push(
        <circle
          key={`r${i}`}
          cx={corner.x}
          cy={corner.y}
          r={r}
          fill="none"
          stroke={PAPER}
          strokeOpacity={Math.max(0.04, 0.2 - i * 0.018)}
          strokeWidth={1}
        />
      );
    }
  }

  // A pair of small "satellite" dots along one of the rings
  const satelliteR = baseR + accentA * step;
  const satAngle = arcStartA + arcSpanA * 0.5;
  out.push(
    <circle
      key="sat"
      cx={corner.x + Math.cos(satAngle) * satelliteR}
      cy={corner.y + Math.sin(satAngle) * satelliteR}
      r={3.5}
      fill={PAPER}
      fillOpacity={0.85}
    />
  );

  return <g>{out}</g>;
}

function TopographyMotif({ w, h, rng }) {
  const lineCount = intRange(rng, 7, 12);
  const amp = h * range(rng, 0.06, 0.11);
  const freq = range(rng, 1.6, 3.2);
  const phase = range(rng, 0, Math.PI * 2);
  const tilt = range(rng, -0.18, 0.18); // overall slope across width
  const segments = 28;

  const lineFor = (i) => {
    const ampMul = 1 + Math.sin(i * 0.7) * 0.18;
    const cy = h * 0.12 + (i / Math.max(1, lineCount - 1)) * h * 0.76;
    let d = "";
    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const x = t * w;
      const y =
        cy +
        Math.sin(phase + t * freq * Math.PI * 2 + i * 0.45) * amp * ampMul +
        (t - 0.5) * h * tilt;
      d += s === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };

  const accentIdx = intRange(rng, 1, lineCount - 2);

  return (
    <g>
      {Array.from({ length: lineCount }, (_, i) => {
        const isAccent = i === accentIdx;
        const isMajor = !isAccent && i % 3 === 0;
        return (
          <path
            key={i}
            d={lineFor(i)}
            fill="none"
            stroke={PAPER}
            strokeOpacity={isAccent ? 0.7 : isMajor ? 0.28 : 0.14}
            strokeWidth={isAccent ? 2 : isMajor ? 1.2 : 0.85}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
}

function ConstellationMotif({ w, h, rng }) {
  const dotCount = intRange(rng, 14, 22);
  const padX = w * 0.08;
  const padY = h * 0.1;
  const dots = Array.from({ length: dotCount }, () => ({
    x: range(rng, padX, w - padX),
    y: range(rng, padY, h - padY),
    r: range(rng, 1.4, 3.6),
    bright: rng() < 0.22,
  }));
  const threshold = Math.min(w, h) * range(rng, 0.18, 0.26);
  const links = [];
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      if (Math.hypot(dx, dy) < threshold) links.push([i, j]);
    }
  }
  // Pick one bright dot to ring with a halo
  const haloIdx = dots.findIndex((d) => d.bright);

  return (
    <g>
      {links.map(([i, j], k) => (
        <line
          key={`l${k}`}
          x1={dots[i].x.toFixed(2)}
          y1={dots[i].y.toFixed(2)}
          x2={dots[j].x.toFixed(2)}
          y2={dots[j].y.toFixed(2)}
          stroke={PAPER}
          strokeOpacity={0.18}
          strokeWidth={0.8}
        />
      ))}
      {haloIdx >= 0 && (
        <circle
          cx={dots[haloIdx].x}
          cy={dots[haloIdx].y}
          r={Math.min(w, h) * 0.085}
          fill="none"
          stroke={PAPER}
          strokeOpacity={0.35}
          strokeWidth={1.2}
        />
      )}
      {dots.map((d, k) => (
        <circle
          key={`d${k}`}
          cx={d.x.toFixed(2)}
          cy={d.y.toFixed(2)}
          r={d.r.toFixed(2)}
          fill={PAPER}
          fillOpacity={d.bright ? 0.95 : 0.55}
        />
      ))}
    </g>
  );
}

function RibbonMotif({ w, h, rng }) {
  // Big sweeping bezier "ribbon" with a parallel echo, plus a few tick marks at the edge.
  const startY = range(rng, h * 0.15, h * 0.55);
  const endY = range(rng, h * 0.4, h * 0.85);
  const cp1x = w * range(rng, 0.18, 0.38);
  const cp1y = range(rng, 0, h);
  const cp2x = w * range(rng, 0.55, 0.82);
  const cp2y = range(rng, 0, h);
  const offset = range(rng, h * 0.06, h * 0.12) * (rng() < 0.5 ? -1 : 1);

  const ribbon = (dy) =>
    `M -10 ${(startY + dy).toFixed(2)} C ${cp1x} ${(cp1y + dy).toFixed(2)}, ${cp2x} ${(cp2y + dy).toFixed(2)}, ${(w + 10).toFixed(2)} ${(endY + dy).toFixed(2)}`;

  // Tick marks marching down the right edge
  const tickCount = intRange(rng, 5, 9);
  const tickStartY = h * range(rng, 0.08, 0.25);
  const tickGap = (h * range(rng, 0.45, 0.7)) / tickCount;
  const tickLen = w * range(rng, 0.05, 0.09);

  return (
    <g>
      <path
        d={ribbon(0)}
        fill="none"
        stroke={PAPER}
        strokeOpacity={0.55}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d={ribbon(offset)}
        fill="none"
        stroke={PAPER}
        strokeOpacity={0.22}
        strokeWidth={1}
        strokeLinecap="round"
      />
      <path
        d={ribbon(offset * 2)}
        fill="none"
        stroke={PAPER}
        strokeOpacity={0.1}
        strokeWidth={0.8}
        strokeLinecap="round"
      />
      {Array.from({ length: tickCount }, (_, i) => {
        const y = tickStartY + i * tickGap;
        return (
          <line
            key={i}
            x1={w - tickLen}
            y1={y}
            x2={w - 6}
            y2={y}
            stroke={PAPER}
            strokeOpacity={i === Math.floor(tickCount / 2) ? 0.7 : 0.28}
            strokeWidth={i === Math.floor(tickCount / 2) ? 1.6 : 1}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function GridMotif({ w, h, rng }) {
  // Spreadsheet/dashboard feel: tight dot grid with a few "highlighted" cells
  // and one accented row underline. Reads as structured / operational.
  const cols = intRange(rng, 9, 14);
  const rows = intRange(rng, 6, 10);
  const padX = w * 0.08;
  const padY = h * 0.12;
  const cellW = (w - 2 * padX) / Math.max(1, cols - 1);
  const cellH = (h - 2 * padY) / Math.max(1, rows - 1);
  const dotR = Math.min(cellW, cellH) * 0.18;

  const highlightCount = intRange(rng, 5, 10);
  const highlights = new Set();
  let guard = 0;
  while (highlights.size < highlightCount && guard++ < 60) {
    const r = intRange(rng, 0, rows - 1);
    const c = intRange(rng, 0, cols - 1);
    highlights.add(`${r}-${c}`);
  }

  const accentRow = intRange(rng, 1, rows - 2);
  const accentY = padY + accentRow * cellH;

  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = padX + c * cellW;
      const y = padY + r * cellH;
      const isHigh = highlights.has(`${r}-${c}`);
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={x.toFixed(2)}
          cy={y.toFixed(2)}
          r={(isHigh ? dotR * 1.7 : dotR).toFixed(2)}
          fill={PAPER}
          fillOpacity={isHigh ? 0.9 : 0.28}
        />
      );
    }
  }

  return (
    <g>
      {dots}
      <line
        x1={padX - cellW * 0.4}
        y1={accentY}
        x2={w - padX + cellW * 0.4}
        y2={accentY}
        stroke={PAPER}
        strokeOpacity={0.45}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </g>
  );
}

const MOTIF_BY_NAME = {
  orbit: OrbitMotif,
  topography: TopographyMotif,
  constellation: ConstellationMotif,
  ribbon: RibbonMotif,
  grid: GridMotif,
};

/* ---------- Title typographic treatments ---------- */
/* Each project is assigned one of these by slug hash, so adding a new project
   automatically picks a typographic identity from the same family. All draw
   from already-loaded fonts (Fraunces, Space Grotesk, IBM Plex Mono, Inter). */

const TYPE_SIZES = {
  card: {
    stack:   "text-[38px] sm:text-[48px]",
    caps:    "text-[24px] sm:text-[30px]",
    mono:    "text-[20px] sm:text-[24px]",
    outline: "text-[44px] sm:text-[56px]",
  },
  hero: {
    stack:   "text-[72px] sm:text-[100px] md:text-[132px]",
    caps:    "text-[44px] sm:text-[60px] md:text-[80px]",
    mono:    "text-[36px] sm:text-[48px] md:text-[60px]",
    outline: "text-[80px] sm:text-[112px] md:text-[148px]",
  },
  portrait: {
    stack:   "text-[34px] sm:text-[40px]",
    caps:    "text-[20px] sm:text-[24px]",
    mono:    "text-[18px] sm:text-[22px]",
    outline: "text-[38px] sm:text-[44px]",
  },
};

const FONT_GROTESK = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" };
const FONT_INTER = { fontFamily: "'Inter', system-ui, sans-serif" };

function EditorialStack({ title, sizes }) {
  const words = title.split(/\s+/).slice(0, 4);
  return (
    <div
      style={{ ...SERIF, fontWeight: 500, color: PAPER, lineHeight: 0.86, letterSpacing: "-0.035em" }}
      className={sizes.stack}
    >
      {words.map((w, i) => (
        <div key={`${w}-${i}`}>{w}</div>
      ))}
    </div>
  );
}

function CapsGrotesk({ title, sizes }) {
  return (
    <div
      style={{
        ...FONT_GROTESK,
        fontWeight: 700,
        color: PAPER,
        letterSpacing: "0.02em",
        lineHeight: 0.95,
        WebkitLineClamp: 3,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
      className={`uppercase ${sizes.caps}`}
    >
      {title}
    </div>
  );
}

function MonoLower({ title, sizes }) {
  return (
    <div
      style={{
        ...MONO,
        fontWeight: 400,
        color: PAPER,
        letterSpacing: "-0.01em",
        lineHeight: 1.05,
        WebkitLineClamp: 4,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
      className={sizes.mono}
    >
      {title.toLowerCase()}
      <span aria-hidden style={{ opacity: 0.55, marginLeft: "0.1em" }}>_</span>
    </div>
  );
}

function OutlineSerif({ title, sizes }) {
  return (
    <div
      style={{
        ...SERIF,
        fontWeight: 600,
        color: "transparent",
        WebkitTextStroke: `1.4px ${PAPER}`,
        lineHeight: 0.88,
        letterSpacing: "-0.03em",
        WebkitLineClamp: 3,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
      className={sizes.outline}
    >
      {title}
    </div>
  );
}

const TITLE_BY_NAME = {
  editorialStack: EditorialStack,
  capsGrotesk: CapsGrotesk,
  monoLower: MonoLower,
  outlineSerif: OutlineSerif,
};

/** Resolve a list of names to components, dropping anything unknown. */
function resolveNames(names, byName, fallbackKey) {
  const resolved = (names || []).map((n) => byName[n]).filter(Boolean);
  if (resolved.length) return resolved;
  return [byName[fallbackKey]];
}

const WRAP_PADDING = {
  card: "p-5 sm:p-6",
  hero: "p-7 sm:p-10 md:p-14",
  portrait: "p-5 sm:p-6",
};

/**
 * ProjectArtwork — fully-vector, deterministic project visual.
 * Selects one of several generative motifs based on a hash of the project slug,
 * so each project always renders the same artwork.
 *
 * Text (title + category kicker) auto-renders from the project object — adding
 * a new project to projects.js requires zero artwork or layout work.
 *
 * @param {{ project: object, variant?: "card" | "hero" | "portrait", showSegmentChip?: boolean, showTitle?: boolean }} props
 */
export default function ProjectArtwork({
  project,
  variant = "card",
  showSegmentChip = true,
  showTitle = true,
}) {
  const cfg = VARIANT[variant] || VARIANT.card;
  const { w, h } = cfg;
  const theme = getProjectTheme(project);
  const segment = getSegmentForProject(project);
  const pool = getProjectArtworkPool(project);

  const uid = useId().replace(/:/g, "");
  const ids = {
    bg: `pa-bg-${uid}`,
    halo: `pa-halo-${uid}`,
    noise: `pa-noise-${uid}`,
  };

  const { motif, TitleStyle } = useMemo(() => {
    const motifs = resolveNames(pool.motifs, MOTIF_BY_NAME, "orbit");
    const titles = resolveNames(pool.titleStyles, TITLE_BY_NAME, "editorialStack");
    const seed = hashSeed(project.slug || project.title || "x");
    const rng = mulberry32(seed);
    const Motif = motifs[Math.floor(rng() * motifs.length)];
    const Title = titles[Math.floor(rng() * titles.length)];
    return {
      motif: <Motif w={w} h={h} rng={rng} />,
      TitleStyle: Title,
    };
  }, [project.slug, project.title, project.segment, w, h, pool]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={ids.bg} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.from} />
            <stop offset="55%" stopColor={theme.via} />
            <stop offset="100%" stopColor={theme.to} />
          </linearGradient>

          <radialGradient id={ids.halo} cx="22%" cy="18%" r="65%">
            <stop offset="0%" stopColor={PAPER} stopOpacity="0.45" />
            <stop offset="60%" stopColor={PAPER} stopOpacity="0.06" />
            <stop offset="100%" stopColor={PAPER} stopOpacity="0" />
          </radialGradient>

          <filter id={ids.noise} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.22" />
            </feComponentTransfer>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${ids.bg})`} />
        <rect width="100%" height="100%" fill={`url(#${ids.halo})`} />

        {motif}

        <rect
          width="100%"
          height="100%"
          filter={`url(#${ids.noise})`}
          opacity="0.45"
          style={{ mixBlendMode: "overlay" }}
        />
      </svg>

      {showSegmentChip && segment && (
        <div className={variant === "hero" ? "absolute left-6 top-6 z-10 sm:left-8 sm:top-8" : "absolute left-4 top-4 z-10"}>
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            style={{
              ...MONO,
              color: PAPER,
              borderColor: rgba(PAPER, 0.32),
              background: rgba(PALETTE.ink, 0.18),
              backdropFilter: "blur(6px)",
            }}
            className={`inline-flex items-center rounded-full border px-3 py-1 uppercase tracking-[0.22em] ${
              variant === "hero" ? "text-[11px]" : "text-[10px]"
            }`}
          >
            {segment.name}
          </motion.span>
        </div>
      )}

      {showTitle && project.title && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 ${
            WRAP_PADDING[variant] || WRAP_PADDING.card
          }`}
        >
          {/* Soft ink scrim so type reads against any motif/segment color */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[160%]"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${rgba(PALETTE.ink, 0.22)} 55%, ${rgba(PALETTE.ink, 0.5)} 100%)`,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
          >
            <TitleStyle title={project.title} sizes={TYPE_SIZES[variant] || TYPE_SIZES.card} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
