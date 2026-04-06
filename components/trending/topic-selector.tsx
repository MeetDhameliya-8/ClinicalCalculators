"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TopicSelectorProps {
  topics: string[]
  activeTopic: string
  onSelect: (topic: string) => void
}

export function TopicSelector({ topics, activeTopic, onSelect }: TopicSelectorProps) {
  return (
    <div className="relative py-4 border-b border-accent/30">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
        {topics.map((topic) => {
          const isActive = activeTopic === topic
          return (
            <button
              key={topic}
              onClick={() => onSelect(topic)}
              className={cn(
                "relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold tracking-tight transition-all active:scale-95",
                isActive 
                  ? "text-white shadow-lg shadow-primary/20" 
                  : "bg-muted/40 text-muted-foreground hover:bg-accent/40 hover:text-primary"
              )}
            >
              <span className="relative z-10">{topic}</span>
              {isActive && (
                <motion.div
                  layoutId="active-topic-pill"
                  className="absolute inset-0 rounded-full bg-primary-gradient"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
