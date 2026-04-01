"use client"

import { cn } from "@/lib/utils"

export type SeverityLevel = "low" | "moderate" | "high" | "critical"

interface ResultCardProps {
  score: number | string
  severity: SeverityLevel
  interpretation: string
  severityLabel?: string
  details?: { label: string; value: string | number }[]
  className?: string
}

const severityStyles: Record<SeverityLevel, { bg: string; text: string; badge: string }> = {
  low: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  moderate: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
  },
  high: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
  },
  critical: {
    bg: "bg-red-50",
    text: "text-red-700",
    badge: "bg-red-100 text-red-800 border-red-200",
  },
}

export function ResultCard({
  score,
  severity,
  severityLabel,
  interpretation,
  details,
  className,
}: ResultCardProps) {
  const severityColors: Record<string, string> = {
    low: "text-[var(--severity-low)] bg-[var(--severity-low)]/10 ring-[var(--severity-low)]/20",
    moderate: "text-[var(--severity-moderate)] bg-[var(--severity-moderate)]/10 ring-[var(--severity-moderate)]/20",
    high: "text-[var(--severity-high)] bg-[var(--severity-high)]/10 ring-[var(--severity-high)]/20",
    critical: "text-[var(--severity-critical)] bg-[var(--severity-critical)]/10 ring-[var(--severity-critical)]/20",
  }

  return (
    <div className={cn("overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] shadow-2xl transition-all hover:bg-white/[0.02]", className)}>
      <div className="flex flex-col md:flex-row md:items-stretch divide-y md:divide-y-0 md:divide-x divide-white/5">
        {/* Score Header */}
        <div className="flex flex-col items-center justify-center p-6 md:w-[220px] bg-primary/[0.02]">
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/40 mb-2">Result Score</span>
          <div className="text-5xl font-black tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(163,255,18,0.25)]">
            {score}
          </div>
          {severityLabel && (
            <div className={cn(
              "mt-3 inline-flex items-center rounded-full px-3 py-1 text-[8px] font-black uppercase tracking-widest ring-1",
              severityColors[severity || "low"]
            )}>
              {severityLabel}
            </div>
          )}
        </div>

        {/* Interpretation & Details */}
        <div className="flex-1 p-6 space-y-5 bg-white/[0.005]">
          {interpretation && (
            <div className="space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">Interpretation</span>
              <p className="text-base font-bold leading-snug text-foreground/90">
                {interpretation}
              </p>
            </div>
          )}

          {details && details.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {details.map((detail, index) => (
                <div key={index} className="flex flex-col rounded-xl bg-white/[0.02] p-3 ring-1 ring-white/5">
                  <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground/40 mb-0.5">
                    {detail.label}
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
