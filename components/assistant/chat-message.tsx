"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAI = role === "assistant"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full mb-10",
        isAI ? "justify-start" : "justify-end text-right"
      )}
    >
      <div
        className={cn(
          "text-sm leading-relaxed transition-all duration-200",
          isAI 
            ? "text-gray-800 max-w-2xl font-serif text-base" 
            : "text-primary/70 max-w-[85%] sm:max-w-md font-sans uppercase font-black tracking-widest text-[10px]"
        )}
      >
        {!isAI && <div className="mb-2 opacity-50">CLINICIAN</div>}
        {content}
      </div>
    </motion.div>
  )
}
