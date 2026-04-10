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

        {/* BOTTOM GRID: Authority Content Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 border-t border-gray-100 pt-24">
          {authorityBlocks.map((block, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative group space-y-6"
            >
              {/* Background Glow on Hover */}
              <div className="absolute -inset-4 bg-white/0 group-hover:bg-white/100 rounded-[2rem] transition-all duration-700 -z-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]" />

              {/* Number Overlay - premium outline style */}
              <div className="flex items-center gap-8 group-hover:translate-x-2 transition-transform duration-700">
                <div className="relative">
                  <span className="text-7xl sm:text-8xl font-sans font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-transparent select-none">
                    0{idx + 1}
                  </span>
                  {/* Thin animated line below number */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 1 + idx * 0.2, duration: 1.5 }}
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#5CD85A] to-transparent opacity-40" 
                  />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#08313A] uppercase leading-none">
                  {block.title}
                </h3>
              </div>

              {/* Authority Description with customized border */}
              <div className="pl-6 space-y-4">
                <p className="text-lg font-sans font-medium text-[#1A5653]/70 leading-relaxed">
                  {block.description}
                </p>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                   <div className="h-0.5 w-8 bg-[#5CD85A]" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#107869]">Enhanced Evidence</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
