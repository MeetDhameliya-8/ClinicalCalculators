"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Home, TrendingUp, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/trending", label: "Trending Topics", icon: TrendingUp },
  { href: "/assistant", label: "Assistant", icon: MessageSquare },
]

export function ChatSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen border-r border-gray-100 bg-white sticky top-0">
      {/* Branding */}
      <div className="p-8 pb-10">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient text-white shadow-lg shadow-primary/10">
            <Activity className="h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-primary">GastroAGI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 px-4 mb-4">
          Clinical Platform
        </div>
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-tight transition-all active:scale-95 group",
              isActive(link.href)
                ? "text-primary bg-primary/5 shadow-sm"
                : "text-muted-foreground hover:text-primary hover:bg-gray-50"
            )}
          >
            <link.icon className={cn(
              "h-4 w-4 transition-colors",
              isActive(link.href) ? "text-primary" : "text-muted-foreground/40 group-hover:text-primary"
            )} />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Account / Settings Mock Footer */}
      <div className="p-6 border-t border-gray-50 mt-auto">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary">
            MD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-800">Clinician Portal</span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Active Session</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
