"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { SelectField } from "@/components/calculator/select-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import {
  calculateGlasgowBlatchford,
  type GlasgowBlatchfordResult,
} from "@/lib/calculations/glasgow-blatchford"

interface FormState {
  bun: string
  hemoglobin: string
  systolicBp: string
  pulse: string
  melena: boolean
  syncope: boolean
  hepaticDisease: boolean
  cardiacFailure: boolean
  sex: "male" | "female" | ""
}

const initialState: FormState = {
  bun: "",
  hemoglobin: "",
  systolicBp: "",
  pulse: "",
  melena: false,
  syncope: false,
  hepaticDisease: false,
  cardiacFailure: false,
  sex: "",
}

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]

export function GlasgowBlatchfordCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<GlasgowBlatchfordResult | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    const bun = parseFloat(form.bun)
    const hemoglobin = parseFloat(form.hemoglobin)
    const systolicBp = parseFloat(form.systolicBp)
    const pulse = parseFloat(form.pulse)

    if (isNaN(bun) || bun < 0) {
      newErrors.bun = "Invalid clinical value"
    }
    if (isNaN(hemoglobin) || hemoglobin < 0) {
      newErrors.hemoglobin = "Invalid clinical value"
    }
    if (isNaN(systolicBp) || systolicBp < 0) {
      newErrors.systolicBp = "Invalid clinical value"
    }
    if (isNaN(pulse) || pulse < 0) {
      newErrors.pulse = "Invalid clinical value"
    }
    if (!form.sex) {
      newErrors.sex = "Please select an option"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.bun !== "" &&
    form.hemoglobin !== "" &&
    form.systolicBp !== "" &&
    form.pulse !== "" &&
    form.sex !== "" &&
    parseFloat(form.bun) >= 0 &&
    parseFloat(form.hemoglobin) >= 0 &&
    parseFloat(form.systolicBp) >= 0 &&
    parseFloat(form.pulse) >= 0

  const handleCalculate = () => {
    if (!validateForm()) return

    const calculationResult = calculateGlasgowBlatchford({
      bun: parseFloat(form.bun),
      hemoglobin: parseFloat(form.hemoglobin),
      systolicBp: parseFloat(form.systolicBp),
      pulse: parseFloat(form.pulse),
      melena: form.melena,
      syncope: form.syncope,
      hepaticDisease: form.hepaticDisease,
      cardiacFailure: form.cardiacFailure,
      sex: form.sex as "male" | "female",
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
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <CalculatorContainer
      title="Glasgow-Blatchford Score"
      description="Predicts need for intervention in upper GI bleeding. Score of 0 identifies low-risk patients suitable for outpatient management."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <div className="space-y-4">
            <ResultCard
              title="Glasgow-Blatchford Score"
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
              <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                Point Breakdown
              </h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>BUN</span>
                  <span className="font-medium">{result.breakdown.bun} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Hemoglobin</span>
                  <span className="font-medium">{result.breakdown.hemoglobin} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Systolic BP</span>
                  <span className="font-medium">{result.breakdown.systolicBp} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Pulse</span>
                  <span className="font-medium">{result.breakdown.pulse} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Melena</span>
                  <span className="font-medium">{result.breakdown.melena} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Syncope</span>
                  <span className="font-medium">{result.breakdown.syncope} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Hepatic Disease</span>
                  <span className="font-medium">{result.breakdown.hepaticDisease} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Cardiac Failure</span>
                  <span className="font-medium">{result.breakdown.cardiacFailure} pts</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    >
      <SelectField
        id="sex"
        label="Sex"
        value={form.sex}
        onChange={(v) => updateField("sex", v)}
        options={sexOptions}
        error={errors.sex}
        tooltip="Gender affects hemoglobin scoring thresholds"
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
        tooltip="BUN level"
        required
      />
      <InputField
        id="hemoglobin"
        label="Hemoglobin"
        value={form.hemoglobin}
        onChange={(v) => updateField("hemoglobin", v)}
        unit="g/dL"
        min={0}
        step={0.1}
        error={errors.hemoglobin}
        tooltip="Hemoglobin level"
        required
      />
      <InputField
        id="systolicBp"
        label="Systolic Blood Pressure"
        value={form.systolicBp}
        onChange={(v) => updateField("systolicBp", v)}
        unit="mmHg"
        min={0}
        step={1}
        error={errors.systolicBp}
        tooltip="Systolic BP at presentation"
        required
      />
      <InputField
        id="pulse"
        label="Pulse"
        value={form.pulse}
        onChange={(v) => updateField("pulse", v)}
        unit="bpm"
        min={0}
        step={1}
        error={errors.pulse}
        tooltip="Heart rate"
        required
      />
      <div className="sm:col-span-2 space-y-1 border-t pt-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Clinical Findings</p>
        <ToggleField
          id="melena"
          label="Melena present"
          checked={form.melena}
          onChange={(v) => updateField("melena", v)}
        />
        <ToggleField
          id="syncope"
          label="Syncope"
          checked={form.syncope}
          onChange={(v) => updateField("syncope", v)}
        />
        <ToggleField
          id="hepaticDisease"
          label="Hepatic disease"
          checked={form.hepaticDisease}
          onChange={(v) => updateField("hepaticDisease", v)}
          tooltip="Known liver disease or clinical/laboratory evidence"
        />
        <ToggleField
          id="cardiacFailure"
          label="Cardiac failure"
          checked={form.cardiacFailure}
          onChange={(v) => updateField("cardiacFailure", v)}
          tooltip="Known heart failure or clinical/laboratory evidence"
        />
      </div>
    </CalculatorContainer>
  )
}
