"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Data for each section
const educationItems = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Pamantasan ng Lungsod ng Pasig",
    year: "2022 - Present",
  },
  {
    degree: "Senior High School - ICT Strand",
    school: "Rizal High School",
    year: "2020 - 2022",
  },
]

const experienceItems = [
  {
    year: "Jan 2024 to Feb 2024",
    title: "Data Encoder",
    company: "Pasig City Public Employment Service Office",
    description: ["Prepared data's applicants of tupad and kaagapay for computer entry by compiling and sorting information", "Handled high-volume data encoding at Pasig City PESO, maintaining accuracy while processing an average of 150 records per day and occasionally surpassing quotas by encoding 160+ records."],
    type: "Contract",
  },
]

const certifications = [
  {
    name: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "2024",
    credentialId: "ABC123XYZ",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "DEF456UVW",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <path d="M12 15l-2-2m0 0l2-2m-2 2h6" />
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
      </svg>
    ),
  },
  {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "GHI789RST",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    name: "Git & GitHub Essentials",
    issuer: "LinkedIn Learning",
    date: "2023",
    credentialId: "JKL012MNO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v7m0 6v7M2 12h7m6 0h7" />
      </svg>
    ),
  },
]

// Certificate items: image + metadata for slider and modal
type CertificateItem = {
  src: string
  alt: string
  name: string
  issuer: string
  date: string
}

