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
import { cn } from "@/lib/utils"

interface ToggleFieldProps {
  id?: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  tooltip?: string
  className?: string
}

export function ToggleField({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  tooltip,
  className,
}: ToggleFieldProps) {
  return (
    <div className={cn(
      "flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] group",
      className
    )}>
      <div className="flex items-center gap-2">
        <Label
          htmlFor={id}
          className="text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground/70 group-hover:text-primary transition-colors cursor-pointer"
        >
          {label}
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
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className="scale-90 data-[state=checked]:bg-primary data-[state=unchecked]:bg-white/10"
      />
    </div>
  )
}
