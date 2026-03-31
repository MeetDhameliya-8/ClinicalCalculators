"use client"

import { useState } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { SelectField } from "@/components/calculator/select-field"
import { ResultCard } from "@/components/calculator/result-card"
import {
  calculateMayoScore,
  stoolFrequencyOptions,
  rectalBleedingOptions,
  endoscopicFindingsOptions,
  physicianGlobalAssessmentOptions,
  type MayoScoreResult,
} from "@/lib/calculations/mayo-score"

interface FormState {
  stoolFrequency: string
  rectalBleeding: string
  endoscopicFindings: string
  physicianGlobalAssessment: string
}

const initialState: FormState = {
  stoolFrequency: "",
  rectalBleeding: "",
  endoscopicFindings: "",
  physicianGlobalAssessment: "",
}

export function MayoScoreCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [result, setResult] = useState<MayoScoreResult | null>(null)

  const isValid =
    form.stoolFrequency !== "" &&
    form.rectalBleeding !== "" &&
    form.endoscopicFindings !== "" &&
    form.physicianGlobalAssessment !== ""

  const handleCalculate = () => {
    if (!isValid) return

    const calculationResult = calculateMayoScore({
      stoolFrequency: parseInt(form.stoolFrequency) as 0 | 1 | 2 | 3,
      rectalBleeding: parseInt(form.rectalBleeding) as 0 | 1 | 2 | 3,
      endoscopicFindings: parseInt(form.endoscopicFindings) as 0 | 1 | 2 | 3,
      physicianGlobalAssessment: parseInt(form.physicianGlobalAssessment) as 0 | 1 | 2 | 3,
    })

    setResult(calculationResult)
  }

  const handleReset = () => {
    setForm(initialState)
    setResult(null)
  }

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <CalculatorContainer
      title="Mayo Score for Ulcerative Colitis"
      description="Assesses disease activity in ulcerative colitis. Full Mayo score includes endoscopic findings."
      onCalculate={handleCalculate}
      onReset={handleReset}
      isValid={isValid}
      hasResult={result !== null}
      result={
        result && (
          <div className="space-y-4">
            <ResultCard
              title="Mayo Score"
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
              <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Component Scores</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Stool Frequency</span>
                  <span className="font-medium">{form.stoolFrequency} / 3</span>
                </div>
                <div className="flex justify-between">
                  <span>Rectal Bleeding</span>
                  <span className="font-medium">{form.rectalBleeding} / 3</span>
                </div>
                <div className="flex justify-between">
                  <span>Endoscopic Findings</span>
                  <span className="font-medium">{form.endoscopicFindings} / 3</span>
                </div>
                <div className="flex justify-between">
                  <span>Physician Global Assessment</span>
                  <span className="font-medium">{form.physicianGlobalAssessment} / 3</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    >
      <SelectField
        id="stoolFrequency"
        label="Stool Frequency"
        value={form.stoolFrequency}
        onChange={(v) => updateField("stoolFrequency", v)}
        options={stoolFrequencyOptions.map((o) => ({
          value: o.value,
          label: o.label,
          points: o.points,
        }))}
        showPoints
        required
      />
      <SelectField
        id="rectalBleeding"
        label="Rectal Bleeding"
        value={form.rectalBleeding}
        onChange={(v) => updateField("rectalBleeding", v)}
        options={rectalBleedingOptions.map((o) => ({
          value: o.value,
          label: o.label,
          points: o.points,
        }))}
        showPoints
        required
      />
      <SelectField
        id="endoscopicFindings"
        label="Endoscopic Findings"
        value={form.endoscopicFindings}
        onChange={(v) => updateField("endoscopicFindings", v)}
        options={endoscopicFindingsOptions.map((o) => ({
          value: o.value,
          label: o.label,
          points: o.points,
        }))}
        showPoints
        required
      />
      <SelectField
        id="physicianGlobalAssessment"
        label="Physician Global Assessment"
        value={form.physicianGlobalAssessment}
        onChange={(v) => updateField("physicianGlobalAssessment", v)}
        options={physicianGlobalAssessmentOptions.map((o) => ({
          value: o.value,
          label: o.label,
          points: o.points,
        }))}
        showPoints
        required
      />
    </CalculatorContainer>
  )
}
