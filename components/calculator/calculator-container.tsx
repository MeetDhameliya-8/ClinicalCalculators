"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalculatorContainerProps {
  title: string
  description: string
  formula?: string
  children: React.ReactNode
  result?: React.ReactNode
  onCalculate?: () => void
  onReset?: () => void
  isValid?: boolean
  hasResult?: boolean
  className?: string
}

export function CalculatorContainer({
  title,
  description,
  children,
  result,
  formula,
  onCalculate,
  onReset,
  isValid = true,
  hasResult = false,
  className,
}: CalculatorContainerProps) {
  return (
    <div className={cn("w-full rounded-3xl border border-white/5 bg-card/40 backdrop-blur-md p-8 sm:p-10 shadow-2xl flex flex-col min-w-0 transition-all hover:bg-card/45", className)}>
      <div className="flex flex-col space-y-1.5 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground/80 max-w-2xl leading-snug">{description}</p>
        {formula && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-[9px] font-mono text-primary ring-1 ring-primary/20 w-fit">
            <span className="font-bold uppercase tracking-wider opacity-60">Formula:</span>
            {formula}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Input Fields Area - Now responsible for its own grid */}
        <div className="relative">
          {children}
        </div>

        {/* Action Buttons */}
        {(onCalculate || onReset) && (
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/5">
            {onCalculate && (
              <Button
                onClick={onCalculate}
                disabled={!isValid}
                className="rounded-full px-7 py-5 h-auto text-sm font-black bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all neon-glow uppercase tracking-wider"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Score
              </Button>
            )}
            {onReset && (
              <Button
                variant="ghost"
                onClick={onReset}
                className="rounded-full px-5 py-5 h-auto text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                <RotateCcw className="mr-2 h-3.5 w-3.5" />
                Reset Fields
              </Button>
            )}
          </div>
        )}

        {/* Results Area */}
        {hasResult && result && (
          <div className="pt-8 border-t-2 border-dashed border-white/5 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-block mb-6 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <h3 className="text-[9px] font-black text-primary uppercase tracking-[0.25em] leading-none">
                Calculated Outcome
              </h3>
            </div>
            {result}
          </div>
        )}
      </div>
    </div>
  )
}
