"use client"

import { cn } from "@/lib/utils"

export type SeverityLevel = "low" | "moderate" | "high" | "critical"

interface ResultCardProps {
  title: string
  score: number | string
  severity: SeverityLevel
  interpretation: string
  severityLabel?: string
  details?: { label: string; value: string | number }[]
  className?: string
  compact?: boolean
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
  title,
  score,
  severity,
  severityLabel,
  interpretation,
  details,
  className,
  compact = false,
}: ResultCardProps) {
  const styles = severityStyles[severity]

  return (
    <div
      className={cn(
        "rounded-lg border p-4 w-full flex flex-col min-w-0 break-words whitespace-normal",
        styles.bg,
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground break-words whitespace-normal min-w-0">{title}</p>
          <p className={cn("text-3xl font-bold break-words whitespace-normal min-w-0", styles.text)}>
            {typeof score === "number" ? score.toFixed(1) : score}
          </p>
        </div>
        {!compact && severityLabel && (
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              styles.badge
            )}
          >
            {severityLabel}
          </span>
        )}
      </div>

      {!compact && <p className={cn("mt-3 text-sm", styles.text)}>{interpretation}</p>}

      {details && details.length > 0 && (
        <div className="mt-4 space-y-1.5 border-t border-current/10 pt-3">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">{detail.label}</span>
              <span className={cn("font-medium", styles.text)}>
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
