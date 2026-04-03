"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/landing/cta-footer-section"
import { MonthSelector } from "@/components/conference/month-selector"
import { ArticleList } from "@/components/conference/article-list"
import { conferenceArticles, categories, months } from "@/lib/conference-data"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function ConferencePage() {
  const [activeCategory, setActiveCategory] = useState("Latest")
  const [activeMonth, setActiveMonth] = useState("Latest")

  // Filter articles based on category and month
  const filteredArticles = conferenceArticles.filter((article) => {
    const categoryMatch = activeCategory === "Latest" || activeCategory === "Trending" || article.category === activeCategory
    const monthMatch = activeMonth === "Latest" || activeMonth === "Trending" || article.month === activeMonth
    return categoryMatch && monthMatch
  })

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground font-sans antialiased overflow-x-hidden">
      <Navbar />

      <main className="mx-auto max-w-2xl px-6 pt-24 pb-20 sm:px-0">
        <header className="mb-12 space-y-8">
          {/* Header Title */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-7xl font-black tracking-tight leading-[0.88] text-foreground transition-all">
              The <span className="text-primary italic">Briefing</span>
            </h1>
            <p className="max-w-xl text-lg sm:text-xl font-medium tracking-tight text-muted-foreground/60 leading-relaxed">
              Curated clinical insights and breakthrough data directly from the global gastroenterology stage.
            </p>
          </div>

          {/* Top Horizontal Tabs (ECCO, CDDW, etc.) */}
          <div className="relative border-b border-white/5 py-4">
            <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
              {categories.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "group relative whitespace-nowrap text-sm font-black uppercase tracking-[0.2em] transition-all",
                      isActive ? "text-primary" : "text-muted-foreground/40 hover:text-foreground/80"
                    )}
                  >
                    {category}
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-underline"
                        className="absolute -bottom-5 left-0 h-0.5 w-full bg-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Scrollable Month Selector (Jan 2026, Feb 2026, etc.) */}
          <MonthSelector months={months} activeMonth={activeMonth} onSelect={setActiveMonth} />
        </header>

        {/* The Text-First Editorial List */}
        <ArticleList articles={filteredArticles} />
      </main>

      <FooterSection />
    </div>
  )
}
