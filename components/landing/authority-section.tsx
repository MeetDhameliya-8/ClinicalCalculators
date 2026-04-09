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
    <section className="py-32 bg-[#f4f5f0] overflow-hidden border-y border-primary/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-[-0.03em] leading-none text-primary uppercase drop-shadow-sm wrap-break-word whitespace-normal">
              {[
                "Built to keep",
                "gastroenterology",
                "practice aligned",
                "with evidence."
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden relative pb-[0.1em] mb-[-0.1em]">
                  <motion.span 
                    initial={{ y: "110%" }} 
                    whileInView={{ y: 0 }} 
                    transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} 
                    viewport={{ once: true }} 
                    className="block leading-none"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl font-sans font-medium text-muted-foreground/80 leading-relaxed max-w-2xl"
            >
              GastroAGI integrates the latest gastroenterology journals, guideline-based recommendations, 
              GI-focused AI reasoning, and evidence-based clinical tools — helping clinicians 
              translate research into confident real-world decisions.
            </motion.p>
          </div>
        </div>

        {/* BOTTOM GRID: Authority Content Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 border-t border-primary/10 pt-24">
          {authorityBlocks.map((block, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 group"
            >
              {/* Massive Metric-Style Header */}
              <div className="flex items-baseline gap-4">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-sans font-extrabold text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                  0{idx + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-primary uppercase">
                  {block.title}
                </h3>
              </div>

              {/* Authority Description */}
              <p className="text-base sm:text-lg font-sans font-medium text-muted-foreground/70 leading-relaxed pl-4 border-l-2 border-primary/10 group-hover:border-primary/40 transition-colors">
                {block.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
