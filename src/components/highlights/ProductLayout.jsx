import { Link } from "react-router-dom";
import GalleryGrid from "./GalleryGrid";
import BrowserFrame from "../mockups/BrowserFrame";

export default function ProductLayout({ project }) {
  const {
    title,
    headline,
    description,
    category,
    tags = [],
    techStack = [],
    features = [],
    results = [],
    processSteps = [],
    before = [],
    after = [],
    problem,
    approach,
    image,
    gallery = [],
    quote,
    quoteAttribution,
    link,
    demoUrl,
    beta,
  } = project;

  const siteUrl = link || demoUrl;

  return (
    <article className="bg-[#F5F6F8] text-[#1F2328]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:grid lg:grid-cols-2 lg:gap-14 lg:py-32">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#049B9F]">
              {category && <span>{category}</span>}
              {beta && (
                <span className="rounded-full border border-[#049B9F]/30 px-2 py-0.5 text-[10px] tracking-normal">
                  Beta
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[#1F2328] md:text-6xl">
              {title}
            </h1>
            {headline && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4B5563] md:text-xl">
                {headline}
              </p>
            )}
            {description && headline !== description && (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#4B5563]">
                {description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-[#049B9F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#037B7E]"
                >
                  Try it live
                  <span aria-hidden>→</span>
                </a>
              )}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-[#E4E7EC] px-5 py-2.5 text-sm font-semibold text-[#1F2328] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
                >
                  {demoUrl ? "View source" : "View project"}
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>

            {techStack.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#E4E7EC] bg-[#F9FAFB] px-3 py-1 text-xs font-medium text-[#4B5563]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {image && (
            <div className="mt-12 lg:mt-0">
              <BrowserFrame url={siteUrl}>
                <img src={image} alt={`${title} preview`} className="w-full" />
              </BrowserFrame>
            </div>
          )}
        </div>
      </section>

      {/* Capability grid */}
      {features.length > 0 && (
        <section className="border-b border-[#E4E7EC]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#049B9F]">
                Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                What it does
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <div key={i} className="group">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#049B9F]/10 font-mono text-sm uppercase text-[#049B9F]">
                    {(f.icon || "◆").slice(0, 3)}
                  </div>
                  <h3 className="text-base font-semibold text-[#1F2328]">{f.title}</h3>
                  {f.desc && (
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{f.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Problem block */}
      {problem && (
        <AlternatingBlock
          eyebrow="The problem"
          title="Why this project existed"
          body={problem}
          image={gallery[0]?.src}
          imageCaption={gallery[0]?.caption}
        />
      )}

      {/* Approach block */}
      {approach && (
        <AlternatingBlock
          reverse
          eyebrow="The approach"
          title="How it was built"
          body={approach}
          image={gallery[1]?.src || gallery[0]?.src}
          imageCaption={gallery[1]?.caption || gallery[0]?.caption}
        />
      )}

      {/* Results band */}
      {results.length > 0 && (
        <section className="border-y border-[#E4E7EC] bg-[#1F2328] text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#049B9F]">
              Results
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {results.map((r, i) => (
                <div key={i} className="border-l-2 border-[#049B9F] pl-5">
                  <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                    {r.metric}
                  </div>
                  {r.label && (
                    <div className="mt-2 text-sm uppercase tracking-wider text-[#E4E7EC]/70">
                      {r.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process steps */}
      {processSteps.length > 0 && (
        <section className="border-b border-[#E4E7EC]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#049B9F]">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Process
              </h2>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((s, i) => (
                <li key={i} className="rounded-lg border border-[#E4E7EC] bg-white p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#049B9F]">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[#1F2328]">{s.label}</h3>
                  {s.desc && (
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{s.desc}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Before / After */}
      {(before.length > 0 || after.length > 0) && (
        <section className="border-b border-[#E4E7EC] bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#049B9F]">
                The shift
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Before &amp; after
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Pane label="Before" tone="muted" items={before} />
              <Pane label="After" tone="accent" items={after} />
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="border-b border-[#E4E7EC]">
          <GalleryGrid items={gallery} siteUrl={siteUrl} />
        </section>
      )}

      {/* Quote */}
      {quote && (
        <section className="border-b border-[#E4E7EC] bg-white">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-10 md:py-28">
            <span className="block text-6xl leading-none text-[#049B9F]/30" aria-hidden>
              “
            </span>
            <blockquote className="mt-2 text-2xl font-medium leading-relaxed tracking-tight text-[#1F2328] md:text-3xl">
              {quote}
            </blockquote>
            {quoteAttribution && (
              <figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-[#4B5563]">
                {quoteAttribution}
              </figcaption>
            )}
          </div>
        </section>
      )}

      {/* Tags / related */}
      {tags.length > 0 && (
        <section className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-10 md:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4B5563]">
              Tagged
            </span>
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#E4E7EC] bg-white px-3 py-1 text-xs font-medium text-[#4B5563]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Resources / CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Want something like this built for you?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-[#4B5563]">
                DW Tailored Systems designs and builds software that fits — no bloat, no compromises.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded bg-[#049B9F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#037B7E]"
              >
                Start a project
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/#portfolio"
                className="inline-flex items-center gap-2 rounded border border-[#E4E7EC] px-5 py-2.5 text-sm font-semibold text-[#1F2328] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
              >
                More projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function AlternatingBlock({ eyebrow, title, body, image, imageCaption, reverse }) {
  return (
    <section className="border-b border-[#E4E7EC] bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#049B9F]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4B5563] md:text-lg">
            {body}
          </p>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          {image ? (
            <figure>
              <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-[#F9FAFB]">
                <img src={image} alt={imageCaption || ""} className="w-full" />
              </div>
              {imageCaption && (
                <figcaption className="mt-3 text-sm text-[#4B5563]">{imageCaption}</figcaption>
              )}
            </figure>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-[#E4E7EC] bg-[#F9FAFB] text-sm text-[#4B5563]">
              No image yet
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Pane({ label, tone, items }) {
  const accent = tone === "accent";
  return (
    <div
      className={`rounded-lg border p-6 ${
        accent
          ? "border-[#049B9F]/30 bg-[#049B9F]/5"
          : "border-[#E4E7EC] bg-[#F9FAFB]"
      }`}
    >
      <div
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          accent ? "text-[#049B9F]" : "text-[#4B5563]"
        }`}
      >
        {label}
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#1F2328]">
            <span
              className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                accent ? "bg-[#049B9F]" : "bg-[#9CA3AF]"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
