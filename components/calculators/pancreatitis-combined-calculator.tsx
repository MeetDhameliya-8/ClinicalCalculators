"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { InputField } from "@/components/calculator/input-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateBISAPScore, calculateRansonScore, type BISAPInput, type RansonInput } from "@/lib/calculations/pancreatitis"

export function PancreatitisCombinedCalculator() {
  const [etiology, setEtiology] = useState<"non-gallstone" | "gallstone">("non-gallstone")
  
  const [bisapInputs, setBisapInputs] = useState<BISAPInput>({
    bun: false,
    impairedMentalStatus: false,
    sirs: false,
    age: false,
    pleuralEffusion: false,
  })

  const [ransonInputs, setRansonInputs] = useState<RansonInput>({
    etiology: "non-gallstone",
    age: false,
    wbc: false,
    glucose: false,
    ldh: false,
    ast: false,
    hctDrop: false,
    bunRise: false,
    calcium: false,
    pao2: false,
    baseDeficit: false,
    fluidSequestration: false,
  })

  const handleBisapToggle = (field: keyof BISAPInput) => {
    setBisapInputs((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleRansonToggle = (field: keyof Omit<RansonInput, "etiology">) => {
    setRansonInputs((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleEtiologyChange = (value: string) => {
    const newEtiology = value as "non-gallstone" | "gallstone"
    setEtiology(newEtiology)
    setRansonInputs((prev) => ({ ...prev, etiology: newEtiology }))
  }

  const bisapResult = useMemo(() => calculateBISAPScore(bisapInputs), [bisapInputs])
  const ransonResult = useMemo(() => calculateRansonScore(ransonInputs), [ransonInputs])

  const bisapCriteria = [
    { key: "bun" as const, label: "BUN > 25 mg/dL", points: 1 },
    { key: "impairedMentalStatus" as const, label: "Impaired mental status", points: 1 },
    { key: "sirs" as const, label: "SIRS present (≥2 criteria)", points: 1 },
    { key: "age" as const, label: "Age > 60 years", points: 1 },
    { key: "pleuralEffusion" as const, label: "Pleural effusion", points: 1 },
  ]

  const admissionCriteria = etiology === "non-gallstone"
    ? [
        { key: "age" as const, label: "Age > 55 years" },
        { key: "wbc" as const, label: "WBC > 16,000/mm³" },
        { key: "glucose" as const, label: "Glucose > 200 mg/dL" },
        { key: "ldh" as const, label: "LDH > 350 IU/L" },
        { key: "ast" as const, label: "AST > 250 IU/L" },
      ]
    : [
        { key: "age" as const, label: "Age > 70 years" },
        { key: "wbc" as const, label: "WBC > 18,000/mm³" },
        { key: "glucose" as const, label: "Glucose > 220 mg/dL" },
        { key: "ldh" as const, label: "LDH > 400 IU/L" },
        { key: "ast" as const, label: "AST > 250 IU/L" },
      ]

  const fortyEightHourCriteria = etiology === "non-gallstone"
    ? [
        { key: "hctDrop" as const, label: "Hct drop > 10%" },
        { key: "bunRise" as const, label: "BUN rise > 5 mg/dL" },
        { key: "calcium" as const, label: "Calcium < 8 mg/dL" },
        { key: "pao2" as const, label: "PaO₂ < 60 mmHg" },
        { key: "baseDeficit" as const, label: "Base deficit > 4 mEq/L" },
        { key: "fluidSequestration" as const, label: "Fluid > 6 L" },
      ]
    : [
        { key: "hctDrop" as const, label: "Hct drop > 10%" },
        { key: "bunRise" as const, label: "BUN rise > 2 mg/dL" },
        { key: "calcium" as const, label: "Calcium < 8 mg/dL" },
        { key: "pao2" as const, label: "PaO₂ < 60 mmHg" },
        { key: "baseDeficit" as const, label: "Base deficit > 5 mEq/L" },
        { key: "fluidSequestration" as const, label: "Fluid > 4 L" },
      ]

  return (
    <CalculatorContainer
      title="Acute Pancreatitis Severity Assessment"
      description="Combined BISAP and Ranson's Criteria calculator for comprehensive severity assessment in acute pancreatitis."
      formula="BISAP is available on admission; Ranson's requires 48-hour data"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          {/* BISAP Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">BISAP Score (Admission)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bisapCriteria.map((criterion) => (
                <ToggleField
                  key={criterion.key}
                  label={criterion.label}
                  checked={bisapInputs[criterion.key]}
                  onChange={() => handleBisapToggle(criterion.key)}
                  points={criterion.points}
                />
              ))}
              
              <ResultCard
                title="BISAP Score"
                score={bisapResult.score}
                interpretation={bisapResult.interpretation}
                severity={bisapResult.severity}
                severityLabel={bisapResult.score >= 3 ? "High Risk" : "Low Risk"}
                details={[{ label: "Mortality", value: bisapResult.mortality }]}
                compact
              />
            </CardContent>
          </Card>

          {/* Ranson's Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ranson&apos;s Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={etiology} onValueChange={handleEtiologyChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-10 p-1 bg-muted/50">
                  <TabsTrigger 
                    value="non-gallstone" 
                    className="h-8 text-xs sm:text-sm transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Non-Gallstone
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gallstone"
                    className="h-8 text-xs sm:text-sm transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Gallstone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={etiology} className="mt-4 space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">AT ADMISSION</p>
                    {admissionCriteria.map((criterion) => (
                      <ToggleField
                        key={criterion.key}
                        label={criterion.label}
                        checked={ransonInputs[criterion.key] as boolean}
                        onChange={() => handleRansonToggle(criterion.key)}
                        points={1}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">AT 48 HOURS</p>
                    {fortyEightHourCriteria.map((criterion) => (
                      <ToggleField
                        key={criterion.key}
                        label={criterion.label}
                        checked={ransonInputs[criterion.key] as boolean}
                        onChange={() => handleRansonToggle(criterion.key)}
                        points={1}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <ResultCard
                title="Ranson's Score"
                score={ransonResult.score}
                interpretation={ransonResult.interpretation}
                severity={ransonResult.severity}
                severityLabel={ransonResult.severityCategory}
                details={[{ label: "Mortality", value: ransonResult.mortality }]}
                compact
              />
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-primary">Management Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {bisapResult.score >= 3 || ransonResult.score >= 3 ? (
              <>
                <p>
                  <strong>Severe acute pancreatitis predicted.</strong> Consider ICU admission for close monitoring.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Aggressive fluid resuscitation (goal-directed therapy)</li>
                  <li>NPO with early enteral nutrition when tolerated</li>
                  <li>Pain control (avoid morphine if possible)</li>
                  <li>Consider CT with contrast at 72-96 hours if not improving</li>
                  <li>Monitor for organ failure (renal, respiratory, cardiovascular)</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  <strong>Mild acute pancreatitis predicted.</strong> Ward admission appropriate.
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>IV fluid resuscitation</li>
                  <li>Pain control</li>
                  <li>Advance diet as tolerated</li>
                  <li>If gallstone etiology: cholecystectomy during same admission</li>
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorContainer>
  )
}
