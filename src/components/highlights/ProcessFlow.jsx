const defaultSteps = [
  { label: "Input", desc: "Data enters the system" },
  { label: "Process", desc: "Transformation and analysis" },
  { label: "Output", desc: "Results delivered" },
];

const accentColors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A"];

export default function ProcessFlow({ steps = defaultSteps, title = "How It Works" }) {
  return (
    <div className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <h3 className="font-[Bungee] mb-12 text-sm tracking-[0.15em] text-[#2C2C2C]">
          {title}
        </h3>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <div
              className="absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#049B9F]/40 via-[#C05A30]/40 to-[#D4A843]/40"
              style={{ transformOrigin: "left" }}
            />

            {steps.map((step, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <div
                  key={step.label}
                  className="group relative z-10 flex w-1/4 flex-col items-center text-center cursor-default"
                >
                  {/* Step circle */}
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                    style={{ background: accent }}
                  >
                    <span className="font-[Bungee] text-base text-[#F5F6F8]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Arrow connector */}
                  {i < steps.length - 1 && (
                    <div className="absolute right-[-15%] top-5 text-[#2C2C2C]/20">
                      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                        <path d="M13 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M0 7h18" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}

                  <h4 className="font-[Bungee] text-xs tracking-wider text-[#2C2C2C]">
                    {step.label}
                  </h4>
                  <p className="mt-2 px-2 text-xs leading-relaxed text-[#2C2C2C]/50">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div className="md:hidden">
          <div className="relative space-y-0">
            {steps.map((step, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <div key={step.label}>
                  <div className="flex items-start gap-5">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center"
                      style={{ background: accent }}
                    >
                      <span className="font-[Bungee] text-xs text-[#F5F6F8]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="pb-2">
                      <h4 className="font-[Bungee] text-xs tracking-wider text-[#2C2C2C]">
                        {step.label}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[#2C2C2C]/50">{step.desc}</p>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="ml-5 h-6 border-l border-dashed" style={{ borderColor: `${accent}30` }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
