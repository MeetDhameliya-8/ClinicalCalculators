"use client"

import { useState, useEffect, useRef } from "react"
import { ChatSidebar } from "@/components/assistant/chat-sidebar"
import { ChatMessage } from "@/components/assistant/chat-message"
import { ChatInput } from "@/components/assistant/chat-input"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    // Force body background to white for this page only
    document.body.style.backgroundColor = 'white'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content
    }
    setMessages(prev => [...prev, userMessage])
    
    // Simulate AI Response
    setIsTyping(true)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've analyzed your query regarding "${content}". Based on current clinical guidelines and recent high-impact journal evidence, here are the structured insights... [This is a clinical simulation of AI reasoning for gastroenterology].`
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen !bg-white text-foreground antialiased selection:bg-primary/30 font-sans">
      <ChatSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden !bg-white">
        {/* Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-12 pb-8 flex flex-col relative">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center text-center space-y-8"
                >
                  {/* Heading Section */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl tracking-tight leading-tight">
                      <span className="font-merriweather italic text-gray-500 font-light">Complete AI</span>{" "}
                      <span className="font-black bg-gradient-to-r from-[#0056D3] to-[#332382] bg-clip-text text-transparent">Gastroenterology</span>
                    </h1>
                    <div className="flex items-center justify-center gap-6">
                      {/* Premium Isometric Glass Cube Concept */}
                      <motion.div 
                        initial={{ rotateY: -10, rotateX: 10 }}
                        animate={{ 
                          rotateY: [ -10, 5, -10],
                          y: [0, -4, 0]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative group perspective-1000"
                      >
                        {/* Glowing Background Effect - subtle enough to keep premium feel without blueish cast on whole page */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-[#0056D3]/5 via-[#332382]/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        
                        {/* Main Glass Container */}
                        <div className="relative flex items-center gap-3 px-8 py-3.5 bg-white border border-gray-100 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] transform-gpu transition-all hover:scale-[1.02]">
                          {/* Animated SVG Isometric Cube */}
                          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                            <path d="M12 2L2 8V20L12 26L22 20V8L12 2Z" fill="url(#cube-gradient)" fillOpacity="0.1" />
                            <path d="M12 2L2 8L12 14L22 8L12 2Z" fill="url(#cube-top)" />
                            <path d="M2 8L12 14V26L2 20V8Z" fill="url(#cube-left)" />
                            <path d="M22 8L12 14V26L22 20V8Z" fill="url(#cube-right)" />
                            <defs>
                              <linearGradient id="cube-top" x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0056D3" />
                                <stop offset="1" stopColor="#332382" />
                              </linearGradient>
                              <linearGradient id="cube-left" x1="7" y1="10" x2="7" y2="24" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0041a0" />
                                <stop offset="1" stopColor="#25195e" />
                              </linearGradient>
                              <linearGradient id="cube-right" x1="17" y1="10" x2="17" y2="24" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#25195e" />
                                <stop offset="1" stopColor="#1a1242" />
                              </linearGradient>
                              <linearGradient id="cube-gradient" x1="12" y1="2" x2="12" y2="26" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0056D3" />
                                <stop offset="1" stopColor="#332382" />
                              </linearGradient>
                            </defs>
                          </svg>

                          <span className="text-xl font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-[#0056D3] to-[#332382] bg-clip-text text-transparent">
                            Assistant
                          </span>
                        </div>
                      </motion.div>
                      <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#0056D3] to-[#332382] bg-clip-text text-transparent tracking-tight">Ecosystem</h1>
                    </div>
                  </div>

                  {/* Sub-line */}
                  <p className="max-w-md text-sm text-gray-500 font-medium leading-relaxed px-4">
                    Advancing digestive care through evidence-based AI reasoning and real-time clinical intelligence.
                  </p>

                  <div className="w-full pt-4">
                    <ChatInput onSendMessage={handleSendMessage} />
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-6 flex flex-col">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Input Area (Only visible when chatting) */}
        {messages.length > 0 && (
          <div className="pb-8 px-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        )}
      </main>
    </div>
  )
}
