"use client"

import { useEffect, useRef, useState } from "react"

const AnimatedStatValue = ({ value, delay, duration }: { value: string; delay: number; duration: number }) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = Number(match?.[1] ?? 0)
  const suffix = match?.[2] ?? ""
  const [displayValue, setDisplayValue] = useState(0)
  const valueRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = valueRef.current
    if (!element) return
    let animationFrame = 0
    let delayTimer = 0
    const showFinalValue = () => setDisplayValue(target)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showFinalValue()
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      delayTimer = window.setTimeout(() => {
        const startedAt = performance.now()
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1)
          setDisplayValue(Math.round(target * progress))
          if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
        }
        animationFrame = window.requestAnimationFrame(animate)
      }, delay)
      observer.disconnect()
    }, { threshold: 0.45 })

    observer.observe(element)
    return () => { observer.disconnect(); window.clearTimeout(delayTimer); window.cancelAnimationFrame(animationFrame) }
  }, [delay, duration, target])

  return <div ref={valueRef} className="about-stats__value" aria-label={value}><span aria-hidden="true">{displayValue.toLocaleString("en-US")}{suffix}</span></div>
}

export default AnimatedStatValue
