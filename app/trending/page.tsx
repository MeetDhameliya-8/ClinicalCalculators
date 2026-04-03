"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/landing/cta-footer-section"
import { MonthSelector } from "@/components/conference/month-selector"
import { TopicSelector } from "@/components/trending/topic-selector"
import { TrendingList } from "@/components/trending/trending-list"
import { trendingArticles, trendingTopics, trendingMonths } from "@/lib/trending-data"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function TrendingPage() {
  const [activeTopic, setActiveTopic] = useState("Latest")
  const [activeMonth, setActiveMonth] = useState("Latest")

  // Filter trending articles based on topic and month
  const filteredArticles = trendingArticles.filter((article) => {
    const topicMatch = activeTopic === "Latest" || activeTopic === "Trending" || article.meta.topic === activeTopic
    const monthMatch = activeMonth === "Latest" || activeMonth === "Trending" || article.month === activeMonth
    return topicMatch && monthMatch
  })

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground font-sans overflow-x-hidden">
      <Navbar />

      <main className="mx-auto max-w-2xl px-6 pt-24 pb-20 sm:px-0">
        <header className="mb-12 space-y-10">
          {/* Header Title */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-7xl font-black tracking-tight leading-[0.88] text-foreground">
              Trending <span className="text-primary italic">Topics</span>
            </h1>
            <p className="max-w-xl text-lg sm:text-xl font-medium tracking-tight text-muted-foreground/60 leading-[1.6]">
              Real-time shifts in gastroenterology and hepatology. Curated medical content for professional research and clinical updates.
            </p>
          </div>

          <div className="space-y-6">
            {/* 1. Month Navigation (Time) */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/20 ml-2">Select Period</span>
              <MonthSelector 
                months={trendingMonths} 
                activeMonth={activeMonth} 
                onSelect={(m) => setActiveMonth(m)} 
              />
            </div>

            {/* 2. Trending Topics Navigation (Category) */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/20 ml-2">Browse Topics</span>
              <TopicSelector 
                topics={trendingTopics} 
                activeTopic={activeTopic} 
                onSelect={(t) => setActiveTopic(t)} 
              />
            </div>
          </div>
        </header>

        {/* 3. Editorial Content List */}
        <TrendingList articles={filteredArticles} />
      </main>

      <FooterSection />
    </div>
  )
}
