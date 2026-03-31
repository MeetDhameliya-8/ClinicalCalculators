"use client"

import { useState, useMemo } from "react"
import { CalculatorContainer } from "@/components/calculator/calculator-container"
import { SelectField } from "@/components/calculator/select-field"
import { ResultCard, type SeverityLevel } from "@/components/calculator/result-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- AUDIT-C ---
export interface AUDITCInput {
  frequency: number
  quantity: number
  bingeDrinking: number
  sex: "male" | "female"
}

export interface AUDITResult {
  score: number
  severity: SeverityLevel
  interpretation: string
  recommendation: string
}

export function calculateAUDITC(input: AUDITCInput): AUDITResult {
  const score = input.frequency + input.quantity + input.bingeDrinking
  const cutoff = input.sex === "male" ? 4 : 3

  let severity: SeverityLevel
  let interpretation: string
  let recommendation: string

  if (score === 0) {
    severity = "low"
    interpretation = "Non-drinker or very low risk."
    recommendation = "Maintain current habits."
  } else if (score < cutoff) {
    severity = "low"
    interpretation = "Low-risk drinking."
    recommendation = "Provide brief education on safe drinking limits."
  } else if (score <= 7) {
    severity = "moderate"
    interpretation = "Hazardous drinking likely."
    recommendation = "Brief intervention and counseling recommended. Consider full AUDIT."
  } else {
    severity = "critical"
    interpretation = "High risk for severe alcohol use disorder."
    recommendation = "Full assessment and specialized treatment may be needed."
  }

  return {
    score,
    severity,
    interpretation,
    recommendation,
  }
}

// --- Full AUDIT ---
export interface FullAUDITInput extends AUDITCInput {
  unableToStop: number
  failedExpectations: number
  morningDrinking: number
  guilt: number
  memoryLoss: number
  injury: number
  othersConcerned: number
}

export interface FullAUDITResult extends AUDITResult {
  riskZone: string
}

export function calculateFullAUDIT(input: FullAUDITInput): FullAUDITResult {
  const score = 
    input.frequency + 
    input.quantity + 
    input.bingeDrinking + 
    input.unableToStop + 
    input.failedExpectations + 
    input.morningDrinking + 
    input.guilt + 
    input.memoryLoss + 
    input.injury + 
    input.othersConcerned

  let severity: SeverityLevel
  let riskZone: string
  let interpretation: string
  let recommendation: string

  if (score <= 7) {
    severity = "low"
    riskZone = "Zone I"
    interpretation = "Low-risk drinking or abstinence."
    recommendation = "Provide alcohol education."
  } else if (score <= 15) {
    severity = "moderate"
    riskZone = "Zone II"
    interpretation = "Hazardous drinking."
    recommendation = "Provide simple advice and brief intervention."
  } else if (score <= 19) {
    severity = "moderate"
    riskZone = "Zone III"
    interpretation = "Harmful drinking."
    recommendation = "Brief counseling and continued monitoring."
  } else {
    severity = "critical"
    riskZone = "Zone IV"
    interpretation = "Possible alcohol dependence."
    recommendation = "Refer to specialist for diagnostic evaluation and treatment."
  }

  return {
    score,
    severity,
    interpretation,
    recommendation,
    riskZone,
  }
}

