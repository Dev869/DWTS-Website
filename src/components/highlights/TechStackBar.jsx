import { motion } from "framer-motion";

export default function TechStackBar({ techStack = [] }) {
  if (techStack.length === 0) return null;

  return (
    <div className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <h3 className="font-[Bungee] mb-6 text-sm tracking-[0.15em] text-[#2C2C2C]">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="cursor-default border border-dashed border-[#2C2C2C]/15 bg-[#FFFFFF] px-5 py-2.5 font-mono text-sm text-[#2C2C2C] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#049B9F] hover:shadow-[0_4px_12px_rgba(4,155,159,0.15)]"
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
