"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Social media links - customize these
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/vincentlawrence.enriquez.3",
    bgColor: "bg-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://x.com/lawrenceeeee_14?s=21",
    bgColor: "bg-black",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/atamsgotvzn/",
    bgColor: "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/vincentenriquez",
    bgColor: "bg-gray-800 dark:bg-gray-900",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vincent-lawrence-enriquez-5954693a3/?trk=opento_sprofile_topcard",
    bgColor: "bg-[#0a66c2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Gradient line animation
      const gradientLine = headingRef.current?.querySelector(".gradient-line")
      if (gradientLine) {
        gsap.fromTo(
          gradientLine,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Info section animation
      const infoElements = infoRef.current?.querySelectorAll(".info-animate")
      if (infoElements) {
        gsap.fromTo(
          infoElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Social icons animation
      const socialIcons = infoRef.current?.querySelectorAll(".social-icon")
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Form elements animation
      const formElements = formRef.current?.querySelectorAll(".form-group")
      if (formElements) {
        gsap.fromTo(
          formElements,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Submit button animation
      const submitBtn = formRef.current?.querySelector("button[type='submit']")
      if (submitBtn) {
        gsap.fromTo(
          submitBtn,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Animate button on submit
    const btn = e.currentTarget.querySelector("button[type='submit']")
    if (btn) {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }

    try {
      // Use Web3Forms - simple, free, no email configuration needed
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      
      if (!accessKey) {
        // Fallback to API route if Web3Forms is not configured
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setStatusMessage("Message sent successfully! I'll get back to you soon.")
          setFormData({ name: "", email: "", subject: "", message: "" })
          setTimeout(() => {
            setStatus("idle")
            setStatusMessage("")
          }, 5000)
        } else {
          setStatus("error")
          setStatusMessage(data.error || "Failed to send message. Please try again.")
          setTimeout(() => {
            setStatus("idle")
            setStatusMessage("")
          }, 5000)
        }
        return
      }

      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setStatusMessage("Message sent successfully! I'll get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => {
          setStatus("idle")
          setStatusMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setStatusMessage(data.message || "Failed to send message. Please try again.")
        setTimeout(() => {
          setStatus("idle")
          setStatusMessage("")
        }, 5000)
      }
    } catch (error) {
      setStatus("error")
      setStatusMessage(
        error instanceof Error 
          ? `Error: ${error.message}` 
          : "Error sending message. Please try again."
      )
      console.error("Form submission error:", error)
      setTimeout(() => {
        setStatus("idle")
        setStatusMessage("")
      }, 5000)
    }
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.currentTarget, {
      borderColor: "var(--primary)",
      duration: 0.2,
    })
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.currentTarget, {
      borderColor: "var(--border)",
      duration: 0.2,
    })
  }


  return (
    <section ref={sectionRef} id="contact" className="py-24 px-0 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Get In Touch</h2>
          <div className="gradient-line h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Left Column - Social Media Info */}
          <div ref={infoRef} className="space-y-8 w-full lg:w-1/2">
            <div className="info-animate">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Social Media</h3>
              <p className="text-muted-foreground leading-relaxed">
                Got any concerns and questions? Want you to discuss projects? I'd love to hear it. Know of a opportunities where I can contribute? Let me know, I'm always open to collaborate! Feel free to connect with me anytime!
              </p>
            </div>

            {/* Contact Details */}
            <div className="info-animate space-y-4">
              {/* Email */}
              {/* <div className="flex items-center gap-4">
                <div className="flex-shrink-0 text-muted-foreground">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href="mailto:enriquezvincentlawrence1214@gmail.com" 
                    className="font-medium text-xs text-foreground hover:text-primary transition-colors duration-300"
                  >
                    enriquezvincentlawrence1214@gmail.com
                  </a>
                </div>
              </div> */}
            </div>

            {/* Social Media Icons */}
            <div className="info-animate flex items-center justify-center gap-3 pt-8 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group relative"
                >
                  {/* Tooltip - appears after background fill */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 pointer-events-none z-20">
                    {/* Tooltip bubble */}
                    <div className={`relative ${social.bgColor} text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap`}>
                      {social.name}
                      {/* Tooltip pointer/tail */}
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent"
                        style={{
                          borderTopColor: social.name === 'Facebook' ? '#0866ff' :
                                         social.name === 'Twitter' ? '#000000' :
                                         social.name === 'Instagram' ? 'rgb(147, 51, 234)' :
                                         social.name === 'GitHub' ? 'rgb(17, 24, 39)' : '#0a66c2'
                        }}
                      />
                    </div>
                  </div>

                  {/* Icon */}
                  <div 
                    className={`relative z-10 flex items-center justify-center h-12 w-12 rounded-full bg-card border border-border text-foreground group-hover:text-white text-xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-transparent`}
                    style={{
                      '--hover-bg': social.name === 'Facebook' ? '#0866ff' :
                                    social.name === 'Twitter' ? 'bg-black' :
                                    social.name === 'Instagram' ? 'rgb(147, 51, 234)' :
                                    social.name === 'GitHub' ? 'rgb(17, 24, 39)' : 'bg-[#0a66c2]'
                    } as React.CSSProperties}
                  >
                    {/* Background fill that matches tooltip */}
                    <div 
                      className={`absolute inset-0 rounded-full ${social.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`}
                    />
                    <div className="relative z-10">
                      {social.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Middle OR Divider between Social Media and Reach Out */}
          <div className="flex flex-row lg:flex-col items-center justify-center py-6 lg:py-0 lg:px-6 self-stretch">
            {/* Mobile: horizontal lines, Desktop: vertical lines */}
            <div className="flex-1 h-px lg:w-px lg:h-full lg:flex-1 bg-border" />
            <span className="text-muted-foreground text-sm font-medium mx-3 lg:mx-0 lg:my-3 whitespace-nowrap">OR</span>
            <div className="flex-1 h-px lg:w-px lg:h-full lg:flex-1 bg-border" />
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Reach Out</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                    placeholder="Name"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                  placeholder="Subject"
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Message"
                />
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    status === "success"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
