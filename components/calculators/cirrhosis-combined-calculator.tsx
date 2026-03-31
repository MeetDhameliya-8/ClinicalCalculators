"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw } from "lucide-react"
import { InputField } from "@/components/calculator/input-field"
import { SelectField } from "@/components/calculator/select-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import {
  calculateChildPugh,
  type ChildPughResult,
  type AscitesGrade,
  type EncephalopathyGrade,
} from "@/lib/calculations/child-pugh"
import {
  calculateMeldNa,
  calculateMeld3,
  type MeldNaResult,
  type Meld3Result,
} from "@/lib/calculations/meld"

interface FormState {
  bilirubin: string
  albumin: string
  inr: string
  creatinine: string
  sodium: string
  ascites: AscitesGrade | ""
  encephalopathy: EncephalopathyGrade | ""
  sex: "male" | "female" | ""
  dialysis: boolean
}

const initialState: FormState = {
  bilirubin: "",
  albumin: "",
  inr: "",
  creatinine: "",
  sodium: "",
  ascites: "",
  encephalopathy: "",
  sex: "",
  dialysis: false,
}

interface Results {
  childPugh: ChildPughResult | null
  meldNa: MeldNaResult | null
  meld3: Meld3Result | null
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

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]

export function CirrhosisCombinedCalculator() {
  const [form, setForm] = useState<FormState>(initialState)
  const [results, setResults] = useState<Results>({
    childPugh: null,
    meldNa: null,
    meld3: null,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    if (isNaN(parseFloat(form.bilirubin)) || parseFloat(form.bilirubin) < 0) {
      newErrors.bilirubin = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.albumin)) || parseFloat(form.albumin) < 0) {
      newErrors.albumin = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.inr)) || parseFloat(form.inr) < 0) {
      newErrors.inr = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.creatinine)) || parseFloat(form.creatinine) < 0) {
      newErrors.creatinine = "Invalid clinical value"
    }
    if (isNaN(parseFloat(form.sodium)) || parseFloat(form.sodium) < 100) {
      newErrors.sodium = "Invalid clinical value"
    }
    if (!form.ascites) newErrors.ascites = "Required"
    if (!form.encephalopathy) newErrors.encephalopathy = "Required"
    if (!form.sex) newErrors.sex = "Required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValid =
    form.bilirubin !== "" &&
    form.albumin !== "" &&
    form.inr !== "" &&
    form.creatinine !== "" &&
    form.sodium !== "" &&
    form.ascites !== "" &&
    form.encephalopathy !== "" &&
    form.sex !== ""

  const hasResults = results.childPugh !== null

  const handleCalculate = () => {
    if (!validateForm()) return

    const bilirubin = parseFloat(form.bilirubin)
    const albumin = parseFloat(form.albumin)
    const inr = parseFloat(form.inr)
    const creatinine = parseFloat(form.creatinine)
    const sodium = parseFloat(form.sodium)

    const childPughResult = calculateChildPugh({
      bilirubin,
      albumin,
      inr,
      ascites: form.ascites as AscitesGrade,
      encephalopathy: form.encephalopathy as EncephalopathyGrade,
    })

    const meldNaResult = calculateMeldNa({
      bilirubin,
      inr,
      creatinine,
      sodium,
      dialysis: form.dialysis,
    })

    const meld3Result = calculateMeld3({
      bilirubin,
      inr,
      creatinine,
      sodium,
      albumin,
      dialysis: form.dialysis,
      sex: form.sex as "male" | "female",
    })

    setResults({
      childPugh: childPughResult,
      meldNa: meldNaResult,
      meld3: meld3Result,
    })
  }

  const handleReset = () => {
    setForm(initialState)
    setResults({ childPugh: null, meldNa: null, meld3: null })
    setErrors({})
  }

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Cirrhosis Assessment</CardTitle>
        <CardDescription>
          Combined Child-Pugh, MELD-Na, and MELD 3.0 scores for comprehensive cirrhosis evaluation
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Lab Values */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Laboratory Values
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InputField
                id="bilirubin"
                label="Bilirubin"
                value={form.bilirubin}
                onChange={(v) => updateField("bilirubin", v)}
                unit="mg/dL"
                min={0}
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
                error={errors.inr}
                required
              />
              <InputField
                id="creatinine"
                label="Creatinine"
                value={form.creatinine}
                onChange={(v) => updateField("creatinine", v)}
                unit="mg/dL"
                min={0}
                error={errors.creatinine}
                required
              />
              <InputField
                id="sodium"
                label="Sodium"
                value={form.sodium}
                onChange={(v) => updateField("sodium", v)}
                unit="mEq/L"
                min={100}
                error={errors.sodium}
                required
              />
            </div>
          </div>

          {/* Clinical Findings */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Clinical Findings
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          {/* Modifiers */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Modifiers
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                id="sex"
                label="Sex"
                value={form.sex}
                onChange={(v) => updateField("sex", v)}
                options={sexOptions}
                error={errors.sex}
                tooltip="Required for MELD 3.0 calculation"
                required
              />
              <div className="flex items-end">
                <ToggleField
                  id="dialysis"
                  label="Dialysis (2x/week in past week)"
                  checked={form.dialysis}
                  onChange={(v) => updateField("dialysis", v)}
                  tooltip="If yes, creatinine set to 4.0 for MELD"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleCalculate} disabled={!isValid}>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate All Scores
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Results */}
          {hasResults && (
            <div className="border-t pt-6">
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Results
              </h3>
              <Tabs defaultValue="child-pugh" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="child-pugh">Child-Pugh</TabsTrigger>
                  <TabsTrigger value="meld-na">MELD-Na</TabsTrigger>
                  <TabsTrigger value="meld3">MELD 3.0</TabsTrigger>
                </TabsList>

                <TabsContent value="child-pugh" className="mt-4">
                  {results.childPugh && (
                    <div className="space-y-4">
                      <ResultCard
                        title={`Child-Pugh Class ${results.childPugh.class}`}
                        score={results.childPugh.score}
                        severity={results.childPugh.severity}
                        severityLabel={results.childPugh.severityLabel}
                        interpretation={results.childPugh.interpretation}
                        details={[
                          { label: "1-Year Survival", value: results.childPugh.survival.oneYear },
                          { label: "2-Year Survival", value: results.childPugh.survival.twoYear },
                        ]}
                      />
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <h4 className="mb-3 text-sm font-semibold">Point Breakdown</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
                          <div className="rounded bg-background p-2 text-center">
                            <div className="text-muted-foreground text-xs">Bilirubin</div>
                            <div className="font-semibold">{results.childPugh.breakdown.bilirubin}</div>
                          </div>
                          <div className="rounded bg-background p-2 text-center">
                            <div className="text-muted-foreground text-xs">Albumin</div>
                            <div className="font-semibold">{results.childPugh.breakdown.albumin}</div>
                          </div>
                          <div className="rounded bg-background p-2 text-center">
                            <div className="text-muted-foreground text-xs">INR</div>
                            <div className="font-semibold">{results.childPugh.breakdown.inr}</div>
                          </div>
                          <div className="rounded bg-background p-2 text-center">
                            <div className="text-muted-foreground text-xs">Ascites</div>
                            <div className="font-semibold">{results.childPugh.breakdown.ascites}</div>
                          </div>
                          <div className="rounded bg-background p-2 text-center">
                            <div className="text-muted-foreground text-xs">Enceph.</div>
                            <div className="font-semibold">{results.childPugh.breakdown.encephalopathy}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="meld-na" className="mt-4">
                  {results.meldNa && (
                    <ResultCard
                      title="MELD-Na Score"
                      score={results.meldNa.score}
                      severity={results.meldNa.severity}
                      severityLabel={results.meldNa.severityLabel}
                      interpretation={results.meldNa.interpretation}
                      details={[
                        { label: "3-Month Mortality", value: results.meldNa.mortalityRisk },
                      ]}
                    />
                  )}
                </TabsContent>

                <TabsContent value="meld3" className="mt-4">
                  {results.meld3 && (
                    <ResultCard
                      title="MELD 3.0 Score"
                      score={results.meld3.score}
                      severity={results.meld3.severity}
                      severityLabel={results.meld3.severityLabel}
                      interpretation={results.meld3.interpretation}
                    />
                  )}
                </TabsContent>
              </Tabs>

              {/* Score Comparison */}
              <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                <h4 className="mb-3 text-sm font-semibold">Score Comparison</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {results.childPugh?.score}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Child-Pugh (Class {results.childPugh?.class})
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {results.meldNa?.score}
                    </div>
                    <div className="text-xs text-muted-foreground">MELD-Na</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {results.meld3?.score}
                    </div>
                    <div className="text-xs text-muted-foreground">MELD 3.0</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
