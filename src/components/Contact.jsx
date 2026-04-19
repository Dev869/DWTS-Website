export default function Contact() {
  return (
    <section id="contact" className="relative w-full px-6 py-20 md:px-12 lg:px-20">
      {/* Decorative crosshairs */}
      <div className="absolute top-16 left-[12%] hidden lg:block">
        <span className="block h-8 w-px bg-[#049B9F]/15" />
        <span className="absolute top-3.5 -left-[3.5px] block h-px w-8 bg-[#049B9F]/15" />
        <span className="absolute top-2 left-[-1.5px] h-1 w-1 rounded-full bg-[#049B9F]/20" />
      </div>

      {/* Static diamond */}
      <div className="absolute bottom-20 right-[8%] hidden lg:block">
        <div className="h-5 w-5 rotate-45 border border-[#049B9F]/20" />
      </div>

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
              Got an idea that needs building? Share what you're working with — the problem,
              a rough timeline, a budget range — and we'll figure out the best path forward together.
            </p>

            {/* Email bar */}
            <div className="flex items-center gap-0 overflow-hidden">
              <a href="mailto:info@dwtailored.com" className="link-span">
              <span className="bg-[#049B9F] px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:bg-[#06B5B9] active:scale-95">
                Send an Email
              </span>
              </a>
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
            <div className="mt-4 text-[15px] leading-relaxed text-[#2C2C2C]">
              <p>
                Hi there, and welcome to my portfolio!
                I started out developing solutions in biotech - with the primary focus being to save time and money.
                Since then, I've taken to building applications in a broad market with one key focus: <strong>accessibility</strong>.
                Nobody wants software that only one person in the company can use. That said, I follow these few key priorities in every project:
              </p>
              <ul className="my-3 space-y-1">
                <li>&#10023; Simplicity over Complexity</li>
                <li>&#10023; Security</li>
                <li>&#10023; Functionality</li>
                <li>&#10023; User Experience</li>
              </ul>
              <p>
                Feel free to browse my projects! I'd love to hear what you have to think - questions are always welcome.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
