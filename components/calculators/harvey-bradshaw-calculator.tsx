"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { SelectField } from "@/components/calculator/select-field"
import { InputField } from "@/components/calculator/input-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import { ResultCard } from "@/components/calculator/result-card"
import { calculateHarveyBradshaw, type HarveyBradshawInput, type WellBeing, type AbdominalPain, type AbdominalMass } from "@/lib/calculations/ibd-liver"

export interface HarveyBradshawFormState {
  generalWellBeing: WellBeing
  abdominalPain: AbdominalPain
  liquidStools: string
  abdominalMass: AbdominalMass
  complications: {
    arthralgia: boolean
    uveitis: boolean
    erythemaNodosum: boolean
    aphthousUlcers: boolean
    pyodermaGangrenosum: boolean
    analFissure: boolean
    newFistula: boolean
    abscess: boolean
  }
}

export function HarveyBradshawCalculator() {
  const [inputs, setInputs] = useState<HarveyBradshawFormState>({
    generalWellBeing: 0,
    abdominalPain: 0,
    liquidStools: "0",
    abdominalMass: "none",
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

  const handleInputChange = (field: keyof Omit<HarveyBradshawFormState, "complications">, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleComplicationToggle = (complication: keyof HarveyBradshawFormState["complications"]) => {
    setInputs((prev) => ({
      ...prev,
      complications: {
        ...prev.complications,
        [complication]: !prev.complications[complication],
      },
    }))
  }

  const result = useMemo(() => {
    const complicationCount = Object.values(inputs.complications).filter(Boolean).length
    return calculateHarveyBradshaw({
      generalWellBeing: inputs.generalWellBeing,
      abdominalPain: inputs.abdominalPain,
      liquidStools: parseFloat(inputs.liquidStools) || 0,
      abdominalMass: inputs.abdominalMass,
      complications: complicationCount,
    })
  }, [inputs])

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
    { value: "none", label: "None" },
    { value: "dubious", label: "Dubious" },
    { value: "definite", label: "Definite" },
    { value: "definite-tender", label: "Definite and tender" },
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
      description="Clinical index for assessing Crohn's disease activity."
      isValid={true}
      hasResult={true}
      result={
        <ResultCard
          score={result.score}
          interpretation={result.interpretation}
          severity={result.severity}
          severityLabel={result.severityLabel}
        />
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <SelectField
            label="General Well-Being"
            value={inputs.generalWellBeing.toString()}
            onChange={(v) => handleInputChange("generalWellBeing", parseInt(v))}
            options={wellBeingOptions}
          />

          <SelectField
            label="Abdominal Pain"
            value={inputs.abdominalPain.toString()}
            onChange={(v) => handleInputChange("abdominalPain", parseInt(v))}
            options={abdominalPainOptions}
          />

          <InputField
            label="Liquid Stools / Day"
            value={inputs.liquidStools}
            onChange={(v) => handleInputChange("liquidStools", v)}
            min={0}
            max={20}
            step={1}
            tooltip="Count for the previous day"
          />

          <SelectField
            label="Abdominal Mass"
            value={inputs.abdominalMass.toString()}
            onChange={(v) => handleInputChange("abdominalMass", parseInt(v))}
            options={abdominalMassOptions}
          />
        </div>

        <div className="pt-4 border-t border-white/5 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Complications (1 pt each)</h3>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {complications.map((comp) => (
              <ToggleField
                key={comp.key}
                label={comp.label}
                checked={inputs.complications[comp.key]}
                onChange={() => handleComplicationToggle(comp.key)}
              />
            ))}
          </div>
        </div>
      </div>
    </CalculatorContainer>
  )
}
