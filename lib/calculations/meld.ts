import type { SeverityLevel } from "@/components/calculator/result-card"

export interface MeldNaInput {
  bilirubin: number
  inr: number
  creatinine: number
  sodium: number
  dialysis: boolean
}

export interface MeldNaResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  mortalityRisk: string
}

export interface Meld3Input {
  bilirubin: number
  inr: number
  creatinine: number
  sodium: number
  albumin: number
  dialysis: boolean
  sex: "male" | "female"
}

export interface Meld3Result {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
}

/**
 * Calculate MELD-Na Score
 * Formula: MELD-Na = MELD + 1.32 × (137 − Na) − [0.033 × MELD × (137 − Na)]
 * Where MELD = 10 × (0.957 × ln(Cr) + 0.378 × ln(Bili) + 1.120 × ln(INR) + 0.643)
 */
export function calculateMeldNa(input: MeldNaInput): MeldNaResult {
  // Apply constraints
  let creatinine = input.creatinine
  if (input.dialysis || creatinine > 4.0) {
    creatinine = 4.0
  }
  if (creatinine < 1.0) creatinine = 1.0

  let bilirubin = input.bilirubin
  if (bilirubin < 1.0) bilirubin = 1.0

  let inr = input.inr
  if (inr < 1.0) inr = 1.0

  // Clamp sodium between 125-137
  let sodium = input.sodium
  if (sodium > 137) sodium = 137
  if (sodium < 125) sodium = 125

  // Calculate base MELD
  const meld =
    10 *
    (0.957 * Math.log(creatinine) +
      0.378 * Math.log(bilirubin) +
      1.12 * Math.log(inr) +
      0.643)

  // Calculate MELD-Na
  const meldNa = meld + 1.32 * (137 - sodium) - 0.033 * meld * (137 - sodium)

  // Round final score
  const score = Math.round(meldNa)

  // Determine severity and interpretation
  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let mortalityRisk: string

  if (score < 10) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Low 3-month mortality risk. Continue monitoring."
    mortalityRisk = "~2%"
  } else if (score < 20) {
    severity = "moderate"
    severityLabel = "Moderate Risk"
    interpretation = "Moderate 3-month mortality risk. Consider specialist referral."
    mortalityRisk = "~6%"
  } else if (score < 30) {
    severity = "high"
    severityLabel = "High Risk"
    interpretation = "High 3-month mortality risk (~20-30%). Urgent transplant evaluation recommended."
    mortalityRisk = "~20-30%"
  } else {
    severity = "critical"
    severityLabel = "Critical"
    interpretation = "Very high 3-month mortality risk (>50%). Immediate transplant evaluation required."
    mortalityRisk = ">50%"
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    mortalityRisk,
  }
}

/**
 * Calculate MELD 3.0 Score
 * More recent version incorporating sex and albumin
 */
export function calculateMeld3(input: Meld3Input): Meld3Result {
  // Apply constraints
  let creatinine = input.creatinine
  if (input.dialysis || creatinine > 3.0) {
    creatinine = 3.0
  }
  if (creatinine < 1.0) creatinine = 1.0

  let bilirubin = input.bilirubin
  if (bilirubin < 1.0) bilirubin = 1.0

  let inr = input.inr
  if (inr < 1.0) inr = 1.0

  let sodium = input.sodium
  if (sodium > 137) sodium = 137
  if (sodium < 125) sodium = 125

  let albumin = input.albumin
  if (albumin > 3.5) albumin = 3.5
  if (albumin < 1.5) albumin = 1.5

  // Female sex coefficient
  const sexCoef = input.sex === "female" ? 1.33 : 0

  // MELD 3.0 formula
  const score =
    1.33 * (input.sex === "female" ? 1 : 0) +
    4.56 * Math.log(bilirubin) +
    0.82 * (137 - sodium) -
    0.24 * (137 - sodium) * Math.log(bilirubin) +
    9.09 * Math.log(inr) +
    11.14 * Math.log(creatinine) +
    1.85 * (3.5 - albumin) -
    1.83 * (3.5 - albumin) * Math.log(creatinine) +
    6

  const roundedScore = Math.round(score)

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string

  if (roundedScore < 10) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Low mortality risk. Continue monitoring liver function."
  } else if (roundedScore < 20) {
    severity = "moderate"
    severityLabel = "Moderate Risk"
    interpretation = "Moderate mortality risk. Consider hepatology referral."
  } else if (roundedScore < 30) {
    severity = "high"
    severityLabel = "High Risk"
    interpretation = "High mortality risk. Urgent transplant evaluation recommended."
  } else {
    severity = "critical"
    severityLabel = "Critical"
    interpretation = "Very high mortality risk. Immediate transplant evaluation required."
  }

  return {
    score: roundedScore,
    severity,
    severityLabel,
    interpretation,
  }
}
