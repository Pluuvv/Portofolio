import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SkillChip from '../ui/SkillChip'
import { skillCategories } from '../../data/skills'

// Category accent colors — applied programmatically, no icons
const categoryColors = {
  development: '#3B82F6',
  design: '#8B5CF6',
  data: '#F97316',
  creative: '#EC4899',
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('development')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const current = skillCategories.find(c => c.id === activeCategory)

  return (
    <section id="skills" className="section-padding relative overflow-hidden" aria-label="Skills section">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 mb-14"
        >
          <span className="section-subtitle">Expertise</span>
          <h2 className="section-title font-display">
            Skills &{' '}
            <span className="text-gradient-purple">Technologies</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Tools and technologies used across design, development, data, and creative production.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[260px,1fr] gap-8 items-start">

          {/* ── Category tabs — text-only, no emoji/icons ─── */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {skillCategories.map((cat) => {
              const isActive = cat.id === activeCategory
              const color = categoryColors[cat.id]
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all duration-250 flex-shrink-0"
                  style={{
                    background: isActive ? `${color}10` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? `${color}35` : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-semibold text-sm transition-colors"
                      style={{ color: isActive ? color : 'rgba(255,255,255,0.58)' }}
                    >
                      {cat.label}
                    </span>
                    <span className="text-xs text-white/28">{cat.skills.length} items</span>
                  </div>

                  {/* Active indicator — vertical bar, no icon */}
                  {isActive && (
                    <motion.div
                      layoutId="skillIndicator"
                      className="w-1 h-5 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* ── Skills panel ─────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              className="glass border border-white/07 rounded-2xl p-8"
            >
              {/* Panel header — typography-led, no icon box */}
              <div className="flex items-baseline gap-4 mb-8 pb-5 border-b border-white/06">
                <h3
                  className="font-display font-bold text-xl"
                  style={{ color: categoryColors[current.id] }}
                >
                  {current.label}
                </h3>
                <span className="text-sm text-white/30">
                  {current.skills.length} tools & technologies
                </span>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2.5">
                {current.skills.map((skill, i) => (
                  <SkillChip key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-5 border-t border-white/06 flex flex-wrap gap-4">
                {['Advanced', 'Intermediate', 'Beginner'].map((level) => {
                  const colors = {
                    Advanced: { bg: 'rgba(59,130,246,0.10)', border: 'rgba(59,130,246,0.28)', text: '#60A5FA' },
                    Intermediate: { bg: 'rgba(139,92,246,0.10)', border: 'rgba(139,92,246,0.28)', text: '#A78BFA' },
                    Beginner: { bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.28)', text: '#FB923C' },
                  }[level]
                  return (
                    <div key={level} className="flex items-center gap-2 text-xs text-white/38">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                      >
                        {level}
                      </span>
                      <span>proficiency</span>
                    </div>
                  )
                })}
              </div>

              {/*
                TODO: Review skills.js and remove any skills not yet used in real work.
                Honest proficiency levels build trust with technical recruiters.
              */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
