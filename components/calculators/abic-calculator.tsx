"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ResultCard, type SeverityLevel } from "@/components/calculator/result-card"

export interface ABICInput {
  age: number
  bilirubin: number // mg/dL
  inr: number
  creatinine: number // mg/dL
}

export interface ABICResult {
  score: number
  severity: SeverityLevel
  interpretation: string
  riskCategory: string
  survival: string
}

export function calculateABICScore(input: ABICInput): ABICResult {
  const { age, bilirubin, inr, creatinine } = input
  
  // (age * 0.1) + (bilirubin * 0.08) + (INR * 0.8) + (creatinine * 0.3)
  const score = (age * 0.1) + (bilirubin * 0.08) + (inr * 0.8) + (creatinine * 0.3)
  
  let severity: SeverityLevel
  let interpretation: string
  let riskCategory: string
  let survival: string

  if (score < 6.71) {
    severity = "low"
    riskCategory = "Low Risk"
    interpretation = "Low risk of mortality at 90 days."
    survival = "100%"
  } else if (score <= 9.0) {
    severity = "moderate"
    riskCategory = "Intermediate Risk"
    interpretation = "Intermediate risk. Consider corticosteroid therapy if no contraindications."
    survival = "70%"
  } else {
    severity = "critical"
    riskCategory = "High Risk"
    interpretation = "High risk. Corticosteroids may not be beneficial. Consider clinical trial or early liver transplant."
    survival = "25%"
  }

  return {
    score,
    severity,
    interpretation,
    riskCategory,
    survival,
  }
}

export interface ABICFormState {
  age: string
  bilirubin: string
  inr: string
  creatinine: string
}

export function ABICCalculator() {
  const [inputs, setInputs] = useState<ABICFormState>({
    age: "50",
    bilirubin: "10",
    inr: "1.5",
    creatinine: "1.0",
  })

  const handleInputChange = (field: keyof ABICFormState, value: string | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const result = useMemo(() => {
    return calculateABICScore({
      age: parseFloat(inputs.age) || 0,
      bilirubin: parseFloat(inputs.bilirubin) || 0,
      inr: parseFloat(inputs.inr) || 0,
      creatinine: parseFloat(inputs.creatinine) || 0,
    })
  }, [inputs])

  return (
    <CalculatorContainer
      title="ABIC Score"
      description="Age-Bilirubin-INR-Creatinine score for predicting survival in alcoholic hepatitis."
      onCalculate={() => {}} 
      onReset={() => {}}
      isValid={true}
      hasResult={true}
      result={
        <ResultCard
          score={parseFloat(result.score.toFixed(2))}
          interpretation={result.interpretation}
          severity={result.severity}
          severityLabel={result.riskCategory}
          details={[
            { label: "Survival (90d)", value: result.survival }
          ]}
        />
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
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
          id="bilirubin"
          label="Total Bilirubin"
          value={inputs.bilirubin}
          onChange={(v) => handleInputChange("bilirubin", v)}
          min={0.1}
          max={50}
          step={0.1}
          unit="mg/dL"
        />

        <InputField
          id="inr"
          label="INR"
          value={inputs.inr}
          onChange={(v) => handleInputChange("inr", v)}
          min={0.5}
          max={10}
          step={0.1}
        />

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
      </div>
    </CalculatorContainer>
  )
}
