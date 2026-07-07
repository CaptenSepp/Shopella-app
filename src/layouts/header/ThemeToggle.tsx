import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/app/theme"
import { focusRingClass, getIconLinkClassName } from "./header-tools"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme() // read current app theme
  const isDark = theme === "dark" // choose the matching icon

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
