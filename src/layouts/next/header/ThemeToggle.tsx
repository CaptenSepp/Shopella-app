"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "@/app/theme"
import { focusRingClass, getIconLinkClassName } from "./header-tools"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme() // read current app theme
  const [isMounted, setIsMounted] = useState(false)
  const isDark = isMounted && theme === "dark" // keep the first client render aligned with the server

  useEffect(() => setIsMounted(true), [])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${getIconLinkClassName(isDark)} ${focusRingClass}`}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle
