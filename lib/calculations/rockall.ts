import type { SeverityLevel } from "@/components/calculator/result-card"

export type AgeGroup = "<60" | "60-79" | ">=80"
export type ShockStatus = "none" | "tachycardia" | "hypotension"
export type Comorbidity = "none" | "major" | "renal-liver-malignancy"
export type Diagnosis = "mallory-weiss" | "other" | "malignancy"
export type EndoscopicFindings = "none" | "blood" | "adherent-clot" | "active-bleeding"

export interface RockallInput {
  age: AgeGroup
  shock: ShockStatus
  comorbidity: Comorbidity
  diagnosis: Diagnosis
  endoscopicFindings: EndoscopicFindings
}

export interface RockallResult {
  preEndoscopyScore: number
  fullScore: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  rebleedRisk: string
  mortalityRisk: string
  breakdown: {
    age: number
    shock: number
    comorbidity: number
    diagnosis: number
    endoscopicFindings: number
  }
}

function getAgePoints(age: AgeGroup): number {
  switch (age) {
    case "<60":
      return 0
    case "60-79":
      return 1
    case ">=80":
      return 2
  }
}

function getShockPoints(shock: ShockStatus): number {
  switch (shock) {
    case "none":
      return 0 // No shock: pulse <100, SBP ≥100
    case "tachycardia":
      return 1 // Tachycardia: pulse ≥100, SBP ≥100
    case "hypotension":
      return 2 // Hypotension: SBP <100
  }
}

function getComorbidityPoints(comorbidity: Comorbidity): number {
  switch (comorbidity) {
    case "none":
      return 0
    case "major":
      return 2 // Cardiac failure, IHD, other major
    case "renal-liver-malignancy":
      return 3 // Renal failure, liver failure, disseminated malignancy
  }
}

function getDiagnosisPoints(diagnosis: Diagnosis): number {
  switch (diagnosis) {
    case "mallory-weiss":
      return 0 // Mallory-Weiss tear, no lesion, no SRH
    case "other":
      return 1 // All other diagnoses
    case "malignancy":
      return 2 // Malignancy of upper GI tract
  }
}

function getEndoscopicFindingsPoints(findings: EndoscopicFindings): number {
  switch (findings) {
    case "none":
      return 0 // No stigmata of recent hemorrhage
    case "blood":
      return 2 // Blood in upper GI tract
    case "adherent-clot":
      return 2 // Adherent clot, visible vessel
    case "active-bleeding":
      return 2 // Active bleeding (spurting or oozing)
  }
}

/**
 * Calculate Rockall Score
 * Pre-endoscopy: Age + Shock + Comorbidity (0-7)
 * Full score: All components (0-11)
 */
export function calculateRockall(input: RockallInput): RockallResult {
  const breakdown = {
    age: getAgePoints(input.age),
    shock: getShockPoints(input.shock),
    comorbidity: getComorbidityPoints(input.comorbidity),
    diagnosis: getDiagnosisPoints(input.diagnosis),
    endoscopicFindings: getEndoscopicFindingsPoints(input.endoscopicFindings),
  }

  const preEndoscopyScore = breakdown.age + breakdown.shock + breakdown.comorbidity
  const fullScore =
    preEndoscopyScore + breakdown.diagnosis + breakdown.endoscopicFindings

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let rebleedRisk: string
  let mortalityRisk: string

  if (fullScore <= 2) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Low risk of rebleeding and mortality."
    rebleedRisk = "~5%"
    mortalityRisk = "~0.1%"
  } else if (fullScore <= 4) {
    severity = "moderate"
    severityLabel = "Intermediate Risk"
    interpretation = "Intermediate risk. Close monitoring recommended."
    rebleedRisk = "~10-15%"
    mortalityRisk = "~3-5%"
  } else if (fullScore <= 7) {
    severity = "high"
    severityLabel = "High Risk"
    interpretation = "High risk of rebleeding and mortality. Requires intensive monitoring."
    rebleedRisk = "~25-35%"
    mortalityRisk = "~10-15%"
  } else {
    severity = "critical"
    severityLabel = "Very High Risk"
    interpretation = "Very high risk. ICU admission recommended. High likelihood of adverse outcomes."
    rebleedRisk = ">40%"
    mortalityRisk = ">25%"
  }

  return {
    preEndoscopyScore,
    fullScore,
    severity,
    severityLabel,
    interpretation,
    rebleedRisk,
    mortalityRisk,
    breakdown,
  }
}