const certificateItems: CertificateItem[] = [
  { src: "/she++_1.png", alt: "Project Management, Cybersecurity and Fraud Management", name: "SHE++ Workshop on Project Management, Cybersecurity and Fraud Management", issuer: "PhilDev", date: "August 28, 2025" },
  { src: "/web-design.jpg", alt: "Web Design", name: "Web Design Competition", issuer: "Pamantasan ng Lungsod ng Pasig | College of Computer Studies", date: "November 7, 2024" },
  { src: "/she++_2.png", alt: "Design Thinking", name: "SHE++ Workshop on Design Thinking", issuer: "PhilDev", date: "August 27, 2025" },
  { src: "/she++_3.png", alt: "Alibaba", name: "SHE++ Masterclass on Alibaba Cloud System", issuer: "PhilDev", date: "September 9, 2025" },
  { src: "/she++_4.png", alt: "Foresight and Intro to Technopreneurship", name: "SHE++ Workshop on Strategic Foresight and Intro to Technopreneurship", issuer: "PhilDev", date: "August 29, 2025" },
  { src: "/she++_5.png", alt: "Leadership", name: "SHE++ Workshop on Leadership and Technopreneurial Mindset", issuer: "PhilDev", date: "October 6, 2025" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null)

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

      // Introduction animation
      const introElements = introRef.current?.querySelectorAll(".intro-animate")
      if (introElements) {
        gsap.fromTo(
          introElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Education cards animation
      const educationCards = educationRef.current?.querySelectorAll(".education-card")
      if (educationCards) {
        gsap.fromTo(
          educationCards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: educationRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Experience cards animation (same as education cards)
      const timelineItems = experienceRef.current?.querySelectorAll(".timeline-item")
      if (timelineItems) {
        gsap.fromTo(
          timelineItems,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: experienceRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Timeline lines animation
      // const lines = experienceRef.current?.querySelectorAll(".timeline-line")
      // if (lines) {
      //   gsap.fromTo(
      //     lines,
      //     { scaleY: 0, transformOrigin: "top" },
      //     {
      //       scaleY: 1,
      //       duration: 0.6,
      //       stagger: 0.2,
      //       delay: 0.2,
      //       ease: "power3.out",
      //       scrollTrigger: {
      //         trigger: experienceRef.current,
      //         start: "top 75%",
      //         toggleActions: "play none none reverse",
      //       },
      //     }
      //   )
      // }

      // Image slider animation
      const sliderEl = certificationsRef.current?.querySelector(".cert-image-slider")
      if (sliderEl) {
        gsap.fromTo(
          sliderEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: certificationsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Track carousel slide for dot indicators
  useEffect(() => {
    if (!carouselApi) return
    setCurrentSlide(carouselApi.selectedScrollSnap())
    carouselApi.on("select", () => setCurrentSlide(carouselApi.selectedScrollSnap()))
  }, [carouselApi])

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!carouselApi) return
    const interval = setInterval(() => {
      carouselApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [carouselApi])

  // Card hover animations
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
    <section ref={sectionRef} id="about" className="py-24 px-0 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About Me</h2>
          <div className="gradient-line h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>

        {/* Introduction Section */}
        <div ref={introRef} className="mb-20">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-[10rem] justify-center items-center">
            {/* Main Introduction */}
            <div className="space-y-6">
              {/* <div className="intro-animate">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Who I Am
                </span>
              </div> */}
              <h3 className="intro-animate text-2xl md:text-3xl font-bold text-foreground leading-tight">
                A passionate developer who creates digital experiences with purpose and precision
              </h3>
              <p className="intro-animate text-lg text-muted-foreground leading-relaxed text-justify">
                As a 4th-year Information Technology student fueled by a passion for web development, I craft meaningful digital solutions that captivate and perform. My tech journey started with curiosity and now drives me to build accessible, high-performance, and attractive web applications.
              </p>
              <p className="intro-animate text-lg text-muted-foreground leading-relaxed text-justify">
                Beyond programming, I possess basic knowledge of video editing and computer troubleshooting. This background helps me think creatively and adapt quickly when solving technical challenges.
              </p>
              <p className="intro-animate text-lg text-muted-foreground leading-relaxed text-justify">
                I specialize in modern frontend technologies like React, Next.js, and TailwindCSS, 
                while continuously expanding my knowledge in full-stack development. I believe in 
                writing clean, maintainable code and staying curious about emerging technologies.
              </p>
            </div>

            {/* About image */}
            <div className="intro-animate relative aspect-square max-h-[600px] w-full overflow-hidden rounded-xl border border-border bg-card">
              <Image
                src="/tingn.jfif"
                alt="Vincent - Developer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-10">
          {/* Education Section */}
          <div ref={educationRef} className="mb-20 w-full lg:w-[80%]">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Education</h3>
            </div>
            
            <div className="gap-6 flex flex-col">
              {educationItems.map((item, index) => (
                <div
                  key={index}
                  className="education-card bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors duration-300"
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2 mb-2 flex-wrap">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap w-fit">
                          {item.year}
                        </span>
                        <h4 className="font-bold text-foreground">{item.degree}</h4>
                      </div>
                      <p className="text-muted-foreground font-medium mb-2">{item.school}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div ref={experienceRef} className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Experience</h3>
            </div>

            <div className="gap-6 flex flex-col">
              {/* Timeline container */}
                {experienceItems.map((item, index) => (
                  <div key={index} className="timeline-item bg-card border border-border p-6 hover:border-primary/50 transition-colors duration-300 rounded-xl"
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                  >
                    
                    {/* Content card */}
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="text-sm font-bold text-primary">{item.year}</span>
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
                            {item.type}
                          </span>
                        </div>
                        <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{item.company}</p>
                        {/* <p className="text-muted-foreground">{item.description}</p> */}
                        <ul className="list-disc list-inside text-muted-foreground">
                          <li>{item.description[0]}</li>
                          <li>{item.description[1]}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div ref={certificationsRef}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary dark:text-primary/10">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Awards and Seminars</h3>
          </div>

          <div className="cert-image-slider relative w-full max-w-4xl mx-auto">
            <Carousel
              opts={{
                loop: true,
                align: "center",
                duration: 25,
              }}
              setApi={setCarouselApi}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {certificateItems.map((cert, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full md:basis-2/3 lg:basis-1/2"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Image
                        src={cert.src}
                        alt={cert.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 66vw, 50vw"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {certificateItems.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </Carousel>
          </div>

          {/* Certificate detail modal */}
          <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
            <DialogContent className="w-full max-w-[95vw] sm:max-w-xl gap-0 p-0 overflow-hidden [&>button]:cursor-pointer [&>button]:hover:opacity-80 [&>button]:text-primary [&>button>*]:text-primary"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            >
              {selectedCert && (
                <>
                  <div className="relative aspect-video w-full bg-muted">
                    <Image
                      src={selectedCert.src}
                      alt={selectedCert.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <DialogHeader className="p-4 space-y-4 text-left">
                    <DialogTitle className="text-xl">{selectedCert.name}</DialogTitle>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="font-medium text-foreground">Issuer:</span> {selectedCert.issuer}</p>
                      <p><span className="font-medium text-foreground">Date:</span> {selectedCert.date}</p>
                    </div>
                  </DialogHeader>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
