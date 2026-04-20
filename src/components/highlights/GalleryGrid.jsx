import BrowserFrame from "../mockups/BrowserFrame";
import PhoneFrame from "../mockups/PhoneFrame";
import SectionReveal from "./SectionReveal";

function Frame({ frame, url, children }) {
  if (frame === "browser") return <BrowserFrame url={url}>{children}</BrowserFrame>;
  if (frame === "phone") return <PhoneFrame>{children}</PhoneFrame>;
  return (
    <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-[#F5F6F8] shadow-sm">
      {children}
    </div>
  );
}

export default function GalleryGrid({ items, siteUrl }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h3 className="font-[Bungee] mb-8 text-sm tracking-[0.15em] text-[#2C2C2C]">Gallery</h3>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, i) => {
            const frame = item.frame || (item.src ? "browser" : "none");
            const isPhone = frame === "phone";
            return (
              <SectionReveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
                <figure className="group">
                  <Frame frame={frame} url={item.url || siteUrl}>
                    {item.src ? (
                      <img
                        src={item.src}
                        alt={item.caption || ""}
                        className={`w-full ${isPhone ? "h-full object-cover object-top" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-[1.02]`}
                      />
                    ) : (
                      <div className="flex aspect-video items-center justify-center font-mono text-xs text-[#2C2C2C]/30">
                        {item.caption || "screenshot"}
                      </div>
                    )}
                  </Frame>
                  {item.caption && (
                    <figcaption className="mt-3 text-center text-sm text-[#4B5563]">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
