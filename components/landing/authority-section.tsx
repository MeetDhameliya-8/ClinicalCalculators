"use client"

import { motion } from "framer-motion"
import { BookOpen, FileText, MessageSquare, Calculator } from "lucide-react"
import Image from "next/image"

const authorityBlocks = [
  {
    title: "Latest Research",
    description: "Curated insights from high-impact gastroenterology and hepatology journals, summarized for clinical relevance.",
    icon: BookOpen
  },
  {
    title: "Guideline Intelligence",
    description: "Structured recommendations aligned with evolving society guidelines and real-world decision pathways.",
    icon: FileText
  },
  {
    title: "GI-Focused AI",
    description: "Dedicated gastroenterology AI designed for clinical reasoning and complex case support.",
    icon: MessageSquare
  },
  {
    title: "Evidence-Based Tools",
    description: "Validated clinical calculators and structured decision support for everyday gastroenterology practice.",
    icon: Calculator
  }
]

export function AuthoritySection() {
  return (
    <section className="py-32 bg-[#F8F9F5] overflow-hidden relative border-y border-primary/5">
      {/* Decorative SVG Pattern Background - Institutional Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="authority-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#1A5653" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#authority-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* TOP ROW: High-Impact Medical Poster Layout (48/52 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-[48fr_52fr] gap-12 lg:gap-16 items-center mb-32">
          
          {/* Left Column: Dominant Poster Visual (48% Width) */}
          <div className="space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 block">
              Continuously Updated Clinical Intelligence
            </span>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full h-[420px] md:h-[560px] lg:h-[720px] aspect-3/4 overflow-hidden rounded-none bg-muted/40 border border-primary/10 shadow-2xl group"
            >
              <Image 
                src="/authority/clinical-authority.jpg"
                alt="Clinical Authority Medical Poster"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              {/* Clinical depth overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent opacity-40" />
            </motion.div>
          </div>

          {/* Right Column: Institutional Headline + Narrative Stack (52% Width) */}
          <div className="space-y-12">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-semibold tracking-[-0.04em] leading-[1] text-[#08313A] uppercase">
              <motion.span 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
                viewport={{ once: true }} 
                className="block"
              >
                Built to align<br />
                clinical practice<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A5653] to-[#5CD85A]">
                  with evidence.
                </span>
              </motion.span>
            </h2>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl sm:text-2xl italic font-serif text-[#107869]/80 leading-relaxed max-w-2xl">
                "Transforming fragmented clinical research into structured, high-precision decision pathways."
              </p>
              <div className="h-px w-24 bg-gradient-to-r from-[#1A5653] to-transparent" />
              <p className="text-lg font-sans font-medium text-gray-500 leading-relaxed max-w-xl">
                GastroAGI unifies the latest journals, society guidelines, and GI-focused AI to help clinicians make the most informed decisions at the point of care.
              </p>
            </motion.div>
          </div>
        </div>

        {/* WORKFLOW TIMELINE: Clinical Intelligence Flow */}
        <div className="border-t border-gray-100 pt-24">

          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/50 mb-16 text-center"
          >
            Clinical Intelligence Workflow
          </motion.p>

          {/* ── DESKTOP: horizontal timeline ── */}
          <div className="hidden md:block relative">

            {/* Animated connector line (SVG draw) */}
            <div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-[1px] overflow-visible pointer-events-none">
              <svg
                className="w-full h-[1px] overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.line
                  x1="0" y1="0.5" x2="100" y2="0.5"
                  stroke="rgba(26,86,83,0.18)"
                  strokeWidth="0.4"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  vectorEffect="non-scaling-stroke"
                  initial={{ strokeDashoffset: 100 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </svg>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-6">
              {authorityBlocks.map((block, idx) => {
                const Icon = block.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Node dot with glow */}
                    <div className="relative mb-7 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.55 + idx * 0.18, duration: 0.5, ease: "backOut" }}
                        viewport={{ once: true }}
                        className="relative z-10 w-[10px] h-[10px] rounded-full bg-[#1A5653] shadow-[0_0_0_3px_rgba(26,86,83,0.12)]
                                   group-hover:shadow-[0_0_0_5px_rgba(92,216,90,0.2),0_0_12px_rgba(92,216,90,0.35)]
                                   group-hover:bg-[#5CD85A] transition-all duration-500"
                      />
                    </div>

                    {/* Icon */}
                    <div className="mb-4 text-[#107869]/50 group-hover:text-[#107869] transition-colors duration-400">
                      <Icon size={15} strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#08313A] mb-2 leading-tight">
                      {block.title}
                    </p>

                    {/* Description */}
                    <p className="text-[12.5px] font-sans text-[#1A5653]/55 leading-relaxed max-w-[200px]">
                      {block.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── MOBILE: vertical timeline ── */}
          <div className="flex flex-col md:hidden relative pl-6">

            {/* Vertical connector line */}
            <div className="absolute left-[10px] top-[10px] bottom-[10px] w-[1px] overflow-hidden">
              <motion.div
                className="w-full bg-[#1A5653]/15 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
                viewport={{ once: true }}
                style={{ height: "100%" }}
              />
            </div>

            {authorityBlocks.map((block, idx) => {
              const Icon = block.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="relative flex gap-6 pb-12 last:pb-0 group"
                >
                  {/* Node dot */}
                  <div className="absolute -left-6 top-[3px] flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.55 + idx * 0.18, duration: 0.4, ease: "backOut" }}
                      viewport={{ once: true }}
                      className="w-[10px] h-[10px] rounded-full bg-[#1A5653] shadow-[0_0_0_3px_rgba(26,86,83,0.12)]
                                 group-hover:bg-[#5CD85A] group-hover:shadow-[0_0_0_5px_rgba(92,216,90,0.18)] transition-all duration-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#107869]/55 group-hover:text-[#107869] transition-colors duration-300">
                      <Icon size={14} strokeWidth={1.5} />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#08313A] leading-tight">
                      {block.title}
                    </p>
                    <p className="text-[12.5px] font-sans text-[#1A5653]/55 leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
