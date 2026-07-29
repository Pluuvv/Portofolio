import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const frameRef = useRef(null);
  const endValue = parseFloat(value);
  const decimalPlaces = Number.isInteger(endValue)
    ? 0
    : (String(value).split(".")[1]?.length ?? 0);

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = easedProgress * endValue;
      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, value, duration]);

  const formattedValue = Number.isInteger(parseFloat(value))
    ? Math.round(count)
    : count.toFixed(decimalPlaces);

  return (
    <span ref={ref}>
      {formattedValue}
      {suffix}
    </span>
  );
}
