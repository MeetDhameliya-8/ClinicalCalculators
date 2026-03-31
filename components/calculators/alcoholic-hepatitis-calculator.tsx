"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ResultCard, type SeverityLevel } from "@/components/calculator/result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateABICScore, type ABICInput } from "@/components/calculators/abic-calculator"

// --- Maddrey's DF ---
export interface MaddreyInput {
  pt: number
  controlPt: number
  bilirubin: number // mg/dL
}

export interface MaddreyResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  mortalityRisk: string
}

export function calculateMaddreyDF(input: MaddreyInput): MaddreyResult {
  const { pt, controlPt, bilirubin } = input
  
  // DF = 4.6 * (PT - control PT) + Bilirubin
  const ptDiff = Math.max(0, pt - controlPt) // Don't use negative difference
  const score = 4.6 * ptDiff + bilirubin
  
  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let mortalityRisk: string

  if (score >= 32) {
    severity = "critical"
    severityLabel = "Severe"
    interpretation = "Severe alcoholic hepatitis. Indicates poor prognosis and high short-term mortality risk. Corticosteroids may be indicated."
    mortalityRisk = "35-45% mortality at 1 month"
  } else {
    severity = "low"
    severityLabel = "Non-severe"
    interpretation = "Non-severe alcoholic hepatitis. Corticosteroids generally not indicated based on this score alone."
    mortalityRisk = "10% mortality at 1 month"
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    mortalityRisk,
  }
}

// --- Glasgow AH Score ---
export interface GlasgowAHInput {
  age: number
  wbc: number // 10^9/L
  bun: number // mg/dL
  ptRatio: number // Patient PT / Control PT
  bilirubin: number // mg/dL
}

export interface GlasgowAHResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  day28Survival: string
  day84Survival: string
}

export function calculateGlasgowAHScore(input: GlasgowAHInput): GlasgowAHResult {
  const { age, wbc, bun, ptRatio, bilirubin } = input
  let score = 0
  
  // Age
  if (age >= 50) {
    score += age >= 50 ? 2 : 1
  } else {
    score += 1
  }
  
  // WBC
  if (wbc >= 15) {
    score += 2
  } else {
    score += 1
  }
  
  // BUN (urea) - roughly converting mmol/L to mg/dL (17 mg/dL ≈ 6 mmol/L)
  if (bun >= 14) {
    score += 2
  } else {
    score += 1
  }
  
  // PT Ratio
  if (ptRatio >= 1.5) {
    score += 2
  } else {
    score += 1
  }
  
  // Bilirubin - roughly converting micromol/L to mg/dL (7.3 mg/dL ≈ 125 micromol/L)
  if (bilirubin >= 7.3) {
    score += 2
  } else {
    score += 1
  }

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let day28Survival: string
  let day84Survival: string

  if (score >= 9) {
    severity = "critical"
    severityLabel = "Poor Prognosis"
    interpretation = "Poor prognosis. If Maddrey DF ≥32, these patients benefit most from corticosteroids."
    day28Survival = "46%"
    day84Survival = "40%"
  } else {
    severity = "low"
    severityLabel = "Good Prognosis"
    interpretation = "Good prognosis. Corticosteroids not typically indicated even if Maddrey DF ≥32."
    day28Survival = "87%"
    day84Survival = "79%"
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    day28Survival,
    day84Survival,
  }
}

export interface AlcoholicHepatitisFormState {
  age: string
  bilirubin: string
  creatinine: string
  inr: string
  pt: string
  controlPt: string
  wbc: string
  bun: string
}

