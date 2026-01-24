"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./theme-toggle"

// Helper function to get navigation styles based on theme and scroll state
function getNavStyles(scrolled: boolean, isDark: boolean, menuOpen: boolean = false) {
  if (menuOpen) {
    // When menu is open, use solid background
    return {
      backgroundColor: isDark ? "var(--background)" : "var(--card)",
      boxShadow: isDark 
        ? "0 4px 30px rgba(0, 0, 0, 0.3)" 
        : "0 4px 30px rgba(0, 0, 0, 0.2)",
    }
  }

  if (scrolled) {
    // When scrolled, use solid background with shadow
    return {
      backgroundColor: isDark ? "var(--background)" : "var(--card)",
      boxShadow: isDark 
        ? "0 4px 30px rgba(0, 0, 0, 0.3)" 
        : "0 4px 30px rgba(0, 0, 0, 0.2)",
    }
  }

  // When not scrolled, use transparent/light background
  return {
    backgroundColor: isDark ? "var(--background)" : "rgba(249, 247, 247, 0.8)",
    boxShadow: "none",
  }
}

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const navRefLogo = useRef<HTMLSpanElement>(null)
  const navLinksRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const previousMenuStateRef = useRef(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("home")

  // Mount state for theme detection
  useEffect(() => {
    setMounted(true)
  }, [])

  // Set initial navigation background color
  useEffect(() => {
    if (!navRef.current || !mounted) return

    const isDark = resolvedTheme === "dark"
    const initialScroll = window.scrollY > 50
    const styles = getNavStyles(initialScroll, isDark, false)
    
    // Set initial background without animation
    gsap.set(navRef.current, {
      backgroundColor: styles.backgroundColor,
      boxShadow: styles.boxShadow,
    })
  }, [mounted, resolvedTheme])

  // Initial entrance animation
  useEffect(() => {
    if (!navRef.current || !navRefLogo.current || !navLinksRef.current || !logoRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(navRef.current, { y: -100, opacity: 0 })
      gsap.set(logoRef.current, { opacity: 0, x: -20 })
      gsap.set(navRefLogo.current, { opacity: 0, scale: 0 })
      gsap.set(navLinksRef.current?.children || [], { opacity: 0, y: -10 })

      // Create timeline for entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Animate nav bar sliding down
      tl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      })
        // Animate logo
        .to(
          logoRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        // Animate logo accent
        .to(
          navRefLogo.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        // Stagger nav links
        .to(
          navLinksRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.2"
        )
    }, navRef)

    return () => ctx.revert()
  }, [])

  // Scroll-based animations
  useEffect(() => {
    if (!navRef.current || !mounted) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrolled = scrollY > 50

      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
        
        const isDark = resolvedTheme === "dark"
        
        // Always animate padding, regardless of menu state
        gsap.to(navRef.current, {
          paddingTop: scrolled ? "0.75rem" : "1.5rem",
          paddingBottom: scrolled ? "0.75rem" : "1.5rem",
          duration: 0.3,
          ease: "power2.out",
        })

        // Animate logo accent color to match "Vin" when scrolled
        if (navRefLogo.current) {
          gsap.to(navRefLogo.current, {
            color: scrolled ? "var(--foreground)" : "var(--primary)",
            duration: 0.3,
            ease: "power2.out",
          })
        }

        // Only change background/backdrop if menu is closed
        // If menu is open, keep the menu's background styling
        if (!isMobileMenuOpen) {
          const styles = getNavStyles(scrolled, isDark, false)
          
          gsap.to(navRef.current, {
            backgroundColor: styles.backgroundColor,
            boxShadow: styles.boxShadow,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      }
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolled, isMobileMenuOpen, mounted, resolvedTheme])

  // Theme change listener - update navigation colors when theme changes
  useEffect(() => {
    if (!navRef.current || !mounted) return

    const isDark = resolvedTheme === "dark"
    const styles = getNavStyles(isScrolled, isDark, isMobileMenuOpen)
    
    gsap.to(navRef.current, {
      backgroundColor: styles.backgroundColor,
      boxShadow: styles.boxShadow,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [resolvedTheme, mounted, isScrolled, isMobileMenuOpen])

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !navRef.current || !mounted) return

    // Only animate if the menu state actually changed
    // This prevents re-triggering when scrolling causes re-renders
    const menuStateChanged = isMobileMenuOpen !== previousMenuStateRef.current

    if (!menuStateChanged) {
      // State hasn't changed, don't re-animate
      // But ensure menu stays visible if it's open
      if (isMobileMenuOpen) {
        gsap.set(mobileMenuRef.current, { height: "auto", opacity: 1 })
        gsap.set(mobileMenuRef.current.children, { opacity: 1, x: 0 })
      }
      return
    }

    // Update the ref to track current state
    previousMenuStateRef.current = isMobileMenuOpen

    const isDark = resolvedTheme === "dark"

    if (isMobileMenuOpen) {
      // Animate mobile menu opening
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      gsap.fromTo(
        mobileMenuRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1 }
      )
      
      // Change navigation background when menu opens
      const styles = getNavStyles(isScrolled, isDark, true)
      gsap.to(navRef.current, {
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow,
        duration: 0.3,
        ease: "power2.out",
      })
    } else {
      // Animate mobile menu closing
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      })
      
      // Revert navigation background based on scroll state
      const styles = getNavStyles(isScrolled, isDark, false)
      gsap.to(navRef.current, {
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isMobileMenuOpen, isScrolled, mounted, resolvedTheme])

  // Track which section is currently in view for active nav link (scroll spy)
  useEffect(() => {
    if (!mounted) return

    const NAV_OFFSET = 96 // approximate navbar height (px)
    const sectionIds = ["home", "about", "skills", "works", "contact"]

    const handleScrollSpy = () => {
      const scrollYWithOffset = window.scrollY + NAV_OFFSET
      let current = "home"

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue

        const top = el.offsetTop
        const height = el.offsetHeight

        // Section is considered active once its top scrolls past the nav,
        // and until the next section takes over.
        if (scrollYWithOffset >= top && scrollYWithOffset < top + height) {
          current = id
          break
        }
      }

      setActiveSection(current)
    }

    // Run once on mount to set initial active section
    handleScrollSpy()

    window.addEventListener("scroll", handleScrollSpy, { passive: true })
    window.addEventListener("hashchange", handleScrollSpy)

    return () => {
      window.removeEventListener("scroll", handleScrollSpy)
      window.removeEventListener("hashchange", handleScrollSpy)
    }
  }, [mounted])

  // Clear inline styles from inactive links when activeSection changes
  useEffect(() => {
    if (!navLinksRef.current) return

    const links = navLinksRef.current.querySelectorAll("a[data-active]")
    links.forEach((link) => {
      const isActive = link.getAttribute("data-active") === "true"
      if (!isActive) {
        // Clear any inline color styles to let CSS classes take over
        ;(link as HTMLElement).style.color = ""
      }
    })
  }, [activeSection])

  const navLinks = [
    { href: "#home", label: "Home", sectionId: "home" },
    { href: "#about", label: "About", sectionId: "about" },
    { href: "#skills", label: "Skills", sectionId: "skills" },
    { href: "#works", label: "Works", sectionId: "works" },
    { href: "#contact", label: "Contact", sectionId: "contact" },
  ] as const

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isActive = e.currentTarget.getAttribute("data-active") === "true"
    // Only animate to primary if not already active
    if (!isActive) {
      gsap.to(e.currentTarget, {
        color: "var(--primary)",
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    const isActive = target.getAttribute("data-active") === "true"

    // If not active, clear inline style to let CSS classes take over
    if (!isActive) {
      gsap.to(target, {
        color: "var(--foreground)",
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          // Clear inline style after animation to ensure CSS classes work
          if (target) {
            target.style.color = ""
          }
        },
      })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 pt-6 pb-6 w-full z-50 transition-colors duration-300 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          className="text-2xl flex font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          Vin<span ref={navRefLogo} className="text-primary">cent.</span>
        </Link>

        {/* Desktop Navigation */}
        <div ref={navLinksRef} className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive ? "true" : "false"}
                className={`text-sm font-medium relative group ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
                onClick={() => {
                  // Let the browser handle the hash scroll, but update activeSection immediately
                  setActiveSection(link.sectionId)
                }}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )
          })}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden bg-card/95 dark:bg-background"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium py-2 transition-colors ${
                  isActive ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                onClick={() => {
                  setActiveSection(link.sectionId)
                  setIsMobileMenuOpen(false)
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
