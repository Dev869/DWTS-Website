// Segment definitions. See docs/portfolio-strategy.md for the strategy that
// drives this data. Each segment becomes a page at /for/:slug.
//
// Shape (JSDoc for editor help in a .js file):
/**
 * @typedef {Object} SegmentTheme
 * @property {string} from   Primary color (gradient stop 1, also tints the numeral)
 * @property {string} via    Mid color (gradient stop 2)
 * @property {string} to     End color (gradient stop 3, usually paper-toned)
 *
 * @typedef {Object} Segment
 * @property {string} slug              URL segment, /for/:slug
 * @property {string} name              Short label used in nav + cards
 * @property {string} audience          Who this is for (one sentence)
 * @property {string} headline          Outcome-driven hero headline
 * @property {string} subheadline       One-line clarifier under the headline
 * @property {string} problem           Pain statement, customer's language
 * @property {string} solution          How Devin solves it
 * @property {string[]} whoItsFor       Bullets: ideal-fit signals
 * @property {string[]} whoItsNotFor    Bullets: explicit disqualifiers
 * @property {string} engagement        Timeline + shape of engagement
 * @property {string[]} projectSlugs    Related case studies (slugs from projects.js)
 * @property {string} ctaLabel          Primary CTA button label
 * @property {boolean} [comingSoon]     If true, page shows a coming-soon notice instead of CTA
 * @property {SegmentTheme} theme       Color triad used by ProjectArtwork to render the card/hero
 */

/** @type {Segment[]} */
export const SEGMENTS = [
  {
    slug: "labs",
    name: "Labs",
    audience: "Research and biotech teams drowning in sample tracking and instrument data.",
    headline: "Hours back at the bench. Data that passes audit.",
    subheadline: "Custom lab automation for teams too small for a LIMS contract and too serious for spreadsheets.",
    problem: "",
    solution: "",
    whoItsFor: [],
    whoItsNotFor: [],
    engagement: "4 to 8 week custom builds, project-based.",
    projectSlugs: ["fluorescence-pipeline", "pulse-wave-toolkit"],
    ctaLabel: "Book a lab call",
    theme: { from: "#049B9F", via: "#06B5B9", to: "#ECE9E2" },
  },
  {
    slug: "websites",
    name: "Websites",
    audience: "Operators and founders who need a site that works as a business asset, not a brochure.",
    headline: "A site wired into the tools your business actually runs on.",
    subheadline: "Design, engineering, and integration, shipped by one person who understands the ops side.",
    problem: "",
    solution: "",
    whoItsFor: [],
    whoItsNotFor: [],
    engagement: "2 to 6 week fixed-scope projects.",
    projectSlugs: [],
    ctaLabel: "Book a website call",
    comingSoon: true,
    theme: { from: "#C05A30", via: "#D4A843", to: "#ECE9E2" },
  },
  {
    slug: "business-tools",
    name: "Business Tools",
    audience: "SMB operators hitting the ceiling of spreadsheets and generic SaaS.",
    headline: "Internal tools built around how your team actually works.",
    subheadline: "I embed with ops, learn the real process, and build exactly what you need, without the off-the-shelf compromise.",
    problem: "",
    solution: "",
    whoItsFor: [],
    whoItsNotFor: [],
    engagement: "Discovery → 4 to 8 week build → optional retainer.",
    projectSlugs: ["docuhub-reporting", "ten99"],
    ctaLabel: "Book an ops call",
    theme: { from: "#7A8B4A", via: "#D4A843", to: "#E4E0D5" },
  },
];

const DEFAULT_THEME = { from: "#1a1a18", via: "#7A8B4A", to: "#ECE9E2" };

export function getSegmentBySlug(slug) {
  return SEGMENTS.find((s) => s.slug === slug) || null;
}

export function getSegmentForProject(projectSlug) {
  if (!projectSlug) return null;
  return SEGMENTS.find((s) => s.projectSlugs?.includes(projectSlug)) || null;
}

export function getProjectTheme(projectSlug) {
  const segment = getSegmentForProject(projectSlug);
  return segment?.theme || DEFAULT_THEME;
}
