import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className={`mx-auto transition-all duration-500 ${scrolled ? 'mt-4' : 'mt-0'}`}>
          <div
            className={`
              flex items-center justify-between px-6 py-4
              transition-all duration-500
              ${scrolled
                ? 'mx-4 md:mx-auto md:max-w-5xl rounded-2xl glass-strong border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                : 'bg-gradient-to-b from-base/80 to-transparent border-b border-white/0'
              }
            `}
          >
            {/* Logo */}
            <MagneticButton
              as="button"
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-3 group"
              strength={0.2}
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-base font-bold text-black font-display leading-none">Y</span>
              </div>
              <span className="font-display font-bold text-base tracking-tight hidden sm:block group-hover:text-white/80 transition-colors">
                Yanuar Arifin
              </span>
            </MagneticButton>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                      ${isActive ? 'text-white' : 'text-white/50 hover:text-white/90'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/08 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.07)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <MagneticButton
                as="button"
                onClick={() => handleNavClick('#contact')}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300"
                strength={0.25}
              >
                Let's Talk
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/05 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl glass-strong border border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-white/08 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/05'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-4 pt-4 border-t border-white/08">
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-white text-black hover:bg-white/90 transition-all"
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
