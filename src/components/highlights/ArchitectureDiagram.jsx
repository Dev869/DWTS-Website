import { motion } from "framer-motion";

export default function ArchitectureDiagram({ techStack = [], title = "" }) {
  if (techStack.length === 0) return null;

  // Split stack into layers for visual effect
  const mid = Math.ceil(techStack.length / 2);
  const topRow = techStack.slice(0, mid);
  const bottomRow = techStack.slice(mid);

  return (
    <div className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <motion.h3
          className="font-[Bungee] mb-8 text-sm tracking-[0.15em] text-[#2C2C2C]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Architecture
        </motion.h3>

        <motion.div
          className="relative overflow-hidden border-2 border-dashed border-[#2C2C2C]/10 bg-[#2C2C2C] p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(4,155,159,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(4,155,159,1) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Title */}
          <div className="relative mb-8 text-center">
            <span className="font-[Bungee] text-xs tracking-[0.2em] text-[#049B9F]/70">
              {title || "SYSTEM OVERVIEW"}
            </span>
          </div>

          {/* Top layer */}
          <div className="relative flex flex-wrap justify-center gap-4">
            {topRow.map((tech, i) => (
              <motion.div
                key={tech}
                className="flex items-center gap-2 border border-[#049B9F]/30 bg-[#049B9F]/10 px-5 py-3"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <span className="h-2 w-2 rounded-full bg-[#049B9F]" />
                <span className="font-mono text-xs text-[#F5F6F8]/80">{tech}</span>
              </motion.div>
            ))}
          </div>

          {/* Connection lines */}
          <div className="my-4 flex justify-center gap-8">
            {topRow.map((_, i) => (
              <motion.div
                key={i}
                className="h-8 w-px bg-gradient-to-b from-[#049B9F]/40 to-[#C05A30]/40"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                style={{ transformOrigin: "top" }}
              />
            ))}
          </div>

          {/* Center hub */}
          <motion.div
            className="mx-auto mb-4 flex w-fit items-center gap-3 border-2 border-[#D4A843]/40 bg-[#D4A843]/10 px-8 py-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-3 w-3 rounded-full bg-[#D4A843] shadow-[0_0_8px_rgba(212,168,67,0.4)]" />
            <span className="font-[Bungee] text-xs tracking-wider text-[#F5F6F8]/80">
              {title || "APPLICATION"}
            </span>
          </motion.div>

          {/* Connection lines */}
          <div className="my-4 flex justify-center gap-8">
            {bottomRow.map((_, i) => (
              <motion.div
                key={i}
                className="h-8 w-px bg-gradient-to-b from-[#C05A30]/40 to-[#7A8B4A]/40"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
                style={{ transformOrigin: "top" }}
              />
            ))}
          </div>

          {/* Bottom layer */}
          <div className="relative flex flex-wrap justify-center gap-4">
            {bottomRow.map((tech, i) => (
              <motion.div
                key={tech}
                className="flex items-center gap-2 border border-[#7A8B4A]/30 bg-[#7A8B4A]/10 px-5 py-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
              >
                <span className="h-2 w-2 rounded-full bg-[#7A8B4A]" />
                <span className="font-mono text-xs text-[#F5F6F8]/80">{tech}</span>
              </motion.div>
            ))}
          </div>

          {/* Corner decorations */}
          <span className="absolute top-2 left-2 h-4 w-4 border-t border-l border-[#049B9F]/20" />
          <span className="absolute top-2 right-2 h-4 w-4 border-t border-r border-[#049B9F]/20" />
          <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#049B9F]/20" />
          <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#049B9F]/20" />
        </motion.div>
      </div>
    </div>
  );
}
