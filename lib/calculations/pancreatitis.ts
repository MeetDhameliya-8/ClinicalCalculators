import type { SeverityLevel } from "@/components/calculator/result-card"

// BISAP Score
export interface BisapInput {
  bunGreaterThan25: boolean
  impairedMentalStatus: boolean
  sirsPresent: boolean
  ageOver60: boolean
  pleuralEffusion: boolean
}

export interface BisapResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
  mortalityRisk: string
}

/**
 * Calculate BISAP Score for Acute Pancreatitis
 * Each criterion = 1 point
 * Score range: 0-5
 */
export function calculateBisap(input: BisapInput): BisapResult {
  const score = [
    input.bunGreaterThan25,
    input.impairedMentalStatus,
    input.sirsPresent,
    input.ageOver60,
    input.pleuralEffusion,
  ].filter(Boolean).length

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string
  let mortalityRisk: string

  if (score <= 2) {
    severity = "low"
    severityLabel = "Low Mortality Risk"
    interpretation = "Low risk of mortality from acute pancreatitis."
    recommendation = "Standard supportive care. IV fluids, pain management, and monitoring."
    mortalityRisk = "<2%"
  } else {
    severity = "critical"
    severityLabel = "High Mortality Risk"
    interpretation = "High risk of mortality. Increased risk of organ failure and pancreatic necrosis."
    recommendation = "ICU admission recommended. Aggressive fluid resuscitation. Consider early CT imaging. Monitor for organ failure."
    mortalityRisk = ">15%"
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    recommendation,
    mortalityRisk,
  }
}

// Ranson's Criteria
export interface RansonAdmissionInput {
  age: number
  wbc: number // ×10⁹/L
  glucose: number // mg/dL
  ldh: number // IU/L
  ast: number // IU/L
}

export interface Ranson48HourInput {
  hematocritDrop: number // %
  bunIncrease: number // mg/dL
  calcium: number // mg/dL
  pao2: number // mmHg
  baseDeficit: number // mEq/L
  fluidSequestration: number // L
}

export interface RansonResult {
  admissionScore: number
  total48HourScore: number
  totalScore: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  mortalityRisk: string
}

/**
 * Calculate Ranson's Criteria - Admission
 */
function calculateRansonAdmission(input: RansonAdmissionInput): number {
  let score = 0
  if (input.age > 55) score++
  if (input.wbc > 16) score++
  if (input.glucose > 200) score++
  if (input.ldh > 350) score++
  if (input.ast > 250) score++
  return score
}

/**
 * Calculate Ranson's Criteria - 48 Hours
 */
function calculateRanson48Hour(input: Ranson48HourInput): number {
  let score = 0
  if (input.hematocritDrop > 10) score++
  if (input.bunIncrease > 5) score++
  if (input.calcium < 8) score++
  if (input.pao2 < 60) score++
  if (input.baseDeficit > 4) score++
  if (input.fluidSequestration > 6) score++
  return score
}

/**
 * Calculate Complete Ranson's Score
 */
export function calculateRanson(
  admission: RansonAdmissionInput,
  hour48: Ranson48HourInput
): RansonResult {
  const admissionScore = calculateRansonAdmission(admission)
  const total48HourScore = calculateRanson48Hour(hour48)
  const totalScore = admissionScore + total48HourScore

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let mortalityRisk: string

  if (totalScore <= 2) {
    severity = "low"
    severityLabel = "Mild Pancreatitis"
    interpretation = "Mild acute pancreatitis. Low mortality risk."
    mortalityRisk = "<1%"
  } else if (totalScore <= 4) {
    severity = "moderate"
    severityLabel = "Moderate Pancreatitis"
    interpretation = "Moderate severity. Increased risk of complications."
    mortalityRisk = "~15%"
  } else if (totalScore <= 6) {
    severity = "high"
    severityLabel = "Severe Pancreatitis"
    interpretation = "Severe acute pancreatitis. High mortality risk."
    mortalityRisk = "~40%"
  } else {
    severity = "critical"
    severityLabel = "Critical Pancreatitis"
    interpretation = "Critical severity. Very high mortality risk. Likely necrotizing pancreatitis."
    mortalityRisk = ">50%"
  }

  return {
    admissionScore,
    total48HourScore,
    totalScore,
    severity,
    severityLabel,
    interpretation,
    mortalityRisk,
  }
}

// Simplified Ranson's for toggle-based input
export interface RansonInput {
  etiology: "non-gallstone" | "gallstone"
  // Admission criteria
  age: boolean
  wbc: boolean
  glucose: boolean
  ldh: boolean
  ast: boolean
  // 48-hour criteria
  hctDrop: boolean
  bunRise: boolean
  calcium: boolean
  pao2: boolean
  baseDeficit: boolean
  fluidSequestration: boolean
}

export interface RansonScoreResult {
  score: number
  severity: SeverityLevel
  severityCategory: string
  interpretation: string
  mortality: string
}

