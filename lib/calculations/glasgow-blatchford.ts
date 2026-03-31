import type { SeverityLevel } from "@/components/calculator/result-card"

export interface GlasgowBlatchfordInput {
  bun: number // mg/dL
  hemoglobin: number // g/dL
  systolicBp: number // mmHg
  pulse: number // bpm
  melena: boolean
  syncope: boolean
  hepaticDisease: boolean
  cardiacFailure: boolean
  sex: "male" | "female"
}

export interface GlasgowBlatchfordResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
  breakdown: {
    bun: number
    hemoglobin: number
    systolicBp: number
    pulse: number
    melena: number
    syncope: number
    hepaticDisease: number
    cardiacFailure: number
  }
}

/**
 * Get BUN points
 * 18.2-22.4 mg/dL (6.5-8.0 mmol/L) = 2
 * 22.4-28.0 mg/dL (8.0-10.0 mmol/L) = 3
 * 28.0-70.0 mg/dL (10.0-25.0 mmol/L) = 4
 * ≥70.0 mg/dL (≥25 mmol/L) = 6
 */
function getBunPoints(bun: number): number {
  if (bun >= 70) return 6
  if (bun >= 28) return 4
  if (bun >= 22.4) return 3
  if (bun >= 18.2) return 2
  return 0
}

/**
 * Get Hemoglobin points (gender-specific)
 * Male:
 *   12.0-12.9 g/dL = 1
 *   10.0-11.9 g/dL = 3
 *   <10.0 g/dL = 6
 * Female:
 *   10.0-11.9 g/dL = 1
 *   <10.0 g/dL = 6
 */
function getHemoglobinPoints(hemoglobin: number, sex: "male" | "female"): number {
  if (sex === "male") {
    if (hemoglobin < 10) return 6
    if (hemoglobin < 12) return 3
    if (hemoglobin < 13) return 1
    return 0
  } else {
    if (hemoglobin < 10) return 6
    if (hemoglobin < 12) return 1
    return 0
  }
}

/**
 * Get Systolic BP points
 * 100-109 mmHg = 1
 * 90-99 mmHg = 2
 * <90 mmHg = 3
 */
function getSystolicBpPoints(bp: number): number {
  if (bp < 90) return 3
  if (bp < 100) return 2
  if (bp < 110) return 1
  return 0
}

/**
 * Get pulse points
 * ≥100 bpm = 1
 */
function getPulsePoints(pulse: number): number {
  return pulse >= 100 ? 1 : 0
}

/**
 * Calculate Glasgow-Blatchford Score
 * Score range: 0-23
 */
export function calculateGlasgowBlatchford(input: GlasgowBlatchfordInput): GlasgowBlatchfordResult {
  const breakdown = {
    bun: getBunPoints(input.bun),
    hemoglobin: getHemoglobinPoints(input.hemoglobin, input.sex),
    systolicBp: getSystolicBpPoints(input.systolicBp),
    pulse: getPulsePoints(input.pulse),
    melena: input.melena ? 1 : 0,
    syncope: input.syncope ? 2 : 0,
    hepaticDisease: input.hepaticDisease ? 2 : 0,
    cardiacFailure: input.cardiacFailure ? 2 : 0,
  }

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0)

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string

  if (score === 0) {
    severity = "low"
    severityLabel = "Very Low Risk"
    interpretation = "Score of 0 indicates very low risk of needing intervention."
    recommendation = "May be suitable for outpatient management. Consider discharge with close follow-up."
  } else if (score <= 2) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Low risk of adverse outcome."
    recommendation = "Hospital admission recommended. Low likelihood of requiring intervention."
  } else if (score <= 6) {
    severity = "moderate"
    severityLabel = "Moderate Risk"
    interpretation = "Moderate risk of needing intervention."
    recommendation = "Hospital admission required. Consider GI consultation for possible endoscopy."
  } else if (score <= 12) {
    severity = "high"
    severityLabel = "High Risk"
    interpretation = "High risk of needing intervention or adverse outcome."
    recommendation = "Urgent hospital admission required. Early GI consultation and endoscopy recommended."
  } else {
    severity = "critical"
    severityLabel = "Critical Risk"
    interpretation = "Very high risk. Significant likelihood of requiring intervention."
    recommendation = "ICU-level monitoring recommended. Emergent GI consultation for endoscopy."
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    recommendation,
    breakdown,
  }
}
