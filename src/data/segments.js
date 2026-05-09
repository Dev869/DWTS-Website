// Structural segment metadata. Editable text (headline, subheadline,
// problem, solution, who-it's-for, engagement line, CTA label) lives in
// src/data/siteCopy.js so a single file holds all on-page copy.
//
// Fields here are either (a) used at module load by nav and admin, or
// (b) drive presentation/visuals (theme, artwork) that aren't really
// editorial copy.
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
 * @property {string[]} titleStyles  Allowed title-style names for this segment.
 *
 * @typedef {Object} Segment
 * @property {string} slug              URL segment, /for/:slug
 * @property {string} name              Short label used in nav + cards
 * @property {string} audience          One-sentence audience hint (used in nav tooltip)
 * @property {string[]} projectSlugs    Related case studies (slugs from projects.js)
 * @property {boolean} [comingSoon]     If true, page shows a coming-soon notice instead of CTA
 * @property {boolean} [hidden]         If true, segment is excluded from public nav
 * @property {SegmentTheme} theme       Color triad used by ProjectArtwork
 * @property {SegmentArtwork} artwork   Pool of motifs + title styles ProjectArtwork picks from
 */

/** @type {Segment[]} */
export const SEGMENTS = [
  {
    slug: "labs",
    name: "Labs",
    audience:
      "Research and clinical labs spending hours on tasks they know are automatable.",
    projectSlugs: ["fluorescence-pipeline", "pulse-wave-toolkit"],
    // Cool clinical teal. Visuals lean scientific: orbits (instruments),
    // constellations (sample maps), topo lines (signal traces).
    theme: { from: "#049B9F", via: "#06B5B9", to: "#ECE9E2" },
    artwork: {
      motifs: ["orbit", "constellation", "topography"],
      titleStyles: ["outlineSerif", "monoLower", "editorialStack"],
    },
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    audience:
      "Indie operators and small restaurant groups losing hours to invoice reconciliation, recipe costing, and waste tracking.",
    projectSlugs: [],
    // Warm appetite-forward palette: terracotta + gold against paper.
    theme: { from: "#C05A30", via: "#D4A843", to: "#ECE9E2" },
    artwork: {
      motifs: ["grid", "ribbon", "topography"],
      titleStyles: ["editorialStack", "capsGrotesk", "outlineSerif"],
    },
  },
  {
    slug: "websites",
    name: "Websites",
    audience:
      "Operators and founders who need a site that works as a business asset, not a brochure.",
    projectSlugs: [],
    comingSoon: true,
    hidden: true,
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
    projectSlugs: [],
    hidden: true,
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
