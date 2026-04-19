import { motion } from "framer-motion";

export default function DeviceMockup({ image, title, url }) {
  if (!image) return null;

  return (
    <div className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
        >
          {/* Laptop body */}
          <div className="overflow-hidden rounded-t-xl border-2 border-[#2C2C2C]/20 bg-[#2C2C2C] shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-[#3a3a3a] bg-[#1a1a1a] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C05A30]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D4A843]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#7A8B4A]/70" />
              </div>
              <div className="flex-1 rounded bg-[#2C2C2C] px-4 py-1">
                <span className="font-mono text-[10px] text-[#F5F6F8]/30">
                  {url || `dwtailoredsystems.com/project/${title?.toLowerCase().replace(/\s+/g, '-')}`}
                </span>
              </div>
            </div>

            {/* Screen content */}
            <div className="relative">
              <img
                src={image}
                alt={`${title} preview`}
                className="w-full object-cover"
              />
              {/* Scan-line overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.015)_2px,rgba(0,0,0,0.015)_4px)]" />
              {/* Subtle reflection */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
            </div>
          </div>

          {/* Laptop base/chin */}
          <div className="mx-auto h-4 w-[70%] rounded-b-lg bg-gradient-to-b from-[#3a3a3a] to-[#2C2C2C] shadow-lg">
            <div className="mx-auto h-1 w-16 rounded-b bg-[#4a4a4a]" />
          </div>

          {/* Shadow */}
          <div className="mx-auto mt-2 h-2 w-[80%] rounded-full bg-[#2C2C2C]/10 blur-md" />
        </motion.div>
      </div>
    </div>
  );
}
