"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const solutionItems = [
  {
    title: "Precision Risk Stratification in Hepatology",
    description: "Automated calculation of MELD-Na, FIB-4, and NAFLD fibrosis scores aligned with latest AASLD and EASL guidelines.",
    image: "/previews/hepatology.png"
  },
  {
    title: "GI-Specific AI Clinical Reasoning",
    description: "Our dedicated LLM architecture provides structured evidence-based responses to complex gastroenterology queries.",
    image: "/previews/ai-reasoning.png"
  },
  {
    title: "Validated Evidence-Based Decision Pathways",
    description: "Streamlined clinical protocols for IBD management, GI bleeding, and pancreatobiliary disorders.",
    image: "/previews/pathway.png"
  }
]

export function SolutionPreviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Main Card Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#f9f9f6] rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-neutral-100 shadow-sm"
        >
          {/* Section Header */}
          <div className="mb-16 flex justify-center">
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-primary uppercase text-center flex flex-wrap justify-center">
              {"How GastroAGI solves the clinical challenge".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.05,
                    delay: index * 0.03,
                    ease: "linear"
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
          </div>

          {/* Solution List */}
          <div className="space-y-10 md:space-y-12">
            {solutionItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Thumbnail */}
                <div className="relative w-full md:w-[320px] aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-white/50 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-primary leading-snug tracking-tight group-hover:text-primary/80 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-2xl font-medium">
                    {item.description}
                  </p>
                  
                  {/* Subtle Link Button */}
                  <div className="pt-2 flex justify-center md:justify-start">
                    <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary/50 group-hover:text-primary transition-colors">
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
