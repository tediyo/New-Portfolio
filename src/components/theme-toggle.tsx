"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative rounded-md p-2 bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
} 