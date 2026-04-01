"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectOption {
  value: string
  label: string
  points?: number
}

interface SelectFieldProps {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  error?: string
  tooltip?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  error,
  tooltip,
  required = false,
  disabled = false,
  className,
}: SelectFieldProps) {
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
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          className={cn(
            "h-12 rounded-xl border-white/5 bg-white/[0.02] px-4 text-sm font-bold transition-all hover:bg-white/[0.04] focus:ring-2 focus:ring-primary/10 focus:border-primary/20",
            error && "border-destructive/40 focus:ring-destructive/10 focus:border-destructive/60"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-white/10 bg-popover/90 backdrop-blur-xl shadow-2xl">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="rounded-xl focus:bg-primary/20 focus:text-primary transition-colors text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                {option.label}
                {option.points !== undefined && (
                  <span className="text-[10px] font-bold text-muted-foreground/40">
                    ({option.points} pt{option.points !== 1 ? "s" : ""})
                  </span>
                )}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="px-1 text-[9px] font-black uppercase tracking-wider text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}
