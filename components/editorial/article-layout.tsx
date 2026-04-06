"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ArticleLayoutProps {
  category: string
  title: string
  subtitle?: string
  date: string
  readTime: string
  author?: {
    name: string
    avatar?: string
    role?: string
  }
  image?: string
  keyInsight?: string
  children: React.ReactNode
  relatedCalculators?: { id: string; name: string }[]
}

export function ArticleLayout({
  category,
  title,
  subtitle,
  date,
  readTime,
  author,
  image,
  keyInsight,
  children,
  relatedCalculators
}: ArticleLayoutProps) {
  return (
    <article className="min-h-screen bg-background pb-24 selection:bg-primary/20">
      {/* 1. PROGRESS BAR (Fixed Top) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-60 origin-left"
        initial={{ scaleX: 0 }}
        style={{ scaleX: "var(--scroll-p)" }} // Controlled by window scroll logic
      />

      {/* 2. BREADCRUMBS & TOP NAV */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-8 flex flex-wrap items-center justify-between gap-4">
        <Link 
          href={`/${category.toLowerCase()}`} 
          className="group flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/70 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to {category}
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground/40 hover:text-primary transition-colors"><Bookmark className="h-5 w-5" /></button>
          <button className="text-muted-foreground/40 hover:text-primary transition-colors"><Share2 className="h-5 w-5" /></button>
        </div>
      </div>

      {/* 3. HERO CONTENT */}
      <header className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 shadow-sm">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{category} Briefing</span>
        </div>

        {/* Main Title - Serif Rendering */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-primary">
          {title}
        </h1>

        {/* Author & Meta */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-b border-primary/10 pb-8">
          {author && (
            <div className="flex items-center gap-3">
              {author.avatar ? (
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image src={author.avatar} alt={author.name} width={40} height={40} className="object-cover" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-md">
                  <User className="h-5 w-5" />
                </div>
              )}
              <div>
                <p className="text-sm font-black text-primary leading-none">{author.name}</p>
                <p className="text-xs text-muted-foreground font-bold">{author.role || "Clinical Intelligence Team"}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground/60">
            <Calendar className="h-4 w-4" /> {date}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground/60">
            <Clock className="h-4 w-4" /> {readTime}
          </div>
        </div>
      </header>

      {/* 4. MAIN FEATURED IMAGE */}
      {image && (
        <figure className="max-w-6xl mx-auto px-6 py-12">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/40 ring-1 ring-primary/10">
            <Image 
              src={image} 
              alt={title} 
              fill 
              priority 
              className="object-cover" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80"; // Medical stock fallback
              }}
            />
          </div>
        </figure>
      )}

      {/* 5. ARTICLE BODY (Geist Clinical Typography) */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        
        {/* Main Content Area */}
        <main className="lg:col-span-8 space-y-12">
          
          {/* Key Insight Callout */}
          {keyInsight && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 border border-primary/20 rounded-3xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[10px] font-black italic">!</span>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Core Clinical Insight</h3>
              </div>
              <p className="text-lg font-bold text-primary italic leading-relaxed">
                {keyInsight}
              </p>
            </motion.div>
          )}

          {/* Actual Article Flow */}
          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary 
            prose-p:text-muted-foreground prose-p:font-medium prose-p:leading-relaxed 
            prose-strong:text-primary prose-strong:font-black
            prose-li:text-muted-foreground prose-li:font-medium
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:font-bold prose-blockquote:italic prose-blockquote:text-primary"
          >
            {children}
          </div>
        </main>

        {/* Sidebar Space (Sticky Related) */}
        <aside className="lg:col-span-4 space-y-10">
          {relatedCalculators && relatedCalculators.length > 0 && (
            <div className="sticky top-28 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/40">Clinical Toolkit</h3>
                <p className="text-sm font-bold text-primary">Related Calculators</p>
              </div>
              
              <div className="grid gap-3">
                {relatedCalculators.map((calc) => (
                  <Link 
                    key={calc.id} 
                    href={`/calculator?id=${calc.id}`}
                    className="flex flex-col p-5 rounded-2xl bg-white/80 border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                  >
                    <span className="text-sm font-black text-primary mb-1">{calc.name}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground/40 inline-flex items-center gap-1">
                      Open Tool <ArrowLeft className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>

              {/* Newsletter / CTA */}
              <div className="rounded-3xl bg-primary-gradient p-8 text-white space-y-4 shadow-xl shadow-primary/20">
                <h4 className="text-lg font-black tracking-tight italic">Stay Clinical.</h4>
                <p className="text-xs text-white/80 font-bold leading-relaxed">
                  Join 12,000+ clinicians receiving weekly briefings on Gastroenterology AI and evidence-based guideline updates.
                </p>
                <button className="w-full py-3 rounded-full bg-white text-primary text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Join Briefing
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  )
}
