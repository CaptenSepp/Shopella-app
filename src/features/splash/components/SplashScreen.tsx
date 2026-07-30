"use client"

import { useEffect, useState } from "react"
import { ShoppingBag } from "lucide-react"

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 1500)
    const hideTimer = window.setTimeout(() => setIsVisible(false), 2050)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`splash-screen${isLeaving ? " splash-screen--leaving" : ""}`}
      role="status"
      aria-label="Welcome to Shopella"
    >
      <div className="splash-screen__glow" aria-hidden="true" />
      <div className="splash-screen__content">
        <span className="splash-screen__mark"><ShoppingBag aria-hidden="true" /></span>
        <p className="splash-screen__eyebrow">Thoughtfully selected</p>
        <p className="splash-screen__brand">Shopella</p>
        <p className="splash-screen__message">The good stuff, beautifully gathered.</p>
        <span className="splash-screen__progress" aria-hidden="true" />
      </div>
    </div>
  )
}

export default SplashScreen
