"use client"

import { useEffect, type RefObject } from "react"

export const useViewportReveal = (containerRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = Array.from(container.children).slice(1) as HTMLElement[]
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("viewport-reveal--visible"))
      return
    }

    elements.forEach((element) => element.classList.add("viewport-reveal"))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("viewport-reveal--visible")
        observer.unobserve(entry.target)
      })
    }, { rootMargin: "0px 0px -48px", threshold: 0.08 })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [containerRef])
}
