"use client"

import { motion } from "framer-motion"

const journals = [
  "AASLD",
  "JAMA",
  "AGA",
  "GUT",
  "NATURE",
  "GIE",
]

export function JournalMarquee() {
  // Duplicate journals to ensure seamless loop
  const duplicatedJournals = [...journals, ...journals, ...journals, ...journals]

  return (
    <div className="w-full py-6 overflow-hidden relative">
      <motion.div
        initial={{ x: "-50%" }}
        animate={{ x: "0%" }}
        transition={{
          duration: 35, // Slightly slower for readability in smaller size
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap gap-16 md:gap-32 items-center"
      >
        {duplicatedJournals.map((journal, i) => (
          <span
            key={i}
            className="text-2xl md:text-3xl font-sans font-black text-neutral-400/80 hover:text-[#107869] transition-colors cursor-default tracking-[0.3em] uppercase"
          >
            {journal}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