export function calculateRansonScore(input: RansonInput): RansonScoreResult {
  const admissionScore = [
    input.age,
    input.wbc,
    input.glucose,
    input.ldh,
    input.ast,
  ].filter(Boolean).length

  const hour48Score = [
    input.hctDrop,
    input.bunRise,
    input.calcium,
    input.pao2,
    input.baseDeficit,
    input.fluidSequestration,
  ].filter(Boolean).length

  const score = admissionScore + hour48Score

  let severity: SeverityLevel
  let severityCategory: string
  let interpretation: string
  let mortality: string

  if (score <= 2) {
    severity = "low"
    severityCategory = "Mild"
    interpretation = "Mild acute pancreatitis. Low risk of complications."
    mortality = "<1%"
  } else if (score <= 4) {
    severity = "moderate"
    severityCategory = "Moderate"
    interpretation = "Moderate severity. Increased risk of complications."
    mortality = "~15%"
  } else if (score <= 6) {
    severity = "high"
    severityCategory = "Severe"
    interpretation = "Severe acute pancreatitis. High mortality risk."
    mortality = "~40%"
  } else {
    severity = "critical"
    severityCategory = "Critical"
    interpretation = "Critical severity. Very high mortality. Likely necrotizing pancreatitis."
    mortality = ">50%"
  }

  return { score, severity, severityCategory, interpretation, mortality }
}

// BISAP simplified for toggle-based input
export interface BISAPInput {
  bun: boolean
  impairedMentalStatus: boolean
  sirs: boolean
  age: boolean
  pleuralEffusion: boolean
}

export interface BISAPScoreResult {
  score: number
  severity: SeverityLevel
  interpretation: string
  mortality: string
}

export function calculateBISAPScore(input: BISAPInput): BISAPScoreResult {
  const score = [
    input.bun,
    input.impairedMentalStatus,
    input.sirs,
    input.age,
    input.pleuralEffusion,
  ].filter(Boolean).length

  let severity: SeverityLevel
  let interpretation: string
  let mortality: string

  if (score <= 2) {
    severity = "low"
    interpretation = "Low risk of mortality from acute pancreatitis."
    mortality = "<2%"
  } else {
    severity = "critical"
    interpretation = "High risk of mortality. Increased risk of organ failure and pancreatic necrosis."
    mortality = ">15%"
  }

  return { score, severity, interpretation, mortality }
}

// CTSI (Balthazar)
export type BalthazarGrade = "A" | "B" | "C" | "D" | "E"
export type NecrosisPercent = "0" | "<30" | "30-50" | ">50"

export interface CtsiInput {
  grade: BalthazarGrade
  necrosis: NecrosisPercent
}

export interface CtsiResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  complicationRisk: string
}

const gradeScores: Record<BalthazarGrade, number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
}

const necrosisScores: Record<NecrosisPercent, number> = {
  "0": 0,
  "<30": 2,
  "30-50": 4,
  ">50": 6,
}

/**
 * Calculate CT Severity Index (Balthazar)
 */
export function calculateCtsi(input: CtsiInput): CtsiResult {
  const score = gradeScores[input.grade] + necrosisScores[input.necrosis]

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let complicationRisk: string

  if (score <= 3) {
    severity = "low"
    severityLabel = "Mild"
    interpretation = "Mild CT severity. Low complication rate expected."
    complicationRisk = "~8% complication rate, ~3% mortality"
  } else if (score <= 6) {
    severity = "moderate"
    severityLabel = "Moderate"
    interpretation = "Moderate CT severity. Intermediate risk of complications."
    complicationRisk = "~35% complication rate, ~6% mortality"
  } else {
    severity = "critical"
    severityLabel = "Severe"
    interpretation = "Severe CT findings. High risk of complications and mortality."
    complicationRisk = "~92% complication rate, ~17% mortality"
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    complicationRisk,
  }
}

// Modified CTSI
export type ModifiedInflammation = "normal" | "intrinsic" | "fluid-collection"
export type ModifiedNecrosis = "none" | "<30" | ">30"

export interface ModifiedCtsiInput {
  inflammation: ModifiedInflammation
  necrosis: ModifiedNecrosis
  extraPancreaticComplications: boolean
}

export interface ModifiedCtsiResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
}

/**
 * Calculate Modified CT Severity Index
 */
export function calculateModifiedCtsi(input: ModifiedCtsiInput): ModifiedCtsiResult {
  let score = 0

  // Inflammation score
  switch (input.inflammation) {
    case "normal":
      score += 0
      break
    case "intrinsic":
      score += 2
      break
    case "fluid-collection":
      score += 4
      break
  }

  // Necrosis score
  switch (input.necrosis) {
    case "none":
      score += 0
      break
    case "<30":
      score += 2
      break
    case ">30":
      score += 4
      break
  }

  // Extra-pancreatic complications
  if (input.extraPancreaticComplications) {
    score += 2
  }

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string

  if (score <= 2) {
    severity = "low"
    severityLabel = "Mild"
    interpretation = "Mild pancreatitis on imaging. Low complication rate."
  } else if (score <= 6) {
    severity = "moderate"
    severityLabel = "Moderate"
    interpretation = "Moderate severity on imaging. Intermediate complication risk."
  } else {
    severity = "critical"
    severityLabel = "Severe"
    interpretation = "Severe findings. High risk of complications, organ failure, and mortality."
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
  }
}