export function AlcoholicHepatitisCalculator() {
  const [inputs, setInputs] = useState<AlcoholicHepatitisFormState>({
    // Common
    age: "50",
    bilirubin: "10",
    creatinine: "1.0",
    inr: "1.5",
    pt: "18",
    controlPt: "12",
    // Glasgow specific
    wbc: "12",
    bun: "20",
  })

  const handleInputChange = (field: keyof AlcoholicHepatitisFormState, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const maddreyInput: MaddreyInput = useMemo(() => ({
    pt: parseFloat(inputs.pt) || 0,
    controlPt: parseFloat(inputs.controlPt) || 0,
    bilirubin: parseFloat(inputs.bilirubin) || 0,
  }), [inputs])

  const glasgowInput: GlasgowAHInput = useMemo(() => {
    const pt = parseFloat(inputs.pt) || 0
    const controlPt = parseFloat(inputs.controlPt) || 1 // avoid div by zero
    
    return {
      age: parseFloat(inputs.age) || 0,
      wbc: parseFloat(inputs.wbc) || 0,
      bun: parseFloat(inputs.bun) || 0,
      ptRatio: pt / controlPt,
      bilirubin: parseFloat(inputs.bilirubin) || 0,
    }
  }, [inputs])

  const abicInput: ABICInput = useMemo(() => ({
    age: parseFloat(inputs.age) || 0,
    bilirubin: parseFloat(inputs.bilirubin) || 0,
    inr: parseFloat(inputs.inr) || 0,
    creatinine: parseFloat(inputs.creatinine) || 0,
  }), [inputs])



  const maddreyResult = useMemo(() => calculateMaddreyDF(maddreyInput), [maddreyInput])
  const glasgowResult = useMemo(() => calculateGlasgowAHScore(glasgowInput), [glasgowInput])
  const abicResult = useMemo(() => calculateABICScore(abicInput), [abicInput])

  return (
    <CalculatorContainer
      title="Alcoholic Hepatitis Combined Calculator"
      description="Calculates Maddrey's DF, Glasgow Alcoholic Hepatitis Score, and ABIC simultaneously for comprehensive assessment."
      onCalculate={() => {}}
      onReset={() => {}}
      isValid={true}
      hasResult={true}
      // formula="Enter values once to calculate all three scores"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="age"
            label="Age"
            value={inputs.age}
            onChange={(v) => handleInputChange("age", String(v))}
            min={18}
            max={100}
            unit="years"
          />

          <InputField
            id="bilirubin"
            label="Total Bilirubin"
            value={inputs.bilirubin}
            onChange={(v) => handleInputChange("bilirubin", String(v))}
            min={0.1}
            max={50}
            step={0.1}
            unit="mg/dL"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="pt"
            label="PT (Patient)"
            value={inputs.pt}
            onChange={(v) => handleInputChange("pt", String(v))}
            min={10}
            max={50}
            unit="seconds"
          />

          <InputField
            id="controlPt"
            label="PT (Control)"
            value={inputs.controlPt}
            onChange={(v) => handleInputChange("controlPt", String(v))}
            min={10}
            max={15}
            unit="seconds"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="inr"
            label="INR"
            value={inputs.inr}
            onChange={(v) => handleInputChange("inr", String(v))}
            min={0.5}
            max={10}
            step={0.1}
          />

          <InputField
            id="creatinine"
            label="Creatinine"
            value={inputs.creatinine}
            onChange={(v) => handleInputChange("creatinine", String(v))}
            min={0.1}
            max={15}
            step={0.1}
            unit="mg/dL"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="wbc"
            label="WBC"
            value={inputs.wbc}
            onChange={(v) => handleInputChange("wbc", String(v))}
            min={1}
            max={50}
            step={0.1}
            unit="×10³/μL"
          />

          <InputField
            id="bun"
            label="BUN"
            value={inputs.bun}
            onChange={(v) => handleInputChange("bun", String(v))}
            min={1}
            max={150}
            unit="mg/dL"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          <ResultCard
            title="Maddrey's DF"
            score={parseFloat(maddreyResult.score.toFixed(1))}
            interpretation={maddreyResult.interpretation}
            severity={maddreyResult.severity}
            severityLabel={maddreyResult.severityLabel}
          />

          <ResultCard
            title="Glasgow AH Score"
            score={glasgowResult.score}
            interpretation={glasgowResult.interpretation}
            severity={glasgowResult.severity}
            severityLabel={glasgowResult.severityLabel}
          />

          <ResultCard
            title="ABIC Score"
            score={parseFloat(abicResult.score.toFixed(2))}
            interpretation={abicResult.interpretation}
            severity={abicResult.severity}
            severityLabel={abicResult.riskCategory}
          />
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-primary">Treatment Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {maddreyResult.score >= 32 || glasgowResult.score >= 9 ? (
              <p>
                <strong>Consider corticosteroid therapy.</strong> Both Maddrey&apos;s DF ≥32 and Glasgow AH Score ≥9 
                indicate severe disease with increased mortality risk. Prednisolone 40mg/day for 28 days 
                (or IV methylprednisolone if unable to take PO) should be considered after ruling out 
                contraindications (active infection, GI bleeding, renal failure).
              </p>
            ) : (
              <p>
                <strong>Supportive care recommended.</strong> Current scores do not meet criteria for 
                corticosteroid therapy. Continue supportive measures including nutritional support, 
                thiamine supplementation, and alcohol cessation counseling.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorContainer>
  )
}