// Pre-endoscopy specific types and functions
export interface PreEndoscopyRockallInput {
  age: number
  shock: number
  comorbidity: number
}

export interface PreEndoscopyRockallResult {
  score: number
  severity: SeverityLevel
  interpretation: string
  rebleedRisk: string
  mortalityRisk: string
}

export function calculatePreEndoscopyRockall(input: PreEndoscopyRockallInput): PreEndoscopyRockallResult {
  const score = input.age + input.shock + input.comorbidity

  let severity: SeverityLevel
  let interpretation: string
  let rebleedRisk: string
  let mortalityRisk: string

  if (score <= 0) {
    severity = "low"
    interpretation = "Very low risk. May be suitable for outpatient management."
    rebleedRisk = "~0.2%"
    mortalityRisk = "~0.2%"
  } else if (score <= 2) {
    severity = "low"
    interpretation = "Low risk. Consider early discharge with follow-up."
    rebleedRisk = "~5%"
    mortalityRisk = "~0.1%"
  } else if (score <= 4) {
    severity = "moderate"
    interpretation = "Intermediate risk. Inpatient observation recommended."
    rebleedRisk = "~15%"
    mortalityRisk = "~5%"
  } else {
    severity = "high"
    interpretation = "High risk. Close monitoring and early endoscopy required."
    rebleedRisk = "~25%"
    mortalityRisk = "~15%"
  }

  return { score, severity, interpretation, rebleedRisk, mortalityRisk }
}

// Full Rockall (post-endoscopy) specific types
export interface FullRockallInput {
  age: number
  shock: number
  comorbidity: number
  diagnosis: number
  stigmata: number
}

export interface FullRockallResult {
  score: number
  severity: SeverityLevel
  interpretation: string
  rebleedRisk: string
  mortalityRisk: string
}

export function calculateFullRockall(input: FullRockallInput): FullRockallResult {
  const score = input.age + input.shock + input.comorbidity + input.diagnosis + input.stigmata

  let severity: SeverityLevel
  let interpretation: string
  let rebleedRisk: string
  let mortalityRisk: string

  if (score <= 2) {
    severity = "low"
    interpretation = "Low risk of rebleeding and mortality."
    rebleedRisk = "~5%"
    mortalityRisk = "~0.1%"
  } else if (score <= 4) {
    severity = "moderate"
    interpretation = "Intermediate risk. Close monitoring recommended."
    rebleedRisk = "~15%"
    mortalityRisk = "~5%"
  } else if (score <= 7) {
    severity = "high"
    interpretation = "High risk of rebleeding and mortality. Requires intensive monitoring."
    rebleedRisk = "~30%"
    mortalityRisk = "~12%"
  } else {
    severity = "critical"
    interpretation = "Very high risk. ICU admission recommended."
    rebleedRisk = ">40%"
    mortalityRisk = ">25%"
  }

  return { score, severity, interpretation, rebleedRisk, mortalityRisk }
}

// Options for UI
export const ageOptions = [
  { value: "<60", label: "< 60 years", points: 0 },
  { value: "60-79", label: "60-79 years", points: 1 },
  { value: ">=80", label: "≥ 80 years", points: 2 },
]

export const shockOptions = [
  { value: "none", label: "No shock (Pulse <100, SBP ≥100)", points: 0 },
  { value: "tachycardia", label: "Tachycardia (Pulse ≥100, SBP ≥100)", points: 1 },
  { value: "hypotension", label: "Hypotension (SBP <100)", points: 2 },
]

export const comorbidityOptions = [
  { value: "none", label: "No major comorbidity", points: 0 },
  { value: "major", label: "Cardiac failure, IHD, any major comorbidity", points: 2 },
  { value: "renal-liver-malignancy", label: "Renal failure, liver failure, disseminated malignancy", points: 3 },
]

export const diagnosisOptions = [
  { value: "mallory-weiss", label: "Mallory-Weiss tear, no lesion identified, no SRH", points: 0 },
  { value: "other", label: "All other diagnoses", points: 1 },
  { value: "malignancy", label: "Malignancy of upper GI tract", points: 2 },
]

export const endoscopicFindingsOptions = [
  { value: "none", label: "None or dark spot only", points: 0 },
  { value: "blood", label: "Blood in upper GI tract", points: 2 },
  { value: "adherent-clot", label: "Adherent clot, visible or spurting vessel", points: 2 },
  { value: "active-bleeding", label: "Active bleeding", points: 2 },
]
