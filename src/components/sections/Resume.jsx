import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, FileText, ExternalLink, Eye } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

const resumeHighlights = [
  {
    category: 'Education',
    items: [
      { title: 'Information Systems (S1)', org: 'UPN Veteran Jakarta · GPA: 3.86 / 4.00', period: 'Aug 2024 – Present' },
      { title: 'Multimedia Program', org: 'SMK Negeri 4 Kota Tangerang Selatan · Avg: 94.2 / 100', period: '2021 – 2024' },
    ],
  },
  {
    category: 'Technical Skills',
    items: [
      { title: 'Android Development', org: 'Kotlin · Jetpack Compose · Supabase · MVVM', period: 'Advanced' },
      { title: 'Web Development', org: 'PHP (CodeIgniter 3) · JavaScript · HTML5 · CSS3', period: 'Advanced' },
      { title: 'Database & Analytics', org: 'MySQL · PostgreSQL · Spreadsheet Analytics', period: 'Advanced' },
      { title: 'UI/UX Design', org: 'Figma · High-Fidelity Prototyping · System Analysis', period: 'Advanced' },
    ],
  },
  {
    category: 'Organizations',
    items: [
      { title: 'Vice Chairperson', org: 'BEM FIK UPNVJ', period: 'Jan 2026–Present' },
      { title: 'Project Officer', org: 'FIK FAIR 2026 "IGNITE"', period: '2026' },
      { title: 'Head of Student Council', org: 'SMKN 4 Kota Tangerang Selatan', period: '2022–2023' },
    ],
  },
]


export default function Resume() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="resume" className="section-padding relative overflow-hidden" aria-label="Resume section">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/*
        ASSET REQUIRED
        Resume PDF is currently at: public/assets/resume.pdf
        TODO: Replace with your latest CV version whenever you update it.
        TODO: Update the "Updated July 2026" date string below when re-uploading.
      */}

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-[1fr,380px] gap-12 items-start"
        >
          {/* Left — Summary */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="section-subtitle">Resume</span>
              <h2 className="section-title font-display">
                Curriculum{' '}
                <span className="text-gradient-orange">Vitae</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-lg">
                A snapshot of my academic journey, technical skills, and organizational experience.
                Download the full ATS-optimized version for detailed information.
              </p>
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-6">
              {resumeHighlights.map((section, si) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + si * 0.15, duration: 0.7 }}
                >
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 ml-1">
                    {section.category}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {section.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="glass border border-white/06 rounded-xl px-5 py-4 flex items-center justify-between gap-4 hover:border-white/12 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-white/90 text-sm">{item.title}</p>
                          <p className="text-xs text-white/45 mt-0.5">{item.org}</p>
                        </div>
                        <span className="text-xs font-medium text-white/30 flex-shrink-0 px-3 py-1 rounded-lg glass border border-white/06">
                          {item.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Download Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="lg:sticky lg:top-28 flex flex-col gap-4"
          >
            {/* CV Preview Card */}
            <div
              className="relative rounded-2xl overflow-hidden p-8 flex flex-col gap-6"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(59,130,246,0.08) 100%)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-[60px] bg-orange-500" />

              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                  <FileText size={24} style={{ color: '#FB923C' }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">CV — Yanuar Arifin</h3>
                  <p className="text-sm text-white/50">ATS-Optimized · PDF · Latest</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                <MagneticButton
                  as="a"
                  href="./assets/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #F97316, #FB923C)',
                    color: 'white',
                    boxShadow: '0 0 30px rgba(249,115,22,0.3)',
                  }}
                  strength={0.2}
                >
                  <Download size={16} />
                  Download Resume
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="./assets/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-sm glass border border-white/15 text-white/80 hover:text-white hover:border-white/25 transition-all"
                  strength={0.2}
                >
                  <Eye size={16} />
                  View Online
                </MagneticButton>
              </div>

              <p className="relative z-10 text-xs text-white/30 text-center">
                Updated July 2026 · PDF format
              </p>
            </div>

            {/* Quick facts */}
            <div className="glass border border-white/07 rounded-2xl p-6 flex flex-col gap-4">
              <h4 className="font-semibold text-sm text-white/70">Quick Facts</h4>
              {[
                // TODO: Confirm these details are accurate before publishing
                { label: 'Languages', value: 'Indonesian (Native), English (Professional)' },
                // TODO: Update availability to match your actual situation
                { label: 'Available', value: 'Immediately · Remote & On-site' },
                { label: 'Open For', value: 'Internship · Freelance · Part-time' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-white/35 uppercase tracking-wider">{label}</span>
                  <span className="text-sm text-white/75">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
