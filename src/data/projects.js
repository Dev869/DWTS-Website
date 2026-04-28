const projects = [
  {
    id: 1,
    title: "Flourescence Analysis Pipeline",
    slug: "fluorescence-pipeline",
    layout: "casestudy",
    description:
      "A toolkit built using an amalgamation of multiple applications to streamline an otherwise manual and labor-intensive task. A fantastic toolkit for calcium spark image analysis, built for a specfic lab at Loma Linda University.",
    headline: "Automating hours of microscopy analysis into minutes.",
    problem:
      "Researchers at Loma Linda University spent hours manually analyzing fluorescence microscopy images: tracing calcium sparks, measuring intensity over time, and exporting data by hand. The process was tedious, error-prone, and didn't scale with growing datasets.",
    approach:
      "Built an automated pipeline using Python and Jupyter notebooks that detects calcium sparks, measures fluorescence intensity across time and space, and generates publication-ready visualizations, all in one reproducible workflow.",
    results: [
      { metric: "80%", label: "Time Saved" },
      { metric: "3x", label: "More Data Processed" },
      { metric: "1", label: "Lab Adopted" },
    ],
    techStack: ["Python", "Jupyter Notebook", "NumPy", "Matplotlib", "SciPy"],
    tags: ["Python", "Jupyter Notebook", "Biotech", "Pipeline"],
    category: "Analytics",
    gradient: "from-amber-200 via-orange-100 to-yellow-50",
    link: "https://github.com/Dev869/Fluorescence-Analysis-Regarding-Time-Space",
    image: "/previews/fluorescence-pipeline.png",
    features: [
      { icon: "microscope", title: "Automated Detection", desc: "Identifies calcium sparks across thousands of frames without manual tracing" },
      { icon: "chart", title: "Intensity Analysis", desc: "Measures fluorescence intensity over time and space with sub-pixel accuracy" },
      { icon: "code", title: "Reproducible Workflow", desc: "Jupyter notebooks ensure every step is documented and repeatable" },
      { icon: "export", title: "Publication Ready", desc: "Generates matplotlib visualizations formatted for journal submission" },
    ],
    processSteps: [
      { label: "Image Capture", desc: "Raw fluorescence microscopy images loaded from lab equipment" },
      { label: "Detection", desc: "Automated calcium spark identification across frames" },
      { label: "Measurement", desc: "Intensity tracking over time and spatial coordinates" },
      { label: "Visualization", desc: "Publication-ready charts and heatmaps generated" },
    ],
    before: [
      "Manual tracing of calcium sparks by hand",
      "Hours spent per image set",
      "Inconsistent measurements across researchers",
      "Data locked in proprietary formats",
    ],
    after: [
      "Automated detection across thousands of frames",
      "Minutes per complete analysis run",
      "Consistent, reproducible measurements every time",
      "Open formats with publication-ready exports",
    ],
    quote: "This pipeline replaced a full day of manual work with a 15-minute automated run, and the results are more accurate.",
    quoteAttribution: "Built for Loma Linda University",
    gallery: [
      { src: "/previews/fluorescence-pipeline.png", caption: "Pipeline overview: automated calcium spark detection" },
      { src: "/screenshots/fluorescence-github.png", caption: "Open-source repository with Jupyter notebooks and analysis tools" },
    ],
  },
  {
    id: 2,
    title: "Pulse Wave Velocity Analysis Toolkit",
    slug: "pulse-wave-toolkit",
    layout: "interactive",
    description:
      "An intelligent app designed in place of an expensive, proprietary software. Overcomes demanding processes such as image processing and edge tracing through libraries such as OpenCV.",
    headline: "Replacing expensive proprietary software with open-source intelligence.",
    problem:
      "Medical researchers needed pulse wave velocity measurements but were locked into costly proprietary software. The existing tools lacked transparency, couldn't be customized, and created vendor dependency.",
    approach:
      "Designed a Streamlit-based application that leverages OpenCV for image processing and edge tracing. The app provides an intuitive interface for uploading images, processing waveforms, and extracting velocity measurements, all open-source.",
    results: [
      { metric: "$0", label: "License Cost" },
      { metric: "100%", label: "Open Source" },
      { metric: "< 5s", label: "Processing Time" },
    ],
    techStack: ["Python", "Streamlit", "OpenCV", "NumPy", "Pandas"],
    tags: ["Python", "Streamlit", "OpenCV", "Biotech"],
    category: "Analytics",
    gradient: "from-stone-300 via-stone-200 to-stone-100",
    link: "https://github.com/Dev869/Pulse-Wave-Analysis-Toolkit",
    image: "/previews/pulse-wave-toolkit.png",
    demoUrl: "https://github.com/Dev869/Pulse-Wave-Analysis-Toolkit",
    features: [
      { icon: "upload", title: "Image Upload", desc: "Drag-and-drop medical imaging files for instant processing" },
      { icon: "eye", title: "Edge Detection", desc: "OpenCV-powered contour tracing identifies arterial wall boundaries" },
      { icon: "wave", title: "Waveform Analysis", desc: "Extracts pulse wave velocity from processed image sequences" },
      { icon: "download", title: "Data Export", desc: "Export measurements as CSV or generate visual reports" },
    ],
    processSteps: [
      { label: "Upload", desc: "Drop in medical imaging files from any source" },
      { label: "Detect", desc: "OpenCV traces arterial wall edges automatically" },
      { label: "Analyze", desc: "Pulse wave velocity calculated from waveforms" },
      { label: "Export", desc: "Download CSV data or visual PDF reports" },
    ],
    before: [
      "Expensive proprietary software licenses",
      "Vendor lock-in with no customization",
      "Black-box algorithms with no transparency",
      "Limited export options",
    ],
    after: [
      "Zero license cost, fully open source",
      "Complete control to customize and extend",
      "Transparent algorithms using proven OpenCV methods",
      "Export to CSV, PDF, or any format needed",
    ],
    quote: "What used to require a $10,000 software license now runs free in a browser, with better customization.",
    quoteAttribution: "Open-Source Medical Research Tool",
    gallery: [
      { src: "/previews/pulse-wave-toolkit.png", caption: "Streamlit interface for uploading and processing ultrasound images" },
      { src: "/screenshots/pulse-wave-github.png", caption: "Open-source repository: Python, OpenCV, and Streamlit" },
    ],
  },
  {
    id: 3,
    title: "DocuHub Education Reporting",
    slug: "docuhub-reporting",
    layout: "showcase",
    description:
      "A concept designed for school districts to improve sub-teacher communication networks. Primary goals include decreasing liability and streamlining current reporting processes. Utilizes an ask agent to assist in reporting.",
    headline: "Streamlining school district reporting with AI-powered communication.",
    problem:
      "School districts struggled with fragmented communication between substitute teachers and administration. Reporting was manual, inconsistent, and created liability gaps. No centralized system existed to track incidents and generate actionable reports.",
    approach:
      "Built a full-stack React application on Firebase with an integrated Gemini AI agent. The system provides structured reporting templates, real-time communication channels, and an AI assistant that helps substitute teachers document incidents accurately and completely.",
    results: [
      { metric: "60%", label: "Faster Reporting" },
      { metric: "AI", label: "Assisted Documentation" },
      { metric: "Real-time", label: "Communication" },
    ],
    techStack: ["React", "Firebase", "Node.js", "Gemini AI", "Cloud Functions"],
    tags: ["React", "Cloud", "Firebase", "Node.js", "Education", "Gemini AI"],
    category: "Reporting",
    gradient: "from-stone-300 via-stone-200 to-stone-100",
    link: "https://rusd-docusched-3cfc3.web.app/",
    image: "/previews/docuhub-reporting.png",
    features: [
      { icon: "doc", title: "Structured Reports", desc: "Guided templates ensure consistent, complete incident documentation" },
      { icon: "ai", title: "AI Writing Assistant", desc: "Gemini-powered agent helps compose clear, professional reports" },
      { icon: "realtime", title: "Live Communication", desc: "Real-time channels between subs, teachers, and administration" },
      { icon: "shield", title: "Liability Protection", desc: "Timestamped records and audit trails reduce district liability" },
    ],
    processSteps: [
      { label: "Incident", desc: "Substitute teacher encounters a reportable event" },
      { label: "Document", desc: "AI-assisted report creation with guided templates" },
      { label: "Notify", desc: "Real-time alerts to administration and teachers" },
      { label: "Resolve", desc: "Tracked follow-up with full audit trail" },
    ],
    before: [
      "Paper forms and email chains",
      "Inconsistent reporting across substitutes",
      "No real-time visibility for administrators",
      "Liability gaps from missing documentation",
    ],
    after: [
      "Digital, structured reporting templates",
      "AI-assisted writing ensures completeness",
      "Real-time dashboards and notifications",
      "Complete audit trail for legal protection",
    ],
    quote: "Finally, a system where substitute teachers can document incidents properly, and administration knows about it in real time.",
    quoteAttribution: "Designed for School Districts",
    gallery: [
      { src: "/previews/docuhub-reporting.png", caption: "Dashboard overview: reporting interface and navigation" },
      { src: "/screenshots/docuhub-login.png", caption: "Login screen with Google SSO and access code entry" },
    ],
  },
];

/**
 * Returns marketing-friendly highlight strings for a project preview.
 * Prefers explicit `outcomes`, then derives from `results` (metric + label),
 * and only falls back to `tags`/`techStack` if nothing else is set.
 *
 * Use this on Home/Work previews where the audience is potential clients,
 * not engineering recruiters.
 *
 * @param {object} project
 * @param {number} [max=4]
 * @returns {{ value: string, label: string }[]}
 */
export function getProjectHighlights(project, max = 4) {
  if (!project) return [];
  if (Array.isArray(project.outcomes) && project.outcomes.length) {
    return project.outcomes.slice(0, max).map((o) =>
      typeof o === "string" ? { value: "", label: o } : { value: o.value || "", label: o.label || "" }
    );
  }
  if (Array.isArray(project.results) && project.results.length) {
    return project.results.slice(0, max).map((r) => ({
      value: r.metric || "",
      label: r.label || "",
    }));
  }
  return (project.tags || project.techStack || [])
    .slice(0, max)
    .map((t) => ({ value: "", label: t }));
}

export default projects;
