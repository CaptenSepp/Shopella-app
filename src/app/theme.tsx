import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type AppTheme = "light" | "dark"

type ThemeContextValue = {
  theme: AppTheme
  toggleTheme: () => void
}

const storageKey = "shopella-theme"
const ThemeContext = createContext<ThemeContextValue | null>(null)

const readStoredTheme = (): AppTheme => {
  if (typeof window === "undefined") return "light"

  const storedTheme = window.localStorage.getItem(storageKey)
  return storedTheme === "dark" ? "dark" : "light"
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<AppTheme>(readStoredTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(storageKey, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    toggleTheme: () => setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark"),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}
