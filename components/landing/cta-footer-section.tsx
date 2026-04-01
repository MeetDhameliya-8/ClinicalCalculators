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
      {/* Glow backdrop */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/20 blur-[120px]"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-[2.5rem] border border-primary/20 bg-card/50 backdrop-blur-xl p-16 text-center space-y-8 overflow-hidden"
        >
          {/* Border glow */}
          <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-primary/10" />
          {/* Inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />

          <div className="relative space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2"
            >
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Free. Forever.</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="text-4xl sm:text-6xl font-black tracking-tight"
            >
              Ready to elevate{" "}
              <span className="text-primary drop-shadow-[0_0_30px_rgba(163,255,18,0.3)]">
                clinical decisions?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              No account. No install. No data stored. Just open the suite and start calculating.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-4 items-center justify-center"
            >
              <Link href="/calculator?id=meld-na">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2.5 rounded-full bg-primary px-10 py-4 text-base font-black text-primary-foreground shadow-[0_0_40px_rgba(163,255,18,0.35)] hover:shadow-[0_0_60px_rgba(163,255,18,0.5)] transition-shadow"
                >
                  Open Clinical Suite
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              <Link href="/calculator">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
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
    <footer className="border-t border-white/5 py-14 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-black tracking-tight">GastroAGI</span>
            </div>
            <p className="text-sm text-muted-foreground/60 max-w-xs leading-relaxed">
              Evidence-based clinical calculators for gastroenterology and hepatology. Built for clinicians, by clinicians.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, color: "rgb(163,255,18)" }}
                  className="w-9 h-9 rounded-xl border border-white/8 bg-white/[0.03] flex items-center justify-center text-muted-foreground/50 hover:border-primary/30 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Tools</div>
            <ul className="space-y-2.5">
              {["MELD-Na Score", "Child-Pugh", "FIB-4 Index", "Glasgow-Blatchford", "BISAP Score"].map((t) => (
                <li key={t}>
                  <Link href="/calculator" className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Resources</div>
            <ul className="space-y-2.5">
              {[
                { label: "Overview", href: "/" },
                { label: "Calculators", href: "/calculator" },
                { label: "Conference", href: "/conference" },
                { label: "Trending Topics", href: "/trending" },
                { label: "Blog", href: "/blog" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-muted-foreground/30">
            © {new Date().getFullYear()} GastroAGI. For clinical decision support only — not a substitute for medical judgment.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Disclaimer"].map((l) => (
              <span key={l} className="text-xs text-muted-foreground/30 hover:text-muted-foreground cursor-pointer transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
