"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type Project = {
  id: number
  title: string
  description: string
  image: string
  images?: string[] // Optional array for multiple images
  tags: string[]
  link: string
}

const projects = [
  {
    id: 1,
    title: "Smart Academic Management System (Admin Panel)",
    description: "Full-stack academic management solution with resource recommendation and automated teaching tools.",
    image: "/atam.png",
    images: ["/atam1.png", "/atam.png"],
    tags: ["Next.js", "Supabase", "Tailwind", "TypeScript", "Express.js", "Shadcn UI", "Framer Motion"],
    link: "https://plp-academic-management-system.vercel.app/",
  },
  {
    id: 2,
    title: "Human Resource Management System (Frontend)",
    description: "It's simple system that allows organizations to manage their human resources effectively, it can also integrates with Payroll System",
    image: "/image-12.png",
    images: ["/image-12.png", "/image-20.png", "/image-25.png", "/image-26.png"],
    tags: ["Next.js", "Tailwind", "TypeScript", "Node.js"],
    link: "https://github.com/vincentenriquez/hrms-system",
  },
  {
    id: 3,
    title: "PLP Website",
    description: "Improving the design of website of PLP to make it more modern and user-friendly.",
    image: "/PLP.png",
    images: ["/PLP.png", "/PLP1.png", "/PLP2.png"],
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "Animate on Scroll (AOS)"],
    link: "https://vincentenriquez.github.io/plp-website/",
  },
  {
    id: 4,
    title: "From Dribbles to Discipline: My Basketball Journey",
    description: "I created a personal website to share my experience how started playing basketball.",
    image: "/my-website.png",
    images: ["/my-website.png", "/myskills.png"],
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "Animate on Scroll (AOS)"],
    link: "https://vincentenriquez.github.io/vincentenriquez_singket.github.io/",
  },
  // {
  //   id: 5,
  //   title: "Mobile App Backend",
  //   description: "RESTful API backend serving a mobile fitness tracking application",
  //   image: "/fitness-app-interface.png",
  //   tags: ["Node.js", "GraphQL", "AWS", "PostgreSQL"],
  //   link: "#",
  // },
  // {
  //   id: 6,
  //   title: "Design System",
  //   description: "Comprehensive component library with documentation and interactive examples",
  //   image: "/design-system-components.png",
  //   tags: ["React", "Storybook", "Tailwind", "TypeScript"],
  //   link: "#",
  // },
]

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current.querySelector("img"), {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow: "0 20px 40px rgba(63, 114, 175, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current.querySelector("img"), {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0 0 0 rgba(63, 114, 175, 0)",
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="project-card group block relative overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-primary/50 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div ref={imageRef} className="relative h-48 overflow-hidden bg-secondary">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full transition-all duration-300 group-hover:bg-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Link */}
        <div className="flex items-center text-primary text-sm font-semibold">
          <span>View Details</span>
          <svg
            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </div>
  )
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !project) return

    // Animate modal in
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
      )
    }, modalRef)

    return () => ctx.revert()
  }, [isOpen, project])

  useEffect(() => {
    // Prevent closing on ESC key (like certificate modal)
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        // Modal should not close on ESC
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent closing when clicking outside (like certificate modal)
    // Only allow closing via the close button
    e.preventDefault()
    e.stopPropagation()
  }

  if (!isOpen || !project) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-card dark:bg-background border border-border shadow-2xl rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 z-10 p-1 rounded-full hover:bg-background cursor-pointer transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Project Details */}
        <div className="p-4 lg:p-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            {project.title}
          </h2>

          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-sm px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Images */}
          {project.images && project.images.filter(Boolean).length > 0 ? (
            <div className="flex flex-col gap-6 mb-8">
              {project.images
                .filter((img) => typeof img === "string" && img.trim().length > 0)
                .map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative max-w-auto aspect-video overflow-hidden bg-secondary rounded-xl"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - Image ${imgIndex + 1}`}
                      width={900}
                      height={900}
                      className="w-[100%] h-auto rounded-xl"
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="relative max-w-auto aspect-video overflow-hidden bg-secondary rounded-xl mb-8">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={900}
                height={900}
                className="w-[100%] h-auto"
              />
            </div>
          )}


          {/* Project Link */}
          {project.link && project.link !== "#" && (
            <div className="pt-6 border-t border-border">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
              >
                <span>Visit Project</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

      // Project cards staggered animation
      const cards = gridRef.current?.querySelectorAll(".project-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: {
              amount: 0.8,
              grid: "auto",
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Delay clearing the project to allow exit animation
    setTimeout(() => {
      setSelectedProject(null)
    }, 300)
  }

  return (
    <>
      <section ref={sectionRef} id="works" className="py-24 px-0 bg-secondary/30">
        <div className="max-w-7xl px-6 mx-auto">
          {/* Section Heading */}
          <div ref={headingRef} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Featured Works</h2>
            <div className="gradient-line h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
          </div>

          {/* Projects Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
