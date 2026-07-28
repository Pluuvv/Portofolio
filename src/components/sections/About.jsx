import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const sectionVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } },
}

// ============================================================
// DISCIPLINES
// CONTENT UPDATE REQUIRED
// Update labels and tool descriptions to match your actual work.
// Remove disciplines you haven't worked with professionally.
// ============================================================
const disciplines = [
  { label: 'Android Development', desc: 'Kotlin · Jetpack Compose · Supabase · MVVM' },
  { label: 'UI/UX Design', desc: 'Figma · High-Fidelity Prototyping · System Design' },
  { label: 'Web Development', desc: 'PHP · CodeIgniter · JavaScript · React' },
  { label: 'IoT & Systems', desc: 'Architecture Design · Cisco Packet Tracer · GNS3' },
  { label: 'Data & Analytics', desc: 'Spreadsheet Analytics · SQL · IBM Granite AI' },
  { label: 'Photography', desc: 'Event · Commercial · Documentary' },
  { label: 'Video Production', desc: 'Premiere Pro · DaVinci · After Effects · Color Grading' },
  { label: 'Creative Direction', desc: 'Brand Identity · Visual Campaigns · Digital Media' },
]


export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className="section-padding relative overflow-hidden" aria-label="About section">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid lg:grid-cols-[1fr,1fr] gap-20 items-start"
        >

          {/* ── Left: Bio ───────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <motion.div variants={itemUp} className="flex flex-col gap-4">
              <span className="section-subtitle">About</span>
              <h2 className="section-title font-display">
                Design, Code,<br />
                <span className="text-gradient-blue">and Everything In Between</span>
              </h2>
            </motion.div>

            {/*
              CONTENT UPDATE REQUIRED
              Replace this bio with your own words.
              Write in first person, professional tone.
              Avoid generic phrases like "passionate" or "enthusiastic".
            */}
            <motion.div variants={itemUp} className="flex flex-col gap-5 text-white/60 text-lg leading-relaxed">
              <p>
                I'm <span className="text-white font-semibold">Yanuar Arifin Ilham</span> — an Information
                Systems student at UPN Veteran Jakarta (GPA 3.86) with a background in Multimedia from SMK Negeri 4 Kota Tangerang Selatan.
              </p>
              <p>
                I build <span className="text-white/80">native Android applications</span>,{' '}
                <span className="text-white/80">full-stack web systems</span>, and{' '}
                <span className="text-white/80">IoT architectures</span> — and design the interfaces that make them usable.
                Coursework and projects span Kotlin, CodeIgniter, Supabase, system analysis, and GIS-integrated platforms.
              </p>
              <p>
                Currently serving as <span className="text-white font-medium">Vice Chairperson</span> of BEM FIK UPNVJ,
                co-leading strategic planning and operations for 1,940+ computer science students across 7 departments.
                Previously coordinated publication teams for the faculty's New Student Orientation (PKKMB), managing
                550+ students' onboarding materials.
              </p>
            </motion.div>

            {/* Identity tags */}
            <motion.div variants={itemUp} className="flex flex-wrap gap-2">
              {[
                'Jakarta, Indonesia',
                '2nd Year · GPA 3.86',
                'Information Systems',
                'UPN Veteran Jakarta',
                'Open to Internship',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium glass border border-white/10 text-white/65"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/*
              CONTENT UPDATE REQUIRED
              Replace this quote with something you actually believe.
              Or remove it entirely if you prefer not to include a quote.
            */}
            <motion.blockquote
              variants={itemUp}
              className="pl-5 border-l-2 border-white/20 text-white/40 text-base leading-relaxed italic"
            >
              "Adept at translating complex operational requirements into data-driven digital solutions."
            </motion.blockquote>
          </div>

          {/* ── Right: Disciplines ─────────────────────────── */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemUp}>
              <span className="section-subtitle">Disciplines</span>
            </motion.div>

            {/* Clean grid — no emoji, icon-free, typography-led */}
            <div className="grid grid-cols-2 gap-2.5">
              {disciplines.map((disc) => (
                <motion.div
                  key={disc.label}
                  variants={itemUp}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="card-base p-5 flex flex-col gap-1.5 cursor-default"
                >
                  <span className="font-semibold text-sm text-white/85">{disc.label}</span>
                  <span className="text-xs text-white/38 leading-relaxed">{disc.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* Working approach — replaces emoji traits panel */}
            <motion.div
              variants={itemUp}
              className="glass border border-white/07 rounded-2xl p-6 mt-1"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                Working Approach
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Systematic', body: 'Design decisions are grounded in research and user context, not aesthetic preference alone.' },
                  { title: 'Collaborative', body: 'Comfortable working with developers, designers, and non-technical stakeholders.' },
                  { title: 'Iterative', body: 'Comfortable with feedback cycles and refining work across multiple versions.' },
                ].map(({ title, body }) => (
                  <div key={title} className="flex gap-3">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-white/75">{title} — </span>
                      <span className="text-sm text-white/40">{body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
