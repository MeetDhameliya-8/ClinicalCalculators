"use client"

import { motion } from "framer-motion"
import { Activity, MessageSquare, BookOpen, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const solutions = [
  {
    title: "Advanced Clinical Calculators",
    description: "Evidence-based tools for precision risk stratification in hepatology.",
    icon: Activity,
    cta: "Launch Suite",
    href: "/calculator",
    featured: false
  },
  {
    title: "AI-Powered Clinical Chat",
    description: "Ask complex gastroenterology questions with direct, evidence-based responses.",
    icon: MessageSquare,
    cta: "Talk with AI",
    href: "/trending",
    featured: true
  },
  {
    title: "High-Impact Research Insights",
    description: "Curated data analytics from the world's leading GI journals.",
    icon: BookOpen,
    cta: "Explore Data",
    href: "/blog",
    featured: false
  },
  {
    title: "Clinical Strategy & Support",
    description: "Helping clinicians navigate evolving standards with structured support.",
    icon: CheckCircle,
    cta: "Learn More",
    href: "/conference",
    featured: false
  }
]

export function SolutionsGrid() {
  return (
    <section className="py-24 bg-background">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative flex flex-col justify-between min-h-[380px] rounded-[2rem] overflow-hidden transition-all duration-500",
                item.featured 
                  ? "bg-primary-gradient shadow-2xl shadow-primary/20 scale-105 z-10" 
                  : "bg-white border border-primary/10 shadow-sm hover:shadow-xl hover:border-primary/20"
              )}
            >
              {/* Card Content Top */}
              <div className="p-8 space-y-6">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                  item.featured ? "bg-white text-primary" : "bg-primary/5 text-primary"
                )}>
                  <item.icon className="h-6 w-6" />
                </div>
                
                <h3 className={cn(
                  "text-2xl font-sans font-medium leading-tight",
                  item.featured ? "text-white" : "text-primary"
                )}>
                  {item.title}
                </h3>
              </div>

              {/* Card Footer / CTA */}
              <Link href={item.href} className="mt-auto">
                <div className={cn(
                  "px-8 py-5 border-t flex items-center justify-between transition-colors",
                  item.featured 
                    ? "border-white/10 bg-black/10 hover:bg-black/20 text-white" 
                    : "border-primary/5 bg-primary/5 hover:bg-primary/10 text-primary"
                )}>
                  <span className="text-xs font-black uppercase tracking-widest">{item.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>

              {/* Featured Glow Effect */}
              {item.featured && (
                <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20">
                  <div className="h-32 w-32 bg-white blur-[60px] rounded-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
