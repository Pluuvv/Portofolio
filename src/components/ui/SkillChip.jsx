import { motion } from 'framer-motion'

const levelColors = {
  Advanced: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#60A5FA' },
  Intermediate: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#A78BFA' },
  Beginner: { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)', text: '#FB923C' },
}

export default function SkillChip({ name, level, index = 0 }) {
  const colors = levelColors[level] || levelColors.Intermediate

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium cursor-default"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      <span className="text-white/80">{name}</span>
      {level && (
        <span
          className="text-xs px-1.5 py-0.5 rounded-md"
          style={{ background: colors.border, color: colors.text }}
        >
          {level}
        </span>
      )}
    </motion.div>
  )
}
