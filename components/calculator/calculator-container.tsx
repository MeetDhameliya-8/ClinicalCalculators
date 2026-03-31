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
    <Card className={cn("w-full rounded-xl border bg-card p-6 shadow-sm flex flex-col min-w-0", className)}>
      <CardHeader className="p-0 border-b pb-6 mb-6">
        <CardTitle className="text-xl break-words whitespace-normal min-w-0">{title}</CardTitle>
        <CardDescription className="break-words whitespace-normal min-w-0 mt-1">{description}</CardDescription>
        {formula && (
          <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted p-2 rounded-md break-words whitespace-normal min-w-0">
            Formula: {formula}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>

          {/* Action Buttons */}
          {(onCalculate || onReset) && (
            <div className="flex items-center gap-3 pt-2">
              {onCalculate && (
                <Button
                  onClick={onCalculate}
                  disabled={!isValid}
                  className="flex-1 sm:flex-none"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate
                </Button>
              )}
              {onReset && (
                <Button
                  variant="outline"
                  onClick={onReset}
                  className="flex-1 sm:flex-none"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          )}

          {/* Results */}
          {hasResult && result && (
            <div className="border-t pt-6">
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Results
              </h3>
              {result}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
