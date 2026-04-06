"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MonthSelectorProps {
  months: string[]
  activeMonth: string
  onSelect: (month: string) => void
}

export function MonthSelector({ months, activeMonth, onSelect }: MonthSelectorProps) {
  return (
    <div className="relative border-b border-accent/30 py-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar px-6 sm:px-0">
        {months.map((month) => {
          const isActive = activeMonth === month
          return (
            <button
              key={month}
              onClick={() => onSelect(month)}
              className={cn(
                "relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold tracking-tight transition-all active:scale-95",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "bg-muted/40 text-muted-foreground hover:bg-accent/40 hover:text-primary"
              )}
            >
              {month}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full border border-primary/20"
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
