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

export default function CaseStudyLayout({ project }) {
  return (
    <div className="min-h-screen">
      {/* Compact header */}
      <div className="relative bg-[#2C2C2C] px-6 py-20 md:px-12 md:py-28 lg:px-20">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(4,155,159,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(4,155,159,1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            className="mb-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="border border-dashed border-[#049B9F] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-[#06B5B9]">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#EDE6D6]/30">Case Study</span>
          </motion.div>

          <motion.h1
            className="font-[Bungee] text-3xl leading-tight text-[#EDE6D6] md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl text-lg leading-relaxed text-[#EDE6D6]/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.headline}
          </motion.p>

          {/* Decorative accent bar */}
          <motion.div
            className="mt-8 flex gap-1.5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          >
            <span className="h-1.5 w-12 bg-[#049B9F]" />
            <span className="h-1.5 w-6 bg-[#C05A30]" />
            <span className="h-1.5 w-3 bg-[#D4A843]" />
          </motion.div>
        </div>
      </div>

      {/* Challenge section */}
      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <div className="flex items-start gap-8">
              <div className="hidden pt-2 md:block">
                <span className="font-[Bungee] text-6xl text-[#049B9F]/10">01</span>
              </div>
              <div>
                <h2 className="font-[Bungee] text-xl text-[#2C2C2C] md:text-2xl">The Challenge</h2>
                <div className="mt-3 h-[3px] w-12 bg-[#049B9F]" />
                <p className="mt-6 max-w-2xl text-lg leading-[1.9] text-[#2C2C2C]/70">
                  {project.problem}
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Before / After */}
      <BeforeAfter before={project.before} after={project.after} />

      {/* Divider with zigzag */}
      <SectionReveal>
        <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-20">
          <svg className="w-full" height="20" viewBox="0 0 800 20" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#2C2C2C"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.15"
              points="0,10 20,0 40,10 60,0 80,10 100,0 120,10 140,0 160,10 180,0 200,10 220,0 240,10 260,0 280,10 300,0 320,10 340,0 360,10 380,0 400,10 420,0 440,10 460,0 480,10 500,0 520,10 540,0 560,10 580,0 600,10 620,0 640,10 660,0 680,10 700,0 720,10 740,0 760,10 780,0 800,10"
            />
          </svg>
        </div>
      </SectionReveal>

      {/* Approach section */}
      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionReveal delay={0.1}>
            <div className="flex items-start gap-8">
              <div className="hidden pt-2 md:block">
                <span className="font-[Bungee] text-6xl text-[#C05A30]/10">02</span>
              </div>
              <div>
                <h2 className="font-[Bungee] text-xl text-[#2C2C2C] md:text-2xl">The Approach</h2>
                <div className="mt-3 h-[3px] w-12 bg-[#C05A30]" />
                <p className="mt-6 max-w-2xl text-lg leading-[1.9] text-[#2C2C2C]/70">
                  {project.approach}
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Process Flow */}
      <ProcessFlow steps={project.processSteps} title="The Pipeline" />

      {/* Device Mockup */}
      <DeviceMockup image={project.image} title={project.title} url={project.link} />

      {/* Features */}
      <FeatureGrid features={project.features} />

      {/* Quote */}
      <QuoteCallout quote={project.quote} attribution={project.quoteAttribution} />

      {/* Architecture */}
      <ArchitectureDiagram techStack={project.techStack} title={project.title} />

      {/* Results */}
      <div className="mt-10">
        <ResultsMetrics results={project.results} />
      </div>

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

      {/* Key decisions callout */}
      <div className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <div className="flex items-start gap-8">
              <div className="hidden pt-2 md:block">
                <span className="font-[Bungee] text-6xl text-[#D4A843]/10">03</span>
              </div>
              <div>
                <h2 className="font-[Bungee] text-xl text-[#2C2C2C] md:text-2xl">Key Decisions</h2>
                <div className="mt-3 h-[3px] w-12 bg-[#D4A843]" />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.techStack.map((tech, i) => (
                    <motion.div
                      key={tech}
                      className="border border-dashed border-[#2C2C2C]/10 bg-[#F5F0E3] p-5"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <span className="font-mono text-sm font-semibold text-[#049B9F]">{tech}</span>
                      <p className="mt-1 text-sm text-[#2C2C2C]/50">
                        Chosen for reliability and ecosystem support.
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Tech Stack */}
      <TechStackBar techStack={project.techStack} />

      {/* CTA */}
      <CTABar project={project} />
    </div>
  );
}
