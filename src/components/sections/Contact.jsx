import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Github, Instagram, Linkedin, Mail, MessageCircle, MapPin } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

// ============================================================
// CONTACT LINKS
// TODO: Replace each href value with your actual profile URLs.
// Leave href as '#' if the account does not exist yet.
// ============================================================
const socials = [
  {
    icon: Github,
    label: 'GitHub',
    // TODO: Replace with your actual GitHub username
    handle: '@Pluuvv',
    href: 'https://github.com/Pluuvv',
    color: '#ffffff',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'Yanuar Arifin Ilham',
    href: 'https://linkedin.com/in/yanuararifinilham',
    color: '#0A66C2',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    // TODO: Confirm this is your public Instagram handle
    handle: '@yyanuarif',
    href: 'https://www.instagram.com/yyanuarif/',
    color: '#E1306C',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'yanuararifinilham2019@gmail.com',
    href: 'mailto:yanuararifinilham2019@gmail.com',
    color: '#F97316',
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // mailto fallback (no backend needed)
    const subject = encodeURIComponent(form.subject || 'Portfolio Inquiry')
    const body = encodeURIComponent(`Hi Yanuar,\n\n${form.message}\n\n— ${form.name}\n${form.email}`)
    window.open(`mailto:yanuararifinilham2019@gmail.com?subject=${subject}&body=${body}`)
    setStatus('sent')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden" aria-label="Contact section">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-start"
        >
          {/* Left — Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="section-subtitle">Contact</span>
              <h2 className="section-title font-display">
                Let's Work{' '}
                <span className="text-gradient-blue">Together</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed max-w-md">
                Reach out for internship inquiries, freelance projects, collaborations, or general questions.
                I respond within 24–48 hours.
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-white/50">
              <MapPin size={16} />
              <span className="text-sm">Jakarta, Indonesia · Open to Remote</span>
            </div>

            {/* Availability chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/25 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-green-400">Open to internship & freelance</span>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Find Me On</h3>
              {socials.map(({ icon: Icon, label, handle, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass border border-white/07 hover:border-white/15 transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{label}</p>
                    <p className="text-xs text-white/40">{handle}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle size={20} className="text-accent-blue" />
              <h3 className="font-display font-bold text-lg">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 transition-all focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={(e) => e.target.style.border = '1px solid rgba(59,130,246,0.5)'}
                    onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 transition-all focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={(e) => e.target.style.border = '1px solid rgba(59,130,246,0.5)'}
                    onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 transition-all focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid rgba(59,130,246,0.5)'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or just say hello..."
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 transition-all focus:outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => e.target.style.border = '1px solid rgba(59,130,246,0.5)'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>

              <MagneticButton
                as="button"
                type="submit"
                className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 mt-2 ${
                  status === 'sent'
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
                strength={0.2}
              >
                {status === 'sent' ? (
                  'Message Sent'
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </MagneticButton>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
