import { useEffect, useRef, useState } from 'react'

export function useMouseGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08)
      setPosition({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return position
}
