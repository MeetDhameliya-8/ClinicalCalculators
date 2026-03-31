"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { SelectField } from "@/components/calculator/select-field"
import { ResultCard } from "@/components/calculator/result-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  calculatePreEndoscopyRockall,
  calculateFullRockall,
  type PreEndoscopyRockallInput,
  type FullRockallInput,
} from "@/lib/calculations/rockall"

export function RockallCalculator() {
  const [tab, setTab] = useState<"pre" | "full">("pre")
  const [preInputs, setPreInputs] = useState<PreEndoscopyRockallInput>({
    age: 0,
    shock: 0,
    comorbidity: 0,
  })
  const [fullInputs, setFullInputs] = useState<FullRockallInput>({
    age: 0,
    shock: 0,
    comorbidity: 0,
    diagnosis: 0,
    stigmata: 0,
  })

  const handlePreInputChange = (field: keyof PreEndoscopyRockallInput, value: number) => {
    setPreInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleFullInputChange = (field: keyof FullRockallInput, value: number) => {
    setFullInputs((prev) => ({ ...prev, [field]: value }))
  }

  const preResult = useMemo(() => calculatePreEndoscopyRockall(preInputs), [preInputs])
  const fullResult = useMemo(() => calculateFullRockall(fullInputs), [fullInputs])

  const ageOptions = [
    { value: "0", label: "< 60 years (0 points)" },
    { value: "1", label: "60-79 years (1 point)" },
    { value: "2", label: "≥ 80 years (2 points)" },
  ]

  const shockOptions = [
    { value: "0", label: "No shock (SBP ≥100, HR <100) (0 points)" },
    { value: "1", label: "Tachycardia (SBP ≥100, HR ≥100) (1 point)" },
    { value: "2", label: "Hypotension (SBP <100) (2 points)" },
  ]

  const comorbidityOptions = [
    { value: "0", label: "No major comorbidity (0 points)" },
    { value: "2", label: "CHF, IHD, or any major comorbidity (2 points)" },
    { value: "3", label: "Renal failure, liver failure, or disseminated malignancy (3 points)" },
  ]

  const diagnosisOptions = [
    { value: "0", label: "Mallory-Weiss tear, no lesion, no SRH (0 points)" },
    { value: "1", label: "All other diagnoses (1 point)" },
    { value: "2", label: "Malignancy of upper GI tract (2 points)" },
  ]

  const stigmataOptions = [
    { value: "0", label: "None or dark spot only (0 points)" },
    { value: "2", label: "Blood in upper GI tract, adherent clot, visible or spurting vessel (2 points)" },
  ]

  return (
    <CalculatorContainer
      title="Rockall Score"
      description="Estimates risk of mortality and rebleeding in patients with upper GI bleeding."
      formula="Score = Age + Shock + Comorbidity + Diagnosis + Stigmata"
    >
      <Tabs value={tab} onValueChange={(v) => setTab(v as "pre" | "full")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pre">Pre-Endoscopy</TabsTrigger>
          <TabsTrigger value="full">Full (Post-Endoscopy)</TabsTrigger>
        </TabsList>

        <TabsContent value="pre" className="mt-6 space-y-6">
          <SelectField
            label="Age"
            value={preInputs.age.toString()}
            onValueChange={(v) => handlePreInputChange("age", parseInt(v))}
            options={ageOptions}
          />

          <SelectField
            label="Shock Status"
            value={preInputs.shock.toString()}
            onValueChange={(v) => handlePreInputChange("shock", parseInt(v))}
            options={shockOptions}
          />

          <SelectField
            label="Comorbidity"
            value={preInputs.comorbidity.toString()}
            onValueChange={(v) => handlePreInputChange("comorbidity", parseInt(v))}
            options={comorbidityOptions}
          />

          <ResultCard
            title="Pre-Endoscopy Rockall Score"
            value={preResult.score}
            interpretation={preResult.interpretation}
            severity={preResult.severity}
            details={[
              `Rebleeding Risk: ${preResult.rebleedRisk}`,
              `Mortality Risk: ${preResult.mortalityRisk}`,
            ]}
          />
        </TabsContent>

        <TabsContent value="full" className="mt-6 space-y-6">
          <SelectField
            label="Age"
            value={fullInputs.age.toString()}
            onValueChange={(v) => handleFullInputChange("age", parseInt(v))}
            options={ageOptions}
          />

          <SelectField
            label="Shock Status"
            value={fullInputs.shock.toString()}
            onValueChange={(v) => handleFullInputChange("shock", parseInt(v))}
            options={shockOptions}
          />

          <SelectField
            label="Comorbidity"
            value={fullInputs.comorbidity.toString()}
            onValueChange={(v) => handleFullInputChange("comorbidity", parseInt(v))}
            options={comorbidityOptions}
          />

          <SelectField
            label="Endoscopic Diagnosis"
            value={fullInputs.diagnosis.toString()}
            onValueChange={(v) => handleFullInputChange("diagnosis", parseInt(v))}
            options={diagnosisOptions}
          />

          <SelectField
            label="Major Stigmata of Recent Hemorrhage"
            value={fullInputs.stigmata.toString()}
            onValueChange={(v) => handleFullInputChange("stigmata", parseInt(v))}
            options={stigmataOptions}
          />

          <ResultCard
            title="Full Rockall Score"
            value={fullResult.score}
            interpretation={fullResult.interpretation}
            severity={fullResult.severity}
            details={[
              `Rebleeding Risk: ${fullResult.rebleedRisk}`,
              `Mortality Risk: ${fullResult.mortalityRisk}`,
            ]}
          />
        </TabsContent>
      </Tabs>
    </CalculatorContainer>
  )
}
