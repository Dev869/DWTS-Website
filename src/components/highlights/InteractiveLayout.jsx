import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import ResultsMetrics from "./ResultsMetrics";
import TechStackBar from "./TechStackBar";
import CTABar from "./CTABar";
import FeatureGrid from "./FeatureGrid";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ProcessFlow from "./ProcessFlow";
import BeforeAfter from "./BeforeAfter";
import QuoteCallout from "./QuoteCallout";

export default function InteractiveLayout({ project }) {
  return (
    <div className="min-h-screen">
      {/* Compact intro header */}
      <div className="relative overflow-hidden bg-[#2C2C2C] px-6 py-16 md:px-12 md:py-20 lg:px-20">
        {/* Diagonal lines pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(4,155,159,1) 10px,
              rgba(4,155,159,1) 11px
            )`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            className="mb-4 inline-block border border-dashed border-[#049B9F] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#06B5B9]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {project.category} — Interactive
          </motion.span>

          <motion.h1
            className="font-[Bungee] text-3xl leading-tight text-[#EDE6D6] md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-lg text-lg text-[#EDE6D6]/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.headline}
          </motion.p>
        </div>
      </div>

      {/* Demo centerpiece */}
      <div className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <div className="relative overflow-hidden border-2 border-[#049B9F]/30 bg-[#2C2C2C] shadow-2xl">
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 border-b border-[#049B9F]/10 bg-[#1a1a1a] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#C05A30]/60" />
                <span className="h-3 w-3 rounded-full bg-[#D4A843]/60" />
                <span className="h-3 w-3 rounded-full bg-[#7A8B4A]/60" />
                <span className="ml-4 font-mono text-xs text-[#EDE6D6]/30">
                  {project.demoUrl || project.link}
                </span>
              </div>

              {/* Demo area */}
              {project.image ? (
                <div className="relative">
                  <img
                    src={project.image}
                    alt={`${project.title} demo`}
                    className="w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />
                </div>
              ) : (
                <div className="flex h-80 items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-sm text-[#049B9F]/40">
                      [ Live Demo ]
                    </div>
                    <a
                      href={project.demoUrl || project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-[#049B9F] px-6 py-2.5 font-mono text-sm text-[#EDE6D6] transition-all hover:bg-[#06B5B9]"
                    >
                      Launch App &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Launch button below demo */}
            {project.image && (project.demoUrl || project.link) && (
              <div className="mt-6 text-center">
                <a
                  href={project.demoUrl || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#049B9F] px-8 py-3 font-mono text-sm text-[#EDE6D6] transition-all hover:-translate-y-0.5 hover:bg-[#06B5B9] hover:shadow-[0_4px_16px_rgba(4,155,159,0.3)]"
                >
                  Try it Live &rarr;
                </a>
              </div>
            )}
          </SectionReveal>
        </div>
      </div>

      {/* How it works — numbered steps */}
      <div className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <h2 className="font-[Bungee] text-xl text-[#2C2C2C] md:text-2xl">How It Works</h2>
            <div className="mt-3 h-[3px] w-12 bg-[#049B9F]" />
          </SectionReveal>

          <div className="mt-10 space-y-8">
            {/* Problem */}
            <SectionReveal delay={0.1}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center bg-[#049B9F] font-[Bungee] text-sm text-[#EDE6D6]">
                    01
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2C2C2C]">The Problem</h3>
                  <p className="mt-2 leading-relaxed text-[#2C2C2C]/65">
                    {project.problem}
                  </p>
                </div>
              </div>
            </SectionReveal>

            <div className="ml-5 h-8 border-l border-dashed border-[#049B9F]/20" />

            {/* Solution */}
            <SectionReveal delay={0.2}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center bg-[#C05A30] font-[Bungee] text-sm text-[#EDE6D6]">
                    02
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2C2C2C]">The Approach</h3>
                  <p className="mt-2 leading-relaxed text-[#2C2C2C]/65">
                    {project.approach}
                  </p>
                </div>
              </div>
            </SectionReveal>

            <div className="ml-5 h-8 border-l border-dashed border-[#C05A30]/20" />

            {/* Result */}
            <SectionReveal delay={0.3}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="flex h-10 w-10 items-center justify-center bg-[#D4A843] font-[Bungee] text-sm text-[#EDE6D6]">
                    03
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2C2C2C]">The Result</h3>
                  <div className="mt-3 flex flex-wrap gap-6">
                    {project.results.map((r) => (
                      <div key={r.label}>
                        <span className="font-[Bungee] text-2xl text-[#049B9F]">{r.metric}</span>
                        <span className="ml-2 font-mono text-xs uppercase tracking-wider text-[#2C2C2C]/65">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Process Flow */}
      <ProcessFlow steps={project.processSteps} />

      {/* Before / After */}
      <BeforeAfter before={project.before} after={project.after} />

      {/* Features */}
      <FeatureGrid features={project.features} />

      {/* Quote */}
      <QuoteCallout quote={project.quote} attribution={project.quoteAttribution} />

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="px-6 py-10 md:px-12 lg:px-20">
          <div className="mx-auto max-w-5xl">
            <SectionReveal>
              <h3 className="font-[Bungee] mb-8 text-sm tracking-[0.15em] text-[#2C2C2C]">
                Gallery
              </h3>
            </SectionReveal>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {project.gallery.map((item, i) => (
                <SectionReveal
                  key={i}
                  delay={i * 0.1}
                  direction={i % 2 === 0 ? "left" : "right"}
                >
                  <div className="group cursor-pointer overflow-hidden border border-dashed border-[#2C2C2C]/10 bg-[#F5F0E3] transition-all duration-500 hover:scale-[1.03] hover:shadow-lg">
                    <div className="flex h-52 items-center justify-center overflow-hidden bg-[#EDE6D6]">
                      {item.src ? (
                        <img
                          src={item.src}
                          alt={item.caption || ""}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <span className="font-mono text-xs text-[#2C2C2C]/25">
                          {item.caption || "screenshot"}
                        </span>
                      )}
                    </div>
                    {item.caption && (
                      <div className="px-4 py-3 text-sm text-[#2C2C2C]/50">{item.caption}</div>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Architecture */}
      <ArchitectureDiagram techStack={project.techStack} title={project.title} />

      {/* Results full-width */}
      <ResultsMetrics results={project.results} />

      {/* Tech Stack */}
      <TechStackBar techStack={project.techStack} />

      {/* CTA */}
      <CTABar project={project} />
    </div>
  );
}
