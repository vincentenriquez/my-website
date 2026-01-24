"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { gsap } from "gsap"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    
    // Animate the icon
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: newTheme === "dark" ? 180 : 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setTheme(newTheme)
          gsap.to(iconRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
        },
      })
    } else {
      setTheme(newTheme)
    }
  }

  // Button entrance animation
  useEffect(() => {
    if (mounted && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 1, ease: "back.out(1.7)" }
      )
    }
  }, [mounted])

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-lg flex bg-transparent md:bg-secondary hover:bg-primary/20 items-center justify-center opacity-0 cursor-pointer"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg bg-transparent md:bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 focus-ring opacity-0 cursor-pointer"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div ref={iconRef} className="relative flex items-center w-5 h-5">
        {isDark ? (
          // Sun icon for dark mode (click to switch to light)
          <MdOutlineLightMode
            className="w-5 h-5 text-primary"
          />
        ) : (
          // Moon icon for light mode (click to switch to dark)
          <MdOutlineDarkMode className="w-5 h-5 text-primary" />
        )}
      </div>
    </button>
  )
}
