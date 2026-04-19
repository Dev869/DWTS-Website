import { motion } from "framer-motion";

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
        <motion.h3
          className="font-[Bungee] mb-12 text-sm tracking-[0.15em] text-[#2C2C2C]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h3>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <motion.div
              className="absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-[#049B9F]/40 via-[#C05A30]/40 to-[#D4A843]/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />

            {steps.map((step, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <motion.div
                  key={step.label}
                  className="group relative z-10 flex w-1/4 flex-col items-center text-center cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                    <motion.div
                      className="absolute right-[-15%] top-5 text-[#2C2C2C]/20"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                        <path d="M13 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M0 7h18" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </motion.div>
                  )}

                  <h4 className="font-[Bungee] text-xs tracking-wider text-[#2C2C2C]">
                    {step.label}
                  </h4>
                  <p className="mt-2 px-2 text-xs leading-relaxed text-[#2C2C2C]/50">
                    {step.desc}
                  </p>
                </motion.div>
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
                  <motion.div
                    className="flex items-start gap-5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                  >
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
                  </motion.div>
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
