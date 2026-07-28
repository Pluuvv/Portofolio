import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useCallback } from 'react'

export default function GalleryLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex]

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!current) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: 'rgba(5,5,5,0.97)' }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full glass text-white/70 hover:text-white hover:border-white/20 transition-all z-10"
          aria-label="Close lightbox"
        >
          <X size={20} />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 text-sm text-white/50 font-medium">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Prev */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-6 p-3 rounded-full glass text-white/70 hover:text-white transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-6 p-3 rounded-full glass text-white/70 hover:text-white transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-5xl max-h-[85vh] mx-auto px-20"
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
