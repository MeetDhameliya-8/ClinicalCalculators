"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const TABS = [
  { id: "meld-na", label: "MELD-Na" },
  { id: "fib4", label: "FIB-4" },
  { id: "bisap", label: "BISAP" },
]

// Demo data per tab for simulated preview
const DEMO_DATA: Record<string, {
  inputs: { label: string; val: string; unit?: string }[]
  score: string | number
  severity: string
  interpretation: string
  color: string
}> = {
  "meld-na": {
    inputs: [
      { label: "Creatinine", val: "1.8", unit: "mg/dL" },
      { label: "Bilirubin", val: "3.2", unit: "mg/dL" },
      { label: "INR", val: "1.6" },
      { label: "Sodium", val: "132", unit: "mEq/L" },
    ],
    score: 18,
    severity: "Moderate",
    interpretation: "6% predicted 90-day mortality. Consider transplant evaluation.",
    color: "text-amber-400",
  },
  fib4: {
    inputs: [
      { label: "Age", val: "52", unit: "years" },
      { label: "AST", val: "48", unit: "U/L" },
      { label: "ALT", val: "36", unit: "U/L" },
      { label: "Platelets", val: "148", unit: "×10³/μL" },
    ],
    score: "2.8",
    severity: "Indeterminate",
    interpretation: "FIB-4 in intermediate range — consider liver biopsy or elastography.",
    color: "text-orange-400",
  },
  bisap: {
    inputs: [
      { label: "BUN", val: "28", unit: "mg/dL" },
      { label: "Age", val: "62", unit: "years" },
      { label: "GCS", val: "15" },
      { label: "WBC", val: "14.5", unit: "×10³/μL" },
    ],
    score: 2,
    severity: "Moderate Risk",
    interpretation: "BISAP 2 — 8% risk of severe AP. Close monitoring required.",
    color: "text-rose-400",
  },
}

export function InteractiveDemoSection() {
  const [activeTab, setActiveTab] = useState("meld-na")
  const demo = DEMO_DATA[activeTab]

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/5 blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-primary"
          >
            Interactive Preview
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black tracking-tight"
          >
            See it in action.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Explore the interface before you commit. Switch tabs to preview different tools.
          </motion.p>
        </div>

        {/* Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-white/8 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Tab bar */}
          <div className="flex items-center gap-1 border-b border-white/8 px-6 py-3 bg-white/[0.02]">
            <div className="flex gap-1.5 mr-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                  activeTab === tab.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-white/5"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Demo content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 grid md:grid-cols-2 gap-8"
            >
              {/* Inputs */}
              <div className="space-y-4">
                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/40">Clinical Inputs</div>
                <div className="space-y-3">
                  {demo.inputs.map((inp) => (
                    <div
                      key={inp.label}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-background/40 px-4 py-3 group hover:border-primary/20 hover:bg-primary/5 transition-all cursor-default"
                    >
                      <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider">{inp.label}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-black text-foreground group-hover:text-primary transition-colors">{inp.val}</span>
                        {inp.unit && <span className="text-[10px] text-muted-foreground/40">{inp.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="space-y-4">
                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/40">Calculated Outcome</div>
                <div className="space-y-3">
                  {/* Score box */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="rounded-2xl bg-primary/10 border border-primary/20 p-6 flex items-center gap-6"
                  >
                    <span className={cn("text-5xl font-black", demo.color)}>{demo.score}</span>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold">Score</div>
                      <div className="text-sm font-black text-foreground/80 mt-0.5">{demo.severity}</div>
                    </div>
                  </motion.div>
                  {/* Interpretation */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-2xl border border-white/5 bg-white/[0.025] p-5"
                  >
                    <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2">Interpretation</div>
                    <p className="text-sm text-foreground/70 leading-relaxed">{demo.interpretation}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="border-t border-white/8 px-8 py-4 bg-white/[0.02] flex items-center justify-between">
            <span className="text-xs text-muted-foreground/40">This is a simulated preview</span>
            <Link href={`/calculator?id=${activeTab}`}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-xs font-black text-primary hover:text-primary/80 transition-colors"
              >
                Open Full Tool <ArrowRight className="h-3.5 w-3.5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
