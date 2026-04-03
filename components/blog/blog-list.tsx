"use client"

import { BlogCard } from "./blog-card"
import { blogPosts } from "@/lib/blog-data"
import { motion } from "framer-motion"

export function BlogList() {
  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col items-center gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Clinical Intelligence Insights</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]"
          >
            GastroAGI <span className="text-primary">Blog</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg sm:text-xl text-muted-foreground/80 leading-relaxed"
          >
            The latest research, technical breakdowns, and clinical intelligence updates in gastroenterology and hepatology.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full overflow-hidden pointer-events-none">
        <div className="absolute left-[20%] top-[40%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[140px]" />
      </div>
    </section>
  )
}
