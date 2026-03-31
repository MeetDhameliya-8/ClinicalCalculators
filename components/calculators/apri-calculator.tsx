"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateApri, type ApriResult } from "@/lib/calculations/apri"

interface FormState {
  ast: string
  platelets: string
  astUln: string
}

const initialState: FormState = {
  ast: "",
  platelets: "",
  astUln: "40",
}

export function ApriCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<ApriResult | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    const ast = parseFloat(form.ast)
    const platelets = parseFloat(form.platelets)
    const astUln = parseFloat(form.astUln)

    if (isNaN(ast) || ast <= 0) {
      newErrors.ast = "Invalid clinical value"
    }
    if (isNaN(platelets) || platelets <= 0) {
      newErrors.platelets = "Invalid clinical value"
    }
    if (isNaN(astUln) || astUln <= 0) {
      newErrors.astUln = "Invalid clinical value"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.ast !== "" &&
    form.platelets !== "" &&
    form.astUln !== "" &&
    parseFloat(form.ast) > 0 &&
    parseFloat(form.platelets) > 0 &&
    parseFloat(form.astUln) > 0

  const handleCalculate = () => {
    if (!validateForm()) return

    try {
      const calculationResult = calculateApri({
        ast: parseFloat(form.ast),
        platelets: parseFloat(form.platelets),
        astUln: parseFloat(form.astUln),
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
      title="APRI Score"
      description="AST to Platelet Ratio Index. Predicts hepatic fibrosis and cirrhosis in chronic hepatitis."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <ResultCard
            title="APRI Score"
            score={result.score}
            severity={result.severity}
            severityLabel={result.severityLabel}
            interpretation={result.interpretation}
            details={[
              { label: "Fibrosis Likelihood", value: result.fibrosisLikelihood },
            ]}
          />
        )
      }
    >
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
      <InputField
        id="astUln"
        label={<>AST Upper Limit <span className="whitespace-nowrap">of Normal</span></>}
        value={form.astUln}
        onChange={(v) => updateField("astUln", v)}
        unit="IU/L"
        min={0}
        step={1}
        error={errors.astUln}
        tooltip="Institution's upper limit of normal for AST (default: 40)"
        required
      />
    </CalculatorContainer>
  )
}
