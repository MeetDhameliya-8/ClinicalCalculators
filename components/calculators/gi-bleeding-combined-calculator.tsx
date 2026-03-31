"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { SelectField } from "@/components/calculator/select-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateGlasgowBlatchford, type GlasgowBlatchfordInput } from "@/lib/calculations/glasgow-blatchford"
import { calculatePreEndoscopyRockall, calculateFullRockall, type PreEndoscopyRockallInput, type FullRockallInput } from "@/lib/calculations/rockall"

export function GIBleedingCombinedCalculator() {
  const [gbsInputs, setGbsInputs] = useState<GlasgowBlatchfordInput>({
    bun: 10,
    hemoglobin: 12,
    systolicBp: 120,
    pulse: 80,
    sex: "male",
    melena: false,
    syncope: false,
    hepaticDisease: false,
    cardiacFailure: false,
  })

  const [rockallInputs, setRockallInputs] = useState<FullRockallInput>({
    age: 0,
    shock: 0,
    comorbidity: 0,
    diagnosis: 0,
    stigmata: 0,
  })

  const handleGbsInputChange = (field: keyof GlasgowBlatchfordInput, value: number | boolean | string) => {
    setGbsInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleRockallInputChange = (field: keyof FullRockallInput, value: number) => {
    setRockallInputs((prev) => ({ ...prev, [field]: value }))
  }

  const gbsResult = useMemo(() => calculateGlasgowBlatchford(gbsInputs), [gbsInputs])
  const preRockallResult = useMemo(() => 
    calculatePreEndoscopyRockall({
      age: rockallInputs.age,
      shock: rockallInputs.shock,
      comorbidity: rockallInputs.comorbidity,
    }), 
    [rockallInputs.age, rockallInputs.shock, rockallInputs.comorbidity]
  )
  const fullRockallResult = useMemo(() => calculateFullRockall(rockallInputs), [rockallInputs])

  const ageOptions = [
    { value: "0", label: "< 60 years" },
    { value: "1", label: "60-79 years" },
    { value: "2", label: "≥ 80 years" },
  ]

  const shockOptions = [
    { value: "0", label: "No shock (SBP ≥100, HR <100)" },
    { value: "1", label: "Tachycardia (SBP ≥100, HR ≥100)" },
    { value: "2", label: "Hypotension (SBP <100)" },
  ]

  const comorbidityOptions = [
    { value: "0", label: "No major comorbidity" },
    { value: "2", label: "CHF, IHD, or major comorbidity" },
    { value: "3", label: "Renal/liver failure or malignancy" },
  ]

  const diagnosisOptions = [
    { value: "0", label: "Mallory-Weiss, no lesion" },
    { value: "1", label: "All other diagnoses" },
    { value: "2", label: "Upper GI malignancy" },
  ]

  const stigmataOptions = [
    { value: "0", label: "None or dark spot" },
    { value: "2", label: "Blood, clot, visible/spurting vessel" },
  ]

  return (
    <CalculatorContainer
      title="Upper GI Bleeding Assessment"
      description="Combined Glasgow-Blatchford Score and Rockall Score for comprehensive risk stratification in upper GI bleeding."
      formula="GBS predicts need for intervention; Rockall predicts mortality and rebleeding"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          {/* Glasgow-Blatchford Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Glasgow-Blatchford Score</CardTitle>
              <p className="text-xs text-muted-foreground">Predicts need for intervention (no endoscopy required)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 grid-cols-2">
                <InputField
                  label="BUN"
                  value={gbsInputs.bun}
                  onChange={(v) => handleGbsInputChange("bun", v)}
                  min={1}
                  max={100}
                  unit="mg/dL"
                />
                <InputField
                  label="Hemoglobin"
                  value={gbsInputs.hemoglobin}
                  onChange={(v) => handleGbsInputChange("hemoglobin", v)}
                  min={5}
                  max={20}
                  step={0.1}
                  unit="g/dL"
                />
              </div>

              <div className="grid gap-3 grid-cols-2">
                <InputField
                  label="Systolic BP"
                  value={gbsInputs.systolicBp}
                  onChange={(v) => handleGbsInputChange("systolicBp", v)}
                  min={50}
                  max={250}
                  unit="mmHg"
                />
                <InputField
                  label="Pulse"
                  value={gbsInputs.pulse}
                  onChange={(v) => handleGbsInputChange("pulse", v)}
                  min={30}
                  max={200}
                  unit="bpm"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleGbsInputChange("sex", "male")}
                  className={`flex-1 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    gbsInputs.sex === "male"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => handleGbsInputChange("sex", "female")}
                  className={`flex-1 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    gbsInputs.sex === "female"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  Female
                </button>
              </div>

              <div className="grid gap-2 grid-cols-1">
                <ToggleField
                  label="Melena"
                  checked={gbsInputs.melena}
                  onChange={() => handleGbsInputChange("melena", !gbsInputs.melena)}
                />
                <ToggleField
                  label="Syncope"
                  checked={gbsInputs.syncope}
                  onChange={() => handleGbsInputChange("syncope", !gbsInputs.syncope)}
                />
                <ToggleField
                  label="Hepatic disease"
                  checked={gbsInputs.hepaticDisease}
                  onChange={() => handleGbsInputChange("hepaticDisease", !gbsInputs.hepaticDisease)}
                />
                <ToggleField
                  label="Heart failure"
                  checked={gbsInputs.cardiacFailure}
                  onChange={() => handleGbsInputChange("cardiacFailure", !gbsInputs.cardiacFailure)}
                />
              </div>

              <ResultCard
                title="GBS"
                score={gbsResult.score}
                severity={gbsResult.severity}
                severityLabel={gbsResult.severityLabel}
                interpretation={gbsResult.interpretation}
                details={[{ label: "Action", value: gbsResult.recommendation }]}
                compact
              />
            </CardContent>
          </Card>

          {/* Rockall Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rockall Score</CardTitle>
              <p className="text-xs text-muted-foreground">Predicts mortality and rebleeding risk</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <SelectField
                label="Age"
                value={rockallInputs.age.toString()}
                onChange={(v) => handleRockallInputChange("age", parseInt(v))}
                options={ageOptions}
              />

              <SelectField
                label="Shock Status"
                value={rockallInputs.shock.toString()}
                onChange={(v) => handleRockallInputChange("shock", parseInt(v))}
                options={shockOptions}
              />

              <SelectField
                label="Comorbidity"
                value={rockallInputs.comorbidity.toString()}
                onChange={(v) => handleRockallInputChange("comorbidity", parseInt(v))}
                options={comorbidityOptions}
              />

              <div className="rounded-md bg-muted/50 p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">POST-ENDOSCOPY (Optional)</p>
                
                <SelectField
                  label="Diagnosis"
                  value={rockallInputs.diagnosis.toString()}
                  onChange={(v) => handleRockallInputChange("diagnosis", parseInt(v))}
                  options={diagnosisOptions}
                />

                <SelectField
                  label="Stigmata of Hemorrhage"
                  value={rockallInputs.stigmata.toString()}
                  onChange={(v) => handleRockallInputChange("stigmata", parseInt(v))}
                  options={stigmataOptions}
                />
              </div>

              <div className="grid gap-3 grid-cols-2">
                <ResultCard
                  title="Pre-Endo"
                  score={preRockallResult.score}
                  severity={preRockallResult.severity}
                  severityLabel={preRockallResult.severity === "low" ? "Low Risk" : preRockallResult.severity === "moderate" ? "Intermediate Risk" : "High Risk"}
                  interpretation={preRockallResult.interpretation}
                  compact
                />
                <ResultCard
                  title="Full"
                  score={fullRockallResult.score}
                  severity={fullRockallResult.severity}
                  severityLabel={fullRockallResult.severity === "low" ? "Low Risk" : fullRockallResult.severity === "moderate" ? "Intermediate Risk" : "High Risk"}
                  interpretation={fullRockallResult.interpretation}
                  compact
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-primary">Clinical Decision Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {gbsResult.score === 0 ? (
              <p>
                <strong>GBS = 0:</strong> Patient may be suitable for outpatient management with close follow-up. 
                Low risk of needing intervention.
              </p>
            ) : gbsResult.score <= 2 ? (
              <p>
                <strong>GBS 1-2:</strong> Low risk. Consider early discharge with outpatient endoscopy within 24-72 hours.
              </p>
            ) : (
              <p>
                <strong>GBS ≥3:</strong> Higher risk of needing intervention. Admit for monitoring and urgent endoscopy.
              </p>
            )}
            
            <div>
              <strong>Rockall Interpretation:</strong>
              <ul className="mt-1 list-inside list-disc">
                <li>Pre-endoscopy ≤2: Low risk for adverse outcome</li>
                <li>Full score ≤3: Good prognosis, low rebleed/mortality</li>
                <li>Full score ≥8: High mortality risk ({">"}40%)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorContainer>
  )
}
