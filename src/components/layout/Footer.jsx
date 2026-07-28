import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react'

// TODO: Update all social URLs to match your actual profiles
const socials = [
  // TODO: Confirm GitHub username
  { icon: Github, href: 'https://github.com/Pluuvv', label: 'GitHub' },
  // TODO: Add real LinkedIn URL
  { icon: Linkedin, href: 'https://linkedin.com/in/yanuararifinilham', label: 'LinkedIn' },
  // TODO: Confirm Instagram handle
  { icon: Instagram, href: 'https://www.instagram.com/yyanuarif/', label: 'Instagram' },
  // TODO: Replace with your actual email
  { icon: Mail, href: 'mailto:yanuararifinilham2019@gmail.com', label: 'Email' },
]


export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/06 bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-base font-bold text-black font-display">Y</span>
              </div>
              <span className="font-display font-bold text-base">Yanuar Arifin Ilham</span>
            </div>
            <p className="text-sm text-white/40">
              Designing Digital Experiences That Actually Work.
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl glass text-white/50 hover:text-white hover:border-white/20 transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl glass text-white/50 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/06 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© 2026 Yanuar Arifin Ilham. All rights reserved.</p>
          <p>Built with React + Vite + Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
