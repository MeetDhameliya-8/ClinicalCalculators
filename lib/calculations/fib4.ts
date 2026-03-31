import type { SeverityLevel } from "@/components/calculator/result-card"

export type FIB4Input = Fib4Input

export interface Fib4Input {
  age: number
  ast: number
  alt: number
  platelets: number
}

export interface Fib4Result {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  fibrosisRisk: string
}

/**
 * Calculate FIB-4 Score
 * Formula: FIB-4 = (Age × AST) / (Platelets × √ALT)
 * 
 * Interpretation:
 * <1.3 → Low risk of advanced fibrosis
 * 1.3-2.67 → Intermediate risk
 * >2.67 → Advanced fibrosis likely
 */
export function calculateFib4(input: Fib4Input): Fib4Result {
  const { age, ast, alt, platelets } = input

  // Validate inputs
  if (alt <= 0 || platelets <= 0) {
    throw new Error("Invalid input: ALT and platelets must be greater than 0")
  }

  // Calculate FIB-4
  const score = (age * ast) / (platelets * Math.sqrt(alt))

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let fibrosisRisk: string

  if (score < 1.3) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Low risk of advanced fibrosis (F3-F4). No further workup for fibrosis typically needed."
    fibrosisRisk = "Negative predictive value ~90%"
  } else if (score <= 2.67) {
    severity = "moderate"
    severityLabel = "Intermediate Risk"
    interpretation = "Intermediate risk. Consider additional testing (FibroScan, ELF, or liver biopsy) to rule out advanced fibrosis."
    fibrosisRisk = "Requires further evaluation"
  } else {
    severity = "high"
    severityLabel = "High Risk"
    interpretation = "High likelihood of advanced fibrosis (F3-F4). Recommend hepatology referral and consideration of liver biopsy or imaging."
    fibrosisRisk = "Positive predictive value ~65%"
  }

  return {
    score: Math.round(score * 100) / 100,
    severity,
    severityLabel,
    interpretation,
    fibrosisRisk,
  }
}

// Alias for consistent naming
export const calculateFIB4 = calculateFib4
