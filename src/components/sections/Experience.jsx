import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences } from '../../data/experience'

// Type label styles — no emoji, color-coded only
const typeLabels = {
  organization: { label: 'Organization', bg: 'rgba(59,130,246,0.10)', text: '#60A5FA', border: 'rgba(59,130,246,0.22)' },
  academic: { label: 'Academic', bg: 'rgba(249,115,22,0.10)', text: '#FB923C', border: 'rgba(249,115,22,0.22)' },
  freelance: { label: 'Freelance', bg: 'rgba(139,92,246,0.10)', text: '#A78BFA', border: 'rgba(139,92,246,0.22)' },
}

function ExperienceCard({ exp, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const type = typeLabels[exp.type] || typeLabels.organization

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative flex gap-8"
    >
      {/* Timeline — clean vertical line, no emoji dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* Dot: simple colored circle, no icon/emoji */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.2, type: 'spring' }}
          className="w-3 h-3 rounded-full flex-shrink-0 z-10"
          style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}50` }}
        />
        {/* Connecting line */}
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: index * 0.12 + 0.3 }}
            style={{
              transformOrigin: 'top',
              background: `linear-gradient(to bottom, ${exp.color}30, transparent)`,
            }}
            className="w-px flex-1 mt-3 min-h-[60px]"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="card-base flex-1 p-6 mb-8 group"
      >
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex flex-col gap-2">
            {/* Type badge — text only, no icon */}
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full w-fit"
              style={{ background: type.bg, color: type.text, border: `1px solid ${type.border}` }}
            >
              {type.label}
            </span>
            <h3 className="font-display font-bold text-base text-white/95 group-hover:text-white transition-colors leading-snug">
              {exp.role}
            </h3>
            <p className="text-white/55 text-sm font-medium">{exp.organization}</p>
          </div>
          <span className="text-xs font-medium text-white/30 flex-shrink-0 px-3 py-1.5 rounded-lg glass border border-white/06 mt-0.5 whitespace-nowrap">
            {exp.period}
          </span>
        </div>

        <p className="text-white/48 text-sm leading-relaxed mb-4">{exp.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg glass border border-white/07 text-white/45 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="section-padding relative overflow-hidden" aria-label="Experience section">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 mb-16"
        >
          <span className="section-subtitle">Background</span>
          <h2 className="section-title font-display">
            Experience &{' '}
            <span className="text-gradient-purple">Organizations</span>
          </h2>
          {/*
            CONTENT UPDATE REQUIRED
            Update this description to reflect your actual background.
          */}
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            A record of academic, organizational, and freelance work from 2021 to present.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/*
          TODO: Add more experience entries to experience.js as needed.
          Consider adding: internships, competitions, certifications,
          academic projects, or teaching/mentoring roles.
        */}
      </div>
    </section>
  )
}
