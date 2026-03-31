"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateFIB4 } from "@/lib/calculations/fib4"
import { calculateApri as calculateAPRI } from "@/lib/calculations/apri"

type SeverityLevel = "low" | "moderate" | "critical"

interface FibrosisCombinedFormState {
  age: string
  ast: string
  alt: string
  platelets: string
  astUpperLimit: string
  bmi: string
  diabetesOrIFG: boolean
  albumin: string
}

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

export function FibrosisCombinedCalculator() {
  const [inputs, setInputs] = useState<FibrosisCombinedFormState>({
    age: "50",
    ast: "40",
    alt: "45",
    platelets: "200",
    astUpperLimit: "40",
    bmi: "28",
    diabetesOrIFG: false,
    albumin: "4.0",
  })

  const handleInputChange = (field: keyof FibrosisCombinedFormState, value: string | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const fib4Result = useMemo(() => {
    return calculateFIB4({
      age: parseFloat(inputs.age) || 0,
      ast: parseFloat(inputs.ast) || 0,
      alt: parseFloat(inputs.alt) || 0,
      platelets: parseFloat(inputs.platelets) || 0,
    })
  }, [inputs])

  const apriResult = useMemo(() => {
    return calculateAPRI({
      ast: parseFloat(inputs.ast) || 0,
      platelets: parseFloat(inputs.platelets) || 0,
      astUln: parseFloat(inputs.astUpperLimit) || 40,
    })
  }, [inputs])

  const nafldResult = useMemo(() => {
    return calculateNAFLDFibrosisScore({
      age: parseFloat(inputs.age) || 0,
      bmi: parseFloat(inputs.bmi) || 0,
      diabetesOrIFG: inputs.diabetesOrIFG,
      ast: parseFloat(inputs.ast) || 0,
      alt: parseFloat(inputs.alt) || 1,
      platelets: parseFloat(inputs.platelets) || 0,
      albumin: parseFloat(inputs.albumin) || 0,
    })
  }, [inputs])

  return (
    <CalculatorContainer
      title="Combined Fibrosis Panel"
      description="Simultaneous calculation of FIB-4, APRI, and NAFLD Fibrosis Score using shared parameters."
      onCalculate={() => { }}
      onReset={() => { }}
      isValid={true}
      hasResult={true}
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
          label="Diabetes or IFG"
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
            id="astUpperLimit"
            label={<>AST Upper Limit <span className="whitespace-nowrap">of Normal</span></>}
            value={inputs.astUpperLimit}
            onChange={(v) => handleInputChange("astUpperLimit", v)}
            min={10}
            max={100}
            unit="U/L"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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

        {/* Results Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          <ResultCard
            title="FIB-4 Index"
            score={parseFloat(fib4Result.score.toFixed(2))}
            interpretation={fib4Result.interpretation}
            severity={fib4Result.severity}
            severityLabel={fib4Result.severityLabel}
          />

          <ResultCard
            title="APRI Score"
            score={parseFloat(apriResult.score.toFixed(2))}
            interpretation={apriResult.interpretation}
            severity={apriResult.severity}
            severityLabel={apriResult.severityLabel}
          />

          <ResultCard
            title="NAFLD Score"
            score={parseFloat(nafldResult.score.toFixed(2))}
            interpretation={nafldResult.interpretation}
            severity={nafldResult.severity}
            severityLabel={nafldResult.fibrosisCategory}
          />
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-primary">Clinical Interpretation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <strong>FIB-4:</strong> {"<"}1.30 excludes advanced fibrosis (F3-F4); {">"}2.67 suggests advanced fibrosis.
              Indeterminate values (1.30-2.67) require further evaluation.
            </div>
            <div>
              <strong>APRI:</strong> {"<"}0.5 excludes significant fibrosis; {">"}1.5 suggests cirrhosis.
              Best validated in HCV patients.
            </div>
            <div>
              <strong>NAFLD Fibrosis Score:</strong> {"<"}-1.455 excludes advanced fibrosis; {">"}0.676 suggests advanced fibrosis.
              Specifically validated for NAFLD patients.
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorContainer>
  )
}
