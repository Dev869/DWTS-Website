import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTABar({ project }) {
  return (
    <motion.div
      className="border-t-2 border-[#049B9F] bg-[#2C2C2C] px-6 py-5 md:px-12 lg:px-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Link
          to="/#portfolio"
          className="font-mono text-sm text-[#F5F6F8]/60 transition-colors hover:text-[#F5F6F8]"
        >
          &larr; Back to Projects
        </Link>
        <div className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-dashed border-[#F5F6F8]/30 px-6 py-2.5 font-mono text-sm text-[#F5F6F8] transition-all hover:border-[#F5F6F8]"
            >
              View Source
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-glow bg-[#049B9F] px-6 py-2.5 font-mono text-sm text-[#F5F6F8] transition-all hover:-translate-y-0.5 hover:bg-[#06B5B9] hover:shadow-[0_4px_16px_rgba(4,155,159,0.3)] active:scale-95"
            >
              Try it Live &rarr;
            </a>
          )}
          {!project.demoUrl && project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#049B9F] px-6 py-2.5 font-mono text-sm text-[#F5F6F8] transition-all hover:-translate-y-0.5 hover:bg-[#06B5B9] hover:shadow-[0_4px_16px_rgba(4,155,159,0.3)]"
            >
              View Project &rarr;
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
