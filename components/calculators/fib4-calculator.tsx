"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateFib4, type Fib4Result } from "@/lib/calculations/fib4"

interface FormState {
  age: string
  ast: string
  alt: string
  platelets: string
}

const initialState: FormState = {
  age: "",
  ast: "",
  alt: "",
  platelets: "",
}

export function Fib4Calculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<Fib4Result | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    const age = parseFloat(form.age)
    const ast = parseFloat(form.ast)
    const alt = parseFloat(form.alt)
    const platelets = parseFloat(form.platelets)

    if (isNaN(age) || age < 18 || age > 120) {
      newErrors.age = "Invalid clinical value"
    }
    if (isNaN(ast) || ast <= 0) {
      newErrors.ast = "Invalid clinical value"
    }
    if (isNaN(alt) || alt <= 0) {
      newErrors.alt = "Invalid clinical value"
    }
    if (isNaN(platelets) || platelets <= 0) {
      newErrors.platelets = "Invalid clinical value"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.age !== "" &&
    form.ast !== "" &&
    form.alt !== "" &&
    form.platelets !== "" &&
    parseFloat(form.age) >= 18 &&
    parseFloat(form.ast) > 0 &&
    parseFloat(form.alt) > 0 &&
    parseFloat(form.platelets) > 0

  const handleCalculate = () => {
    if (!validateForm()) return

    try {
      const calculationResult = calculateFib4({
        age: parseFloat(form.age),
        ast: parseFloat(form.ast),
        alt: parseFloat(form.alt),
        platelets: parseFloat(form.platelets),
      })

      setResult(calculationResult)
    } catch {
      setErrors({ platelets: "Calculation error" })
    }
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
      title="FIB-4 Index"
      description="Fibrosis-4 Index for liver fibrosis. Non-invasive estimate of liver scarring."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <ResultCard
            title="FIB-4 Score"
            score={result.score}
            severity={result.severity}
            severityLabel={result.severityLabel}
            interpretation={result.interpretation}
            details={[{ label: "Fibrosis Risk", value: result.fibrosisRisk }]}
          />
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
        tooltip="Patient age in years"
        required
      />
      <InputField
        id="ast"
        label="AST"
        value={form.ast}
        onChange={(v) => updateField("ast", v)}
        unit="IU/L"
        min={0}
        step={1}
        error={errors.ast}
        tooltip="Aspartate aminotransferase"
        required
      />
      <InputField
        id="alt"
        label="ALT"
        value={form.alt}
        onChange={(v) => updateField("alt", v)}
        unit="IU/L"
        min={0}
        step={1}
        error={errors.alt}
        tooltip="Alanine aminotransferase"
        required
      />
      <InputField
        id="platelets"
        label="Platelets"
        value={form.platelets}
        onChange={(v) => updateField("platelets", v)}
        unit="x10^9/L"
        min={0}
        step={1}
        error={errors.platelets}
        tooltip="Platelet count"
        required
      />
    </CalculatorContainer>
  )
}
