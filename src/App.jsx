import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouseGlow } from "./hooks/useMouseGlow";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Sections
import Hero from "./components/sections/Hero";
const About = lazy(() => import("./components/sections/About"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Gallery = lazy(() => import("./components/sections/Gallery"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Stats = lazy(() => import("./components/sections/Stats"));
const Resume = lazy(() => import("./components/sections/Resume"));
const Contact = lazy(() => import("./components/sections/Contact"));

// ============================================================
// SPLASH SCREEN — cinematic version
// ============================================================
function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0 → line draws in
  // phase 1 → name reveals letter by letter
  // phase 2 → subtitle fades
  // phase 3 → exit wipe

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(onComplete, 3000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const name = "Yanuar Arifin Ilham";
  const letters = name.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8">

        {/* Top accent line */}
        <motion.div
          className="h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, transparent)" }}
          initial={{ width: 0, opacity: 0 }}
          animate={phase >= 0 ? { width: 160, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Name — letter by letter reveal */}
        <div className="overflow-hidden">
          <div className="flex items-center">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                className="font-display font-black text-white"
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                  letterSpacing: char === " " ? "0.25em" : "-0.02em",
                  display: "inline-block",
                  whiteSpace: "pre",
                }}
                initial={{ y: 60, opacity: 0, rotateX: -40 }}
                animate={phase >= 1 ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: i * 0.035,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-4 h-px bg-white/30" />
          <span className="text-xs font-semibold text-white/40 tracking-[0.25em] uppercase">
            Portfolio · 2026
          </span>
          <div className="w-4 h-px bg-white/30" />
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #F97316, #8B5CF6, transparent)" }}
          initial={{ width: 0, opacity: 0 }}
          animate={phase >= 2 ? { width: 80, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      {/* Corner labels — like a film slate */}
      <motion.div
        className="absolute top-8 left-8 text-[10px] text-white/15 font-mono tracking-widest"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        YAI · 2026
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 text-[10px] text-white/15 font-mono tracking-widest"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        PORTFOLIO
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-8 text-[10px] text-white/15 font-mono tracking-widest"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        JAKARTA · ID
      </motion.div>
    </motion.div>
  );
}

function LazySection({ children }) {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldRender ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}

// ============================================================
// MAIN APP — custom cursor removed
// ============================================================
export default function App() {
  const [loading, setLoading] = useState(true);
  const mousePos = useMouseGlow();

  return (
    <>
      {/* Mouse glow follow — kept, subtle, non-intrusive */}
      <div
        className="mouse-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
        aria-hidden="true"
      />

      {/* Splash Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main Site */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : isMobile ? 0.3 : 0.8 }}
          className="relative"
          style={{ background: "#050505" }}
        >
          <Navbar />

          <main>
            <Hero />
            <LazySection>
              <Stats />
            </LazySection>
            <LazySection>
              <About />
            </LazySection>
            <LazySection>
              <Experience />
            </LazySection>
            <LazySection>
              <Projects />
            </LazySection>
            <LazySection>
              <Gallery />
            </LazySection>
            <LazySection>
              <Skills />
            </LazySection>
            <LazySection>
              <Resume />
            </LazySection>
            <LazySection>
              <Contact />
            </LazySection>
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
