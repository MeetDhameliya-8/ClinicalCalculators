"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Activity, Beaker, Brain, Calculator, FlaskConical, Heart, Lock, Smartphone, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface BentoCardProps {
  className?: string
  children: React.ReactNode
  delay?: number
}

function BentoCard({ className, children, delay = 0 }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "group relative rounded-[2rem] border border-white/8 bg-card/50 backdrop-blur-xl p-8 overflow-hidden",
        className
      )}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-primary/20 pointer-events-none" />
      {children}
    </motion.div>
  )
}

const features = [
  {
    icon: Calculator,
    title: "22 Clinical Calculators",
    description: "Complete gastroenterology toolkit from MELD-Na to Harvey-Bradshaw, always up-to-date with latest guidelines.",
    size: "lg",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Zero latency. All calculations run locally — no server, no wait.",
    size: "sm",
  },
  {
    icon: Lock,
    title: "Patient Privacy",
    description: "No data leaves your device. Fully HIPAA-conscious design.",
    size: "sm",
  },
  {
    icon: Brain,
    title: "AI-Assisted Interpretation",
    description: "Contextual clinical recommendations with every score — not just numbers, but actionable guidance.",
    size: "md",
  },
  {
    icon: FlaskConical,
    title: "Combined Panels",
    description: "Multi-score panels (e.g., Fibrosis Panel: FIB-4 + APRI + NAFLD-FS) computed with a single input set.",
    size: "md",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Designed for ward rounds and bedside decision making.",
    size: "sm",
  },
]

const categories = [
  { icon: Activity, label: "Liver Disease", count: 3, color: "text-emerald-400" },
  { icon: FlaskConical, label: "Fibrosis", count: 4, color: "text-sky-400" },
  { icon: Brain, label: "Alc. Hepatitis", count: 6, color: "text-violet-400" },
  { icon: Heart, label: "GI Bleeding", count: 3, color: "text-rose-400" },
  { icon: Beaker, label: "Pancreatitis", count: 3, color: "text-amber-400" },
  { icon: Activity, label: "IBD", count: 3, color: "text-teal-400" },
]

export function FeaturesSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-60px" })

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section header */}
        <div ref={titleRef} className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-primary"
          >
            Platform Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight"
          >
            Everything a clinician needs.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Designed specifically for gastroenterology and hepatology practice.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {/* Large card spanning 2 cols */}
          <BentoCard className="md:col-span-2" delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black tracking-tight">22 Clinical Calculators</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete gastroenterology toolkit from MELD-Na to Harvey-Bradshaw. Every tool validated against peer-reviewed guidelines and updated continuously.
                </p>
              </div>
              {/* Category pills */}
              <div className="sm:w-52 grid grid-cols-2 gap-2 content-start">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-2.5 text-center"
                  >
                    <cat.icon className={cn("h-4 w-4", cat.color)} />
                    <span className="text-[9px] font-bold text-muted-foreground/60 leading-tight">{cat.label}</span>
                    <span className="text-xs font-black text-primary">{cat.count}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Instant results */}
          <BentoCard delay={0.1}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black">Instant Results</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Zero latency — all calculations run client-side. No spinner, no waiting. Type a value, get the answer.
              </p>
              {/* Speed bar animation */}
              <div className="space-y-2 pt-2">
                {["Calculation", "Interpretation", "Recommendations"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-[9px] font-bold text-muted-foreground/50 w-24 shrink-0">{item}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${[95, 88, 72][i]}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <span className="text-[9px] text-primary font-black">~0ms</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Privacy */}
          <BentoCard delay={0.15}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black">Patient Privacy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No patient data ever leaves your device. Completely offline-capable and HIPAA-conscious.
              </p>
              <div className="flex gap-2 pt-2 flex-wrap">
                {["Client-side only", "No telemetry", "No login required"].map((t) => (
                  <span key={t} className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary/70 border border-primary/15">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Combined panels — spans 2 cols */}
          <BentoCard className="md:col-span-2" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-black">Combined Score Panels</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Enter data once to compute multiple related scores simultaneously. Cirrhosis Panel gives MELD-Na + Child-Pugh in a single form. Fibrosis Panel delivers FIB-4, APRI & NAFLD-FS instantly.
                </p>
              </div>
              {/* Panel preview */}
              <div className="sm:w-64 space-y-2">
                {[
                  { name: "MELD-Na", val: "18", color: "bg-amber-400/20 text-amber-400" },
                  { name: "Child-Pugh", val: "B7", color: "bg-orange-400/20 text-orange-400" },
                  { name: "FIB-4", val: "2.8", color: "bg-red-400/20 text-red-400" },
                ].map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <span className="text-xs font-bold text-muted-foreground/70">{p.name}</span>
                    <span className={cn("text-xs font-black px-2 py-0.5 rounded-full", p.color)}>{p.val}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Mobile */}
          <BentoCard delay={0.25}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black">Ward Round Ready</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Designed mobile-first for bedside use. Works perfectly on any screen, any device, without an app install.
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
