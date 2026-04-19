import { motion } from "framer-motion";

const iconMap = {
  microscope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <circle cx="12" cy="5" r="3" /><path d="M12 8v8" /><path d="M8 21h8" /><path d="M12 16a4 4 0 004-4" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M3 20h18" /><path d="M5 20V10" /><path d="M9 20V4" /><path d="M13 20v-8" /><path d="M17 20V8" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" />
    </svg>
  ),
  export: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 15V3" /><path d="M8 7l4-4 4 4" /><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M2 12c2-3 4-6 6-3s4 6 6 3 4-6 6-3" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><rect x="4" y="17" width="16" height="4" rx="1" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h8" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" /><path d="M6 10v2a6 6 0 0012 0v-2" /><path d="M12 18v4" /><path d="M8 22h8" />
    </svg>
  ),
  realtime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M8 10h8" /><path d="M8 14h4" /><path d="M14 18h2" />
    </svg>
  ),
  parse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M4 4h6v6H4z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6H4z" /><path d="M17 14v3h3" /><path d="M14 20h3v-3" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <path d="M21.21 15.89A10 10 0 118 2.83" /><path d="M22 12A10 10 0 0012 2v10z" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><path d="M2 13h20" />
    </svg>
  ),
};

const accentColors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A"];

export default function FeatureGrid({ features = [] }) {
  if (features.length === 0) return null;

  return (
    <div className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <motion.h3
          className="font-[Bungee] mb-10 text-sm tracking-[0.15em] text-[#2C2C2C]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature, i) => {
            const accent = accentColors[i % accentColors.length];
            return (
              <motion.div
                key={feature.title}
                className="group relative border border-dashed border-[#2C2C2C]/10 bg-[#FFFFFF] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#2C2C2C]/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Accent top bar */}
                <div className="mb-4 flex gap-1">
                  <span className="h-1 w-8" style={{ background: accent }} />
                  <span className="h-1 w-4" style={{ background: accent, opacity: 0.4 }} />
                  <span className="h-1 w-2" style={{ background: accent, opacity: 0.2 }} />
                </div>

                {/* Icon */}
                <div
                  className="mb-4 inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ color: accent }}
                >
                  {iconMap[feature.icon] || iconMap.code}
                </div>

                {/* Content */}
                <h4 className="font-[Bungee] text-sm text-[#2C2C2C]">{feature.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#2C2C2C]/60">{feature.desc}</p>

                {/* Corner index */}
                <span
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
