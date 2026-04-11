"use client"

import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MouseEvent } from "react"
import { HeroFluidOverlay } from "./hero-fluid-overlay"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
}

export function HeroSection() {
  // Mouse tracking for parallax on background image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 40, damping: 30 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  const backgroundX = useTransform(smoothX, [0, 1920], [5, -5])
  const backgroundY = useTransform(smoothY, [0, 1080], [5, -5])

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-primary-gradient"
    >
      {/* LAYER 0: Background image with parallax */}
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          src="/hero/background.png"
          alt="Clinical Background"
          fill
          priority
          className="object-cover lg:object-center transition-opacity duration-1000 opacity-90 object-right"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80";
          }}
        />
        {/* Left fade for text contrast */}
        <div className="absolute inset-0 bg-linear-to-r from-primary-gradient via-primary-gradient/70 to-transparent" />
      </motion.div>

      {/* LAYER 1: Canvas fluid gradient overlay (above image, below text) */}
      <HeroFluidOverlay />

      {/* LAYER 2: Text content */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen pt-48 lg:pt-32 pb-24">

        
        {/* LEFT COLUMN: Clinical Messaging */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left space-y-6 lg:space-y-8"
        >
          {/* Medical Badge - Solid White */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-lg">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Advanced Clinical Decision Support</span>
          </motion.div>

          {/* Headline - White, Professional Balanced Scale */}
          <motion.h1 variants={itemVariants} className="flex flex-col font-sans font-extrabold tracking-tight leading-[1.05] text-white">
            <span className="text-3xl sm:text-5xl lg:text-6xl">Stay current.</span>
            <span className="text-3xl sm:text-5xl lg:text-6xl">Think clearly.</span>
            <span className="text-3xl sm:text-5xl lg:text-6xl text-white italic">
              Decide with confidence in gastroenterology.
            </span>
          </motion.h1>

          {/* Subtext - White, Medium Opacity, Readable */}
          <motion.p
            variants={itemVariants}
            className="max-w-[620px] text-base sm:text-lg font-sans font-normal text-white/80 leading-relaxed"
          >
            GastroAGI brings together the latest journal evidence, guideline-based recommendations, and a dedicated gastroenterology AI — delivering structured clinical insights, evidence-based calculators, and real-world decision support in one place.
          </motion.p>

          {/* Buttons - Left Aligned row */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 -mt-[2px]">
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-base font-black text-primary shadow-xl hover:bg-neutral-50 transition-all"
              >
                Launch Suite
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-10 py-4 text-base font-black text-white hover:bg-white/20 transition-all shadow-lg"
              >
                Latest Research
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Spacer to let the background show */}
        <div className="hidden lg:block h-full pointer-events-none" />

      </div>
    </section>
  )
}

