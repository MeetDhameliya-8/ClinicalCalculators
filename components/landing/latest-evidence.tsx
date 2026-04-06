"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const evidenceData = [
  { id: 1, journal: "Gastroenterology", topic: "IBD", date: "Apr 2026", link: "#" },
  { id: 2, journal: "Hepatology", topic: "Cirrhosis", date: "Apr 2026", link: "#" },
  { id: 3, journal: "AJG", topic: "Upper GI Bleeding", date: "Mar 2026", link: "#" },
  { id: 4, journal: "Gut", topic: "GI Oncology", date: "Mar 2026", link: "#" },
  { id: 5, journal: "Endoscopy", topic: "Pancreas & Gallbladder", date: "Mar 2026", link: "#" },
  { id: 6, journal: "JAMA", topic: "Fatty Liver Disease", date: "Feb 2026", link: "#" },
]

export function EvidenceSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Header Section (Flex Row on Desktop to match reference) */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-20 border-b border-transparent pb-4">
          <div className="max-w-xl space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70">
              LATEST EVIDENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-primary leading-[1.1]">
              Latest evidence across gastroenterology
            </h2>
          </div>
          <p className="max-w-sm text-base sm:text-lg text-primary/80 font-medium leading-relaxed pb-2">
            A continuously updated stream of journal insights, specialty topics, and clinically relevant evidence.
          </p>
        </div>

        {/* Table Header (Hidden on small mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-neutral-300 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground w-full px-4 mb-2">
          <div className="col-span-5 lg:col-span-5">Journal</div>
          <div className="col-span-4 lg:col-span-3">Topic</div>
          <div className="col-span-2 lg:col-span-3">Published</div>
          <div className="col-span-1 border-opacity-0"></div>
        </div>

        {/* Interactive Rows */}
        <div className="flex flex-col w-full">
          {evidenceData.map((row, idx) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Link href={row.link} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-4 py-6 border-b border-neutral-200 items-center px-4 hover:bg-neutral-50/60 transition-colors duration-300 cursor-pointer rounded-xl md:rounded-none">
                  
                  {/* Journal Title (Large, Bold) */}
                  <div className="col-span-1 md:col-span-5">
                    <span className="font-sans font-bold text-xl md:text-2xl text-primary">
                      {row.journal}
                    </span>
                  </div>
                  
                  {/* Topic Pill */}
                  <div className="col-span-1 md:col-span-4 lg:col-span-3 flex items-center">
                    <span className="inline-flex items-center justify-center border border-neutral-200 rounded-full px-4 py-1.5 text-[12px] font-medium text-primary bg-white shadow-sm group-hover:border-primary/20 transition-colors">
                      {row.topic}
                    </span>
                  </div>
                  
                  {/* Date & Mobile Arrow Wrapper */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-between items-center w-full">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {row.date}
                    </span>
                    
                    {/* Mobile Only Arrow (Shows up right next to date on small screens) */}
                    <div className="md:hidden w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Desktop Only Far-Right Arrow Button */}
                  <div className="hidden md:flex col-span-1 justify-end items-center">
                    <div className="w-11 h-11 rounded-full border border-transparent bg-neutral-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-md transition-all duration-300 transform group-hover:scale-105">
                      <ArrowUpRight className="w-4.5 h-4.5" />
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
