"use client"

import { useEffect, useRef, useState } from "react"

const AnimatedStatValue = ({ value }: { value: string }) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = Number(match?.[1] ?? 0)
  const suffix = match?.[2] ?? ""
  const [displayValue, setDisplayValue] = useState(0)
  const valueRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = valueRef.current
    if (!element) return
    let animationFrame = 0
    const showFinalValue = () => setDisplayValue(target)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showFinalValue()
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const startedAt = performance.now()
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / 900, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.round(target * easedProgress))
        if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
      }
      animationFrame = window.requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.45 })

    observer.observe(element)
    return () => { observer.disconnect(); window.cancelAnimationFrame(animationFrame) }
  }, [target])

  return <div ref={valueRef} className="about-stats__value" aria-label={value}><span aria-hidden="true">{displayValue}{suffix}</span></div>
}

export default AnimatedStatValue
