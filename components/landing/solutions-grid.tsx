"use client"

import { motion } from "framer-motion"
import { Activity, MessageSquare, BookOpen, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { JournalMarquee } from "./journal-marquee"

const solutions = [
  {
    title: "Advanced Clinical Calculators",
    description: "Evidence-based tools for precision risk stratification in hepatology.",
    icon: Activity,
    cta: "Launch Suite",
    href: "/calculator",
    style: {
      card: "bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl shadow-blue-500/20",
      iconText: "text-blue-500"
    }
  },
  {
    title: "AI-Powered Clinical Chat",
    description: "Ask complex gastroenterology questions with direct, evidence-based responses.",
    icon: MessageSquare,
    cta: "Talk with AI",
    href: "/assistant",
    style: {
      card: "bg-primary-gradient shadow-2xl shadow-primary/20 scale-105 z-10",
      iconText: "text-primary"
    }
  },
  {
    title: "High-Impact Research Insights",
    description: "Curated data analytics from the world's leading GI journals.",
    icon: BookOpen,
    cta: "Explore Data",
    href: "/blog",
    style: {
      card: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-xl shadow-purple-500/20",
      iconText: "text-purple-500"
    }
  },
  {
    title: "Clinical Strategy & Support",
    description: "Helping clinicians navigate evolving standards with structured support.",
    icon: CheckCircle,
    cta: "Learn More",
    href: "/conference",
    style: {
      card: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-xl shadow-amber-500/20",
      iconText: "text-amber-500"
    }
  }
]

export function SolutionsGrid() {
  return (
    <section className="pt-24 pb-0 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING SECTION: Inspired by referencing screenshot */}
        <div className="max-w-3xl mb-20 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-sans font-medium text-foreground leading-tight">
            We are pioneers in <span className="text-primary italic">clinical intelligence</span>,
            dedicated to helping gastroenterologists harness the power of artificial intelligence
            to drive precision, efficiency, and patient growth.
          </h2>
        </div>

        {/* 4-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-transparent">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative flex flex-col justify-between min-h-[380px] rounded-[2rem] overflow-hidden transition-all duration-500",
                item.style.card
              )}
            >
              {/* Card Content Top */}
              <div className="p-8 space-y-6">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 bg-white",
                  item.style.iconText
                )}>
                  <item.icon className="h-6 w-6" />
                </div>

                <h3 className="text-2xl font-sans font-medium leading-tight text-white">
                  {item.title}
                </h3>
              </div>

              {/* Card Footer / CTA */}
              <Link href={item.href} className="mt-auto">
                <div className="px-8 py-5 border-t border-white/10 bg-black/10 hover:bg-black/20 text-white flex items-center justify-between transition-colors">
                  <span className="text-xs font-black uppercase tracking-widest">{item.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>

              {/* Featured Glow Effect - Uniform across cards */}
              <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20">
                <div className="h-32 w-32 bg-white blur-[60px] rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integrated Marquee Belt */}
      <div className="mt-20">
        <JournalMarquee />
      </div>
    </section>
  )
}
