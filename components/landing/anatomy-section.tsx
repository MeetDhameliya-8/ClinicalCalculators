"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const tabs = [
  { label: "Hepatitis", position: "lg:top-[15%] lg:-left-[12%]", delay: 0 },
  { label: "Upper GI", position: "lg:top-[15%] lg:-right-[12%]", delay: 0.2 },
  { label: "Cirrhosis", position: "lg:top-[45%] lg:-left-[18%]", delay: 0.4 },
  { label: "Pancreas & Gallbladder", position: "lg:top-[45%] lg:-right-[18%]", delay: 0.6 },
  { label: "IBD", position: "lg:bottom-[15%] lg:-left-[12%]", delay: 0.8 },
  { label: "GI Oncology", position: "lg:bottom-[15%] lg:-right-[12%]", delay: 1.0 }
]

export function AnatomySection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Editorial Header */}
        <div className="mb-10 space-y-6 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70">
            Full Spectrum of Gastroenterology
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-primary leading-[1.1]">
            Explore the breadth of modern gastroenterology practice
          </h2>
          <p className="text-lg text-primary/80 font-medium leading-relaxed">
            From liver disease and upper GI disorders to pancreatobiliary conditions, IBD, 
            and GI oncology — GastroAGI brings together the core domains of gastroenterology 
            into a unified, continuously updated clinical intelligence platform.
          </p>
        </div>

        {/* Central Atlas Visualization Container */}
        <div className="relative inline-block w-full max-w-[460px] mt-2">
          
          {/* Medical Atlas Poster Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex justify-center relative w-full"
          >
            <Image 
              src="/anatomy/b26d5647c6a06bff92f821be2ecae2dc.jpg"
              alt="Gastroenterology Anatomy Atlas"
              width={460}
              height={760}
              className="rounded-none shadow-none border-none bg-transparent object-contain h-[760px] w-auto relative z-0"
              priority
            />
          </motion.div>

          {/* Floating Premium Tabs (Absolute Desktop) */}
          <div className="hidden lg:block">
            {tabs.map((tab, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ 
                  y: [0, -6, 0] 
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: tab.delay },
                  scale: { duration: 0.8, delay: tab.delay },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: tab.delay }
                }}
                viewport={{ once: true }}
                className={`absolute ${tab.position} z-10 flex items-center justify-center`}
              >
                <div className="bg-white border border-neutral-200 rounded-full px-5 py-2 text-[12px] tracking-[0.05em] uppercase font-bold text-primary shadow-sm shadow-primary/5 hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-default whitespace-nowrap">
                  {tab.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Mobile Layout (Stacked Below) */}
        <div className="lg:hidden mt-16 grid grid-cols-2 gap-4 max-w-sm mx-auto px-4">
          {tabs.map((tab, idx) => (
            <div 
              key={idx}
              className="bg-white border border-neutral-200 rounded-full px-4 py-2.5 text-[11px] tracking-[0.04em] uppercase font-bold text-center text-primary shadow-sm"
            >
              {tab.label}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
