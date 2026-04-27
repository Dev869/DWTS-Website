// Segment definitions. See docs/portfolio-strategy.md for the strategy that
// drives this data. Each segment becomes a page at /for/:slug.
//
// Shape (JSDoc for editor help in a .js file):
/**
 * @typedef {Object} SegmentTheme
 * @property {string} from   Primary color (gradient stop 1, also tints accents)
 * @property {string} via    Mid color (gradient stop 2)
 * @property {string} to     End color (gradient stop 3, usually paper-toned)
 *
 * @typedef {Object} SegmentArtwork
 * @property {string[]} motifs       Allowed motif names for this segment.
 *                                   Names must match keys in ProjectArtwork's MOTIF_BY_NAME.
 * @property {string[]} titleStyles  Allowed title-style names for this segment.
 *                                   Names must match keys in ProjectArtwork's TITLE_BY_NAME.
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
 * @property {SegmentArtwork} artwork   Pool of motifs + title styles ProjectArtwork picks from
 *                                      so visuals stay on-theme for the segment.
 */

/** @type {Segment[]} */
export const SEGMENTS = [
  {
    slug: "labs",
    name: "Research Tools",
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
    // Cool clinical teal. Visuals lean scientific: orbits (instruments),
    // constellations (sample maps), topo lines (signal traces).
    theme: { from: "#049B9F", via: "#06B5B9", to: "#ECE9E2" },
    artwork: {
      motifs: ["orbit", "constellation", "topography"],
      titleStyles: ["outlineSerif", "monoLower", "editorialStack"],
    },
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
    // Warm editorial palette. Visuals lean expressive: ribbons (flow),
    // topo (organic), constellations (curated link maps).
    theme: { from: "#C05A30", via: "#D4A843", to: "#ECE9E2" },
    artwork: {
      motifs: ["ribbon", "topography", "constellation"],
      titleStyles: ["editorialStack", "outlineSerif", "capsGrotesk"],
    },
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
    // Grounded operational palette. Visuals lean structural: grids
    // (dashboards/spreadsheets), orbits (workflow), tight typography.
    theme: { from: "#7A8B4A", via: "#D4A843", to: "#E4E0D5" },
    artwork: {
      motifs: ["grid", "orbit", "constellation"],
      titleStyles: ["capsGrotesk", "monoLower", "editorialStack"],
    },
  },
];

const DEFAULT_THEME = { from: "#1a1a18", via: "#7A8B4A", to: "#ECE9E2" };
const DEFAULT_ARTWORK = {
  motifs: ["orbit", "topography", "constellation", "ribbon", "grid"],
  titleStyles: ["editorialStack", "capsGrotesk", "monoLower", "outlineSerif"],
};

export function getSegmentBySlug(slug) {
  if (!slug) return null;
  return SEGMENTS.find((s) => s.slug === slug) || null;
}

/**
 * Resolve a segment for a project.
 * Accepts either a project object (preferred — checks `project.segment` first,
 * which is set from the admin) OR a slug string (legacy — matches against each
 * segment's `projectSlugs[]`).
 *
 * @param {object | string | null | undefined} projectOrSlug
 * @returns {Segment | null}
 */
export function getSegmentForProject(projectOrSlug) {
  if (!projectOrSlug) return null;
  if (typeof projectOrSlug === "object") {
    const project = projectOrSlug;
    if (project.segment) {
      const explicit = SEGMENTS.find((s) => s.slug === project.segment);
      if (explicit) return explicit;
    }
    if (project.slug) {
      return SEGMENTS.find((s) => s.projectSlugs?.includes(project.slug)) || null;
    }
    return null;
  }
  // String slug
  return SEGMENTS.find((s) => s.projectSlugs?.includes(projectOrSlug)) || null;
}

export function getProjectTheme(projectOrSlug) {
  const segment = getSegmentForProject(projectOrSlug);
  return segment?.theme || DEFAULT_THEME;
}

export function getProjectArtworkPool(projectOrSlug) {
  const segment = getSegmentForProject(projectOrSlug);
  return segment?.artwork || DEFAULT_ARTWORK;
}
