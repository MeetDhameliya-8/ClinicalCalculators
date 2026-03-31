"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateMaddrey, type MaddreyResult } from "@/lib/calculations/maddrey"

interface FormState {
  patientPt: string
  controlPt: string
  bilirubin: string
}

const initialState: FormState = {
  patientPt: "",
  controlPt: "",
  bilirubin: "",
}

export function MaddreyCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<MaddreyResult | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    if (isNaN(parseFloat(form.patientPt)) || parseFloat(form.patientPt) <= 0) {
      newErrors.patientPt = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.controlPt)) || parseFloat(form.controlPt) <= 0) {
      newErrors.controlPt = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.bilirubin)) || parseFloat(form.bilirubin) < 0) {
      newErrors.bilirubin = "Invalid clinical value"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.patientPt !== "" &&
    form.controlPt !== "" &&
    form.bilirubin !== "" &&
    parseFloat(form.patientPt) > 0 &&
    parseFloat(form.controlPt) > 0 &&
    parseFloat(form.bilirubin) >= 0

  const handleCalculate = () => {
    if (!validateForm()) return

    const calculationResult = calculateMaddrey({
      patientPt: parseFloat(form.patientPt),
      controlPt: parseFloat(form.controlPt),
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
      title="Maddrey's Discriminant Function"
      description="Predicts prognosis in alcoholic hepatitis and guides corticosteroid therapy decisions."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <div className="space-y-4">
            <ResultCard
              title="Maddrey DF"
              score={result.score}
              severity={result.severity}
              severityLabel={result.severityLabel}
              interpretation={result.interpretation}
            />
            <div className="rounded-lg border bg-primary/5 p-4">
              <h4 className="mb-2 font-semibold text-foreground">Clinical Recommendation</h4>
              <p className="text-sm text-muted-foreground">{result.recommendation}</p>
            </div>
          </div>
        )
      }
    >
      <InputField
        id="patientPt"
        label="Patient Prothrombin Time"
        value={form.patientPt}
        onChange={(v) => updateField("patientPt", v)}
        unit="seconds"
        min={0}
        step={0.1}
        error={errors.patientPt}
        tooltip="Patient's prothrombin time in seconds"
        required
      />
      <InputField
        id="controlPt"
        label="Control Prothrombin Time"
        value={form.controlPt}
        onChange={(v) => updateField("controlPt", v)}
        unit="seconds"
        min={0}
        step={0.1}
        error={errors.controlPt}
        tooltip="Laboratory control PT (typically 11-13 seconds)"
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
        tooltip="Total serum bilirubin"
        required
      />
    </CalculatorContainer>
  )
}
