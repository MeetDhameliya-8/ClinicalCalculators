"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Globe, Activity, Zap, Shield, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a more premium feel
    } as any,
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#0B0F19]">
      {/* 1. BACKGROUND LAYER (The Visual Foundation) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Anatomical Medical Illustration (High-Precision Watermark) */}
        <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none overflow-hidden">
          <Image
            src="/hero-bg/background.png"
            alt="Clinical Illustration"
            fill
            priority
            className="object-contain p-20"
            style={{ 
              filter: 'invert(1) grayscale(1) contrast(300%) brightness(1.3)',
              mixBlendMode: 'screen',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)'
            }}
          />
        </div>

        {/* Premium Gradient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-40">
          <div className="w-[800px] h-[800px] bg-primary/20 blur-[130px] rounded-full" />
        </div>
      </div>

      {/* 2. HERO CONTENT CONTAINER (Centered) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center space-y-10 sm:space-y-12"
      >
        {/* Top Proof-of-Trust Badge */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 shadow-2xl">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-5 w-5 rounded-full border border-background bg-linear-to-br from-primary/60 to-primary/20 overflow-hidden" />
              ))}
            </div>
            <span className="text-[13px] font-bold text-white/90">1,800+ People loved it!</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white">
            Clinical decisions, <br className="hidden sm:block" />
            <span className="text-primary drop-shadow-[0_0_30px_rgba(163,255,18,0.3)] italic">precisely calibrated.</span>
          </h1>
        </motion.div>

        {/* Hero Clinical Subtext */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground/60 leading-relaxed font-medium"
        >
          GastroAGI brings 22 evidence-based gastroenterology & hepatology calculators into one intelligent platform — built for clinicians who demand accuracy.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <Link href="/calculator?id=meld-na">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-base font-black text-primary-foreground shadow-[0_0_40px_rgba(163,255,18,0.25)] hover:shadow-[0_0_60px_rgba(163,255,18,0.4)] transition-all"
            >
              Launch Clinical Suite
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
          
          <Link href="/calculator">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-full bg-white px-10 py-5 text-base font-black text-[#0B0F19] hover:bg-white/90 transition-all shadow-xl"
            >
              Browse 22 Calculators
            </motion.button>
          </Link>
        </motion.div>

        {/* Institutional Trust Logos Section */}
        <motion.div variants={itemVariants} className="pt-20 lg:pt-32 space-y-8 w-full">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/20">
            Trusted by Top Institutions and clinicians
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-x-20 px-4 opacity-[0.12] grayscale contrast-[0.5] invert">
            <div className="flex items-center gap-2 font-bold text-xl italic text-white"><Globe className="h-6 w-6" /> ECCO</div>
            <div className="flex items-center gap-2 font-bold text-xl text-white"><Activity className="h-6 w-6" /> AASLD</div>
            <div className="flex items-center gap-2 font-bold text-xl text-white"><Zap className="h-6 w-6" /> CDDW</div>
            <div className="flex items-center gap-2 font-bold text-xl text-white tracking-tighter"><Shield className="h-6 w-6" /> UEG Week</div>
            <div className="flex items-center gap-2 font-bold text-xl text-white"><Play className="h-6 w-6" /> ACG</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Behind-Content Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] -z-10 rounded-full bg-primary/5 blur-[180px]" />
    </section>
  )
}
