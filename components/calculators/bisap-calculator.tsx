"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateBISAPScore, type BISAPInput } from "@/lib/calculations/pancreatitis"

export function BISAPCalculator() {
  const [inputs, setInputs] = useState<BISAPInput>({
    bun: false,
    impairedMentalStatus: false,
    sirs: false,
    age: false,
    pleuralEffusion: false,
  })

  const handleToggle = (field: keyof BISAPInput) => {
    setInputs((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const result = useMemo(() => calculateBISAPScore(inputs), [inputs])

  const criteria = [
    {
      key: "bun" as const,
      label: "BUN > 25 mg/dL",
      description: "Blood urea nitrogen greater than 25",
      points: 1,
    },
    {
      key: "impairedMentalStatus" as const,
      label: "Impaired mental status",
      description: "Disorientation, lethargy, somnolence, coma, or stupor",
      points: 1,
    },
    {
      key: "sirs" as const,
      label: "SIRS present",
      description: "2 or more of: Temp >38°C or <36°C, HR >90, RR >20 or PaCO₂ <32, WBC >12k or <4k or >10% bands",
      points: 1,
    },
    {
      key: "age" as const,
      label: "Age > 60 years",
      points: 1,
    },
    {
      key: "pleuralEffusion" as const,
      label: "Pleural effusion present",
      description: "On imaging studies",
      points: 1,
    },
  ]

  return (
    <CalculatorContainer
      title="BISAP Score"
      description="Bedside Index for Severity in Acute Pancreatitis. Predicts mortality risk within the first 24 hours of hospitalization."
      formula="Score = B + I + S + A + P (each criterion = 1 point)"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {criteria.map((criterion) => (
            <ToggleField
              key={criterion.key}
              label={criterion.label}
              description={criterion.description}
              checked={inputs[criterion.key]}
              onCheckedChange={() => handleToggle(criterion.key)}
              points={criterion.points}
            />
          ))}
        </div>

        <ResultCard
          title="BISAP Score"
          value={result.score}
          interpretation={result.interpretation}
          severity={result.severity}
          details={[`Mortality Risk: ${result.mortality}`]}
        />
      </div>
    </CalculatorContainer>
  )
}
