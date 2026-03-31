"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard, type SeverityLevel } from "@/components/calculator/result-card"

export interface NAFLDFibrosisInput {
  age: number
  bmi: number
  diabetesOrIFG: boolean
  ast: number
  alt: number
  platelets: number
  albumin: number
}

export interface NAFLDFibrosisResult {
  score: number
  interpretation: string
  severity: SeverityLevel
  fibrosisCategory: string
}

export function calculateNAFLDFibrosisScore(input: NAFLDFibrosisInput): NAFLDFibrosisResult {
  const { age, bmi, diabetesOrIFG, ast, alt, platelets, albumin } = input
  
  const ifgValue = diabetesOrIFG ? 1 : 0
  const astAltRatio = ast / alt
  
  const score = -1.675 + (0.037 * age) + (0.094 * bmi) + (1.13 * ifgValue) + (0.99 * astAltRatio) - (0.013 * platelets) - (0.66 * albumin)
  
  let severity: SeverityLevel
  let interpretation: string
  let fibrosisCategory: string

  if (score < -1.455) {
    severity = "low"
    fibrosisCategory = "F0-F2"
    interpretation = "Advanced fibrosis (F3-F4) excluded with high accuracy."
  } else if (score <= 0.676) {
    severity = "moderate"
    fibrosisCategory = "Indeterminate"
    interpretation = "Indeterminate score. Further evaluation recommended."
  } else {
    severity = "critical"
    fibrosisCategory = "F3-F4"
    interpretation = "Advanced fibrosis (F3-F4) likely."
  }

  return {
    score,
    interpretation,
    severity,
    fibrosisCategory,
  }
}

export interface NAFLDFibrosisFormState {
  age: string
  bmi: string
  diabetesOrIFG: boolean
  ast: string
  alt: string
  platelets: string
  albumin: string
}

export function NAFLDFibrosisCalculator() {
  const [inputs, setInputs] = useState<NAFLDFibrosisFormState>({
    age: "50",
    bmi: "28",
    diabetesOrIFG: false,
    ast: "40",
    alt: "45",
    platelets: "200",
    albumin: "4.0",
  })

  const handleInputChange = (field: keyof NAFLDFibrosisFormState, value: string | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const result = useMemo(() => {
    const age = parseFloat(inputs.age) || 0
    const bmi = parseFloat(inputs.bmi) || 0
    const ast = parseFloat(inputs.ast) || 0
    const alt = parseFloat(inputs.alt) || 1 // prevent div by zero
    const platelets = parseFloat(inputs.platelets) || 0
    const albumin = parseFloat(inputs.albumin) || 0

    return calculateNAFLDFibrosisScore({
      age,
      bmi: bmi,
      diabetesOrIFG: inputs.diabetesOrIFG,
      ast,
      alt,
      platelets,
      albumin
    })
  }, [inputs])

  return (
    <CalculatorContainer
      title="NAFLD Fibrosis Score"
      description="Non-invasive scoring system to identify NAFLD patients with and without advanced fibrosis."
      onCalculate={() => {}} // No-op as it's reactive
      onReset={() => {}}
      isValid={true}
      hasResult={true}
      // formula="NFS = -1.675 + 0.037 × age + 0.094 × BMI + 1.13 × IFG/diabetes + 0.99 × AST/ALT - 0.013 × platelets - 0.66 × albumin"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
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
            id="bmi"
            label="BMI"
            value={inputs.bmi}
            onChange={(v) => handleInputChange("bmi", v)}
            min={15}
            max={60}
            step={0.1}
            unit="kg/m²"
          />
        </div>

        <ToggleField
          id="diabetesOrIFG"
          label="Diabetes or Impaired Fasting Glucose (IFG)"
          tooltip="Fasting glucose ≥100 mg/dL or HbA1c ≥5.7%"
          checked={inputs.diabetesOrIFG}
          onChange={(checked) => handleInputChange("diabetesOrIFG", checked)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="ast"
            label="AST"
            value={inputs.ast}
            onChange={(v) => handleInputChange("ast", v)}
            min={1}
            max={500}
            unit="U/L"
          />

          <InputField
            id="alt"
            label="ALT"
            value={inputs.alt}
            onChange={(v) => handleInputChange("alt", v)}
            min={1}
            max={500}
            unit="U/L"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="platelets"
            label="Platelets"
            value={inputs.platelets}
            onChange={(v) => handleInputChange("platelets", v)}
            min={10}
            max={500}
            unit="×10⁹/L"
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
        </div>

        <ResultCard
          title="NAFLD Fibrosis Score"
          score={parseFloat(result.score.toFixed(2))}
          interpretation={result.interpretation}
          severity={result.severity}
          severityLabel={result.fibrosisCategory}
          // details={[
          //   `Fibrosis Category: ${result.fibrosisCategory}`,
          //   `Low cutoff: < -1.455 | High cutoff: > 0.676`,
          // ]}
        />
      </div>
    </CalculatorContainer>
  )
}
