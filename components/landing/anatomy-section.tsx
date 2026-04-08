"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Callout {
  title: string
  description: string
  position: string // Card container positioning
  delay: number
}

const callouts: Callout[] = [
  {
    title: "Liver Disorders",
    description: "Liver disease develops due to chronic injury from alcohol, viral hepatitis, or metabolic dysfunction such as fatty liver disease. Persistent damage leads to fibrosis and eventually cirrhosis, disrupting normal liver architecture and blood flow. This results in portal hypertension and complications like ascites and varices.",
    position: "lg:top-[5%] lg:-left-[450px]",
    delay: 0.1
  },
  {
    title: "Stomach Disorders",
    description: "Stomach diseases arise when the balance between acid secretion and mucosal protection is disrupted. Common causes include Helicobacter pylori infection, NSAID use, and alcohol. This leads to gastritis or peptic ulcer disease, presenting with epigastric pain, nausea, and sometimes bleeding.",
    position: "lg:top-[0%] lg:-right-[450px]",
    delay: 0.2
  },
  {
    title: "Pancreatitis",
    description: "Pancreatitis occurs when digestive enzymes are prematurely activated within the pancreas, causing inflammation and tissue damage. Acute pancreatitis is commonly triggered by gallstones or alcohol and presents with severe abdominal pain. Recurrent inflammation leads to chronic pancreatitis.",
    position: "lg:top-[35%] lg:-right-[460px]",
    delay: 0.4
  },
  {
    title: "Upper GI Tract Disorders",
    description: "Upper GI disorders involve the esophagus, stomach, and duodenum, often due to acid exposure or motility issues. GERD occurs when acid reflux damages the esophageal lining, causing heartburn. Chronic exposure may lead to complications like strictures or Barrett's esophagus.",
    position: "lg:top-[82%] lg:-right-[400px]",
    delay: 0.3
  },
  {
    title: "IBD (Inflammatory Bowel Disease)",
    description: "IBD is a chronic inflammatory condition of the GI tract caused by immune dysregulation. Crohn’s disease can affect any part of the GI tract, often the small intestine, with transmural inflammation, while ulcerative colitis is limited to the colon and mucosa.",
    position: "lg:bottom-[5%] lg:-left-[450px]",
    delay: 0.5
  }
]

export function AnatomySection() {
  return (
    <section className="pt-40 pb-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Editorial Header */}
        <div className="mb-24 space-y-6 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70">
            Full Spectrum of Gastroenterology
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-primary leading-[1.1]">
            Explore the breadth of modern gastroenterology practice
          </h2>
          <p className="text-lg text-primary/80 font-medium leading-relaxed">
            From liver disease and upper GI disorders to pancreatobiliary conditions — GastroAGI brings together the core domains of clinical intelligence.
          </p>
        </div>

        {/* Central Atlas Visualization Container */}
        <div className="relative inline-block w-full max-w-6xl min-h-[950px]">
          
          <div className="relative w-full max-w-[460px] mx-auto pt-10">
            {/* Medical Atlas Poster Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex justify-center relative w-full z-10"
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

            {/* Desktop Callouts */}
            <div className="hidden lg:block">
              {callouts.map((callout, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: callout.delay }}
                  viewport={{ once: true }}
                  className={cn("absolute z-30 w-[420px] text-left", callout.position)}
                >
                  <div className="bg-white/95 backdrop-blur-md border border-gray-100 rounded-none p-8 lg:p-10">
                    <h3 className="text-lg font-normal text-primary mb-4 flex items-start gap-2 font-merriweather">
                       <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2.5 shrink-0" />
                       <span className="leading-tight">{callout.title}</span>
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-normal font-sans">
                      {callout.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Mobile Layout (Stacked Below) */}
        <div className="lg:hidden mt-8 grid grid-cols-1 gap-8 max-w-2xl mx-auto px-4">
          {callouts.map((callout, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-none p-8 text-left"
            >
              <h3 className="text-lg font-normal text-primary mb-3 flex items-start gap-2 font-merriweather">
                 <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                 {callout.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal font-sans">
                {callout.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
