// ============================================================
// DATA: gallery.js
// ============================================================

export const galleryCategories = [
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "graphic",     label: "Graphic Design" },
  { id: "motion",      label: "Motion & 3D" },
];

// ============================================================
// PHOTOGRAPHY — public/assets/photos/1.jpg … 8.jpg
// ============================================================

const base = import.meta.env.BASE_URL;

export const photoGallery = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `${base}assets/photos/${i + 1}.jpg`,
  alt: `Photography — ${i + 1}`,
  category: "photography",
}));

// ============================================================
// VIDEOGRAPHY
// ============================================================

export const videoGallery = [
  {
    id: 1,
    title: "COBRA 2026 Vol. 1 — Full Film",
    description: "Full documentary film for COBRA (Computer Celebrate Graduation) 2026 — graduation celebration event from the Faculty of Computer Science UPNVJ.",
    youtubeId: "waKMJYuEc6w",
    category: "videography",
    tag: "Event Film",
  },
  {
    id: 2,
    title: "COBRA 2026 Vol. 2 — Highlights",
    description: "Highlight reel and second volume of the COBRA 2026 graduation event coverage for FIK UPNVJ.",
    youtubeId: "CXW5OX2JlfY",
    category: "videography",
    tag: "Event Highlights",
  },
  {
    id: 3,
    title: "Company Profile — BEM FIK 2025",
    description: "Official company profile for BEM FIK UPNVJ 2025, Kabinet Akasha Vartha. Showcases the cabinet's vision, programs, and team.",
    youtubeId: "No-Y1BNCi4M",
    category: "videography",
    tag: "Company Profile",
  },
  {
    id: 4,
    title: "Teaser — FIK FAIR 2026",
    description: "Official teaser video for FIK FAIR 2026, the annual festival of the Faculty of Computer Science UPNVJ.",
    youtubeId: "ysQ3671bzPU",
    category: "videography",
    tag: "Event Teaser",
  },
  {
    id: 5,
    title: "Engagement — Adnan & Intan",
    description: "Cinematic engagement ceremony coverage. Capturing intimate moments and celebration in a warm, documentary style.",
    youtubeId: "NkmBjXSNmVc",
    category: "videography",
    tag: "Event",
  },
  {
    id: 6,
    title: "Video LENTERA — MKWK UPNVJ",
    description: "Documentary for Kelompok 1 HABIBIE: 'Habibie: Cendekiawan, Pemimpin dan Arsitek Demokrasi Indonesia' — LENTERA MKWK UPNVJ program.",
    youtubeId: "8w3pXi424Zw",
    category: "videography",
    tag: "Documentary",
  },
  {
    id: 7,
    title: "Spend The Holiday With U",
    description: "A cinematic short capturing holiday moments. Shot in a warm, personal travel style.",
    youtubeId: "IlgIqtVdHxE",
    category: "videography",
    tag: "Short Film",
  },
  {
    id: 8,
    title: "Morning In April",
    description: "A slow-paced aesthetic short film capturing the quiet mood of an April morning. Personal creative project.",
    youtubeId: "ytY0Vd1qhDA",
    category: "videography",
    tag: "Short Film",
  },
];

// ============================================================
// GRAPHIC DESIGN
// ============================================================

export const graphicGallery = [
  {
    id: 1,
    title: "BEMFIK Open Recruitment",
    image: null,
    description: "Poster design for open recruitment campaign for BEM FIK UPNVJ.",
    category: "graphic",
    tag: "Poster",
    color: "#3B82F6",
  },
  {
    id: 2,
    title: "PKKMB FIK 2026 — Visual Identity",
    image: null,
    description: "Brand identity system for orientation week 2026. Deliverables include logo, color palette, typography, and templates.",
    category: "graphic",
    tag: "Brand Identity",
    color: "#8B5CF6",
  },
  {
    id: 3,
    title: "Campaign Poster Series",
    image: null,
    description: "A series of campaign posters for various faculty events and initiatives.",
    category: "graphic",
    tag: "Campaign",
    color: "#F97316",
  },
  {
    id: 4,
    title: "API — Visual Collateral",
    image: null,
    description: "Visual materials for a technical project or event.",
    category: "graphic",
    tag: "Design Collateral",
    color: "#10B981",
  },
  {
    id: 5,
    title: "UKOM SMK — Educational Materials",
    image: null,
    description: "Visual materials produced for a vocational examination context.",
    category: "graphic",
    tag: "Educational",
    color: "#EC4899",
  },
];

// ============================================================
// MOTION & 3D
// ============================================================

export const motionGallery = [
  {
    id: 1,
    title: "After Effect Project: Instagram Story",
    youtubeId: "qXlvbf6Vkdo",
    tags: ["Motion Graphic", "After Effects"],
  },
  {
    id: 2,
    title: "Twibbon PKKMB FIK 2025",
    image: null,
    description: "Motion graphic twibbon frame for PKKMB FIK UPNVJ 2025. Animated overlay designed for social media sharing.",
    youtubeId: "MRjkXiYi1Xc",
    category: "motion",
    tag: "Motion Graphic",
    color: "#8B5CF6",
  },
  {
    id: 2,
    title: "Logo Animation",
    image: null,
    description: "Animated logo reveal. Add details about the organization, tools used, and final output.",
    youtubeId: null,
    category: "motion",
    tag: "Logo Animation",
    color: "#3B82F6",
  },
  {
    id: 3,
    title: "UI Motion — Prototypes",
    image: null,
    description: "Micro-interaction prototypes for mobile interface design.",
    youtubeId: null,
    category: "motion",
    tag: "UI Animation",
    color: "#F97316",
  },
];
