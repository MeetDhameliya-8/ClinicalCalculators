"use client"

import { TrendingArticle } from "@/lib/trending-data"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TrendingListProps {
  articles: TrendingArticle[]
}

export function TrendingList({ articles }: TrendingListProps) {
  return (
    <div className="mx-auto max-w-2xl py-12 px-6 sm:px-0">
      <div className="flex flex-col">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group relative cursor-pointer border-b border-white/5 py-10 last:border-0"
          >
            <div className="space-y-4">
              {/* Meta information */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground/30">
                <span className="text-primary/60">{article.meta.topic}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-white/10" />
                <span>{article.meta.date}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-white/10" />
                <span>{article.meta.readTime}</span>
              </div>

              {/* Title - Serif Font */}
              <h2 className="font-serif text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:underline group-hover:underline-offset-4 decoration-primary/20 decoration-1">
                {article.title}
              </h2>

              {/* Summary */}
              <p className="line-clamp-3 text-[17px] leading-[1.7] text-muted-foreground/70 font-medium">
                {article.summary}
              </p>

              {/* Key Insight Preview */}
              {article.keyInsight && (
                <div className="flex items-start gap-2 pt-2 border-l-2 border-primary/20 pl-4 py-1">
                  <p className="text-sm font-bold italic text-primary/80 leading-relaxed">
                    Key Insight: {article.keyInsight}
                  </p>
                </div>
              )}
            </div>

            {/* Subtle interactive hover effect */}
            <div className="absolute -inset-x-4 -inset-y-2 -z-10 rounded-2xl bg-white/1.5 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.article>
        ))}
        
        {/* Empty State */}
        {articles.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <p className="text-lg text-muted-foreground/40 font-bold">No trending updates found for these criteria.</p>
            <p className="text-sm text-muted-foreground/20">Try clearing your filters to see more medical content.</p>
          </div>
        )}
      </div>
    </div>
  )
}
