import { motion } from "framer-motion";

export default function QuoteCallout({ quote, attribution }) {
  if (!quote) return null;

  return (
    <div className="px-6 py-16 md:px-12 lg:px-20">
      <motion.div
        className="relative mx-auto max-w-3xl border-l-4 border-[#049B9F] bg-[#F5F0E3] py-10 pl-8 pr-8 md:pl-12 md:pr-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Large quote mark */}
        <motion.span
          className="absolute -top-4 left-4 font-[Bungee] text-7xl text-[#049B9F]/10"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          &ldquo;
        </motion.span>

        <p className="relative z-10 text-lg italic leading-relaxed text-[#2C2C2C]/70 md:text-xl">
          {quote}
        </p>

        {attribution && (
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#049B9F]/30" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#049B9F]/60">
              {attribution}
            </span>
          </div>
        )}

        {/* Corner decorations */}
        <span className="absolute top-2 right-2 h-3 w-3 border-t border-r border-[#049B9F]/15" />
        <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[#049B9F]/15" />
      </motion.div>
    </div>
  );
}
