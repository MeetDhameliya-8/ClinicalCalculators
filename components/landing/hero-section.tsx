"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Activity, ArrowRight, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

const marqueeItems = [
  "MELD-Na Score", "Child-Pugh", "FIB-4 Index", "APRI Score",
  "Glasgow-Blatchford", "Rockall Score", "BISAP Score", "Ranson's Criteria",
  "Harvey-Bradshaw", "Mayo Score", "AUDIT Tool", "Lille Model",
  "NAFLD Fibrosis", "ABIC Score", "Maddrey's DF", "Montreal Classification",
]

function Marquee() {
  return (
    <div className="relative flex overflow-hidden py-4 bg-primary/5 border-y border-primary/10 group">
      <div className="flex animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 shrink-0">
            <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[160px]"
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(163,255,18,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(163,255,18,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main hero content */}
      <motion.div
        style={{ opacity, y }}
        className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Evidence-Based Clinical Intelligence</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.88]">
              Clinical decisions,{" "}
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="text-primary drop-shadow-[0_0_40px_rgba(163,255,18,0.35)]">
                  precisely calibrated.
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            GastroAGI brings 22 evidence-based gastroenterology & hepatology calculators into one intelligent platform — built for clinicians who demand accuracy.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/calculator?id=meld-na">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-black text-primary-foreground shadow-[0_0_30px_rgba(163,255,18,0.3)] hover:shadow-[0_0_50px_rgba(163,255,18,0.45)] transition-shadow"
              >
                Launch Clinical Suite
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <Link href="/calculator">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
              >
                Browse Tools
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stat pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { val: "22", label: "Calculators" },
              { val: "6", label: "Specialties" },
              { val: "100%", label: "Evidence-based" },
              { val: "Free", label: "Always" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-1.5">
                <span className="text-sm font-black text-primary">{s.val}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated SVG illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto px-6 pb-0"
      >
        <HeroIllustration />
      </motion.div>

      {/* Marquee strip */}
      <Marquee />
    </section>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full aspect-[16/7] rounded-[2rem] border border-white/8 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4 h-5 rounded-md bg-white/5 flex items-center px-3">
          <span className="text-[9px] text-muted-foreground/40 font-mono">gastroagi.com/calculator?id=meld-na</span>
        </div>
      </div>

      {/* App body */}
      <div className="flex gap-4 p-5 h-full">
        {/* Sidebar */}
        <div className="w-32 shrink-0 space-y-1.5">
          {["MELD-Na", "Child-Pugh", "FIB-4", "BISAP", "Ranson's"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.08 }}
              className={`rounded-xl px-3 py-2 text-[9px] font-bold ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground/50 hover:bg-white/5"}`}
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* Main panel */}
        <div className="flex-1 space-y-3">
          <div className="text-xs font-black text-foreground/80">MELD-Na Score</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "CREATININE", val: "1.8", unit: "mg/dL" },
              { label: "BILIRUBIN", val: "3.2", unit: "mg/dL" },
              { label: "INR", val: "1.6", unit: "" },
              { label: "SODIUM", val: "132", unit: "mEq/L" },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.08 }}
                className="bg-white/[0.04] rounded-lg p-2.5 border border-white/5"
              >
                <div className="text-[8px] text-muted-foreground/40 font-bold uppercase tracking-widest mb-1">{f.label}</div>
                <div className="text-sm font-black text-foreground">{f.val} <span className="text-[9px] text-muted-foreground/40">{f.unit}</span></div>
              </motion.div>
            ))}
          </div>

          {/* Score result */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex items-center gap-4 rounded-xl bg-primary/10 border border-primary/20 p-3"
          >
            <div className="text-3xl font-black text-primary">18</div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">MELD-Na Score</div>
              <div className="text-xs font-bold text-foreground/80">Moderate — 6% 90-day mortality</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
