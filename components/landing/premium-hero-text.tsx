"use client"

import { motion } from "framer-motion"

export function PremiumHeroText() {
  return (
    <div className="flex flex-col items-start gap-2 lg:gap-3 w-full text-left font-sans">
      
      {/* Line 1 */}
      {/* Line 1 */}
      {/* Line 1 */}
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold tracking-[-0.02em] text-[#1a202c] leading-[1.1] whitespace-nowrap"
      >
        Enabling Timely, Evidence
      </motion.h2>

      {/* Line 2 */}
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold tracking-[-0.02em] text-[#1a202c] leading-[1.1] whitespace-nowrap"
      >
        Based Decision-Making in
      </motion.h2>

      {/* Line 3: SVG Animated Capsule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-2 md:mt-4 ml-16"
      >
        {/* Calm light glow from behind */}
        <div className="absolute inset-2 bg-gradient-to-r from-teal-400 to-sky-400 blur-2xl opacity-40 rounded-lg" />

        <motion.div 
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-flex items-center justify-center rounded-lg overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)] border-[1.5px] border-white/60"
        >
          
          {/* Organic Fluid SVG Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="medical-capsule-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f766e" /> {/* Teal 700 */}
                <stop offset="40%" stopColor="#0d9488" /> {/* Teal 600 */}
                <stop offset="70%" stopColor="#10b981" /> {/* Emerald 500 */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue 500 */}
                
                {/* Slow color drift */}
                <animate attributeName="x1" values="-50%;0%;-50%" dur="15s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;100%;150%" dur="15s" repeatCount="indefinite" />
              </linearGradient>
              
              <filter id="capsule-fluid-noise">
                {/* Very subtle biological wave effect */}
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise">
                  <animate attributeName="baseFrequency" values="0.015;0.018;0.015" dur="8s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-capsule-grad)" filter="url(#capsule-fluid-noise)" opacity="0.95" />
          </svg>

          {/* Inner soft glow */}
          <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_12px_rgba(255,255,255,0.3)] z-10 pointer-events-none" />

          {/* Light sweep effect */}
          <motion.div
            animate={{ x: ["-150%", "250%"] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-20 pointer-events-none"
          />

          {/* Text Content */}
          <span className="relative z-30 px-6 py-2.5 md:px-7 md:py-3 text-white font-bold text-[22px] md:text-[26px] lg:text-[28px] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] leading-none">
            Gastroenterology
          </span>
          
        </motion.div>
      </motion.div>
    </div>
  )
}
