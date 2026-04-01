"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { calculators } from "@/lib/calculators-data"
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
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  )
}

function CalculatorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCalculator = searchParams.get("id") || "meld-na"

  const setSelectedCalculator = (id: string) => {
    router.push(`/calculator?id=${id}`)
  }

  const CalculatorComponent = calculatorComponents[selectedCalculator]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        selectedCalculator={selectedCalculator} 
        onSelectCalculator={setSelectedCalculator} 
      />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className={cn(
          "w-full mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700",
          selectedCalculator.endsWith("-combined") ? "max-w-6xl" : "max-w-[760px]"
        )}>
          {CalculatorComponent ? (
            <CalculatorComponent />
          ) : (
            <div className="rounded-3xl border border-white/5 bg-card/40 backdrop-blur-md p-12 text-center shadow-2xl">
              <p className="text-muted-foreground font-medium">
                Select a calculator from the menu above to begin.
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-12 rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-xs text-muted-foreground/60 shadow-xl backdrop-blur-sm">
            <p className="font-black uppercase tracking-[0.2em] text-primary/80 mb-3">Medical Disclaimer</p>
            <p className="leading-relaxed">
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
  )
}