export function AUDITCalculator() {
  const [tab, setTab] = useState<"audit-c" | "full">("audit-c")
  const [sex, setSex] = useState<"male" | "female">("male")
  
  const [auditCInputs, setAuditCInputs] = useState<AUDITCInput>({
    frequency: 0,
    quantity: 0,
    bingeDrinking: 0,
    sex: "male",
  })

  const [fullInputs, setFullInputs] = useState<FullAUDITInput>({
    frequency: 0,
    quantity: 0,
    bingeDrinking: 0,
    unableToStop: 0,
    failedExpectations: 0,
    morningDrinking: 0,
    guilt: 0,
    memoryLoss: 0,
    injury: 0,
    othersConcerned: 0,
    sex: "male",
  })

  const handleAuditCChange = (field: keyof Omit<AUDITCInput, "sex">, value: number) => {
    setAuditCInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleFullChange = (field: keyof Omit<FullAUDITInput, "sex">, value: number) => {
    setFullInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleSexChange = (newSex: "male" | "female") => {
    setSex(newSex)
    setAuditCInputs((prev) => ({ ...prev, sex: newSex }))
    setFullInputs((prev) => ({ ...prev, sex: newSex }))
  }

  const auditCResult = useMemo(() => calculateAUDITC(auditCInputs), [auditCInputs])
  const fullResult = useMemo(() => calculateFullAUDIT(fullInputs), [fullInputs])

  const frequencyOptions = [
    { value: "0", label: "Never (0 points)" },
    { value: "1", label: "Monthly or less (1 point)" },
    { value: "2", label: "2-4 times/month (2 points)" },
    { value: "3", label: "2-3 times/week (3 points)" },
    { value: "4", label: "4+ times/week (4 points)" },
  ]

  const quantityOptions = [
    { value: "0", label: "1-2 drinks (0 points)" },
    { value: "1", label: "3-4 drinks (1 point)" },
    { value: "2", label: "5-6 drinks (2 points)" },
    { value: "3", label: "7-9 drinks (3 points)" },
    { value: "4", label: "10+ drinks (4 points)" },
  ]

  const bingeOptions = [
    { value: "0", label: "Never (0 points)" },
    { value: "1", label: "Less than monthly (1 point)" },
    { value: "2", label: "Monthly (2 points)" },
    { value: "3", label: "Weekly (3 points)" },
    { value: "4", label: "Daily or almost daily (4 points)" },
  ]

  const dependenceOptions = [
    { value: "0", label: "Never (0 points)" },
    { value: "1", label: "Less than monthly (1 point)" },
    { value: "2", label: "Monthly (2 points)" },
    { value: "3", label: "Weekly (3 points)" },
    { value: "4", label: "Daily or almost daily (4 points)" },
  ]

  const harmOptions = [
    { value: "0", label: "No (0 points)" },
    { value: "2", label: "Yes, but not in the last year (2 points)" },
    { value: "4", label: "Yes, during the last year (4 points)" },
  ]

  return (
    <CalculatorContainer
      title="AUDIT / AUDIT-C"
      description="Alcohol Use Disorders Identification Test. AUDIT-C is a brief 3-question screening tool; full AUDIT has 10 questions."
      onCalculate={() => {}}
      onReset={() => {}}
      isValid={true}
      hasResult={true}
      // formula="AUDIT-C: Questions 1-3 (max 12). Full AUDIT: Questions 1-10 (max 40)"
    >
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => handleSexChange("male")}
          className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
            sex === "male"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground hover:bg-accent"
          }`}
        >
          Male
        </button>
        <button
          onClick={() => handleSexChange("female")}
          className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
            sex === "female"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground hover:bg-accent"
          }`}
        >
          Female
        </button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "audit-c" | "full")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="audit-c">AUDIT-C (Brief)</TabsTrigger>
          <TabsTrigger value="full">Full AUDIT</TabsTrigger>
        </TabsList>

        <TabsContent value="audit-c" className="mt-6 space-y-6">
          <SelectField
            id="auditc-freq"
            label="Q1: How often do you have a drink containing alcohol?"
            value={auditCInputs.frequency.toString()}
            onChange={(v) => handleAuditCChange("frequency", parseInt(v))}
            options={frequencyOptions}
          />

          <SelectField
            id="auditc-quant"
            label="Q2: How many drinks on a typical drinking day?"
            value={auditCInputs.quantity.toString()}
            onChange={(v) => handleAuditCChange("quantity", parseInt(v))}
            options={quantityOptions}
          />

          <SelectField
            id="auditc-binge"
            label="Q3: How often do you have 6+ drinks (binge)?"
            value={auditCInputs.bingeDrinking.toString()}
            onChange={(v) => handleAuditCChange("bingeDrinking", parseInt(v))}
            options={bingeOptions}
          />

          <ResultCard
            title="AUDIT-C Score"
            score={auditCResult.score}
            interpretation={auditCResult.interpretation}
            severity={auditCResult.severity}
            severityLabel={auditCResult.severity === "low" ? "Low Risk" : auditCResult.severity === "moderate" ? "Hazardous" : "High Risk"}
            details={[
              { label: `Cutoff for ${sex}`, value: sex === "male" ? "≥4" : "≥3" },
              { label: "Recommendation", value: auditCResult.recommendation },
            ]}
          />
        </TabsContent>

        <TabsContent value="full" className="mt-6 space-y-6">
          <SelectField
            id="full-freq"
            label="Q1: How often do you have a drink containing alcohol?"
            value={fullInputs.frequency.toString()}
            onChange={(v) => handleFullChange("frequency", parseInt(v))}
            options={frequencyOptions}
          />

          <SelectField
            id="full-quant"
            label="Q2: How many drinks on a typical drinking day?"
            value={fullInputs.quantity.toString()}
            onChange={(v) => handleFullChange("quantity", parseInt(v))}
            options={quantityOptions}
          />

          <SelectField
            id="full-binge"
            label="Q3: How often do you have 6+ drinks (binge)?"
            value={fullInputs.bingeDrinking.toString()}
            onChange={(v) => handleFullChange("bingeDrinking", parseInt(v))}
            options={bingeOptions}
          />

          <SelectField
            id="full-stop"
            label="Q4: Unable to stop drinking once started?"
            value={fullInputs.unableToStop.toString()}
            onChange={(v) => handleFullChange("unableToStop", parseInt(v))}
            options={dependenceOptions}
          />

          <SelectField
            id="full-fail"
            label="Q5: Failed to do what was expected due to drinking?"
            value={fullInputs.failedExpectations.toString()}
            onChange={(v) => handleFullChange("failedExpectations", parseInt(v))}
            options={dependenceOptions}
          />

          <SelectField
            id="full-morn"
            label="Q6: Needed a drink in the morning to get going?"
            value={fullInputs.morningDrinking.toString()}
            onChange={(v) => handleFullChange("morningDrinking", parseInt(v))}
            options={dependenceOptions}
          />

          <SelectField
            id="full-guilt"
            label="Q7: Feeling of guilt or remorse after drinking?"
            value={fullInputs.guilt.toString()}
            onChange={(v) => handleFullChange("guilt", parseInt(v))}
            options={dependenceOptions}
          />

          <SelectField
            id="full-mem"
            label="Q8: Unable to remember what happened while drinking?"
            value={fullInputs.memoryLoss.toString()}
            onChange={(v) => handleFullChange("memoryLoss", parseInt(v))}
            options={dependenceOptions}
          />

          <SelectField
            id="full-inj"
            label="Q9: Have you or someone else been injured due to your drinking?"
            value={fullInputs.injury.toString()}
            onChange={(v) => handleFullChange("injury", parseInt(v))}
            options={harmOptions}
          />

          <SelectField
            id="full-conc"
            label="Q10: Has anyone expressed concern about your drinking?"
            value={fullInputs.othersConcerned.toString()}
            onChange={(v) => handleFullChange("othersConcerned", parseInt(v))}
            options={harmOptions}
          />

          <ResultCard
            title="Full AUDIT Score"
            score={fullResult.score}
            interpretation={fullResult.interpretation}
            severity={fullResult.severity}
            severityLabel={fullResult.riskZone}
            details={[
              { label: "Risk Zone", value: fullResult.riskZone },
              { label: "Recommendation", value: fullResult.recommendation },
            ]}
          />
        </TabsContent>
      </Tabs>
    </CalculatorContainer>
  )
}
