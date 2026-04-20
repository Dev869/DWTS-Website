import SectionReveal from "./SectionReveal";
import ResultsMetrics from "./ResultsMetrics";
import TechStackBar from "./TechStackBar";
import CTABar from "./CTABar";
import FeatureGrid from "./FeatureGrid";
import ArchitectureDiagram from "./ArchitectureDiagram";
import DeviceMockup from "./DeviceMockup";
import GalleryGrid from "./GalleryGrid";
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
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="border border-dashed border-[#049B9F] px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-[#06B5B9]">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#F5F6F8]/30">Case Study</span>
          </div>

          <h1 className="font-[Bungee] text-3xl leading-tight text-[#F5F6F8] md:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#F5F6F8]/70">
            {project.headline}
          </p>

          {/* Decorative accent bar */}
          <div className="mt-8 flex gap-1.5" style={{ transformOrigin: "left" }}>
            <span className="h-1.5 w-12 bg-[#049B9F]" />
            <span className="h-1.5 w-6 bg-[#C05A30]" />
            <span className="h-1.5 w-3 bg-[#D4A843]" />
          </div>
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
      <GalleryGrid items={project.gallery} siteUrl={project.link} />

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
                  {project.techStack.map((tech) => (
                    <div
                      key={tech}
                      className="border border-dashed border-[#2C2C2C]/10 bg-[#FFFFFF] p-5"
                    >
                      <span className="font-mono text-sm font-semibold text-[#049B9F]">{tech}</span>
                      <p className="mt-1 text-sm text-[#2C2C2C]/50">
                        Chosen for reliability and ecosystem support.
                      </p>
                    </div>
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
