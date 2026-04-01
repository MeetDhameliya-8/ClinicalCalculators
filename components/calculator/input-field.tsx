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
  type?: string
  min?: number
  max?: number
  step?: number
  error?: string
  tooltip?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function InputField({
  id,
  label,
  value,
  onChange,
  unit,
  placeholder,
  type = "number",
  min,
  max,
  step = 0.1,
  error,
  tooltip,
  required = false,
  disabled = false,
  className,
}: InputFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1">
          <Label
            htmlFor={id}
            className="text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground/70"
          >
            {label}
            {required && <span className="ml-1 text-primary">*</span>}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-muted-foreground/40 hover:text-primary transition-colors cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px] rounded-xl border-white/10 bg-popover/90 backdrop-blur-md p-3 text-xs leading-relaxed shadow-2xl">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="relative group">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "h-12 rounded-xl border-white/5 bg-white/[0.02] px-4 text-sm font-bold transition-all group-hover:bg-white/[0.04] focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/10 focus:border-primary/20",
            unit && "pr-14",
            error && "border-destructive/40 focus:ring-destructive/10 focus:border-destructive/60"
          )}
        />
        {unit && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 group-focus-within:text-primary/50 transition-colors">
              {unit}
            </span>
          </div>
        )}
      </div>
      {error && (
        <p className="px-1 text-[9px] font-black uppercase tracking-wider text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}
