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
    <section className="pt-16 pb-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-12 flex justify-center">
            <h2 className="text-2xl sm:text-4xl font-sans font-semibold tracking-[-0.03em] uppercase text-center flex flex-wrap justify-center border-b border-gray-100 pb-8 px-4">
              <span className="text-[#08313A]">How </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A5653] via-[#107869] to-[#5CD85A] mx-2">
                GastroAGI
              </span>
              <span className="text-[#08313A]"> solves the clinical challenge</span>
            </h2>
        </div>

        {/* FREE-STYLE CLINICAL GRID: 3 COLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {solutionItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group flex flex-col space-y-8"
            >
              {/* Image Header - Free Style Flush */}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Area - Minimalist Stack */}
              <div className="flex-1 flex flex-col space-y-5">
                <h3 className="text-xl md:text-2xl font-sans font-bold text-[#08313A] leading-tight tracking-tight group-hover:text-[#107869] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed font-normal max-w-[90%]">
                  {item.description}
                </p>
                
                {/* CTA - Minimal Line Action */}
                <div className="pt-4 mt-auto">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#107869] group-hover:text-[#5CD85A] transition-colors">
                    <span>Explore Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
