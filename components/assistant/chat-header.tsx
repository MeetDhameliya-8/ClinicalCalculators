"use client"

import { motion } from "framer-motion"

export function ChatHeader() {
  return (
    <header className="mb-12 text-center space-y-2">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-sans font-extrabold tracking-tight text-primary uppercase"
      >
        GastroAGI Assistant
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-medium text-muted-foreground/70"
      >
        Clinical decision support, powered by AI
      </motion.p>
    </header>
  )
}
