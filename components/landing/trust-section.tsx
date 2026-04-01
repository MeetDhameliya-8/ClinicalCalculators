"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1800
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 22, suffix: "+", label: "Clinical Calculators", sub: "Across 6 gastroenterology specialties" },
  { value: 100, suffix: "%", label: "Evidence-Based", sub: "Validated against peer-reviewed literature" },
  { value: 6, suffix: "", label: "Specialties Covered", sub: "Liver · Fibrosis · Hepatitis · GI · AP · IBD" },
  { value: 0, suffix: "ms", label: "Computation Time*", sub: "Real-time, fully client-side" },
]

const partners = [
  "AASLD", "ACG", "AGA", "EASL", "BSG", "UEGW"
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export function TrustSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/5 blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto space-y-20">
        {/* Logo cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
            Guidelines from leading societies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="px-6 py-3 rounded-2xl border border-white/6 bg-white/[0.025] text-sm font-black tracking-widest text-muted-foreground/40 hover:text-muted-foreground hover:border-white/15 hover:bg-white/[0.05] transition-all cursor-default"
              >
                {p}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative rounded-[1.5rem] border border-white/8 bg-card/40 backdrop-blur-xl p-7 space-y-2 overflow-hidden group"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <div className="text-4xl font-black text-primary tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold text-foreground/80">{stat.label}</div>
              <div className="text-xs text-muted-foreground/50 leading-relaxed">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
