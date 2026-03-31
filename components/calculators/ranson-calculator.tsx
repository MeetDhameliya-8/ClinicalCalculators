"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateRansonScore, type RansonInput } from "@/lib/calculations/pancreatitis"

export function RansonCalculator() {
  const [etiology, setEtiology] = useState<"non-gallstone" | "gallstone">("non-gallstone")
  const [inputs, setInputs] = useState<RansonInput>({
    etiology: "non-gallstone",
    // Admission criteria
    age: false,
    wbc: false,
    glucose: false,
    ldh: false,
    ast: false,
    // 48-hour criteria
    hctDrop: false,
    bunRise: false,
    calcium: false,
    pao2: false,
    baseDeficit: false,
    fluidSequestration: false,
  })

  const handleToggle = (field: keyof Omit<RansonInput, "etiology">) => {
    setInputs((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleEtiologyChange = (value: string) => {
    const newEtiology = value as "non-gallstone" | "gallstone"
    setEtiology(newEtiology)
    setInputs((prev) => ({ ...prev, etiology: newEtiology }))
  }

  const result = useMemo(() => calculateRansonScore(inputs), [inputs])

  const admissionCriteria =
    etiology === "non-gallstone"
      ? [
          { key: "age" as const, label: "Age > 55 years", points: 1 },
          { key: "wbc" as const, label: "WBC > 16,000/mm³", points: 1 },
          { key: "glucose" as const, label: "Blood glucose > 200 mg/dL", points: 1 },
          { key: "ldh" as const, label: "LDH > 350 IU/L", points: 1 },
          { key: "ast" as const, label: "AST > 250 IU/L", points: 1 },
        ]
      : [
          { key: "age" as const, label: "Age > 70 years", points: 1 },
          { key: "wbc" as const, label: "WBC > 18,000/mm³", points: 1 },
          { key: "glucose" as const, label: "Blood glucose > 220 mg/dL", points: 1 },
          { key: "ldh" as const, label: "LDH > 400 IU/L", points: 1 },
          { key: "ast" as const, label: "AST > 250 IU/L", points: 1 },
        ]

  const fortyEightHourCriteria =
    etiology === "non-gallstone"
      ? [
          { key: "hctDrop" as const, label: "Hematocrit drop > 10%", points: 1 },
          { key: "bunRise" as const, label: "BUN rise > 5 mg/dL", points: 1 },
          { key: "calcium" as const, label: "Serum calcium < 8 mg/dL", points: 1 },
          { key: "pao2" as const, label: "PaO₂ < 60 mmHg", points: 1 },
          { key: "baseDeficit" as const, label: "Base deficit > 4 mEq/L", points: 1 },
          { key: "fluidSequestration" as const, label: "Fluid sequestration > 6 L", points: 1 },
        ]
      : [
          { key: "hctDrop" as const, label: "Hematocrit drop > 10%", points: 1 },
          { key: "bunRise" as const, label: "BUN rise > 2 mg/dL", points: 1 },
          { key: "calcium" as const, label: "Serum calcium < 8 mg/dL", points: 1 },
          { key: "pao2" as const, label: "PaO₂ < 60 mmHg", points: 1 },
          { key: "baseDeficit" as const, label: "Base deficit > 5 mEq/L", points: 1 },
          { key: "fluidSequestration" as const, label: "Fluid sequestration > 4 L", points: 1 },
        ]

  return (
    <CalculatorContainer
      title="Ranson's Criteria"
      description="Predicts mortality in acute pancreatitis based on clinical and laboratory findings at admission and 48 hours."
      formula="Score = Sum of positive criteria (different thresholds for gallstone vs non-gallstone etiology)"
    >
      <div className="space-y-6">
        <Tabs value={etiology} onValueChange={handleEtiologyChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="non-gallstone">Non-Gallstone</TabsTrigger>
            <TabsTrigger value="gallstone">Gallstone</TabsTrigger>
          </TabsList>

          <TabsContent value={etiology} className="mt-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">At Admission</h3>
              {admissionCriteria.map((criterion) => (
                <ToggleField
                  key={criterion.key}
                  label={criterion.label}
                  checked={inputs[criterion.key] as boolean}
                  onCheckedChange={() => handleToggle(criterion.key)}
                  points={criterion.points}
                />
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">At 48 Hours</h3>
              {fortyEightHourCriteria.map((criterion) => (
                <ToggleField
                  key={criterion.key}
                  label={criterion.label}
                  checked={inputs[criterion.key] as boolean}
                  onCheckedChange={() => handleToggle(criterion.key)}
                  points={criterion.points}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <ResultCard
          title="Ranson's Score"
          value={result.score}
          interpretation={result.interpretation}
          severity={result.severity}
          details={[
            `Predicted Mortality: ${result.mortality}`,
            `Severity: ${result.severityCategory}`,
          ]}
        />
      </div>
    </CalculatorContainer>
  )
}
