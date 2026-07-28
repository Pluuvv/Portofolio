import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, FileText } from 'lucide-react'
import { projects } from '../../data/projects'

const accentColors = {
  blue:   { glow: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.25)',  text: '#60A5FA' },
  purple: { glow: 'rgba(139,92,246,0.10)',  border: 'rgba(139,92,246,0.25)',  text: '#A78BFA' },
  orange: { glow: 'rgba(249,115,22,0.10)',  border: 'rgba(249,115,22,0.25)',  text: '#FB923C' },
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
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.5)` : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* ── Thumbnail or color block ─────────────────────── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: large ? '200px' : '160px' }}
      >
        {project.thumbnail ? (
          /*
            ASSET REQUIRED
            Add project screenshot to public/assets/projects/
            and set thumbnail path in projects.js
          */
          <img
            src={project.thumbnail}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }}
          />
        ) : (
          // Placeholder — replace with real screenshot
          <div
            className="w-full h-full flex items-end p-5"
            style={{
              background: `linear-gradient(160deg, ${project.color}10 0%, ${project.color}05 100%)`,
              borderBottom: `1px solid ${project.color}18`,
            }}
          >
            {/* Category & year — no emoji/icon fillers */}
            <div className="flex items-center justify-between w-full">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}25` }}
              >
                {project.category}
              </span>
              <span className="text-xs text-white/30 font-medium">{project.year}</span>
            </div>
          </div>
        )}
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

        {/* Outcome — only show if populated */}
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

        {/* Links — only render if real URLs exist */}
        <div className="pt-4 border-t border-white/06 flex items-center gap-1 flex-wrap">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/05"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo: ${project.title}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/05"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {project.caseStudy && (
            <a
              href={project.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Case study: ${project.title}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/05"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText size={13} />
              Case Study
            </a>
          )}
          {/* Only show placeholder text when no links exist — removed from final publish */}
          {!hasLinks && (
            <span className="text-xs text-white/22 italic">
              {/* TODO: Add repository and demo links in projects.js */}
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

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

        {/*
          Bento grid layout:
          — First (featured) project spans 2 columns on large screens
          — Remaining projects fill standard grid cells
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2">
            <ProjectCard project={projects[0]} index={0} large />
          </div>
          <div>
            <ProjectCard project={projects[1]} index={1} />
          </div>
          {projects.slice(2).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 2} />
          ))}
        </div>

        {/*
          TODO: Add project thumbnails to improve visual quality.
          Screenshot format: 16:9 or 4:3, min 1200px wide.
          Save to: public/assets/projects/<project-slug>.jpg
          Then update the thumbnail field in src/data/projects.js
        */}
      </div>
    </section>
  )
}
