"use client"

import { motion } from "framer-motion"
import { 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Calculator, 
  Bell, 
  GraduationCap,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Latest Journal Updates",
    description: "Curated insights from high-impact gastroenterology and hepatology research.",
    icon: BookOpen,
    href: "/blog"
  },
  {
    title: "Guideline-Based Decisions",
    description: "Structured recommendations aligned with evolving clinical guidelines.",
    icon: FileText,
    href: "/conference"
  },
  {
    title: "GI-Focused AI Chat",
    description: "Ask complex gastroenterology questions with evidence-based responses.",
    icon: MessageSquare,
    href: "/trending"
  },
  {
    title: "Clinical Calculators",
    description: "Validated tools for risk stratification and decision support.",
    icon: Calculator,
    href: "/calculator"
  },
  {
    title: "Conference Highlights",
    description: "Stay current with important updates from major GI meetings.",
    icon: Bell,
    href: "/conference"
  },
  {
    title: "Case-Based Learning",
    description: "Practical, real-world clinical reasoning for trainees and specialists.",
    icon: GraduationCap,
    href: "/blog"
  }
]

export function FeatureMarquee() {
  // Duplicate the list for seamless looping
  const doubledFeatures = [...features, ...features]

  return (
    <section className="py-24 bg-background overflow-hidden">
      {/* 1. HEADING SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-primary">
          Built for <span className="italic">modern</span> gastroenterology decision making
        </h2>
        <p className="text-sm sm:text-base font-sans font-medium text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed">
          From high-impact journals and guideline updates to GI-specific AI assistance and validated clinical calculators, GastroAGI delivers structured intelligence designed for everyday gastroenterology practice and real-world clinical reasoning.
        </p>
      </div>

      {/* 2. MARQUEE CONTAINER */}
      <div className="relative group">
        {/* Soft Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Content */}
        <div className="flex animate-[marquee_40s_linear_infinite] hover:paused whitespace-nowrap">
          {doubledFeatures.map((feature, idx) => (
            <div 
              key={idx} 
              className="inline-block px-4"
            >
              <div className="w-[320px] h-[240px] p-8 bg-white border border-accent/20 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group/card">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-white transition-colors duration-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-primary leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed whitespace-normal line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                <Link 
                  href={feature.href}
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover/card:text-primary transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/card:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
