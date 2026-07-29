import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouseGlow } from "./hooks/useMouseGlow";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Sections
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Gallery from "./components/sections/Gallery";
import Skills from "./components/sections/Skills";
import Stats from "./components/sections/Stats";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";

// ============================================================
// LOADING SCREEN
// ============================================================
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 18 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "#050505" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-6 mb-12"
      >
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center">
          <span className="text-3xl font-black text-black font-display">Y</span>
        </div>
        <div className="text-center">
          <h1 className="font-display font-black text-2xl tracking-tight">
            Yanuar Arifin Ilham
          </h1>
          <p className="text-sm text-white/40 mt-1">Portfolio · 2026</p>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #F97316)",
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <p className="text-xs text-white/25 mt-4 font-medium tabular-nums">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </motion.div>
  );
}

// ============================================================
// CURSOR
// ============================================================
function CustomCursor({ mousePos }) {
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const dotTarget = useRef({ x: mousePos.x, y: mousePos.y });
  const ringTarget = useRef({ x: mousePos.x, y: mousePos.y });
  const dotCurrent = useRef({ x: mousePos.x, y: mousePos.y });
  const ringCurrent = useRef({ x: mousePos.x, y: mousePos.y });
  const rafRef = useRef(null);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const handleMove = (e) => {
      dotTarget.current = { x: e.clientX, y: e.clientY };
      ringTarget.current = { x: e.clientX, y: e.clientY };
    };
    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const animate = () => {
      dotCurrent.current.x = lerp(
        dotCurrent.current.x,
        dotTarget.current.x,
        0.9,
      );
      dotCurrent.current.y = lerp(
        dotCurrent.current.y,
        dotTarget.current.y,
        0.9,
      );
      ringCurrent.current.x = lerp(
        ringCurrent.current.x,
        ringTarget.current.x,
        0.12,
      );
      ringCurrent.current.y = lerp(
        ringCurrent.current.y,
        ringTarget.current.y,
        0.12,
      );

      if (dotRef.current) {
        dotRef.current.style.left = `${dotCurrent.current.x}px`;
        dotRef.current.style.top = `${dotCurrent.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringCurrent.current.x}px`;
        ringRef.current.style.top = `${ringCurrent.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
      />
    </>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [loading, setLoading] = useState(true);
  const mousePos = useMouseGlow();

  return (
    <>
      {/* Custom Cursor — desktop only */}
      <CustomCursor mousePos={mousePos} />

      {/* Mouse glow follow */}
      <div
        className="mouse-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
        aria-hidden="true"
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main Site */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          className="relative"
          style={{ background: "#050505" }}
        >
          <Navbar />

          <main>
            <Hero />
            <Stats />
            <About />
            <Experience />
            <Projects />
            <Gallery />
            <Skills />
            <Resume />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}
