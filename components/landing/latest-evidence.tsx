"use client"

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion"
import { ArrowUpRight, LucideIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

function CountUpNumber({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration })
    }
  }, [isInView, value, motionValue, duration])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const evidenceData = [
  { id: 1, journal: "Gastroenterology", topic: "IBD", date: "Apr 2026", link: "#" },
  { id: 2, journal: "Hepatology", topic: "Cirrhosis", date: "Apr 2026", link: "#" },
  { id: 3, journal: "AJG", topic: "Upper GI Bleeding", date: "Mar 2026", link: "#" },
  { id: 4, journal: "Gut", topic: "GI Oncology", date: "Mar 2026", link: "#" },
  { id: 5, journal: "Endoscopy", topic: "Pancreas & Gallbladder", date: "Mar 2026", link: "#" },
]

export function EvidenceSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* TOP HEADER: 2-COLUMN INTRO */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1.5 text-xs font-semibold text-[#1A5653] bg-white shadow-sm">
                About Clinical Intelligence
            </span>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-sans font-medium text-[#08313A] leading-tight text-right lg:text-left">
              At GastroAGI, we don't just aggregate data — we synthesize it. Since 2024, our platform has been a home for clinical insights of all levels, from emerging research to established guidelines.
            </p>
          </div>
        </div>

        {/* MAIN BENTO GRID: 3 COLS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20 items-stretch">
          
          {/* LEFT CARD: DARK INTELLIGENCE (Col span 4) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-[#08313A] rounded-[3rem] p-10 flex flex-col justify-between text-white min-h-[480px] group overflow-hidden relative"
          >
            <div className="space-y-8 relative z-10">
              <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3 className="text-3xl font-sans font-semibold leading-[1.2]">
                Global journal<br />
                tracking with<br />
                real-time <span className="text-[#5CD85A]">clinical synthesis</span> — <br />
                delivered in absolute precision.
              </h3>
            </div>
            
            <div className="relative z-10">
                <button className="flex items-center gap-3 bg-[#107869] hover:bg-[#1A5653] transition-colors px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-black/20 group">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                        <div className="h-2 w-2 bg-[#5CD85A] rounded-full animate-pulse" />
                    </div>
                    Intelligence Active
                </button>
            </div>

            {/* Decorative mesh */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(92,216,90,0.1),transparent)] opacity-50" />
          </motion.div>

          {/* CENTER CARD: WIDE IMAGE (Col span 4) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 rounded-[3rem] overflow-hidden relative group min-h-[480px]"
          >
            <img 
              src="/evidence/anamorph.jpg" 
              alt="Medical Data Analysis" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex flex-center items-center justify-center p-8 text-center px-12">
                <div className="backdrop-blur-xl bg-white/10 px-8 py-3 rounded-full border border-white/20 text-white font-semibold text-sm shadow-2xl">
                    Clinical Mastery & Training
                </div>
            </div>
          </motion.div>

          {/* RIGHT CARD: STATS & PROGRESS (Col span 4) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-[#F8F9FB] rounded-[3rem] p-10 flex flex-col justify-between min-h-[480px] border border-gray-100"
          >
            <div className="space-y-6">
                <div>
                   <h4 className="text-5xl font-black text-[#08313A]">12+</h4>
                   <p className="text-sm font-black text-[#107869] uppercase tracking-widest mt-2">Primary Journals</p>
                </div>
                <p className="text-sm font-medium text-gray-400 leading-relaxed">
                    Continuously monitoring evidence output from the world's most cited gastroenterology publications.
                </p>
            </div>

            <div className="space-y-6">
                {[
                    { label: "Hepatology", value: 9 },
                    { label: "IBD Care", value: 7 },
                    { label: "Oncology", value: 8 },
                ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#08313A]">
                            <span>{stat.label}</span>
                            <span>{stat.value}/10</span>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(10)].map((_, dotIdx) => (
                                <div 
                                    key={dotIdx} 
                                    className={`h-2 w-2 rounded-full transition-colors duration-1000 delay-${dotIdx * 100}`}
                                    style={{ 
                                        backgroundColor: dotIdx < stat.value ? '#107869' : '#E5E7EB' 
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>
        
        </div>

        {/* BOTTOM SECTION: SUMMARY NUMBERS */}
        <div className="text-center mb-16">
            <h5 className="text-lg font-bold text-[#08313A]/60">Clinical intelligence in numbers</h5>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 px-6">
             {[
                { label: "Active Trials", value: 125, suffix: "+" },
                { label: "Guideline Concordance", value: 89, suffix: "%" },
                { label: "Clinician Users", value: 1200, suffix: "+" },
                { label: "Evidence Queries", value: 15, suffix: "k+" },
             ].map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                    className="space-y-2 text-center"
                >
                    <h6 className="text-4xl md:text-5xl font-black text-[#08313A]">
                        <CountUpNumber value={stat.value} suffix={stat.suffix} />
                    </h6>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
             ))}
        </div>

      </div>
    </section>
  )
}
