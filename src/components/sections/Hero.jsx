import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  Download,
  MapPin,
  Briefcase,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";
import MagneticButton from "../ui/MagneticButton";

// Word-by-word animation for headline
const words = [
  "Designing",
  "Digital",
  "Experiences",
  "That",
  "Actually",
  "Work.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ============================================================
// STATUS CARD DATA
// CONTENT UPDATE REQUIRED
// Update these values to reflect your current situation.
// ============================================================
const statusItems = [
  {
    icon: Briefcase,
    label: "Current Role",
    value: "Vice Chairperson, BEM FIK UPNVJ",
    color: "#3B82F6",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jakarta, Indonesia",
    color: "#8B5CF6",
  },
  {
    icon: Target,
    label: "Current Focus",
    value: "Android Dev · IoT · UI/UX",
    color: "#F97316",
  },
  {
    icon: CheckCircle2,
    label: "Availability",
    value: "Open to Internship & Freelance",
    color: "#10B981",
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Single ambient glow — kept minimal */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[140px] bg-blue-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-[1.1fr,0.9fr] gap-16 items-center w-full">
        {/* ── Left: Text content ─────────────────────────────── */}
        <motion.div
          style={{ y, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 z-10 order-2 lg:order-1"
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 text-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {/* TODO: Update availability status when it changes */}
              <span className="text-white/65 font-medium">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <h1
              className="font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.7 + i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className={`inline-block mr-4 ${word === "Work." ? "text-gradient-blue" : "text-white"}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subtitle — professional, no buzzwords */}
          <motion.p
            variants={itemVariants}
            className="text-white/50 text-lg leading-relaxed max-w-xl font-light"
          >
            Information Systems student at UPN Veteran Jakarta (GPA 3.86).
            Building native Android apps, full-stack web systems, and IoT
            architectures — while leading BEM FIK UPNVJ as Vice Chairperson.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <MagneticButton
              as="button"
              onClick={scrollToProjects}
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-300"
              strength={0.3}
            >
              View Projects
              <ArrowDown
                size={15}
                className="group-hover:translate-y-0.5 transition-transform"
              />
            </MagneticButton>

            {/*
              ASSET REQUIRED
              Replace href with your actual resume PDF path.
              File is currently at: public/assets/resume.pdf
            */}
            <MagneticButton
              as="a"
              href="./assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl glass border border-white/15 text-white font-semibold text-sm hover:border-white/30 hover:bg-white/05 transition-all duration-300"
              strength={0.3}
            >
              <Download size={15} />
              Download Resume
            </MagneticButton>
          </motion.div>

          {/* Status cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 max-w-md"
          >
            {statusItems.map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="glass border border-white/07 rounded-xl p-4 flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <Icon size={12} style={{ color }} />
                  <span className="text-xs font-medium uppercase tracking-wider text-white/35">
                    {label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white/90 leading-snug">
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Portrait ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative flex justify-center lg:justify-end z-10 order-1 lg:order-2"
        >
          {/*
            ASSET REQUIRED
            Hero portrait image.
            Currently using: public/assets/hero-portrait.jpg (copied from Foto/1.jpg)
            Replace with your preferred professional portrait photo.
          */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            {/* Subtle rim light — single, restrained */}
            <div
              className="absolute inset-0 rounded-3xl -z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.15) 100%)",
                transform: "scale(1.04)",
                filter: "blur(24px)",
                opacity: 0.6,
              }}
            />

            {/* Portrait frame */}
            <div
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/08"
              style={{
                boxShadow:
                  "0 0 40px rgba(59,130,246,0.12), 0 32px 64px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src="./assets/hero-portrait.png"
                alt="Yanuar Arifin Ilham"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = "none";
                  e.target.parentNode.style.background =
                    "linear-gradient(160deg, #0f0f0f 0%, #1a1a2e 100%)";
                }}
              />
              {/* Bottom gradient for image depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-white/25 tracking-widest uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}
