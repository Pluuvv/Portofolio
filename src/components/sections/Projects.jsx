import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, FileText, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { projects } from '../../data/projects'

const accentColors = {
  blue:   { glow: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.25)',  text: '#60A5FA' },
  purple: { glow: 'rgba(139,92,246,0.10)',  border: 'rgba(139,92,246,0.25)',  text: '#A78BFA' },
  orange: { glow: 'rgba(249,115,22,0.10)',  border: 'rgba(249,115,22,0.25)',  text: '#FB923C' },
}

// ============================================================
// SCREENSHOT CAROUSEL
// ============================================================
function ScreenshotCarousel({ screenshots, thumbnail, title, large, accentColor }) {
  const slides = screenshots?.length > 0 ? screenshots : thumbnail ? [{ src: thumbnail, caption: title }] : null
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const accent = accentColors[accentColor] || accentColors.blue

  const next = useCallback(() => setIdx(i => (i + 1) % slides.length), [slides?.length])
  const prev = useCallback(() => setIdx(i => (i - 1 + slides.length) % slides.length), [slides?.length])

  // Auto-advance every 3s unless hovered
  useEffect(() => {
    if (!slides || slides.length <= 1 || paused) return
    const t = setInterval(next, 3000)
    return () => clearInterval(t)
  }, [slides, paused, next])

  if (!slides) {
    return (
      <div
        className="w-full h-full flex items-end p-5"
        style={{
          background: `linear-gradient(160deg, ${accentColor}10 0%, ${accentColor}05 100%)`,
        }}
      />
    )
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={idx}
          src={slides[idx].src}
          alt={slides[idx].caption || title}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.02)' }}
        />
      </AnimatePresence>

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Caption */}
      {slides[idx].caption && (
        <div className="absolute bottom-2 left-3 z-10">
          <span className="text-[10px] font-semibold text-white/70 tracking-wide">
            {slides[idx].caption}
          </span>
        </div>
      )}

      {/* Nav arrows — only if multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={14} className="text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Next screenshot"
          >
            <ChevronRight size={14} className="text-white" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 right-3 z-10 flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                aria-label={`Go to screenshot ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === idx ? '16px' : '5px',
                  height: '5px',
                  background: i === idx ? accent.text : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>

          {/* Screenshot count badge */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Images size={10} className="text-white/60" />
            <span className="text-[10px] text-white/60 font-medium">{idx + 1}/{slides.length}</span>
          </div>
        </>
      )}
    </div>
  )
}

// ============================================================
// PROJECT CARD
// ============================================================
function ProjectCard({ project, index, large = false }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [hovered, setHovered] = useState(false)
  const accent = accentColors[project.accentColor] || accentColors.blue
  const hasLinks = project.github || project.demo || project.caseStudy

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(255,255,255,0.022)',
        border: `1px solid ${hovered ? accent.border : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${accent.border}` : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* ── Screenshot Carousel ─────────────────────────────── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: large ? '220px' : '175px' }}
      >
        <ScreenshotCarousel
          screenshots={project.screenshots}
          thumbnail={project.thumbnail}
          title={project.title}
          large={large}
          accentColor={project.accentColor}
        />
      </div>

      {/* ── Card body ────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-4">

        {/* Title & subtitle */}
        <div>
          <h3
            className="font-display font-bold text-white/90 group-hover:text-white transition-colors leading-snug mb-1"
            style={{ fontSize: large ? '1.2rem' : '1.05rem' }}
          >
            {project.title}
          </h3>
          <p className="text-sm font-medium" style={{ color: accent.text }}>{project.subtitle}</p>
        </div>

        {/* Role */}
        <p className="text-xs text-white/38 font-medium">{project.role}</p>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Outcome */}
        {project.outcome && (
          <p className="text-sm text-white/60 leading-relaxed border-l-2 border-white/15 pl-3">
            {project.outcome}
          </p>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, large ? 6 : 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.52)',
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (large ? 6 : 4) && (
            <span className="text-xs px-2.5 py-1 text-white/28 font-medium">
              +{project.technologies.length - (large ? 6 : 4)} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="pt-4 border-t border-white/06 flex items-center gap-1 flex-wrap">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/05"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              aria-label={`Live demo: ${project.title}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/05"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
          {project.caseStudy && (
            <a href={project.caseStudy} target="_blank" rel="noopener noreferrer"
              aria-label={`Case study: ${project.title}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/05"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText size={13} /> Case Study
            </a>
          )}
          {!hasLinks && (
            <span className="text-xs text-white/22 italic">Links coming soon</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ============================================================
// PROJECTS SECTION
// ============================================================
export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="projects" className="section-padding relative overflow-hidden" aria-label="Projects section">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 mb-14"
        >
          <span className="section-subtitle">Work</span>
          <h2 className="section-title font-display">
            Selected <span className="text-gradient-blue">Projects</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            A selection of academic, organizational, and freelance projects across design, development, and data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
