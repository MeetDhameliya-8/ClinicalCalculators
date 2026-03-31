"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { SelectField } from "@/components/calculator/select-field"
import { InputField } from "@/components/calculator/input-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateHarveyBradshaw, type HarveyBradshawInput } from "@/lib/calculations/ibd-liver"

export function HarveyBradshawCalculator() {
  const [inputs, setInputs] = useState<HarveyBradshawInput>({
    generalWellBeing: 0,
    abdominalPain: 0,
    liquidStools: 0,
    abdominalMass: 0,
    complications: {
      arthralgia: false,
      uveitis: false,
      erythemaNodosum: false,
      aphthousUlcers: false,
      pyodermaGangrenosum: false,
      analFissure: false,
      newFistula: false,
      abscess: false,
    },
  })

  const handleInputChange = (field: keyof Omit<HarveyBradshawInput, "complications">, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleComplicationToggle = (complication: keyof HarveyBradshawInput["complications"]) => {
    setInputs((prev) => ({
      ...prev,
      complications: {
        ...prev.complications,
        [complication]: !prev.complications[complication],
      },
    }))
  }

  const result = useMemo(() => calculateHarveyBradshaw(inputs), [inputs])

  const wellBeingOptions = [
    { value: "0", label: "Very well" },
    { value: "1", label: "Slightly below par" },
    { value: "2", label: "Poor" },
    { value: "3", label: "Very poor" },
    { value: "4", label: "Terrible" },
  ]

  const abdominalPainOptions = [
    { value: "0", label: "None" },
    { value: "1", label: "Mild" },
    { value: "2", label: "Moderate" },
    { value: "3", label: "Severe" },
  ]

  const abdominalMassOptions = [
    { value: "0", label: "None" },
    { value: "1", label: "Dubious" },
    { value: "2", label: "Definite" },
    { value: "3", label: "Definite and tender" },
  ]

  const complications = [
    { key: "arthralgia" as const, label: "Arthralgia" },
    { key: "uveitis" as const, label: "Uveitis" },
    { key: "erythemaNodosum" as const, label: "Erythema nodosum" },
    { key: "aphthousUlcers" as const, label: "Aphthous ulcers" },
    { key: "pyodermaGangrenosum" as const, label: "Pyoderma gangrenosum" },
    { key: "analFissure" as const, label: "Anal fissure" },
    { key: "newFistula" as const, label: "New fistula" },
    { key: "abscess" as const, label: "Abscess" },
  ]

  return (
    <CalculatorContainer
      title="Harvey-Bradshaw Index"
      description="Simple clinical index for assessing Crohn's disease activity without the need for laboratory tests or patient diary."
      formula="Score = General well-being + Abdominal pain + Liquid stools + Abdominal mass + Complications (1 point each)"
    >
      <div className="space-y-6">
        <SelectField
          label="General Well-Being"
          value={inputs.generalWellBeing.toString()}
          onValueChange={(v) => handleInputChange("generalWellBeing", parseInt(v))}
          options={wellBeingOptions}
        />

        <SelectField
          label="Abdominal Pain"
          value={inputs.abdominalPain.toString()}
          onValueChange={(v) => handleInputChange("abdominalPain", parseInt(v))}
          options={abdominalPainOptions}
        />

        <InputField
          label="Number of Liquid Stools per Day"
          value={inputs.liquidStools}
          onChange={(v) => handleInputChange("liquidStools", v)}
          min={0}
          max={20}
          step={1}
          helpText="Count for the previous day"
        />

        <SelectField
          label="Abdominal Mass"
          value={inputs.abdominalMass.toString()}
          onValueChange={(v) => handleInputChange("abdominalMass", parseInt(v))}
          options={abdominalMassOptions}
        />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Complications (1 point each)</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {complications.map((comp) => (
              <ToggleField
                key={comp.key}
                label={comp.label}
                checked={inputs.complications[comp.key]}
                onCheckedChange={() => handleComplicationToggle(comp.key)}
                points={1}
              />
            ))}
          </div>
        </div>

        <ResultCard
          title="Harvey-Bradshaw Index"
          value={result.score}
          interpretation={result.interpretation}
          severity={result.severity}
          details={[`Disease Activity: ${result.activity}`]}
        />
      </div>
    </CalculatorContainer>
  )
}
