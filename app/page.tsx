"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { CalculatorSidebar, calculators } from "@/components/calculator-sidebar"
import { cn } from "@/lib/utils"

// Import all calculators
import {
  MELDNaCalculator,
  ChildPughCalculator,
  FIB4Calculator,
  APRICalculator,
  GlasgowBlatchfordCalculator,
  CirrhosisCombinedCalculator,
  MaddreyCalculator,
  GlasgowAHCalculator,
  MontrealCalculator,
  MayoScoreCalculator,
  RansonCalculator,
  BISAPCalculator,
  HarveyBradshawCalculator,
  NAFLDFibrosisCalculator,
  LilleCalculator,
  RockallCalculator,
  AUDITCalculator,
  ABICCalculator,
  AlcoholicHepatitisCalculator,
  FibrosisCombinedCalculator,
  PancreatitisCombinedCalculator,
  GIBleedingCombinedCalculator,
} from "@/components/calculators"

const calculatorComponents: Record<string, React.ComponentType> = {
  "meld-na": MELDNaCalculator,
  "child-pugh": ChildPughCalculator,
  "fib4": FIB4Calculator,
  "apri": APRICalculator,
  "glasgow-blatchford": GlasgowBlatchfordCalculator,
  "cirrhosis-combined": CirrhosisCombinedCalculator,
  "maddrey": MaddreyCalculator,
  "glasgow-ah": GlasgowAHCalculator,
  "montreal": MontrealCalculator,
  "mayo-score": MayoScoreCalculator,
  "ranson": RansonCalculator,
  "bisap": BISAPCalculator,
  "harvey-bradshaw": HarveyBradshawCalculator,
  "nafld-fibrosis": NAFLDFibrosisCalculator,
  "lille": LilleCalculator,
  "rockall": RockallCalculator,
  "audit": AUDITCalculator,
  "abic": ABICCalculator,
  "alcoholic-hepatitis-combined": AlcoholicHepatitisCalculator,
  "fibrosis-combined": FibrosisCombinedCalculator,
  "pancreatitis-combined": PancreatitisCombinedCalculator,
  "gi-bleeding-combined": GIBleedingCombinedCalculator,
}

export default function CalculatorsPage() {
  const [selectedCalculator, setSelectedCalculator] = useState("meld-na")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const CalculatorComponent = calculatorComponents[selectedCalculator]
  const currentCalculator = calculators.find((c) => c.id === selectedCalculator)

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <CalculatorSidebar
          selectedCalculator={selectedCalculator}
          onSelectCalculator={setSelectedCalculator}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 p-4 lg:p-8">
          <div className={cn(
            "w-full mx-auto",
            selectedCalculator.endsWith("-combined") ? "max-w-6xl" : "max-w-xl"
          )}>
            {CalculatorComponent ? (
              <CalculatorComponent />
            ) : (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  Select a calculator from the sidebar to begin.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
              <p className="font-semibold">Medical Disclaimer</p>
              <p className="mt-1">
                These calculators are intended for use by healthcare professionals as a 
                clinical decision support tool. They should not be used as the sole basis 
                for medical decisions. Always use clinical judgment and consider individual 
                patient factors when making treatment decisions. The calculations are based 
                on published scoring systems and may not account for all relevant clinical variables.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
