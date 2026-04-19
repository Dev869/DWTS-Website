import { useState, useEffect } from "react";

const ROTATING_WORDS = [
  { text: "TIME", color: "#049B9F" },
  { text: "MONEY", color: "#C05A30" },
  { text: "STRESS", color: "#D4A843" },
  { text: "EFFORT", color: "#7A8B4A" },
  { text: "HASSLE", color: "#06B5B9" },
];

const STAGGER_MS = 120;
const FLIP_DURATION = 400;
const MAX_LEN = Math.max(...ROTATING_WORDS.map((w) => w.text.length)) + 1; // +1 for period

function padWord(text) {
  const full = text + ".";
  return full.padEnd(MAX_LEN, " ");
}

function FlapChar({ oldChar, newChar, oldColor, newColor, phase, delay }) {
  const [localPhase, setLocalPhase] = useState("visible");

  useEffect(() => {
    if (phase === "visible") {
      setLocalPhase("visible");
      return;
    }
    const t1 = setTimeout(() => setLocalPhase("flip-out"), delay);
    const t2 = setTimeout(() => setLocalPhase("swap"), delay + FLIP_DURATION);
    const t3 = setTimeout(() => setLocalPhase("flip-in"), delay + FLIP_DURATION + 30);
    const t4 = setTimeout(() => setLocalPhase("done"), delay + FLIP_DURATION * 2 + 30);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [phase, delay]);

  // Which character and color to show right now
  const swapped = localPhase === "swap" || localPhase === "flip-in" || localPhase === "done";
  const displayChar = swapped ? newChar : oldChar;
  const displayColor = swapped ? newColor : oldColor;

  const transform =
    localPhase === "flip-out"
      ? "rotateX(90deg)"
      : localPhase === "swap"
        ? "rotateX(90deg)"
        : localPhase === "flip-in"
          ? "rotateX(-90deg)"
          : "rotateX(0deg)";

  const opacity = (localPhase === "visible" || localPhase === "done") ? 1 : 0;

  return (
    <span
      className="relative mx-[1px] inline-flex items-center justify-center overflow-hidden rounded-sm font-[Bungee] text-3xl md:text-5xl"
      style={{
        background: "#1a1a1a",
        width: "1.1em",
        height: "1.3em",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.3)",
        lineHeight: 1.2,
        perspective: "400px",
      }}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-[1px]"
        style={{ background: "rgba(0,0,0,0.5)" }}
      />
      <span
        className="inline-block"
        style={{
          color: displayColor,
          transition: `transform ${FLIP_DURATION}ms ease-in-out, opacity ${FLIP_DURATION}ms ease-in-out`,
          transform,
          opacity,
          transformOrigin: localPhase === "flip-out" ? "bottom" : "top",
        }}
      >
        {displayChar}
      </span>
    </span>
  );
}

function FlippingWord() {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    const totalFlipTime = MAX_LEN * STAGGER_MS + FLIP_DURATION * 2 + 30;
    const interval = setInterval(() => {
      const next = (index + 1) % ROTATING_WORDS.length;
      setNextIndex(next);
      setPhase("flipping");

      setTimeout(() => {
        setIndex(next);
        setNextIndex(null);
        setPhase("visible");
      }, totalFlipTime + 50);
    }, 3500);
    return () => clearInterval(interval);
  }, [index]);

  const oldText = padWord(ROTATING_WORDS[index].text);
  const newText = nextIndex !== null ? padWord(ROTATING_WORDS[nextIndex].text) : oldText;
  const oldColor = ROTATING_WORDS[index].color;
  const newColor = nextIndex !== null ? ROTATING_WORDS[nextIndex].color : oldColor;

  return (
    <span className="inline-flex">
      {oldText.split("").map((_, i) => (
        <FlapChar
          key={i}
          oldChar={oldText[i]}
          newChar={newText[i]}
          oldColor={oldColor}
          newColor={newColor}
          phase={phase}
          delay={i * STAGGER_MS}
        />
      ))}
    </span>
  );
}

export default function Brand() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-4 md:px-12 lg:px-20">
      {/* Corner bracket — top right */}
      <div className="absolute top-4 right-6 h-16 w-16 border-t-2 border-r-2 border-[#049B9F]/25 lg:right-20" />
      {/* Corner bracket — bottom left */}
      <div className="absolute bottom-4 left-6 h-16 w-16 border-b-2 border-l-2 border-[#049B9F]/25 lg:left-20" />

      {/* Teal circle — decorative */}
      <div className="absolute top-12 right-[15%] hidden lg:block">
        <div className="h-20 w-20 rounded-full border-2 border-dashed border-[#049B9F]/20" />
        <div className="absolute inset-3 rounded-full border border-[#049B9F]/10" />
      </div>

      {/* Scattered dots */}
      <div className="absolute top-24 left-[8%] hidden h-2 w-2 rounded-full bg-[#049B9F]/20 lg:block" />
      <div className="absolute top-40 left-[12%] hidden h-1.5 w-1.5 rounded-full bg-[#06B5B9]/25 lg:block" />
      <div className="absolute top-16 left-[18%] hidden h-1 w-1 rounded-full bg-[#037B7E]/30 lg:block" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          {/* Retro stripes */}
          <div className="flex gap-1.5">
            {["#049B9F", "#037B7E", "#C05A30", "#D4A843", "#7A8B4A"].map((c, i) => (
              <span
                key={c}
                className="animate-fade-up block w-4 md:w-5"
                style={{
                  height: `${140 - i * 16}px`,
                  background: c,
                  animationDelay: `${0.1 * i}s`,
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>

          <div className="animate-fade-up flex-1" style={{ animationDelay: "0.3s" }}>
            <h1 className="font-[Bungee] text-3xl leading-tight text-[#2C2C2C] md:text-5xl">
              SOFTWARE THAT FITS.<br />
              GUARANTEED TO SAVE YOU
            </h1>
            <div className="mt-3">
              <FlippingWord />
            </div>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#2C2C2C]">
              From automating tedious workflows to building the tools your team actually needs — we ship clean, reliable software tailored to your problem. <strong>No bloat. No compromises.</strong>
              <a href="#contact" className="ml-1 font-medium text-[#049B9F] underline decoration-[#049B9F]/30 underline-offset-2 transition-colors hover:text-[#037B7E]">
                Let's talk &raquo;
              </a>
            </p>

            {/* Inline teal tag row */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "Node.js", "AI/ML", "Cloud", "Firebase", "Python"].map((t) => (
                <span key={t} className="border border-[#049B9F]/25 bg-[#049B9F]/5 px-3 py-1 text-[13px] font-medium uppercase tracking-[0.1em] text-[#049B9F]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal ruled line with diamond */}
        <div className="mt-14 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#049B9F]/15" />
          <span className="h-2 w-2 rotate-45 border border-[#049B9F]/30 bg-[#049B9F]/10" />
          <span className="h-px flex-1 bg-[#049B9F]/15" />
        </div>
      </div>
    </section>
  );
}
