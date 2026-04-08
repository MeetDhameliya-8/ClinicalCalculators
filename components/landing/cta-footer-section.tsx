"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Activity, Github, Twitter, Mail } from "lucide-react"

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      {/* Subtle ambience glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-[48px] border border-accent/40 bg-white p-10 sm:p-20 text-center space-y-8 overflow-hidden shadow-2xl"
        >
          {/* Subtle inner gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2"
            >
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Free. Evidence-Based. Clinical-First.</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.1]"
            >
              Ready to elevate{" "}
              <span className="text-primary italic">
                clinical decisions?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto font-medium"
            >
              No account required. Open the suite and start calculating with diagnostic precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-4 items-center justify-center pt-4"
            >
              <Link href="/calculator">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2.5 rounded-full bg-primary-gradient px-12 py-5 text-base font-black text-white shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
                >
                  Open Clinical Suite
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link href="/calculator">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-accent/30 bg-white/80 backdrop-blur-md px-12 py-5 text-base font-black text-secondary hover:bg-white transition-all shadow-lg"
                >
                  Browse 22 Calculators
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function FooterSection() {
  return (
    <footer className="border-t border-accent/30 py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center text-white shadow-lg shadow-primary/10">
                <Activity className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-primary">GastroAGI</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium max-w-xs leading-relaxed">
              Evidence-based clinical calculators for gastroenterology and hepatology. Built for clinicians, powered by intelligence.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, color: "var(--color-primary)" }}
                  className="w-10 h-10 rounded-xl border border-accent/30 bg-white/40 flex items-center justify-center text-muted-foreground hover:border-primary/50 transition-all shadow-sm"
                >
                  <Icon className="h-4 w-4" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Core Tools</div>
            <ul className="space-y-3">
              {["MELD-Na Score", "Child-Pugh", "FIB-4 Index", "Glasgow-Blatchford", "BISAP Score"].map((t) => (
                <li key={t}>
                  <Link href="/calculator" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Explore</div>
            <ul className="space-y-3">
              {[
                { label: "Overview", href: "/" },
                { label: "Calculators", href: "/calculator" },
                { label: "Conference Briefings", href: "/conference" },
                { label: "Trending Topics", href: "/trending" },
                { label: "Blog Insights", href: "/blog" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-accent/30">
          <p className="text-xs font-bold text-muted-foreground/60 text-center sm:text-left leading-relaxed">
            © {new Date().getFullYear()} GastroAGI. Evidence-based clinical support. Built with precision for healthcare professionals.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Legal"].map((l) => (
              <span key={l} className="text-xs font-black uppercase tracking-widest text-muted-foreground/40 hover:text-primary cursor-pointer transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
