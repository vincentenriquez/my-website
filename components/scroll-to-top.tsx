"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Show button when scrolled down more than 300px
      setIsVisible(scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Animate button appearance/disappearance
  useEffect(() => {
    if (!buttonRef.current) return

    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      })
      // gsap.to(buttonRef.current, {
      //   y: -15,
      //   duration: 3,
      //   ease: "sine.inOut",
      //   repeat: -1,
      //   yoyo: true,
      //   delay: 2,
      // })
    }
  }, [isVisible])

  const scrollToTop = () => {
    if (!buttonRef.current || !iconRef.current) return

    // Click animation: scale down then bounce back
    const tl = gsap.timeline()

    // Press down effect
    tl.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      ease: "power2.in",
    })
      // Bounce back with rotation
      .to(buttonRef.current, {
        scale: 1.15,
        rotation: 360,
        duration: 1,
        ease: "back.out(1.7)",
      })
      // Return to normal
      .to(buttonRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power2.out",
      })

    // Icon animation: move up quickly
    gsap.to(iconRef.current, {
      y: -3,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    })

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleMouseEnter = () => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      y: -10,
      boxShadow: "0 10px 25px rgba(63, 114, 175, 0.4)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      y: 0,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-40 p-2 bg-primary text-primary-foreground rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background opacity-0 scale-0 cursor-pointer"
      aria-label="Scroll to top"
    >
      <svg
        ref={iconRef}
        className="w-5 h-5 text-primary-foreground font-extrabold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}
