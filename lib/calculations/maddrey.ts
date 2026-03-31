import type { SeverityLevel } from "@/components/calculator/result-card"

export interface MaddreyInput {
  patientPt: number // Patient Prothrombin Time (seconds)
  controlPt: number // Control Prothrombin Time (seconds)
  bilirubin: number // Total Bilirubin (mg/dL)
}

export interface MaddreyResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
}

/**
 * Calculate Maddrey's Discriminant Function
 * Formula: DF = 4.6 × (Patient PT − Control PT) + Bilirubin
 * 
 * Interpretation:
 * <32 → Mild alcoholic hepatitis
 * ≥32 → Severe alcoholic hepatitis, consider corticosteroid therapy
 */
export function calculateMaddrey(input: MaddreyInput): MaddreyResult {
  const { patientPt, controlPt, bilirubin } = input

  // Calculate DF
  const score = 4.6 * (patientPt - controlPt) + bilirubin

  const roundedScore = Math.round(score * 10) / 10

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string

  if (roundedScore < 32) {
    severity = "low"
    severityLabel = "Mild Disease"
    interpretation = "Maddrey DF <32 indicates mild alcoholic hepatitis with lower short-term mortality risk."
    recommendation = "Supportive care. Abstinence from alcohol. Nutritional support."
  } else {
    severity = "critical"
    severityLabel = "Severe Disease"
    interpretation = "Maddrey DF ≥32 indicates severe alcoholic hepatitis with high short-term mortality (~35-45% at 30 days without treatment)."
    recommendation = "Consider corticosteroid therapy (prednisolone 40mg/day for 28 days) if no contraindications. Calculate Lille score at day 7 to assess steroid response."
  }

  return {
    score: roundedScore,
    severity,
    severityLabel,
    interpretation,
    recommendation,
  }
}
