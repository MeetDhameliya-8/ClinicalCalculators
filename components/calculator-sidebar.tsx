"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Activity, 
  Beaker, 
  Brain, 
  Droplets, 
  FlaskConical, 
  Heart, 
  Pill,
  Stethoscope,
  X
} from "lucide-react"

export interface Calculator {
  id: string
  name: string
  shortName?: string
  category: string
  description: string
}

export const calculators: Calculator[] = [
  // Liver Disease
  { id: "meld-na", name: "MELD-Na Score", shortName: "MELD-Na", category: "Liver Disease", description: "Model for End-Stage Liver Disease with sodium" },
  { id: "child-pugh", name: "Child-Pugh Score", shortName: "Child-Pugh", category: "Liver Disease", description: "Cirrhosis severity and prognosis" },
  { id: "cirrhosis-combined", name: "Cirrhosis Combined", shortName: "Cirrhosis Panel", category: "Liver Disease", description: "MELD-Na + Child-Pugh combined assessment" },
  
  // Fibrosis Assessment
  { id: "fib4", name: "FIB-4 Index", shortName: "FIB-4", category: "Fibrosis", description: "Non-invasive fibrosis assessment" },
  { id: "apri", name: "APRI Score", shortName: "APRI", category: "Fibrosis", description: "AST to Platelet Ratio Index" },
  { id: "nafld-fibrosis", name: "NAFLD Fibrosis Score", shortName: "NAFLD-FS", category: "Fibrosis", description: "NAFLD-specific fibrosis assessment" },
  { id: "fibrosis-combined", name: "Fibrosis Panel", shortName: "Fibrosis Panel", category: "Fibrosis", description: "FIB-4 + APRI + NAFLD-FS combined" },
  
  // Alcoholic Liver Disease
  { id: "maddrey", name: "Maddrey's DF", shortName: "Maddrey's", category: "Alcoholic Hepatitis", description: "Discriminant function for alcoholic hepatitis" },
  { id: "glasgow-ah", name: "Glasgow AH Score", shortName: "Glasgow AH", category: "Alcoholic Hepatitis", description: "Glasgow Alcoholic Hepatitis Score" },
  { id: "lille", name: "Lille Model", shortName: "Lille", category: "Alcoholic Hepatitis", description: "Response to corticosteroid therapy" },
  { id: "abic", name: "ABIC Score", shortName: "ABIC", category: "Alcoholic Hepatitis", description: "Age-Bilirubin-INR-Creatinine score" },
  { id: "alcoholic-hepatitis-combined", name: "Alcoholic Hepatitis Panel", shortName: "AH Panel", category: "Alcoholic Hepatitis", description: "Maddrey's + Glasgow + ABIC combined" },
  { id: "audit", name: "AUDIT / AUDIT-C", shortName: "AUDIT", category: "Alcoholic Hepatitis", description: "Alcohol Use Disorders Identification Test" },
  
  // GI Bleeding
  { id: "glasgow-blatchford", name: "Glasgow-Blatchford Score", shortName: "GBS", category: "GI Bleeding", description: "Upper GI bleed intervention prediction" },
  { id: "rockall", name: "Rockall Score", shortName: "Rockall", category: "GI Bleeding", description: "Mortality and rebleeding risk" },
  { id: "gi-bleeding-combined", name: "GI Bleeding Panel", shortName: "GI Bleed Panel", category: "GI Bleeding", description: "GBS + Rockall combined assessment" },
  
  // Pancreatitis
  { id: "ranson", name: "Ranson's Criteria", shortName: "Ranson's", category: "Pancreatitis", description: "Acute pancreatitis severity" },
  { id: "bisap", name: "BISAP Score", shortName: "BISAP", category: "Pancreatitis", description: "Bedside Index for Severity in AP" },
  { id: "pancreatitis-combined", name: "Pancreatitis Panel", shortName: "AP Panel", category: "Pancreatitis", description: "BISAP + Ranson's combined" },
  
  // IBD
  { id: "montreal", name: "Montreal Classification", shortName: "Montreal", category: "IBD", description: "IBD classification system" },
  { id: "mayo-score", name: "Mayo Score", shortName: "Mayo/UCDAI", category: "IBD", description: "Ulcerative colitis disease activity" },
  { id: "harvey-bradshaw", name: "Harvey-Bradshaw Index", shortName: "HBI", category: "IBD", description: "Crohn's disease activity" },
]

const categoryIcons: Record<string, React.ElementType> = {
  "Liver Disease": Activity,
  "Fibrosis": FlaskConical,
  "Alcoholic Hepatitis": Droplets,
  "GI Bleeding": Heart,
  "Pancreatitis": Beaker,
  "IBD": Stethoscope,
}

interface CalculatorSidebarProps {
  selectedCalculator: string
  onSelectCalculator: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

export function CalculatorSidebar({
  selectedCalculator,
  onSelectCalculator,
  isOpen,
  onClose,
}: CalculatorSidebarProps) {
  const categories = Array.from(new Set(calculators.map((c) => c.category)))

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-300 lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:hidden">
          <span className="font-semibold text-foreground">Calculators</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] lg:h-screen">
          <div className="space-y-6 p-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Brain
              const categoryCalculators = calculators.filter(
                (c) => c.category === category
              )

              return (
                <div key={category}>
                  <div className="mb-2 flex items-center gap-2 px-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {category}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {categoryCalculators.map((calc) => (
                      <button
                        key={calc.id}
                        onClick={() => {
                          onSelectCalculator(calc.id)
                          onClose()
                        }}
                        className={cn(
                          "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                          selectedCalculator === calc.id
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        <span className="font-medium">{calc.shortName || calc.name}</span>
                        <p className="mt-0.5 text-xs opacity-70 line-clamp-1">
                          {calc.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
