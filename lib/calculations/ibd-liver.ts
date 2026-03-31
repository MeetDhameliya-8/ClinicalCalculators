import type { SeverityLevel } from "@/components/calculator/result-card"

// Harvey-Bradshaw Index
export type WellBeing = 0 | 1 | 2 | 3 | 4
export type AbdominalPain = 0 | 1 | 2 | 3
export type AbdominalMass = "none" | "dubious" | "definite" | "definite-tender"

export interface HarveyBradshawInput {
  generalWellBeing: WellBeing
  abdominalPain: AbdominalPain
  liquidStools: number // number per day
  abdominalMass: AbdominalMass
  complications: number // number of complications
}

export interface HarveyBradshawResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
}

/**
 * Calculate Harvey-Bradshaw Index for Crohn's Disease
 */
export function calculateHarveyBradshaw(input: HarveyBradshawInput): HarveyBradshawResult {
  let score = input.generalWellBeing + input.abdominalPain + input.liquidStools

  // Abdominal mass scoring
  switch (input.abdominalMass) {
    case "none":
      break
    case "dubious":
      score += 1
      break
    case "definite":
      score += 2
      break
    case "definite-tender":
      score += 3
      break
  }

  score += input.complications

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string

  if (score < 5) {
    severity = "low"
    severityLabel = "Remission"
    interpretation = "Clinical remission. Disease well controlled."
    recommendation = "Continue maintenance therapy. Regular follow-up."
  } else if (score <= 7) {
    severity = "low"
    severityLabel = "Mild Disease"
    interpretation = "Mild active Crohn's disease."
    recommendation = "Consider optimizing current therapy. May benefit from dose adjustment."
  } else if (score <= 16) {
    severity = "moderate"
    severityLabel = "Moderate Disease"
    interpretation = "Moderate active Crohn's disease."
    recommendation = "Treatment escalation likely needed. Consider biologics or immunomodulators."
  } else {
    severity = "critical"
    severityLabel = "Severe Disease"
    interpretation = "Severe active Crohn's disease."
    recommendation = "Urgent GI consultation. Consider hospitalization. May need IV steroids or rescue therapy."
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    recommendation,
  }
}

// AARC-ACLF Score
export type EncephalopathyGrade = "none" | "grade1-2" | "grade3-4"

export interface AarcAclfInput {
  bilirubin: number // mg/dL
  inr: number
  lactate: number // mmol/L
  creatinine: number // mg/dL
  encephalopathy: EncephalopathyGrade
}

export interface AarcAclfResult {
  score: number
  grade: 1 | 2 | 3
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  mortalityRisk: string
}

/**
 * Calculate AARC-ACLF Score
 */
export function calculateAarcAclf(input: AarcAclfInput): AarcAclfResult {
  let score = 0

  // Bilirubin
  if (input.bilirubin < 15) score += 1
  else if (input.bilirubin <= 25) score += 2
  else score += 3

  // INR
  if (input.inr < 1.8) score += 1
  else if (input.inr <= 2.5) score += 2
  else score += 3

  // Lactate
  if (input.lactate < 1.5) score += 1
  else if (input.lactate <= 2.5) score += 2
  else score += 3

  // Creatinine
  if (input.creatinine < 0.7) score += 1
  else if (input.creatinine <= 1.5) score += 2
  else score += 3

  // Encephalopathy
  switch (input.encephalopathy) {
    case "none":
      score += 1
      break
    case "grade1-2":
      score += 2
      break
    case "grade3-4":
      score += 3
      break
  }

  let grade: 1 | 2 | 3
  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let mortalityRisk: string

  if (score <= 7) {
    grade = 1
    severity = "moderate"
    severityLabel = "ACLF Grade 1"
    interpretation = "Grade 1 ACLF. Single organ failure or mild multi-organ dysfunction."
    mortalityRisk = "~22% 28-day mortality"
  } else if (score <= 10) {
    grade = 2
    severity = "high"
    severityLabel = "ACLF Grade 2"
    interpretation = "Grade 2 ACLF. Multiple organ involvement."
    mortalityRisk = "~40% 28-day mortality"
  } else {
    grade = 3
    severity = "critical"
    severityLabel = "ACLF Grade 3"
    interpretation = "Grade 3 ACLF. Severe multi-organ failure. Very high short-term mortality."
    mortalityRisk = ">70% 28-day mortality"
  }

  return {
    score,
    grade,
    severity,
    severityLabel,
    interpretation,
    mortalityRisk,
  }
}

