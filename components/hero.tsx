"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const typingTextRef = useRef<HTMLSpanElement>(null)
  const [displayedText, setDisplayedText] = useState("")
  const currentRoleIndexRef = useRef(0)
  const currentCharIndexRef = useRef(0)
  const isDeletingRef = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headingRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
      })
      gsap.set(imageRef.current, { opacity: 0 })
      gsap.set(imageInnerRef.current, { scale: 0.8, rotation: -5 })
      gsap.set(decorRef.current, { scale: 0, opacity: 0 })

      gsap.set(headingRef.current, { y: 60 })
      gsap.set(subtitleRef.current, { y: 40 })
      gsap.set(ctaRef.current, { y: 30 })

      // Create timeline for sequential animations
      const tl = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        delay: 0.3 
      })

      // Animate heading with split effect
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
        // Animate subtitle
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        // Animate CTA buttons with stagger
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        // Animate image container
        .to(
          imageRef.current,
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.8"
        )
        // Animate inner image with rotation
        .to(
          imageInnerRef.current,
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.6"
        )
        // Animate decorative element
        .to(
          decorRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )

      // Continuous subtle floating animation for image
      gsap.to(imageInnerRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      })

      // Rotate decorative ring slowly
      gsap.to(decorRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Typing animation effect
  useEffect(() => {
    const roles = ["Frontend Developer", "Web Developer", "Software Developer"]
    let typingTimeout: NodeJS.Timeout

    const typeText = () => {
      const currentRole = roles[currentRoleIndexRef.current]

      if (!isDeletingRef.current) {
        // Typing forward
        setDisplayedText(currentRole.substring(0, currentCharIndexRef.current + 1))
        currentCharIndexRef.current++

        if (currentCharIndexRef.current === currentRole.length) {
          // Finished typing, wait before deleting
          typingTimeout = setTimeout(() => {
            isDeletingRef.current = true
            typeText()
          }, 2500)
          return
        }
      } else {
        // Deleting
        setDisplayedText(currentRole.substring(0, currentCharIndexRef.current - 1))
        currentCharIndexRef.current--

        if (currentCharIndexRef.current === 0) {
          isDeletingRef.current = false
          currentRoleIndexRef.current = (currentRoleIndexRef.current + 1) % roles.length
        }
      }

      const typingSpeed = isDeletingRef.current ? 40 : 80
      typingTimeout = setTimeout(typeText, typingSpeed)
    }

    // Start typing after a short delay
    typingTimeout = setTimeout(typeText, 800)

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
    }
  }, [])

  // Button hover animations
  const handleButtonHover = (e: React.MouseEvent<HTMLAnchorElement>, isEntering: boolean) => {
    gsap.to(e.currentTarget, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.3,
      ease: isEntering ? "back.out(1.7)" : "power2.out",
    })
  }

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center py-24 px-0 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div> */}

      <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row gap-10 sm:gap-10 md:gap-10 lg:gap-0 xl:gap-10 items-center mx-auto px-6 relative z-10 mt-10 lg:mt-0">
        {/* Content Section */}
        <div className="text-center lg:text-left w-full">
          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-bold leading-tight tracking-tight space-y-3"
          >
            <span className="block text-lg sm:text-xl text-muted-foreground font-medium">
              Hello, I'm
            </span>
            <span className="block text-foreground text-3xl sm:text-6xl">
              Vincent Enriquez
            </span>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="text-primary text-lg sm:text-4xl font-semibold">
                an aspiring
              </span>
              <span ref={typingTextRef} className="text-primary text-lg sm:text-4xl font-semibold">
                {displayedText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-sm sm:text-lg text-muted-foreground mb-4 mt-4 lg:mx-0 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            Building attractive, responsive, and high-performing web experiences with modern technologies
            and best practices.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex gap-4 justify-center lg:justify-start pt-4"
          >
            <a
              href="#about"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
              className="px-7 py-3 h-auto bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-300 font-semibold text-sm md:text-base shadow-lg hover:shadow-xl hover:shadow-primary/25"
            >
              About
            </a>
            <a
              href="#contact"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
              className="px-7 py-3 h-full border-2 border-primary text-primary rounded-xl hover:bg-primary/10 transition-colors duration-300 font-semibold text-sm md:text-base"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div ref={imageRef} className="w-full flex justify-center lg:justify-end max-w-md">
          <div className="relative w-full max-w-md">
            {/* Decorative rotating ring */}
            <div
              ref={decorRef}
              className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full scale-110"
            />
            
            {/* Main image container */}
            <div ref={imageInnerRef} className="relative aspect-square">
              <Image
                src="/sample_pic.jpg"
                alt="Vincent - Frontend Developer"
                fill
                className="rounded-full object-cover shadow-2xl dark:shadow-primary/30 z-40 w-96"
                priority
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
            </div>
            

            
          </div>
        </div>
      </div>
    </section>
  )
}
