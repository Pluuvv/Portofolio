import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedCounter from '../ui/AnimatedCounter'
import { stats } from '../../data/skills'

// TODO: Update stat values in src/data/skills.js → stats array.
// Only use numbers you can verify — do not round up or inflate.
export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="relative py-24 overflow-hidden" aria-label="Statistics section">
      {/* Divider line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.015)' }} />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -4 }}
              className="glass border border-white/07 rounded-2xl p-8 text-center flex flex-col gap-2 cursor-default"
            >
              <div
                className="text-5xl font-black font-display tracking-tighter leading-none"
                style={{ color: stat.color }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
              </div>
              <div className="text-sm font-medium text-white/45 mt-2">{stat.label}</div>
              <motion.div
                className="mt-3 mx-auto h-px w-8 rounded-full"
                style={{ background: stat.color }}
                whileHover={{ width: '60px' }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
