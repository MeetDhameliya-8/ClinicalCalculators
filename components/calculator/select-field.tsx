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
  showPoints?: boolean
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
  showPoints = false,
}: SelectFieldProps) {
  const actualId = id || label.toLowerCase().replace(/\s+/g, '-')
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
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={actualId}
          className={cn(
            "w-full break-words whitespace-normal min-h-[2.5rem] h-auto text-left",
            error && "border-destructive focus-visible:ring-destructive/50"
          )}
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex items-center gap-2">
                {option.label}
                {showPoints && option.points !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    ({option.points} pt{option.points !== 1 ? "s" : ""})
                  </span>
                )}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p id={`${actualId}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
