import { SlidingBars, ConfettiBurst } from "./ScrollGraphics";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full px-6 py-20 md:px-12 lg:px-20">
      {/* Decorative crosshairs */}
      <div className="absolute top-16 left-[12%] hidden lg:block">
        <span className="block h-8 w-px bg-[#049B9F]/15" />
        <span className="absolute top-3.5 -left-[3.5px] block h-px w-8 bg-[#049B9F]/15" />
        <span className="absolute top-2 left-[-1.5px] h-1 w-1 rounded-full bg-[#049B9F]/20" />
      </div>

      {/* Floating diamond */}
      <div className="absolute bottom-20 right-[8%] hidden lg:block">
        <div className="animate-float h-5 w-5 rotate-45 border border-[#049B9F]/20" />
      </div>

      <SlidingBars className="absolute top-20 right-[5%] hidden lg:block" direction="right" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Horizontal rule with label */}
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#049B9F]/15" />
          <span className="text-sm uppercase tracking-[0.25em] text-[#049B9F]">Get in Touch</span>
          <span className="h-px flex-1 bg-[#049B9F]/15" />
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          {/* Left */}
          <div className="animate-fade-up md:w-1/2">
            <h2 className="font-[Bungee] text-4xl text-[#2C2C2C] md:text-5xl">
              CONTACT.
            </h2>
            <div className="mt-3 flex gap-1">
              <span className="h-1.5 w-12 bg-[#D4A843]" />
              <span className="h-1.5 w-6 bg-[#049B9F]" />
              <span className="h-1.5 w-3 bg-[#C05A30]" />
            </div>

            {/* Little decorative box */}
            <div className="mt-8 inline-block border border-dashed border-[#049B9F]/20 px-4 py-2">
              <span className="text-sm uppercase tracking-[0.15em] text-[#049B9F]">
                ◈ Available for new projects
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="animate-fade-up md:w-1/2" style={{ animationDelay: "0.15s" }}>
            <p className="mb-6 text-base leading-relaxed text-[#2C2C2C]">
              Let's get your idea off the ground! If you're interested in a quote
              for your project, please reach out with any information. Ideas,
              budget, timeline, whatever you've got. The more, the better!
            </p>

            {/* Email bar */}
            <div className="flex items-center gap-0 overflow-hidden">
              <span className="bg-[#049B9F] px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white">
                Send an Email
              </span>
              <span className="flex-1 bg-[#037B7E] px-4 py-3 font-[Bungee] text-sm text-white md:text-base">
                info@dwtailored.com
              </span>
            </div>

            {/* Arrow pointing up to email */}
            <div className="mt-3 flex items-center gap-2 pl-2">
              <span className="text-sm text-[#049B9F]">↑</span>
              <span className="text-sm italic text-[#2C2C2C]/80">Click to reach out</span>
            </div>
          </div>
        </div>

        {/* About card */}
        <div id="about" className="mt-16 flex flex-col items-center gap-8 border-2 border-dashed border-[#049B9F]/12 p-6 md:flex-row md:items-start md:p-8">
          {/* Corner squares */}
          <span className="absolute -top-1.5 -left-1.5 hidden h-3 w-3 bg-[#D4A843] md:block" />
          <span className="absolute -top-1.5 -right-1.5 hidden h-3 w-3 bg-[#049B9F] md:block" />
      <ConfettiBurst className="absolute bottom-12 left-[6%] hidden lg:block" />

          {/* Photo */}
          <div className="relative shrink-0">
            <div className="h-48 w-48 overflow-hidden border-3 border-[#049B9F]">
              <img
                src="/devin.jpg"
                alt="Devin Wilson"
                loading="lazy"
                className="h-full w-full scale-125 object-cover object-[center_20%]"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-[#D4A843] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              Founder
            </span>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <div className="mb-2 flex gap-1">
              <span className="h-1.5 w-8 bg-[#049B9F]" />
              <span className="h-1.5 w-4 bg-[#D4A843]" />
              <span className="h-1.5 w-2 bg-[#C05A30]" />
            </div>
            <h3 className="font-[Bungee] text-xl text-[#2C2C2C] md:text-2xl">
              Devin Wilson
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[#2C2C2C]">
              Hi there, and welcome to my portfolio!
              I started out developing solutions for biotech, with a focus on
              streamlining workflows while prioritizing simplicity over complexity. Since then, I've taken
              that approach and applied it to other industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
