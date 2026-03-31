"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { SelectField } from "@/components/calculator/select-field"
import { ResultCard } from "@/components/calculator/result-card"
import {
  calculateChildPugh,
  type ChildPughResult,
  type AscitesGrade,
  type EncephalopathyGrade,
} from "@/lib/calculations/child-pugh"

interface FormState {
  bilirubin: string
  albumin: string
  inr: string
  ascites: AscitesGrade | ""
  encephalopathy: EncephalopathyGrade | ""
}

const initialState: FormState = {
  bilirubin: "",
  albumin: "",
  inr: "",
  ascites: "",
  encephalopathy: "",
}

const ascitesOptions = [
  { value: "none", label: "None", points: 1 },
  { value: "mild", label: "Mild (diuretic responsive)", points: 2 },
  { value: "moderate-severe", label: "Moderate to Severe (refractory)", points: 3 },
]

const encephalopathyOptions = [
  { value: "none", label: "None", points: 1 },
  { value: "grade1-2", label: "Grade 1-2 (mild confusion, asterixis)", points: 2 },
  { value: "grade3-4", label: "Grade 3-4 (somnolent, coma)", points: 3 },
]

export function ChildPughCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<ChildPughResult | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    const bilirubin = parseFloat(form.bilirubin)
    const albumin = parseFloat(form.albumin)
    const inr = parseFloat(form.inr)

    if (isNaN(bilirubin) || bilirubin < 0) {
      newErrors.bilirubin = "Invalid clinical value"
    }
    if (isNaN(albumin) || albumin < 0) {
      newErrors.albumin = "Invalid clinical value"
    }
    if (isNaN(inr) || inr < 0) {
      newErrors.inr = "Invalid clinical value"
    }
    if (!form.ascites) {
      newErrors.ascites = "Please select an option"
    }
    if (!form.encephalopathy) {
      newErrors.encephalopathy = "Please select an option"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.bilirubin !== "" &&
    form.albumin !== "" &&
    form.inr !== "" &&
    form.ascites !== "" &&
    form.encephalopathy !== "" &&
    parseFloat(form.bilirubin) >= 0 &&
    parseFloat(form.albumin) >= 0 &&
    parseFloat(form.inr) >= 0

  const handleCalculate = () => {
    if (!validateForm()) return

    const calculationResult = calculateChildPugh({
      bilirubin: parseFloat(form.bilirubin),
      albumin: parseFloat(form.albumin),
      inr: parseFloat(form.inr),
      ascites: form.ascites as AscitesGrade,
      encephalopathy: form.encephalopathy as EncephalopathyGrade,
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
      title="Child-Pugh Score"
      description="Classifies severity of cirrhosis and predicts surgical mortality."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <div className="space-y-4">
            <ResultCard
              title={`Child-Pugh Class ${result.class}`}
              score={result.score}
              severity={result.severity}
              severityLabel={result.severityLabel}
              interpretation={result.interpretation}
              details={[
                { label: "1-Year Survival", value: result.survival.oneYear },
                { label: "2-Year Survival", value: result.survival.twoYear },
              ]}
            />
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                Point Breakdown
              </h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Bilirubin</span>
                  <span className="font-medium">{result.breakdown.bilirubin} pt{result.breakdown.bilirubin !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span>Albumin</span>
                  <span className="font-medium">{result.breakdown.albumin} pt{result.breakdown.albumin !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span>INR</span>
                  <span className="font-medium">{result.breakdown.inr} pt{result.breakdown.inr !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ascites</span>
                  <span className="font-medium">{result.breakdown.ascites} pt{result.breakdown.ascites !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span>Encephalopathy</span>
                  <span className="font-medium">{result.breakdown.encephalopathy} pt{result.breakdown.encephalopathy !== 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>
          </div>
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
        tooltip="Total serum bilirubin"
        required
      />
      <InputField
        id="albumin"
        label="Albumin"
        value={form.albumin}
        onChange={(v) => updateField("albumin", v)}
        unit="g/dL"
        min={0}
        step={0.1}
        error={errors.albumin}
        tooltip="Serum albumin"
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
        tooltip="International Normalized Ratio"
        required
      />
      <SelectField
        id="ascites"
        label="Ascites"
        value={form.ascites}
        onChange={(v) => updateField("ascites", v)}
        options={ascitesOptions}
        error={errors.ascites}
        showPoints
        required
      />
      <div className="sm:col-span-2">
        <SelectField
          id="encephalopathy"
          label="Encephalopathy"
          value={form.encephalopathy}
          onChange={(v) => updateField("encephalopathy", v)}
          options={encephalopathyOptions}
          error={errors.encephalopathy}
          showPoints
          required
        />
      </div>
    </CalculatorContainer>
  )
}
