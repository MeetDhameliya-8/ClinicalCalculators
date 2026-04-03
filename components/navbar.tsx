"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Activity, X, ChevronDown, Brain, Menu, FlaskConical, Droplets, Heart, Beaker, Stethoscope } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { calculators, categoryIcons } from "@/lib/calculators-data"

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/calculator", label: "Calculator" },
  { href: "/conference", label: "Conference" },
  { href: "/trending", label: "Trending Topics" },
  { href: "/blog", label: "Blog" },
]

interface NavbarProps {
  selectedCalculator?: string
  onSelectCalculator?: (id: string) => void
}

export function Navbar({ selectedCalculator, onSelectCalculator }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/calculator") return pathname.startsWith("/calculator")
    return pathname === href
  }

  // Handle outside clicks to close mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCalculatorSelect = (id: string) => {
    setIsMegaMenuOpen(false)
    setIsMobileMenuOpen(false)
    if (onSelectCalculator) {
      onSelectCalculator(id)
    } else {
      router.push(`/calculator?id=${id}`)
    }
  }

  // Group calculators by category
  const categories = Array.from(new Set(calculators.map((c) => c.category)))

  return (
    <nav className="fixed top-0 z-50 w-full transition-all">
      <div className="mx-auto max-w-7xl px-6 py-4">
        {/* Main Navbar Pill */}
        <div className="flex h-14 items-center justify-between rounded-full border border-white/10 bg-background/40 backdrop-blur-xl px-6 shadow-2xl">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-foreground">GastroAGI</span>
            </Link>
          </div>

          {/* Center: Original Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.label === "Calculator" ? (
                  <button
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    className={cn(
                      "group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold tracking-tight transition-all active:scale-95",
                      isActive(link.href) || isMegaMenuOpen
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      isMegaMenuOpen ? "rotate-180 text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-bold tracking-tight transition-all active:scale-95",
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-4">
            <Link href="/calculator">
              <button className="hidden sm:block rounded-full bg-white px-6 py-2.5 text-sm font-black text-black hover:bg-white/90 active:scale-95 transition-all shadow-xl shadow-white/10">
                Launch App
              </button>
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown (Adapted for Pill Style) */}
        {isMegaMenuOpen && (
          <div 
            ref={megaMenuRef}
            className="absolute left-1/2 mt-4 w-full max-w-5xl -translate-x-1/2 px-4 animate-in fade-in slide-in-from-top-4 duration-500"
            style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}
          >
            <div className="rounded-[2.5rem] border border-white/10 bg-background/90 backdrop-blur-2xl p-10 shadow-2xl">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <div key={category} className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      {categoryIcons[category] && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {(() => {
                            const Icon = categoryIcons[category]
                            return <Icon className="h-4 w-4" />
                          })()}
                        </div>
                      )}
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                        {category}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {calculators
                        .filter((c) => c.category === category)
                        .map((calc) => (
                          <button
                            key={calc.id}
                            onClick={() => handleCalculatorSelect(calc.id)}
                            className={cn(
                              "flex flex-col items-start rounded-2xl px-4 py-3 text-left transition-all hover:bg-white/5 ring-inset active:scale-95 group",
                              selectedCalculator === calc.id
                                ? "bg-primary/10 ring-1 ring-primary/20"
                                : "hover:ring-1 hover:ring-white/10"
                            )}
                          >
                            <span className={cn(
                              "text-sm font-bold tracking-tight transition-colors",
                              selectedCalculator === calc.id ? "text-primary" : "group-hover:text-primary"
                            )}>
                              {calc.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground leading-tight mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                              {calc.description || "Clinical tool assessment"}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="mx-4 mt-2 space-y-4 rounded-[2rem] border border-white/10 bg-background/95 backdrop-blur-2xl p-6 shadow-2xl h-[calc(100vh-6rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.href} className="space-y-4">
                {link.label === "Calculator" ? (
                  <div className="space-y-6">
                    <div className="text-xs font-black uppercase tracking-widest text-primary px-4">
                      Clinical Suite
                    </div>
                    {categories.map((category) => (
                      <div key={category} className="space-y-2">
                        <div className="px-4 flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">{category}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1 px-2">
                          {calculators
                            .filter((c) => c.category === category)
                            .map((calc) => (
                              <button
                                key={calc.id}
                                onClick={() => handleCalculatorSelect(calc.id)}
                                className={cn(
                                  "flex w-full items-center rounded-xl px-4 py-3 text-left transition-all",
                                  selectedCalculator === calc.id
                                    ? "bg-primary/10 text-primary font-bold"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                              >
                                <span className="text-sm">{calc.name}</span>
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block rounded-2xl px-4 py-4 text-lg font-bold transition-all",
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
