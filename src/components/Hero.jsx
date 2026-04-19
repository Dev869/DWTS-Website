import BlurText from "./ui/BlurText";

export default function Hero() {
  return (
    <section className="noise-bg scanlines relative min-h-screen overflow-hidden bg-[#4A9A9C] px-6 pt-28 pb-20 md:px-12 md:pt-36 lg:px-20">
      {/* Distressed corner marks */}
      <div className="absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 border-[#1a1a18]/20" />
      <div className="absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-[#1a1a18]/20" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-[#1a1a18]/20" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-[#1a1a18]/20" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-[70vh] flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          {/* Divider */}
          <div
            className="animate-fade-up mx-auto mb-8 h-px w-24 bg-[#1a1a18]/20"
            style={{ animationDelay: "0.45s" }}
          />

          {/* Tagline — blur reveal */}
          <BlurText
            text="We design and build software that fits — not software that compromises. Every system crafted to the exact shape of your problem."
            delay={30}
            animateBy="words"
            direction="bottom"
            className="mx-auto max-w-md text-[13px] leading-relaxed tracking-wide text-[#1a1a18]/60 md:text-sm justify-center"
          />

          {/* Services — staggered blur reveal */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Product Engineering", "AI Integration", "Systems Architecture", "Data Platforms"].map((s, i) => (
              <span
                key={s}
                className="border border-[#1a1a18]/15 bg-[#1a1a18]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-[#1a1a18]/50 transition-colors duration-200 hover:border-[#1a1a18]/30 hover:bg-[#1a1a18]/10 hover:text-[#1a1a18]/70"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Scroll */}
          <div className="mt-20">
            <a
              href="#projects"
              className="group inline-block text-[10px] uppercase tracking-[0.25em] text-[#1a1a18]/40 transition-colors hover:text-[#1a1a18]/70"
            >
              Scroll Down
              <span className="mt-2 block text-lg">&#8595;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom stamp */}
      <div className="absolute bottom-6 left-6 z-10 text-[9px] uppercase tracking-[0.2em] text-[#1a1a18]/25">
        Est. 2024 &mdash; Bespoke Software
      </div>
      <div className="absolute bottom-6 right-6 z-10 text-[9px] uppercase tracking-[0.2em] text-[#1a1a18]/25">
        v1.0
      </div>
    </section>
  );
}
