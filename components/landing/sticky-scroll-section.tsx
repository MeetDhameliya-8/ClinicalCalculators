"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

function StepPreview1() {
  return (
    <div className="rounded-2xl border border-white/8 bg-background/60 p-4 space-y-2">
      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-3">Calculator Suite</div>
      {["MELD-Na Score", "Child-Pugh Score", "FIB-4 Index", "Glasgow-Blatchford"].map((c, i) => (
        <motion.div
          key={c}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className={`rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground/60 hover:bg-white/5"}`}
        >
          {c}
        </motion.div>
      ))}
    </div>
  )
}

function StepPreview2() {
  return (
    <div className="rounded-2xl border border-white/8 bg-background/60 p-4 space-y-3">
      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">Clinical Inputs</div>
      {[
        { label: "Creatinine", val: "1.8", unit: "mg/dL" },
        { label: "Bilirubin", val: "3.2", unit: "mg/dL" },
        { label: "INR", val: "1.6", unit: "" },
        { label: "Sodium", val: "132", unit: "mEq/L" },
      ].map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
        >
          <span className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-wider">{f.label}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black text-foreground">{f.val}</span>
            <span className="text-[9px] text-muted-foreground/40">{f.unit}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function StepPreview3() {
  return (
    <div className="rounded-2xl border border-white/8 bg-background/60 p-4 space-y-3">
      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">Result</div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 rounded-xl bg-primary/10 border border-primary/20 p-4"
      >
        <span className="text-4xl font-black text-primary">18</span>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold">MELD-Na Score</div>
          <div className="text-xs font-bold text-foreground/80">Moderate Severity</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-muted-foreground/70 leading-relaxed"
      >
        6% predicted 90-day mortality. Consider priority listing evaluation. Monitor renal function closely.
      </motion.div>
    </div>
  )
}

const STEPS = [
  {
    num: "01",
    title: "Select your calculator",
    desc: "Choose from 22 evidence-based tools across hepatology and gastroenterology — organized by specialty.",
    Preview: StepPreview1,
  },
  {
    num: "02",
    title: "Enter clinical values",
    desc: "Clean, minimal inputs with unit labels and tooltips. No clutter, no confusion — just the data you need.",
    Preview: StepPreview2,
  },
  {
    num: "03",
    title: "Get instant guidance",
    desc: "Immediate score, severity grade, clinical interpretation, and actionable recommendation — all at once.",
    Preview: StepPreview3,
  },
]

export function StickyScrollSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-primary"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black tracking-tight"
          >
            Three steps to clarity.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}
            >
              {/* Text side */}
              <div className="flex-1 space-y-5">
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/60">{step.num}</div>
                <h3 className="text-3xl font-black tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{step.desc}</p>
              </div>
              {/* Preview side */}
              <div className="flex-1 w-full">
                <step.Preview />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
