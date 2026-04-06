"use client"

import { ConferenceArticle } from "@/lib/conference-data"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ArticleListProps {
  articles: ConferenceArticle[]
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="mx-auto max-w-2xl py-12 px-6 sm:px-0">
      <div className="flex flex-col">
        {articles.map((article, index) => (
          <Link key={article.id} href={`/conference/${article.id}`} className="block group">
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="relative border-b border-accent/30 py-10 last:border-0"
            >
              <div className="space-y-4">
                {/* Meta information */}
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground/60">
                  <span className="text-secondary font-black">{article.meta.conference}</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-accent/40" />
                  <span>{article.meta.date}</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-accent/40" />
                  <span>{article.meta.readTime}</span>
                </div>

                {/* Title - Serif Font */}
                <h2 className="font-serif text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary group-hover:underline group-hover:underline-offset-4 decoration-primary/20 decoration-1">
                  {article.title}
                </h2>

                {/* Summary */}
                <p className="line-clamp-3 text-[17px] leading-[1.7] text-muted-foreground font-medium">
                  {article.summary}
                </p>

                {/* Optional Key Insight Badge/Text */}
                {article.keyInsight && (
                  <div className="flex items-start gap-2 pt-2 border-l-2 border-primary/20 pl-4 py-1 bg-primary/5 rounded-r-lg">
                    <p className="text-sm font-bold italic text-primary leading-relaxed">
                      Key Insight: {article.keyInsight}
                    </p>
                  </div>
                )}
              </div>

              {/* Subtle interactive hover effect */}
              <div className="absolute -inset-x-4 -inset-y-2 -z-10 rounded-2xl bg-muted/40 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.article>
          </Link>
        ))}
      </div>
      
      {/* Editorial closing */}
      <div className="mt-20 flex flex-col items-center gap-4 text-center">
        <div className="h-px w-20 bg-accent/30" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
          End of Briefing • GastroAGI Editorial
        </p>
      </div>
    </div>
  )
}
