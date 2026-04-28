// Site copy seed. Edit through /admin → Site Copy. This file is the
// fallback used when the blob store is empty or unreachable.
//
// Shape is intentionally flat per page so the admin UI can render it as
// labeled fields. Keep keys stable — pages read by key, not by order.

const siteCopy = {
  home: {
    heroEyebrow: "· AI Automation for Labs",
    heroHeadlineLead: "Automations for",
    heroHeadlineAccent: "research and clinical labs",
    heroHeadlineTrail: ".",
    heroSubhead: "Biology degree, working code. Most pilots ship in 14 days.",
    heroSubheadAccent: "14 days.",
    heroPrimaryCtaLabel: "Watch a 60-second demo",
    heroPrimaryCtaHref: "#what-i-automate",
    heroSecondaryCtaLabel: "Book a free 20-minute lab audit",
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
    heroHeadlineAccent: "with labs.",
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
    standardDuration: "30 days · Scoped per lab",
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

    step1Title: "20-minute lab audit call",
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
    ctaButtonLabel: "Book a free 20-minute lab audit",
  },

  about: {
    eyebrow: "· About",
    headlineLead: "Hey, I'm",
    headlineAccent: "Devin.",
    bio:
      "B.S. in Biological Sciences from UC Davis. I started in Computer Science and switched into Bio Sci, which is how I ended up with a foot in both worlds, and how I landed my first real programming job stitching analysis scripts for a research lab drowning in fluorescence microscopy images. A few weeks later, runs that used to take a day finished in fifteen minutes. That was the hook. I do that for labs full-time now.",
    ctaLabel: "Book a free 20-minute lab audit",
    toolsEyebrow: "· Tools I reach for",
    locationLabel: "Redlands, CA",
  },

  work: {
    eyebrow: "· Portfolio",
    headlineLead: "My work",
    headlineAccent: ".",
    counterLabel: "Selected projects",
    counterTrail: " / ongoing",
    intro:
      "Lab tools and earlier work. The lab automations are where I focus now — the rest is here for context on how I build.",

    pilotEyebrow: "· Pilot openings available",
    pilotHeadlineLead: "Your lab's first AI automation,",
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
    ctaLabel: "Book a free 20-minute lab audit",
    contactLinkLabel: "or write to me",
    contactEmail: "devin@dwtailored.com",
    line1: "DW Tailored Systems",
    line2: "AI automation for research & clinical labs",
  },
};

export default siteCopy;
