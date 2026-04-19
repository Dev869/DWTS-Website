const services = [
  {
    title: "Product Engineering",
    description:
      "End-to-end development from idea to launch. Clean, maintainable code using modern frameworks — built to work on day one and hold up on day 1,000.",
    icon: "{ }",
  },
  {
    title: "AI Integration",
    description:
      "Smart features that actually save time — document processing, chat agents, automated workflows. AI where it makes sense, not where it's trendy.",
    icon: "◈",
  },
  {
    title: "Systems Architecture",
    description:
      "The right foundation for your product. Whether it's a simple API or a full cloud deployment, we design systems that don't fall over when you grow.",
    icon: "△",
  },
  {
    title: "Data & Reporting",
    description:
      "Turn your data into something useful. Dashboards, automated reports, and pipelines that give you answers instead of more spreadsheets.",
    icon: "◎",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-[#FFFFFF] px-6 py-20 md:px-12 lg:px-20">
      {/* Top zigzag border */}
      <div className="absolute top-0 left-0 right-0 h-3 overflow-hidden">
        <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="h-3 w-full">
          <path d="M0 12 L20 0 L40 12 L60 0 L80 12 L100 0 L120 12 L140 0 L160 12 L180 0 L200 12 L220 0 L240 12 L260 0 L280 12 L300 0 L320 12 L340 0 L360 12 L380 0 L400 12 L420 0 L440 12 L460 0 L480 12 L500 0 L520 12 L540 0 L560 12 L580 0 L600 12 L620 0 L640 12 L660 0 L680 12 L700 0 L720 12 L740 0 L760 12 L780 0 L800 12 L820 0 L840 12 L860 0 L880 12 L900 0 L920 12 L940 0 L960 12 L980 0 L1000 12 L1020 0 L1040 12 L1060 0 L1080 12 L1100 0 L1120 12 L1140 0 L1160 12 L1180 0 L1200 12" fill="none" stroke="#049B9F" strokeWidth="1.5" opacity="0.2" />
        </svg>
      </div>

      {/* Decorative circle — right side */}
      <div className="absolute top-1/2 -right-8 hidden -translate-y-1/2 lg:block">
        <div className="h-40 w-40 rounded-full border border-[#049B9F]/10" />
        <div className="absolute inset-6 rounded-full border border-dashed border-[#049B9F]/8" />
        <div className="absolute inset-12 rounded-full bg-[#049B9F]/3" />
      </div>

<div className="relative z-10 mx-auto max-w-5xl">
        {/* Header with line */}
        <div className="animate-fade-up mb-12 flex items-end gap-6">
          <h2 className="font-[Bungee] text-4xl text-[#2C2C2C] md:text-5xl">
            SERVICES.
          </h2>
          <div className="mb-2 flex gap-1">
            <span className="h-1.5 w-12 bg-[#C05A30]" />
            <span className="h-1.5 w-6 bg-[#049B9F]" />
            <span className="h-1.5 w-3 bg-[#D4A843]" />
          </div>
        </div>

        {/* 2x2 grid with retro cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="animate-fade-up press-feedback relative border border-[#049B9F]/15 bg-[#F5F6F8] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#049B9F]/30 hover:shadow-lg"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              {/* Icon stamp */}
              <span className="absolute -top-3 left-5 bg-[#FFFFFF] px-2 font-[Bungee] text-lg text-[#049B9F]">
                {s.icon}
              </span>

              <h3 className="mb-3 border-b-2 border-[#049B9F]/20 pb-2 text-lg font-semibold text-[#2C2C2C]">
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#2C2C2C]">
                {s.description}
              </p>

              {/* Bottom corner tick */}
              <span className="absolute bottom-2 right-3 text-[9px] text-[#049B9F]/60">✓</span>
            </div>
          ))}
        </div>

        {/* Decorative stripes — right aligned */}
        <div className="mt-16 flex justify-end gap-1.5">
          {["#049B9F", "#037B7E", "#C05A30", "#D4A843", "#7A8B4A"].map((c, i) => (
            <span
              key={i}
              className="block h-16 w-4 md:w-5"
              style={{ background: c, opacity: 1 - i * 0.12, borderRadius: "1px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