// CLIF-SOFA Score
export interface ClifSofaInput {
  bilirubin: number // mg/dL
  creatinine: number // mg/dL
  encephalopathy: EncephalopathyGrade
  inr: number
  map: number // mmHg or vasopressor use indicator
  useVasopressors: boolean
  pao2Fio2: number // ratio
}

export interface ClifSofaResult {
  score: number
  organFailureCount: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  mortalityRisk: string
}

/**
 * Calculate CLIF-SOFA Score
 */
export function calculateClifSofa(input: ClifSofaInput): ClifSofaResult {
  let score = 0
  let organFailureCount = 0

  // Liver (Bilirubin)
  if (input.bilirubin < 1.2) score += 0
  else if (input.bilirubin < 2) score += 1
  else if (input.bilirubin < 6) { score += 2 }
  else if (input.bilirubin < 12) { score += 3; organFailureCount++ }
  else { score += 4; organFailureCount++ }

  // Kidney (Creatinine)
  if (input.creatinine < 1.2) score += 0
  else if (input.creatinine < 2) score += 1
  else if (input.creatinine < 3.5) { score += 2; organFailureCount++ }
  else if (input.creatinine < 5) { score += 3; organFailureCount++ }
  else { score += 4; organFailureCount++ }

  // Brain (Encephalopathy)
  switch (input.encephalopathy) {
    case "none":
      score += 0
      break
    case "grade1-2":
      score += 2
      break
    case "grade3-4":
      score += 4
      organFailureCount++
      break
  }

  // Coagulation (INR)
  if (input.inr < 1.1) score += 0
  else if (input.inr < 1.25) score += 1
  else if (input.inr < 1.5) score += 2
  else if (input.inr < 2.5) { score += 3; organFailureCount++ }
  else { score += 4; organFailureCount++ }

  // Circulation
  if (input.useVasopressors) {
    score += 4
    organFailureCount++
  } else if (input.map < 70) {
    score += 1
  }

  // Respiration (PaO2/FiO2)
  if (input.pao2Fio2 >= 400) score += 0
  else if (input.pao2Fio2 >= 300) score += 1
  else if (input.pao2Fio2 >= 200) { score += 2; organFailureCount++ }
  else if (input.pao2Fio2 >= 100) { score += 3; organFailureCount++ }
  else { score += 4; organFailureCount++ }

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let mortalityRisk: string

  if (organFailureCount === 0) {
    severity = "low"
    severityLabel = "No ACLF"
    interpretation = "No organ failure. Not meeting criteria for ACLF."
    mortalityRisk = "~5% 28-day mortality"
  } else if (organFailureCount === 1) {
    severity = "moderate"
    severityLabel = "ACLF Grade 1"
    interpretation = "Single organ failure. Early ACLF."
    mortalityRisk = "~23% 28-day mortality"
  } else if (organFailureCount === 2) {
    severity = "high"
    severityLabel = "ACLF Grade 2"
    interpretation = "Two organ failures. Moderate ACLF."
    mortalityRisk = "~32% 28-day mortality"
  } else {
    severity = "critical"
    severityLabel = "ACLF Grade 3"
    interpretation = "Three or more organ failures. Severe ACLF."
    mortalityRisk = ">70% 28-day mortality"
  }

  return {
    score,
    organFailureCount,
    severity,
    severityLabel,
    interpretation,
    mortalityRisk,
  }
}

// PELD Score (Pediatric)
export interface PeldInput {
  ageLessThan1Year: boolean
  albumin: number // g/dL
  bilirubin: number // mg/dL
  inr: number
  growthFailure: boolean
}

export interface PeldResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
}

/**
 * Calculate PELD Score
 */
export function calculatePeld(input: PeldInput): PeldResult {
  const { ageLessThan1Year, albumin, bilirubin, inr, growthFailure } = input

  // PELD formula
  let score =
    4.80 * Math.log(Math.max(bilirubin, 1)) +
    18.57 * Math.log(Math.max(inr, 1)) -
    6.87 * Math.log(Math.max(albumin, 1)) +
    (ageLessThan1Year ? 4.36 : 0) +
    (growthFailure ? 6.67 : 0)

  score = Math.round(score * 10) / 10

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string

  if (score < 10) {
    severity = "low"
    severityLabel = "Lower Priority"
    interpretation = "Lower transplant priority based on PELD score."
  } else if (score < 20) {
    severity = "moderate"
    severityLabel = "Moderate Priority"
    interpretation = "Moderate transplant priority. Consider ongoing monitoring."
  } else {
    severity = "critical"
    severityLabel = "High Priority"
    interpretation = "High transplant priority. Expedited evaluation recommended."
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
  }
}
