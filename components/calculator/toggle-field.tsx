"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface ToggleFieldProps {
  id?: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  tooltip?: string
  disabled?: boolean
  points?: number
}

export function ToggleField({
  id,
  label,
  checked,
  onChange,
  tooltip,
  disabled = false,
  points,
}: ToggleFieldProps) {
  const actualId = id || label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex items-center justify-between py-2 min-w-0">
      <div className="flex items-center gap-1.5 min-w-0">
        <Label htmlFor={actualId} className="text-sm font-medium text-foreground cursor-pointer break-words whitespace-normal block min-w-0">
          {label}
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
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{checked ? "Yes" : "No"}</span>
        <Switch
          id={actualId}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
