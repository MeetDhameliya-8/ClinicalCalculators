"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateGlasgowAH, type GlasgowAHResult } from "@/lib/calculations/glasgow-ah"

interface FormState {
  age: string
  wbc: string
  bun: string
  inr: string
  bilirubin: string
}

const initialState: FormState = {
  age: "",
  wbc: "",
  bun: "",
  inr: "",
  bilirubin: "",
}

export function GlasgowAHCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<GlasgowAHResult | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    if (isNaN(parseFloat(form.age)) || parseFloat(form.age) < 18 || parseFloat(form.age) > 120) {
      newErrors.age = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.wbc)) || parseFloat(form.wbc) <= 0) {
      newErrors.wbc = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.bun)) || parseFloat(form.bun) < 0) {
      newErrors.bun = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.inr)) || parseFloat(form.inr) <= 0) {
      newErrors.inr = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.bilirubin)) || parseFloat(form.bilirubin) < 0) {
      newErrors.bilirubin = "Invalid clinical value"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.age !== "" &&
    form.wbc !== "" &&
    form.bun !== "" &&
    form.inr !== "" &&
    form.bilirubin !== ""

  const handleCalculate = () => {
    if (!validateForm()) return

    const calculationResult = calculateGlasgowAH({
      age: parseFloat(form.age),
      wbc: parseFloat(form.wbc),
      bun: parseFloat(form.bun),
      inr: parseFloat(form.inr),
      bilirubin: parseFloat(form.bilirubin),
    })

    setResult(calculationResult)
  }

  const handleReset = () => {
    setForm(initialState)
    setResult(null)
    setErrors({})
  }

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <CalculatorContainer
      title="Glasgow Alcoholic Hepatitis Score"
      description="Predicts outcome in alcoholic hepatitis. Helps identify patients who may benefit from corticosteroid therapy."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <div className="space-y-4">
            <ResultCard
              title="GAHS Score"
              score={result.score}
              severity={result.severity}
              severityLabel={result.severityLabel}
              interpretation={result.interpretation}
            />
            <div className="rounded-lg border bg-primary/5 p-4">
              <h4 className="mb-2 font-semibold text-foreground">Clinical Recommendation</h4>
              <p className="text-sm text-muted-foreground">{result.recommendation}</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Point Breakdown</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Age</span>
                  <span className="font-medium">{result.breakdown.age} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>WBC</span>
                  <span className="font-medium">{result.breakdown.wbc} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>BUN</span>
                  <span className="font-medium">{result.breakdown.bun} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>INR</span>
                  <span className="font-medium">{result.breakdown.inr} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Bilirubin</span>
                  <span className="font-medium">{result.breakdown.bilirubin} pts</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    >
      <InputField
        id="age"
        label="Age"
        value={form.age}
        onChange={(v) => updateField("age", v)}
        unit="years"
        min={18}
        max={120}
        step={1}
        error={errors.age}
        required
      />
      <InputField
        id="wbc"
        label="White Blood Cell Count"
        value={form.wbc}
        onChange={(v) => updateField("wbc", v)}
        unit="x10^9/L"
        min={0}
        step={0.1}
        error={errors.wbc}
        required
      />
      <InputField
        id="bun"
        label="Blood Urea Nitrogen"
        value={form.bun}
        onChange={(v) => updateField("bun", v)}
        unit="mg/dL"
        min={0}
        step={0.1}
        error={errors.bun}
        required
      />
      <InputField
        id="inr"
        label="INR"
        value={form.inr}
        onChange={(v) => updateField("inr", v)}
        min={0}
        step={0.1}
        error={errors.inr}
        tooltip="International Normalized Ratio (or PT ratio)"
        required
      />
      <InputField
        id="bilirubin"
        label="Total Bilirubin"
        value={form.bilirubin}
        onChange={(v) => updateField("bilirubin", v)}
        unit="mg/dL"
        min={0}
        step={0.1}
        error={errors.bilirubin}
        required
      />
    </CalculatorContainer>
  )
}
