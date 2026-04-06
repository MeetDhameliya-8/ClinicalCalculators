"use client"

import { ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog-data"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="medical-card group relative flex flex-col gap-8 bg-transparent"
    >
      {/* Featured Image Container */}
      <div className="relative aspect-16/10 overflow-hidden rounded-3xl border border-white/5 bg-white/5">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent opacity-40" />
      </div>

      <div className="flex flex-col gap-6 px-2">
        {/* Author / Date Info */}
        <div className="flex items-center gap-2.5 text-[13px] font-bold tracking-tight">
          <span className="text-muted-foreground/50">by</span>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <User className="h-3.5 w-3.5" />
            </div>
            <span className="border-b border-muted-foreground/20 pb-0.5 text-foreground transition-colors group-hover:text-primary">
              {post.author.name}
            </span>
          </div>
          <span className="text-muted-foreground/30 ml-auto tracking-widest uppercase font-black text-[10px]">{post.date}</span>
        </div>

        {/* Title / Description */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight leading-[1.1] text-foreground transition-colors group-hover:text-primary/90">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-lg leading-relaxed text-muted-foreground/70">
            {post.description}
          </p>
        </div>

        {/* Read Article Link */}
        <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-3 py-2 group/link">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all group-hover/link:border-secondary/40 group-hover/link:bg-secondary/10 group-hover/link:text-secondary">
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
          </div>
          <span className={cn(
            "text-base font-black tracking-tight underline-offset-4 decoration-secondary/20 text-secondary",
            "transition-all group-hover/link:text-secondary group-hover/link:underline"
          )}>
            Read Article
          </span>
        </Link>
      </div>

      {/* Decorative hover glow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  )
}

