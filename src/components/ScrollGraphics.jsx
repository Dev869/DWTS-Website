import { useEffect, useRef, useState } from "react";

function useOnScreen(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── Confetti burst: tiny colored squares scatter outward ── */
export function ConfettiBurst({ className = "" }) {
  const [ref, visible] = useOnScreen(0.4);
  const pieces = Array.from({ length: 18 }, (_, i) => {
    const colors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A", "#037B7E", "#06B5B9"];
    const angle = (i / 18) * 360;
    const dist = 30 + (i % 4) * 20;
    const size = 4 + (i % 3) * 3;
    const rot = (i * 37) % 360;
    return { color: colors[i % colors.length], angle, dist, size, rot, delay: i * 40 };
  });

  return (
    <div ref={ref} className={`pointer-events-none relative h-24 w-24 ${className}`}>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.size > 6 ? "50%" : "1px",
            transform: visible
              ? `translate(-50%,-50%) rotate(${p.rot}deg) translate(${p.dist}px) scale(1)`
              : `translate(-50%,-50%) rotate(0deg) translate(0px) scale(0)`,
            opacity: visible ? 0.7 : 0,
            transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${p.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Orbit rings: concentric circles that scale in ── */
export function OrbitRings({ className = "" }) {
  const [ref, visible] = useOnScreen(0.3);
  const rings = [
    { size: 80, color: "#049B9F", delay: 0, dashed: false },
    { size: 120, color: "#037B7E", delay: 150, dashed: true },
    { size: 160, color: "#06B5B9", delay: 300, dashed: false },
  ];

  return (
    <div ref={ref} className={`pointer-events-none relative h-44 w-44 ${className}`}>
      {rings.map((r, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: r.size,
            height: r.size,
            border: `1.5px ${r.dashed ? "dashed" : "solid"} ${r.color}`,
            opacity: visible ? 0.25 : 0,
            transform: visible
              ? "translate(-50%,-50%) scale(1) rotate(0deg)"
              : "translate(-50%,-50%) scale(0.3) rotate(-90deg)",
            transition: `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${r.delay}ms`,
          }}
        />
      ))}
      {/* Center dot */}
      <span
        className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-[#049B9F]"
        style={{
          opacity: visible ? 0.5 : 0,
          transform: visible ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0)",
          transition: "all 0.5s ease 400ms",
        }}
      />
    </div>
  );
}

/* ── Sliding bars: horizontal bars that slide in from the left ── */
export function SlidingBars({ className = "", direction = "left" }) {
  const [ref, visible] = useOnScreen(0.3);
  const bars = [
    { width: "80%", color: "#049B9F", opacity: 0.15, delay: 0 },
    { width: "60%", color: "#C05A30", opacity: 0.12, delay: 100 },
    { width: "90%", color: "#D4A843", opacity: 0.1, delay: 200 },
    { width: "45%", color: "#7A8B4A", opacity: 0.12, delay: 300 },
    { width: "70%", color: "#037B7E", opacity: 0.15, delay: 400 },
  ];

  const fromLeft = direction === "left";

  return (
    <div ref={ref} className={`pointer-events-none flex w-40 flex-col gap-2 ${className}`}>
      {bars.map((b, i) => (
        <span
          key={i}
          className="block h-2 rounded-sm"
          style={{
            width: visible ? b.width : "0%",
            background: b.color,
            opacity: visible ? b.opacity : 0,
            marginLeft: fromLeft ? 0 : "auto",
            transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${b.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Scatter dots: dots that pop in at random positions ── */
export function ScatterDots({ className = "", count = 12 }) {
  const [ref, visible] = useOnScreen(0.3);
  const dots = Array.from({ length: count }, (_, i) => {
    let s = (i + 1) * 16807 % 2147483647;
    const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const colors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A", "#037B7E"];
    return {
      x: rand() * 100,
      y: rand() * 100,
      size: 3 + rand() * 6,
      color: colors[i % colors.length],
      delay: i * 60,
    };
  });

  return (
    <div ref={ref} className={`pointer-events-none relative h-32 w-32 ${className}`}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            opacity: visible ? 0.5 : 0,
            transform: visible ? "scale(1)" : "scale(0)",
            transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${d.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Zigzag path: an SVG zigzag that draws itself ── */
export function ZigzagDraw({ className = "" }) {
  const [ref, visible] = useOnScreen(0.3);

  return (
    <div ref={ref} className={`pointer-events-none ${className}`}>
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
        <path
          d="M0 30 L15 10 L30 30 L45 10 L60 30 L75 10 L90 30 L105 10 L120 30"
          stroke="#049B9F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={visible ? 0 : 200}
          opacity="0.3"
          style={{ transition: "stroke-dashoffset 1.2s ease-in-out" }}
        />
      </svg>
    </div>
  );
}

/* ── Spinning diamond grid: small diamonds that rotate in ── */
export function DiamondGrid({ className = "" }) {
  const [ref, visible] = useOnScreen(0.3);
  const colors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A", "#037B7E", "#06B5B9", "#049B9F", "#C05A30", "#D4A843"];

  return (
    <div ref={ref} className={`pointer-events-none grid grid-cols-3 gap-3 ${className}`}>
      {colors.map((c, i) => (
        <span
          key={i}
          className="block h-4 w-4"
          style={{
            background: c,
            opacity: visible ? 0.3 : 0,
            transform: visible ? "rotate(45deg) scale(1)" : "rotate(0deg) scale(0)",
            transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 70}ms`,
          }}
        />
      ))}
    </div>
  );
}
