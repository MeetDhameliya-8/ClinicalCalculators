"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputFieldProps {
  id?: string
  label: React.ReactNode
  value: string | number
  onChange: (value: string) => void
  unit?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  error?: string
  tooltip?: string
  required?: boolean
  disabled?: boolean
}

export function InputField({
  id,
  label,
  value,
  onChange,
  unit,
  placeholder,
  min,
  max,
  step = 0.1,
  error,
  tooltip,
  required = false,
  disabled = false,
}: InputFieldProps) {
  const actualId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, '-') : "input")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Allow empty string or valid number input
    if (val === "" || val === "-" || !isNaN(Number(val))) {
      onChange(val)
    }
  }

  return (
    <div className="space-y-1.5 flex flex-col min-w-0">
      <div className="flex items-center gap-1.5 min-w-0">
        <Label htmlFor={actualId} className="text-sm font-medium text-foreground break-words whitespace-normal block min-w-0">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative w-full flex flex-col min-w-0">
        <Input
          id={actualId}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "w-full pr-12",
            error && "border-destructive focus-visible:ring-destructive/50"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${actualId}-error` : undefined}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      {error && (
        <p id={`${actualId}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
