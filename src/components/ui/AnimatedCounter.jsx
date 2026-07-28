import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const frameRef = useRef(null)

  useEffect(() => {
    if (!inView) return

    const startTime = performance.now()
    const endValue = parseInt(value, 10)

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const current = Math.round(easedProgress * endValue)
      setCount(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}
