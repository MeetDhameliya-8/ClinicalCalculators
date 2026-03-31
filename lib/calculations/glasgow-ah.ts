import type { SeverityLevel } from "@/components/calculator/result-card"

export interface GlasgowAHInput {
  age: number
  wbc: number // ×10⁹/L
  bun: number // mg/dL
  inr: number // or PT ratio
  bilirubin: number // mg/dL
}

export interface GlasgowAHResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
  breakdown: {
    age: number
    wbc: number
    bun: number
    inr: number
    bilirubin: number
  }
}

/**
 * Get age points
 * <50 = 1
 * ≥50 = 2
 */
function getAgePoints(age: number): number {
  return age >= 50 ? 2 : 1
}

/**
 * Get WBC points
 * <15 = 1
 * ≥15 = 2
 */
function getWbcPoints(wbc: number): number {
  return wbc >= 15 ? 2 : 1
}

/**
 * Get BUN points (mg/dL)
 * <14 mg/dL = 1
 * ≥14 mg/dL = 2
 */
function getBunPoints(bun: number): number {
  return bun >= 14 ? 2 : 1
}

/**
 * Get INR/PT Ratio points
 * <1.5 = 1
 * 1.5-2.0 = 2
 * >2.0 = 3
 */
function getInrPoints(inr: number): number {
  if (inr > 2.0) return 3
  if (inr >= 1.5) return 2
  return 1
}

/**
 * Get Bilirubin points
 * <7.3 mg/dL = 1
 * 7.3-14.6 mg/dL = 2
 * >14.6 mg/dL = 3
 */
function getBilirubinPoints(bilirubin: number): number {
  if (bilirubin > 14.6) return 3
  if (bilirubin >= 7.3) return 2
  return 1
}

/**
 * Calculate Glasgow Alcoholic Hepatitis Score
 * Score range: 5-12
 */
export function calculateGlasgowAH(input: GlasgowAHInput): GlasgowAHResult {
  const breakdown = {
    age: getAgePoints(input.age),
    wbc: getWbcPoints(input.wbc),
    bun: getBunPoints(input.bun),
    inr: getInrPoints(input.inr),
    bilirubin: getBilirubinPoints(input.bilirubin),
  }

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0)

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string

  if (score < 9) {
    severity = "moderate"
    severityLabel = "Lower Risk"
    interpretation = "GAHS <9 suggests lower short-term mortality risk (~10-15%)."
    recommendation = "May not benefit significantly from corticosteroid therapy. Consider supportive care, abstinence, and nutritional support."
  } else {
    severity = "critical"
    severityLabel = "Poor Prognosis"
    interpretation = "GAHS ≥9 indicates poor prognosis with high short-term mortality risk (~40-50%)."
    recommendation = "Consider corticosteroid therapy (prednisolone 40mg/day). Monitor closely for complications. Calculate Lille score at day 7."
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
