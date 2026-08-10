// ============================================================
// DATA: gallery.js
// ============================================================
// CONTENT UPDATE REQUIRED
// Photography: Numbered images are copied from your Foto/ folder.
//   Review and remove any photos not suitable for a professional portfolio.
// Videography: Add YouTube video IDs for each video.
// Graphic Design: Replace placeholder descriptions with accurate project info.
// Motion: Add real items or remove section if not yet portfolio-ready.

export const galleryCategories = [
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "graphic", label: "Graphic Design" },
  { id: "motion", label: "Motion & 3D" },
];

// ============================================================
// PHOTOGRAPHY
// Photos are sourced from public/assets/photos/
// TODO: Review all 20 photos and remove any that are not
//       representative of professional or portfolio-quality work.
//       Add proper alt text describing the actual photo subject.
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
// TODO: For each video, add:
//   - youtubeId: the YouTube video ID (e.g., "dQw4w9WgXcQ")
//   - A short accurate description of the video
// Leave youtubeId as null if not yet uploaded to YouTube.
// ============================================================

export const videoGallery = [
  {
    id: 1,
    title: "SATU WAKTU",
    // TODO: Write an accurate description of this video
    description:
      "A short film project. Add description of subject, style, and context.",
    // TODO: Add YouTube video ID when available
    youtubeId: null,
    category: "videography",
    // TODO: Confirm the correct genre/tag for this video
    tag: "Short Film",
  },
  {
    id: 2,
    title: "Morning In April",
    // TODO: Write an accurate description of this video
    description:
      "A lifestyle video. Add description of subject, style, and context.",
    youtubeId: null,
    category: "videography",
    tag: "Lifestyle",
  },
  {
    id: 3,
    title: "Spend The Holiday With U",
    description:
      "A travel documentation video. Add description of destinations and style.",
    youtubeId: null,
    category: "videography",
    tag: "Travel",
  },
  {
    id: 4,
    title: "Engagement — Adnan & Intan",
    description:
      "Event videography for an engagement ceremony. Add details about the coverage style.",
    youtubeId: null,
    category: "videography",
    tag: "Event",
  },
  {
    id: 5,
    title: "Trip Promotion",
    description:
      "Promotional video for travel services. Add details about the client and deliverable.",
    youtubeId: null,
    category: "videography",
    tag: "Promotional",
  },
  {
    id: 6,
    title: "FIK FAIR — Teaser",
    description:
      "Teaser video for the Faculty of Computer Science annual fair event.",
    youtubeId: null,
    category: "videography",
    tag: "Event Teaser",
  },
];

// ============================================================
// GRAPHIC DESIGN
// TODO: For each item:
//   - Add an actual image path if a JPG/PNG preview exists
//   - Write accurate project context and deliverables
//   - Remove items that are not yet portfolio-ready
// ============================================================

export const graphicGallery = [
  {
    id: 1,
    title: "BEMFIK Open Recruitment",
    // TODO: Add image path — public/assets/graphic/bemfik-oprec.jpg
    image: null,
    description:
      "Poster design for open recruitment campaign. Add context about the brief, tools used, and output format.",
    category: "graphic",
    tag: "Poster",
    color: "#3B82F6",
  },
  {
    id: 2,
    title: "PKKMBF IK 2026 — Visual Identity",
    image: null,
    description:
      "Brand identity system for orientation week 2026. Add context about deliverables — logo, color palette, typography, templates.",
    category: "graphic",
    tag: "Brand Identity",
    color: "#8B5CF6",
  },
  {
    id: 3,
    title: "Campaign Poster Series",
    image: null,
    // TODO: Add context about the campaign purpose and target audience
    description:
      "A series of campaign posters. Add description of the project context and design approach.",
    category: "graphic",
    tag: "Campaign",
    color: "#F97316",
  },
  {
    id: 4,
    title: "API — Visual Collateral",
    image: null,
    // TODO: Clarify what "API" refers to in this context
    description:
      "Visual materials for a technical project or event. Add description of deliverables.",
    category: "graphic",
    tag: "Design Collateral",
    color: "#10B981",
  },
  {
    id: 5,
    title: "UKOM SMK — Educational Materials",
    image: null,
    description:
      "Visual materials produced for a vocational examination context. Add description of format and output.",
    category: "graphic",
    tag: "Educational",
    color: "#EC4899",
  },
];

// ============================================================
// MOTION & 3D
// TODO: Add real motion/3D work with accurate descriptions.
//       If this section is not ready, remove it from galleryCategories.
// ============================================================

export const motionGallery = [
  {
    id: 1,
    title: "Logo Animation",
    image: null,
    // TODO: Add context — which organization, what software, what duration
    description:
      "Animated logo reveal. Add details about the organization, tools used, and final output.",
    category: "motion",
    tag: "Logo Animation",
    color: "#3B82F6",
  },
  {
    id: 2,
    title: "3D Design Concept",
    image: null,
    // TODO: Add context — what software, what was the brief
    description:
      "3D environment or product concept. Add description of tools and design intent.",
    category: "motion",
    tag: "3D",
    color: "#8B5CF6",
  },
  {
    id: 3,
    title: "UI Motion — Prototypes",
    image: null,
    description:
      "Micro-interaction prototypes for mobile interface design. Add context about the project.",
    category: "motion",
    tag: "UI Animation",
    color: "#F97316",
  },
];
