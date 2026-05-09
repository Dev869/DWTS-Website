// Site copy seed. Edit through /admin → Site Copy. This file is the
// fallback used when the blob store is empty or unreachable.
//
// All editable on-page text lives here, organized by page. Each page is a
// flat object of string keys so the admin UI can render labeled fields.
// Keep keys stable — pages read by key, not by order.
//
// The "segment*" pages drive the /for/<slug> landing pages. Structural data
// (slug, theme, artwork, projectSlugs, hidden, comingSoon, name, audience)
// stays in src/data/segments.js — that file is imported synchronously at
// module load by nav and admin so it can't depend on the runtime hook.

const siteCopy = {
  home: {
    heroEyebrow: "· AI Automation",
    heroHeadlineLead: "Automations for",
    heroHeadlineAccent: "labs and restaurants",
    heroHeadlineTrail: ".",
    heroSubhead: "Operator-built, working code. Most pilots ship in 14 days.",
    heroSubheadAccent: "14 days.",
    heroPrimaryCtaLabel: "Watch a 60-second demo",
    heroPrimaryCtaHref: "#what-i-automate",
    heroSecondaryCtaLabel: "Book a free 20-minute audit",
    heroFootnote: "Devin Wilson  ·  B.S. Biological Sciences, UC Davis",

    whatIAutomateEyebrow: "· What I automate",
    whatIAutomateHeadlineLead: "The hours your team",
    whatIAutomateHeadlineAccent: "already knows",
    whatIAutomateHeadlineTrail: "should be running themselves.",

    automation1Kicker: "01",
    automation1Title: "Workflows",
    automation1Body:
      "Parsing plate reader exports, qPCR runs, mass spec output, and pushing the cleaned data into your ELN or LIMS without copy-paste.",
    automation2Kicker: "02",
    automation2Title: "Time-Consuming Operations",
    automation2Body:
      "Reconciling reagent inventory, auditing sample logs, flagging chain-of-custody gaps, and generating recall reminders before reagents expire.",
    automation3Kicker: "03",
    automation3Title: "Reports, intake & follow-up",
    automation3Body:
      "Turning intake forms and ELN entries into the weekly report, the insurance claim follow-up, the PI update — drafted and ready for review.",

    whatIAutomateEngageLink: "How I engage with operators →",
    whatIAutomateAboutLink: "More about me →",

    selectedWorkEyebrow: "· Selected work",
    selectedWorkHeadlineLead: "Real systems.",
    selectedWorkHeadlineAccent: "Real outcomes.",
    selectedWorkBody:
      "A working sample of the tools I've shipped — screens from production, with the numbers that matter.",

    pilotTileEyebrow: "· Pilot openings available",
    pilotTileHeadlineLead: "$1,500. 14 days.",
    pilotTileHeadlineAccent: "One specific automation.",
    pilotTileBody:
      "Half upfront. Limited spots while I'm building case studies.",
    pilotTileCtaLabel: "See engagement details →",
  },

  engagement: {
    heroEyebrow: "· Engagement",
    heroHeadlineLead: "How I work",
    heroHeadlineAccent: "with operators.",
    heroSubhead:
      "Three ways to engage. This pricing model is intentionally flexible as I build more case studies.",

    pilotKicker: "01 · Pilot",
    pilotTitle: "Pilot engagement",
    pilotPrice: "Starts at $1,500",
    pilotDuration: "14 days · One specific automation",
    pilotBody:
      "Half upfront. We pick one task: I build it, you start using it.",

    standardKicker: "02 · Standard",
    standardTitle: "Standard build",
    standardPrice: "Typically $5,000–$7,500",
    standardDuration: "30 days · Scoped per engagement",
    standardBody:
      "For builds that touch more than one workflow, integrate with an instrument or LIMS, or need a small UI. Half upfront, half on delivery. Fixed price, written scope before any work starts.",

    ongoingKicker: "03 · Ongoing",
    ongoingTitle: "Ongoing partnership",
    ongoingPrice: "Retainer pricing on request",
    ongoingDuration: "After we've shipped together",
    ongoingBody:
      "Maintenance on what we've built, and one new build per quarter. This keeps your tools running smoothly without hiccups. If something breaks, I fix it.",

    processEyebrow: "· How a typical project goes",
    processHeadline: "Five steps. No surprises.",

    step1Title: "20-minute audit call",
    step1Body:
      "We talk through the task you want gone. No slides, no pitch deck. If it's a fit, we move forward. If it's not, I'll point you at the right tool.",
    step2Title: "Written scope + fixed price",
    step2Body:
      "Within 48 hours: one page describing exactly what gets built, what it integrates with, what's out of scope, and what it costs. You sign or you don't.",
    step3Title: "Build",
    step3Body:
      "Two to six weeks depending on engagement. You see progress weekly. I ask questions in writing so they don't pile up in your inbox during the day.",
    step4Title: "Handoff",
    step4Body:
      "Working tool, runbook, and a 30-minute training session for whoever on your team owns it. The code is yours. The accounts are in your name.",
    step5Title: "Two-week follow-up",
    step5Body:
      "Two weeks after handoff we get on a call. Whatever broke or felt clunky, I fix. Reality always teaches us something the scope didn't catch.",

    ctaHeadlineLead: "Tell me what to",
    ctaHeadlineAccent: "automate.",
    ctaBody:
      "Twenty minutes, no slides. If it's a fit we'll talk scope. If it's not, I'll tell you what tool would be cheaper.",
    ctaButtonLabel: "Book a free 20-minute audit",
  },

  about: {
    eyebrow: "· About",
    headlineLead: "Hey, I'm",
    headlineAccent: "Devin.",
    bio:
      "B.S. in Biological Sciences from UC Davis. I started in Computer Science and switched into Bio Sci, which is how I ended up with a foot in both worlds, and how I landed my first real programming job stitching analysis scripts for a research lab drowning in fluorescence microscopy images. A few weeks later, runs that used to take a day finished in fifteen minutes. That was the hook. I build the same kind of automations now — for labs and for restaurant operators — full-time.",
    ctaLabel: "Book a free 20-minute audit",
    toolsEyebrow: "· Tools I reach for",
    tool1Label: "Claude Code",
    tool2Label: "n8n",
    tool3Label: "Python",
    tool4Label: "Anthropic API",
    tool5Label: "Vercel",
    tool6Label: "Postgres",
    locationLabel: "Redlands, CA",
  },

  work: {
    eyebrow: "· Portfolio",
    headlineLead: "My work",
    headlineAccent: ".",
    counterLabel: "Selected projects",
    counterTrail: " / ongoing",
    intro:
      "Lab tools, restaurant ops automations, and earlier work. The automation builds are where I focus now — the rest is here for context on how I build.",

    pilotEyebrow: "· Pilot openings available",
    pilotHeadlineLead: "Your first AI automation,",
    pilotHeadlineAccent: "shipped in 14 days.",
    pilotBody:
      "Starts at $1,500. One specific automation, half upfront, working tool at the end. Limited spots while I'm building case studies.",
    pilotCtaPrimary: "See engagement details →",
    pilotCtaSecondary: "Tell me what to automate →",
  },

  footer: {
    headlineLead: "Have a task that",
    headlineAccent: "run itself?",
    headlineMid: "should",
    ctaLabel: "Book a free 20-minute audit",
    contactLinkLabel: "or write to me",
    contactEmail: "devin@dwtailored.com",
    line1: "DW Tailored Systems",
    line2: "AI automation for labs & restaurants",
  },

  // ─── Segment landing pages: /for/<slug> ──────────────────────────────────
  // Structural data (slug, theme, artwork, projectSlugs, name, audience,
  // hidden, comingSoon) lives in src/data/segments.js. Everything textual
  // lives below.

  segmentLabs: {
    headline: "AI automation for research and clinical labs.",
    subheadline:
      "Biology degree, working code. Most pilots ship in two weeks.",
    problem:
      "Lab managers and PIs lose hours every week to instrument data parsing, sample log audits, reagent reconciliation, ELN-to-spreadsheet exports, intake forms, recall reminders, insurance follow-up, and manual report generation. The tasks are obviously automatable, but there's no postdoc with the bandwidth or skill to build it.",
    solution:
      "I scope one specific automation, build it in 2–6 weeks, hand it off with a runbook, and follow up two weeks later to fix what reality teaches us. I have a B.S. in Biological Sciences from UC Davis, so we skip the part where I learn what a plate reader is.",
    whoFor1:
      "Wet labs, vet clinics, dental practices, environmental and cannabis testing labs, university research labs, and contract research orgs",
    whoFor2:
      "Lab managers, ops leads, or junior PIs with discretionary signing authority for $1,500–$10,000",
    whoFor3: "Teams that already know which task they want to automate",
    whoNotFor1:
      "Labs that need a full LIMS replacement (I integrate with yours, not replace it)",
    whoNotFor2:
      "Procurement-heavy organizations where a $5K project takes six months to approve",
    whoNotFor3: "Anyone looking for a generic SaaS subscription",
    engagement: "Pilot from $1,500. Standard builds $5K–$7.5K. 2–6 weeks.",
    ctaLabel: "Book a free 20-minute lab audit",
  },

  segmentRestaurants: {
    headline: "AI automation for restaurant operations.",
    subheadline:
      "Same-day visibility into food cost, waste, and margin. Most pilots ship in two weeks.",
    problem:
      "Owners and ops directors fight a slow, paper-driven loop: vendor invoices arrive in PDFs, deliveries don't match POs, recipe costs go stale the day prices change, and waste lives in a back-of-house notebook. By the time the spreadsheet is current, the week is over and margin moved without you.",
    solution:
      "I scope one specific automation — invoice ingestion, recipe costing, menu engineering, or waste tracking — build it in 2–6 weeks, hand it off with a runbook, and follow up two weeks later to fix what reality teaches us. Integrates with whatever you already run (Toast, Square, Restaurant365, MarginEdge, sheets).",
    whoFor1:
      "Independent single-location restaurants and small multi-unit groups (2–10 locations)",
    whoFor2:
      "Owner-operators, GMs, or ops directors with discretionary signing authority for $1,500–$10,000",
    whoFor3: "Teams that already know which margin leak they want to plug",
    whoNotFor1:
      "Operators looking for a full POS or inventory replacement (I integrate, not replace)",
    whoNotFor2: "Multi-unit chains with corporate procurement cycles",
    whoNotFor3: "Anyone shopping for a generic SaaS subscription",
    engagement: "Pilot from $1,500. Standard builds $5K–$7.5K. 2–6 weeks.",
    ctaLabel: "Book a free 20-minute ops call",
  },

  segmentWebsites: {
    headline: "A site wired into the tools your business actually runs on.",
    subheadline:
      "Design, engineering, and integration, shipped by one person who understands the ops side.",
    problem: "",
    solution: "",
    whoFor1: "",
    whoFor2: "",
    whoFor3: "",
    whoNotFor1: "",
    whoNotFor2: "",
    whoNotFor3: "",
    engagement: "2 to 6 week fixed-scope projects.",
    ctaLabel: "Book a website call",
  },

  segmentBusinessTools: {
    headline: "Internal tools built around how your team actually works.",
    subheadline:
      "I embed with ops, learn the real process, and build exactly what you need, without the off-the-shelf compromise.",
    problem: "",
    solution: "",
    whoFor1: "",
    whoFor2: "",
    whoFor3: "",
    whoNotFor1: "",
    whoNotFor2: "",
    whoNotFor3: "",
    engagement: "Discovery → 4 to 8 week build → optional retainer.",
    ctaLabel: "Book an ops call",
  },
};

export default siteCopy;

// Map a segment slug to its siteCopy page key.
export function segmentCopyKey(slug) {
  switch (slug) {
    case "labs":
      return "segmentLabs";
    case "restaurants":
      return "segmentRestaurants";
    case "websites":
      return "segmentWebsites";
    case "business-tools":
      return "segmentBusinessTools";
    default:
      return null;
  }
}
