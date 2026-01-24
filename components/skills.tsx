"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "HTML/CSS", level: 99 },
      { name: "Visual Basic", level: 96 },
      { name: "PHP", level: 95 },
      { name: "JavaScript", level: 85 },
      { name: "Python", level: 80 },
      { name: "C++", level: 80 },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { name: "Bootstrap", level: 99 },
      { name: "TailwindCSS", level: 99 },
      { name: "Next.js", level: 90 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MySQL", level: 95 },
      { name: "Supabase", level: 90 },
    ],
  },
  {
    name: "Libraries",
    skills: [
      { name: "React", level: 95 },
      { name: "React Router", level: 85 },
      { name: "jQuery", level: 85 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Visual Studio Code", level: 98 },
      { name: "Sublime Text", level: 97 },
      { name: "Git", level: 94 },
      { name: "GitHub", level: 95 },
      { name: "Vercel", level: 80 },
      { name: "Canva", level: 80 },
    ],
  },
]

interface SkillBarProps {
  name: string
  level: number
  inView: boolean
  delay: number
}

function SkillBar({ name, level, inView, delay }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (inView && barRef.current && percentRef.current) {
      // Animate the bar width
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 1.2,
          delay: delay,
          ease: "power3.out",
        }
      )

      // Animate the percentage counter
      gsap.fromTo(
        { value: 0 },
        { value: level },
        {
          value: level,
          duration: 1.2,
          delay: delay,
          ease: "power3.out",
          onUpdate: function () {
            if (percentRef.current) {
              percentRef.current.textContent = `${Math.round(this.targets()[0].value)}%`
            }
          },
        }
      )
    }
  }, [inView, level, delay])

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-foreground">{name}</span>
        <span ref={percentRef} className="text-sm text-primary font-semibold">
          0%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const techsRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll(".skill-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
              onEnter: () => setInView(true),
            },
          }
        )
      }

      // Additional techs animation
      const techs = techsRef.current?.querySelectorAll(".tech-tag")
      if (techs) {
        gsap.fromTo(
          techs,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: techsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    gsap.to(e.currentTarget, {
      y: isEntering ? -8 : 0,
      boxShadow: isEntering
        ? "0 20px 40px rgba(63, 114, 175, 0.15)"
        : "0 0 0 rgba(63, 114, 175, 0)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-0 bg-background">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Skills & Expertise</h2>
          <div className="gradient-line h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>

        <h3 className="text-2xl font-bold mb-6 text-foreground">Technical Skills</h3>

        {/* Skill Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-xl font-bold text-primary">{category.name}</h3>
              </div>
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    {...skill}
                    inView={inView}
                    delay={index * 0.1 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Technologies */}
        <div
          ref={techsRef}
          className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-foreground">Soft Skills</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Adaptability",
              "Teamwork",
              "Time Management",
              "Problem-Solving",
              "Critical Thinking",
              "Creativity",
              "Determination",
              "Resilience ",
            ].map((tech, index) => (
              <div
                key={index}
                className="tech-tag px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
