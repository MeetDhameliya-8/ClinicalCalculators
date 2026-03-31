import type { SeverityLevel } from "@/components/calculator/result-card"

export interface ApriInput {
  ast: number
  platelets: number
  astUln: number // Upper limit of normal, default 40
}

export interface ApriResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  fibrosisLikelihood: string
}

/**
 * Calculate APRI Score
 * Formula: APRI = [(AST / ULN) / Platelets] × 100
 * 
 * Interpretation:
 * <0.5 → Low risk of significant fibrosis
 * 0.5-2.0 → Intermediate risk
 * >2.0 → Cirrhosis likely
 */
export function calculateApri(input: ApriInput): ApriResult {
  const { ast, platelets, astUln } = input

  // Validate inputs
  if (platelets <= 0 || astUln <= 0) {
    throw new Error("Invalid input: Platelets and AST ULN must be greater than 0")
  }

  // Calculate APRI
  const score = ((ast / astUln) / platelets) * 100

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let fibrosisLikelihood: string

  if (score < 0.5) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Low risk of significant fibrosis. Advanced fibrosis (F3-F4) unlikely."
    fibrosisLikelihood = "Significant fibrosis excluded with ~85% NPV"
  } else if (score <= 2.0) {
    severity = "moderate"
    severityLabel = "Intermediate Risk"
    interpretation = "Intermediate risk. Cannot rule in or rule out significant fibrosis. Consider additional testing."
    fibrosisLikelihood = "Indeterminate - further testing recommended"
  } else {
    severity = "critical"
    severityLabel = "Likely Cirrhosis"
    interpretation = "High APRI suggests cirrhosis is likely. Recommend hepatology referral and further evaluation."
    fibrosisLikelihood = "Cirrhosis likely (PPV ~65%)"
  }

  return {
    score: Math.round(score * 100) / 100,
    severity,
    severityLabel,
    interpretation,
    fibrosisLikelihood,
  }
}
