import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import ResultsMetrics from "./ResultsMetrics";
import TechStackBar from "./TechStackBar";
import CTABar from "./CTABar";
import FeatureGrid from "./FeatureGrid";
import ArchitectureDiagram from "./ArchitectureDiagram";
import DeviceMockup from "./DeviceMockup";
import ProcessFlow from "./ProcessFlow";
import BeforeAfter from "./BeforeAfter";
import QuoteCallout from "./QuoteCallout";

export default function ShowcaseLayout({ project }) {
  return (
    <div className="min-h-screen">
      {/* Hero — full-bleed with parallax-style gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2C2C2C] to-[#1a1a2e]">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(4,155,159,0.25) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(192,90,48,0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(212,168,67,0.08) 0%, transparent 70%)
            `,
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbit ring decorations */}
        <motion.div
          className="absolute -right-12 top-[10%] h-[300px] w-[300px] rounded-full border border-dashed border-[#049B9F]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -left-24 bottom-[-50px] h-[400px] w-[400px] rounded-full border border-dashed border-[#049B9F]/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 md:px-12 md:py-36 lg:px-20">
          <motion.span
            className="mb-6 inline-block border border-dashed border-[#049B9F] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#06B5B9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.category}
          </motion.span>

          <motion.h1
            className="font-[Bungee] text-4xl leading-tight text-[#F5F6F8] md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-lg leading-relaxed text-[#F5F6F8]/75"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.headline}
          </motion.p>
        </div>
      </div>

      {/* Device Mockup */}
      <DeviceMockup image={project.image} title={project.title} url={project.link} />

      {/* Problem */}
      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <h2 className="font-[Bungee] text-2xl text-[#2C2C2C] md:text-3xl">The Problem</h2>
            <div className="mt-3 h-[3px] w-16 bg-[#049B9F]" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#2C2C2C]/75">
              {project.problem}
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* Before / After */}
      <BeforeAfter before={project.before} after={project.after} />

      {/* Decorative divider */}
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-20">
        <div className="border-t border-dashed border-[#2C2C2C]/10" />
      </div>

      {/* Approach */}
      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionReveal delay={0.1}>
            <h2 className="font-[Bungee] text-2xl text-[#2C2C2C] md:text-3xl">The Solution</h2>
            <div className="mt-3 h-[3px] w-16 bg-[#C05A30]" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#2C2C2C]/75">
              {project.approach}
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* Process Flow */}
      <ProcessFlow steps={project.processSteps} />

      {/* Features */}
      <FeatureGrid features={project.features} />

      {/* Quote */}
      <QuoteCallout quote={project.quote} attribution={project.quoteAttribution} />

      {/* Architecture */}
      <ArchitectureDiagram techStack={project.techStack} title={project.title} />

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
                  <div className="group cursor-pointer overflow-hidden border border-dashed border-[#2C2C2C]/10 bg-[#FFFFFF] transition-all duration-500 hover:scale-[1.03] hover:shadow-lg">
                    <div className="flex h-52 items-center justify-center overflow-hidden bg-[#F5F6F8]">
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

      {/* Results */}
      <ResultsMetrics results={project.results} />

      {/* Tech Stack */}
      <TechStackBar techStack={project.techStack} />

      {/* CTA */}
      <CTABar project={project} />
    </div>
  );
}
