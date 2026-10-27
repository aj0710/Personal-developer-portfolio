/**
 * Real GitHub Projects Data - Ajay Kumar Nayak Portfolio
 * Sourced directly from https://github.com/aj0710
 */
const projectsData = [
  {
    id: "taskflow-pro",
    title: "TaskFlow Pro — Modern Task & Productivity Suite",
    category: "apps",
    badge: "JavaScript ES6+ & Offline Suite",
    summary: "Executive-grade personal productivity and task management suite featuring 6 dynamic workspaces: Kanban board with HTML5 drag-and-drop, List table view, Eisenhower matrix, monthly Calendar, SVG Analytics, and Pomodoro focus studio with procedural Web Audio synthesizer.",
    image: "assets/images/taskflow-pro.jpg",
    tags: ["Vanilla JavaScript (ES6+)", "HTML5", "CSS3", "Web Audio API", "Canvas API", "LocalStorage", "Vercel"],
    demoUrl: "https://taskflow-pro-red.vercel.app/",
    githubUrl: "https://github.com/aj0710/Taskflow-Pro",
    details: {
      overview: "TaskFlow Pro is an executive-grade, hyper-performant personal productivity and task management web application built completely with pure Vanilla JavaScript, modern CSS3, and semantic HTML5. Engineered with zero external framework dependencies, it provides 6 integrated workspaces: interactive Kanban board with HTML5 drag-and-drop, sortable List table, 2x2 Eisenhower Priority Matrix, monthly Calendar view, real-time SVG Analytics, and a Pomodoro Focus Studio with task time-tracking and procedural audio synthesis.",
      problem: "Traditional task managers often rely on heavy framework bundles, cloud subscriptions with invasive data tracking, and lack responsive offline-first capability.",
      architecture: [
        "Event-driven Pub/Sub reactive store managing task mutations, subtask completion milestones, and category tags.",
        "Modular view orchestrator cleanly decoupling Kanban drag-and-drop, table sorting, matrix quadrants, and SVG graphs.",
        "Native Web Audio API synthesizer generating completion chimes, clicks, and pomodoro bells without external audio files.",
        "Complete offline-first data model using LocalStorage with instant JSON and CSV backup and restore pipelines."
      ],
      highlights: [
        "6 Dynamic workspaces: Kanban, List Table, Eisenhower Matrix, Calendar, Analytics & Pomodoro",
        "Interactive HTML5 drag-and-drop task reordering and column sorting",
        "Procedural Web Audio synthesizer and canvas physics particle celebration",
        "100% offline-first with zero dependencies, keyboard shortcuts (N, B, L, M, C, A, P), and JSON/CSV backup"
      ]
    }
  },
  {
    id: "positivus-agency",
    title: "Positivus — Digital Marketing Agency Landing Page",
    category: "frontend",
    badge: "Modern CSS3 & Responsive UI",
    summary: "Pixel-perfect, ultra-responsive digital marketing agency landing page showcasing modern CSS3 Grid and Flexbox architectures, centralized design tokens, brand-aligned neon aesthetics, and mobile-optimized micro-interactions.",
    image: "assets/images/positivus.jpg",
    tags: ["HTML5", "CSS3", "CSS Grid & Flexbox", "Design Tokens", "Responsive Design", "Vercel"],
    demoUrl: "https://positivus-landing-page-zeta-one.vercel.app",
    githubUrl: "https://github.com/aj0710/Positivus-Landing-page",
    details: {
      overview: "Positivus is a modern, high-contrast landing page engineered for a contemporary digital marketing agency. Built strictly following modern UI/UX design standards, it showcases agency marketing services, case study accordions, team credentials, client testimonials, and a lead capture contact form with fluid animations.",
      problem: "Agency landing pages frequently suffer from sluggish load times, bloated UI libraries, and awkward layout shifts on tablet and mobile viewports.",
      architecture: [
        "Pure semantic HTML5 document outline ensuring high accessibility and maximum SEO discoverability.",
        "CSS custom properties (tokens) defining signature neon green (#B9FF66) and dark charcoal (#191A23) color palettes.",
        "Fluid responsive design built strictly with modern CSS Grid and Flexbox with zero CSS framework bloat.",
        "Touch-friendly tap targets, fluid clamp typography, and performant vector SVG assets across all viewports."
      ],
      highlights: [
        "Pixel-perfect responsive layouts tested across mobile, tablet, and ultra-wide screens",
        "Distinctive high-contrast neon green and charcoal color scheme with Google Fonts",
        "Interactive services showcase, case study cards, and working lead capture form",
        "Zero framework bloat with instant first contentful paint (FCP) and deployment on Vercel"
      ]
    }
  },
  {
    id: "personal-developer-portfolio",
    title: "Personal Developer Portfolio & Design System",
    category: "frontend",
    badge: "Design Tokens & Glassmorphism",
    summary: "Modern personal developer portfolio built with semantic HTML5, pure CSS3 design tokens, ambient glassmorphism, dynamic project filtering, case study architecture modals, and automated CI/CD pipeline.",
    image: "assets/images/portfolio.jpg",
    tags: ["Semantic HTML5", "CSS3 Tokens", "Vanilla JavaScript (ES6+)", "Glassmorphism", "Vercel", "GitHub Actions"],
    demoUrl: "https://ajay-developer-portfolio.vercel.app/",
    githubUrl: "https://github.com/aj0710/Personal-developer-portfolio",
    details: {
      overview: "Ajay.dev is a high-performance personal developer portfolio and component showcase engineered with pure semantic HTML5, modern vanilla CSS3 design tokens, and modular ES6+ JavaScript. Designed to deliver an unforgettable first impression, it features persistent dual dark/light theming, an interactive developer terminal with live JSON telemetry, dynamic project category filtering, interactive case study architecture modals, and a validated contact hub.",
      problem: "Heavy SPA frameworks add massive JavaScript bundles and hydration delays to simple developer portfolios, resulting in sluggish first paint times on mobile devices.",
      architecture: [
        "Lightweight Vanilla JavaScript ES6+ architecture delivering near-instant 100/100 Lighthouse performance without runtime framework overhead.",
        "Centralized CSS custom property design token system with HSL colors, responsive clamp typography, and ambient glassmorphic elevations.",
        "Dynamic client-side dataset model powering responsive category filtering, interactive case study modals, and spotlight hover physics.",
        "Production-grade automated CI/CD workflows integrated with GitHub Actions and Vercel edge deployment."
      ],
      highlights: [
        "Interactive Case Study architecture modal with technical deep-dives",
        "Dynamic theme switching (Dark & Light mode) with localStorage state persistence",
        "Interactive developer terminal bento card and typewriter role animation",
        "100% mobile-responsive slide-out navigation drawer and touch-friendly UI"
      ]
    }
  }
];

if (typeof window !== "undefined") {
  window.projectsData = projectsData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = projectsData;
}
