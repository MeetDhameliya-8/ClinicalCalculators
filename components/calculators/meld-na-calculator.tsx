"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateMeldNa, type MeldNaResult } from "@/lib/calculations/meld"

interface FormState {
  bilirubin: string
  inr: string
  creatinine: string
  sodium: string
  dialysis: boolean
}

const initialState: FormState = {
  bilirubin: "",
  inr: "",
  creatinine: "",
  sodium: "",
  dialysis: false,
}

export function MeldNaCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<MeldNaResult | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    const bilirubin = parseFloat(form.bilirubin)
    const inr = parseFloat(form.inr)
    const creatinine = parseFloat(form.creatinine)
    const sodium = parseFloat(form.sodium)

    if (isNaN(bilirubin) || bilirubin < 0) {
      newErrors.bilirubin = "Invalid clinical value"
    }
    if (isNaN(inr) || inr < 0) {
      newErrors.inr = "Invalid clinical value"
    }
    if (isNaN(creatinine) || creatinine < 0) {
      newErrors.creatinine = "Invalid clinical value"
    }
    if (isNaN(sodium) || sodium < 100 || sodium > 180) {
      newErrors.sodium = "Invalid clinical value"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.bilirubin !== "" &&
    form.inr !== "" &&
    form.creatinine !== "" &&
    form.sodium !== "" &&
    parseFloat(form.bilirubin) >= 0 &&
    parseFloat(form.inr) >= 0 &&
    parseFloat(form.creatinine) >= 0 &&
    parseFloat(form.sodium) >= 100

  const handleCalculate = () => {
    if (!validateForm()) return

    const calculationResult = calculateMeldNa({
      bilirubin: parseFloat(form.bilirubin),
      inr: parseFloat(form.inr),
      creatinine: parseFloat(form.creatinine),
      sodium: parseFloat(form.sodium),
      dialysis: form.dialysis,
    })

    setResult(calculationResult)
  }

  const handleReset = () => {
    setForm(initialState)
    setResult(null)
    setErrors({})
  }

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <CalculatorContainer
      title="MELD-Na Score"
      description="Model for End-Stage Liver Disease with Sodium. Predicts 3-month mortality in patients with end-stage liver disease."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <ResultCard
            title="MELD-Na Score"
            score={result.score}
            severity={result.severity}
            severityLabel={result.severityLabel}
            interpretation={result.interpretation}
            details={[
              { label: "3-Month Mortality", value: result.mortalityRisk },
            ]}
          />
        )
      }
    >
      <InputField
        id="bilirubin"
        label="Bilirubin"
        value={form.bilirubin}
        onChange={(v) => updateField("bilirubin", v)}
        unit="mg/dL"
        min={0}
        step={0.1}
        error={errors.bilirubin}
        tooltip="Total serum bilirubin. Values <1.0 will be set to 1.0 for calculation."
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
        tooltip="International Normalized Ratio. Values <1.0 will be set to 1.0."
        required
      />
      <InputField
        id="creatinine"
        label="Creatinine"
        value={form.creatinine}
        onChange={(v) => updateField("creatinine", v)}
        unit="mg/dL"
        min={0}
        step={0.1}
        error={errors.creatinine}
        tooltip="Serum creatinine. Values <1.0 set to 1.0, >4.0 capped at 4.0."
        required
      />
      <InputField
        id="sodium"
        label="Sodium"
        value={form.sodium}
        onChange={(v) => updateField("sodium", v)}
        unit="mEq/L"
        min={100}
        max={180}
        step={1}
        error={errors.sodium}
        tooltip="Serum sodium. Clamped between 125-137 for calculation."
        required
      />
      <div className="sm:col-span-2">
        <ToggleField
          id="dialysis"
          label="Dialysis (≥2x in past week)"
          checked={form.dialysis}
          onChange={(v) => updateField("dialysis", v)}
          tooltip="If yes, creatinine will be set to 4.0 mg/dL"
        />
      </div>
    </CalculatorContainer>
  )
}
