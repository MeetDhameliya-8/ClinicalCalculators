"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ResultCard, type SeverityLevel } from "@/components/calculator/result-card"

export interface LilleModelInput {
  age: number
  albumin: number
  bilirubinDay0: number
  bilirubinDay7: number
  creatinine: number
  pt: number
  renalInsufficiency: boolean
}

export interface LilleModelResult {
  score: number
  severity: SeverityLevel
  interpretation: string
  response: string
  survival: string
}

export function calculateLilleModel(input: LilleModelInput): LilleModelResult {
  const { age, albumin, bilirubinDay0, bilirubinDay7, creatinine, pt, renalInsufficiency } = input
  
  const renalValue = renalInsufficiency ? 1 : 0
  
  const L = 3.19 - (0.101 * age) + (0.147 * albumin) + (0.0165 * (bilirubinDay0 - bilirubinDay7)) - (0.206 * renalValue) - (0.0065 * bilirubinDay0) - (0.0096 * pt)
  
  const score = Math.exp(-L) / (1 + Math.exp(-L))
  const roundedScore = Math.round(score * 1000) / 1000

  let severity: SeverityLevel
  let interpretation: string
  let response: string
  let survival: string

  if (roundedScore < 0.45) {
    severity = "low"
    response = "Responder"
    interpretation = "Responder to corticosteroid therapy. Better prognosis."
    survival = "~85% at 6 months"
  } else {
    severity = "critical"
    response = "Non-responder"
    interpretation = "Non-responder to corticosteroid therapy. Consider second-line therapy or early liver transplant."
    survival = "~25% at 6 months"
  }

  return {
    score: roundedScore,
    severity,
    interpretation,
    response,
    survival,
  }
}

export interface LilleModelFormState {
  age: string
  albumin: string
  bilirubinDay0: string
  bilirubinDay7: string
  creatinine: string
  pt: string
  renalInsufficiency: boolean
}

export function LilleCalculator() {
  const [inputs, setInputs] = useState<LilleModelFormState>({
    age: "50",
    albumin: "3.0",
    bilirubinDay0: "15",
    bilirubinDay7: "12",
    creatinine: "1.0",
    pt: "18",
    renalInsufficiency: false,
  })

  const handleInputChange = (field: keyof LilleModelFormState, value: string | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const result = useMemo(() => {
    return calculateLilleModel({
      age: parseFloat(inputs.age) || 0,
      albumin: parseFloat(inputs.albumin) || 0,
      bilirubinDay0: parseFloat(inputs.bilirubinDay0) || 0,
      bilirubinDay7: parseFloat(inputs.bilirubinDay7) || 0,
      creatinine: parseFloat(inputs.creatinine) || 0,
      pt: parseFloat(inputs.pt) || 0,
      renalInsufficiency: inputs.renalInsufficiency,
    })
  }, [inputs])

  return (
    <CalculatorContainer
      title="Lille Model"
      description="Predicts response to corticosteroid therapy in severe alcoholic hepatitis after 7 days of treatment."
      onCalculate={() => {}} // No-op as it's reactive
      onReset={() => {}}
      isValid={true}
      hasResult={true}
      // formula="Lille = 3.19 - 0.101 × age + 0.147 × albumin + 0.0165 × (bilirubinDay0 - bilirubinDay7) - 0.206 × renal - 0.0065 × bilirubinDay0 - 0.0096 × PT"
    >
      <div className="space-y-6">
        <InputField
          id="age"
          label="Age"
          value={inputs.age}
          onChange={(v) => handleInputChange("age", v)}
          min={18}
          max={100}
          unit="years"
        />

        <InputField
          id="albumin"
          label="Albumin"
          value={inputs.albumin}
          onChange={(v) => handleInputChange("albumin", v)}
          min={1}
          max={6}
          step={0.1}
          unit="g/dL"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="bilirubinDay0"
            label="Bilirubin (Day 0)"
            value={inputs.bilirubinDay0}
            onChange={(v) => handleInputChange("bilirubinDay0", v)}
            min={0.1}
            max={50}
            step={0.1}
            unit="mg/dL"
            tooltip="Before starting steroids" // renamed from helpText
          />

          <InputField
            id="bilirubinDay7"
            label="Bilirubin (Day 7)"
            value={inputs.bilirubinDay7}
            onChange={(v) => handleInputChange("bilirubinDay7", v)}
            min={0.1}
            max={50}
            step={0.1}
            unit="mg/dL"
            tooltip="After 7 days of steroids" // renamed from helpText
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="creatinine"
            label="Creatinine"
            value={inputs.creatinine}
            onChange={(v) => handleInputChange("creatinine", v)}
            min={0.1}
            max={15}
            step={0.1}
            unit="mg/dL"
          />

          <InputField
            id="pt"
            label="PT (Prothrombin Time)"
            value={inputs.pt}
            onChange={(v) => handleInputChange("pt", v)}
            min={10}
            max={50}
            unit="seconds"
          />
        </div>

        <ResultCard
          title="Lille Score"
          score={parseFloat(result.score.toFixed(3))}
          interpretation={result.interpretation}
          severity={result.severity}
          severityLabel={result.response}
        />
      </div>
    </CalculatorContainer>
  )
}
