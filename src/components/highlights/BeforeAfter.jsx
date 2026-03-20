import { motion } from "framer-motion";

export default function BeforeAfter({ before, after }) {
  if (!before || !after) return null;

  return (
    <div className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <motion.h3
          className="font-[Bungee] mb-10 text-sm tracking-[0.15em] text-[#2C2C2C]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Difference
        </motion.h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Before */}
          <motion.div
            className="relative border-2 border-dashed border-[#C05A30]/20 bg-[#F5F0E3] p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Corner accent */}
            <span className="absolute -top-2 -left-2 h-4 w-4 bg-[#C05A30]" />

            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center bg-[#C05A30]/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C05A30" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </span>
              <span className="font-[Bungee] text-xs tracking-[0.15em] text-[#C05A30]">Before</span>
            </div>

            <ul className="space-y-3">
              {before.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#2C2C2C]/60"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C05A30]/30" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            className="relative border-2 border-[#049B9F]/30 bg-[#2C2C2C] p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Corner accent */}
            <span className="absolute -top-2 -right-2 h-4 w-4 bg-[#049B9F]" />

            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center bg-[#049B9F]/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="#06B5B9" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <span className="font-[Bungee] text-xs tracking-[0.15em] text-[#06B5B9]">After</span>
            </div>

            <ul className="space-y-3">
              {after.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#EDE6D6]/70"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#049B9F]" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Arrow between */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-[#C05A30]/40 to-[#049B9F]/40" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#2C2C2C]/30">transformation</span>
            <span className="h-px w-12 bg-gradient-to-r from-[#049B9F]/40 to-[#049B9F]/10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
