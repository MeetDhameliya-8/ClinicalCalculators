"use client"

import { useState } from "react"
import { ArrowUp, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Input Container: Rectangular, slightly rounded edgy box */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-primary/10 transition-all overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Top Row: Multi-line Input */}
          <div className="p-4 pb-1 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-teal-400 mt-1 opacity-60 shrink-0" />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Initiate a clinical query or send a command..."
              className="w-full bg-transparent outline-none text-[15px] text-gray-800 placeholder:text-gray-400 resize-none min-h-[80px]"
            />
          </div>

          {/* Bottom Row: Utility Bar + Send Button */}
          <div className="px-3 pb-3 flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { label: "Reasoning", icon: "🧠" },
                { label: "Clinical Search", icon: "🔍" },
                { label: "Evidence Analysis", icon: "📚" }
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-100 bg-white text-[11px] font-bold text-gray-400 hover:border-gray-200 hover:text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-tight shadow-sm"
                >
                  <span>{btn.icon}</span>
                  {btn.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-gradient-to-b from-gray-800 to-black text-white p-2.5 rounded-md hover:scale-105 active:scale-95 disabled:opacity-100 disabled:hover:scale-100 transition-all shadow-lg"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
