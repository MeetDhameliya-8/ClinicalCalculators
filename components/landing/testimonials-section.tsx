"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote: "GastroAGI has become indispensable on our ward rounds. Having MELD-Na, Child-Pugh, and FIB-4 in one place — with clear interpretations — saves us at least 15 minutes every morning.",
    name: "Dr. Aditya Sharma",
    role: "Consultant Hepatologist",
    institution: "AIIMS, New Delhi",
    initials: "AS",
  },
  {
    quote: "The combined panels are a game-changer. Entering data once and getting the full Fibrosis Panel instantly is exactly what we needed for our NAFLD clinic.",
    name: "Dr. Kavitha Menon",
    role: "Gastroenterologist",
    institution: "Apollo Hospitals, Chennai",
    initials: "KM",
  },
  {
    quote: "Clean, fast, accurate. I use the Glasgow-Blatchford and Rockall combo in every acute GI bleed — the UI makes it trivial even at 3am on call.",
    name: "Dr. James Whitmore",
    role: "Senior Registrar, Gastroenterology",
    institution: "Royal Free Hospital, London",
    initials: "JW",
  },
  {
    quote: "The no-login, no-data-collection policy gave our ethics board no concerns. We've deployed this across our entire department with confidence.",
    name: "Dr. Priya Chandrasekaran",
    role: "Head of Department",
    institution: "KEM Hospital, Mumbai",
    initials: "PC",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-primary"
          >
            Clinician Voices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight"
          >
            Trusted at the bedside.
          </motion.h2>
        </div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((t, i) => {
            const isFeatured = i === current
            return (
              <motion.div
                key={i}
                animate={{
                  opacity: isFeatured ? 1 : 0.45,
                  scale: isFeatured ? 1 : 0.97,
                  borderColor: isFeatured ? "rgba(163,255,18,0.2)" : "rgba(255,255,255,0.06)",
                }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setCurrent(i)}
                className="relative rounded-[2rem] border bg-card/40 backdrop-blur-xl p-8 space-y-6 cursor-pointer group"
              >
                {isFeatured && (
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/6 via-transparent to-transparent pointer-events-none" />
                )}
                <Quote className={cn("h-8 w-8", isFeatured ? "text-primary/60" : "text-muted-foreground/20")} />
                <p className="text-foreground/80 leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4 pt-2 border-t border-white/6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-[11px] text-muted-foreground/50">{t.role} · {t.institution}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  i === current ? "w-6 bg-primary" : "bg-white/20"
                )}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
