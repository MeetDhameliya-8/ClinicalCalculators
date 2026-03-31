import type { SeverityLevel } from "@/components/calculator/result-card"

export type AscitesGrade = "none" | "mild" | "moderate-severe"
export type EncephalopathyGrade = "none" | "grade1-2" | "grade3-4"

export interface ChildPughInput {
  bilirubin: number
  albumin: number
  inr: number
  ascites: AscitesGrade
  encephalopathy: EncephalopathyGrade
}

export interface ChildPughResult {
  score: number
  class: "A" | "B" | "C"
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  breakdown: {
    bilirubin: number
    albumin: number
    inr: number
    ascites: number
    encephalopathy: number
  }
  survival: {
    oneYear: string
    twoYear: string
  }
}

/**
 * Get points for bilirubin value
 * <2 mg/dL = 1 point
 * 2-3 mg/dL = 2 points
 * >3 mg/dL = 3 points
 */
function getBilirubinPoints(bilirubin: number): number {
  if (bilirubin < 2) return 1
  if (bilirubin <= 3) return 2
  return 3
}

/**
 * Get points for albumin value
 * >3.5 g/dL = 1 point
 * 2.8-3.5 g/dL = 2 points
 * <2.8 g/dL = 3 points
 */
function getAlbuminPoints(albumin: number): number {
  if (albumin > 3.5) return 1
  if (albumin >= 2.8) return 2
  return 3
}

/**
 * Get points for INR value
 * <1.7 = 1 point
 * 1.7-2.3 = 2 points
 * >2.3 = 3 points
 */
function getInrPoints(inr: number): number {
  if (inr < 1.7) return 1
  if (inr <= 2.3) return 2
  return 3
}

/**
 * Get points for ascites
 * None = 1 point
 * Mild = 2 points
 * Moderate-Severe = 3 points
 */
function getAscitesPoints(ascites: AscitesGrade): number {
  switch (ascites) {
    case "none":
      return 1
    case "mild":
      return 2
    case "moderate-severe":
      return 3
  }
}

/**
 * Get points for encephalopathy
 * None = 1 point
 * Grade 1-2 = 2 points
 * Grade 3-4 = 3 points
 */
function getEncephalopathyPoints(encephalopathy: EncephalopathyGrade): number {
  switch (encephalopathy) {
    case "none":
      return 1
    case "grade1-2":
      return 2
    case "grade3-4":
      return 3
  }
}

/**
 * Calculate Child-Pugh Score and Class
 */
export function calculateChildPugh(input: ChildPughInput): ChildPughResult {
  const breakdown = {
    bilirubin: getBilirubinPoints(input.bilirubin),
    albumin: getAlbuminPoints(input.albumin),
    inr: getInrPoints(input.inr),
    ascites: getAscitesPoints(input.ascites),
    encephalopathy: getEncephalopathyPoints(input.encephalopathy),
  }

  const score =
    breakdown.bilirubin +
    breakdown.albumin +
    breakdown.inr +
    breakdown.ascites +
    breakdown.encephalopathy

  let cpClass: "A" | "B" | "C"
  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let survival: { oneYear: string; twoYear: string }

  if (score <= 6) {
    cpClass = "A"
    severity = "low"
    severityLabel = "Class A - Well Compensated"
    interpretation = "Well-compensated cirrhosis. Good liver function preserved."
    survival = { oneYear: "100%", twoYear: "85%" }
  } else if (score <= 9) {
    cpClass = "B"
    severity = "moderate"
    severityLabel = "Class B - Significant Impairment"
    interpretation = "Significant functional compromise. Consider hepatology referral and transplant evaluation."
    survival = { oneYear: "80%", twoYear: "60%" }
  } else {
    cpClass = "C"
    severity = "critical"
    severityLabel = "Class C - Decompensated"
    interpretation = "Decompensated cirrhosis. Urgent transplant evaluation required."
    survival = { oneYear: "45%", twoYear: "35%" }
  }

  return {
    score,
    class: cpClass,
    severity,
    severityLabel,
    interpretation,
    breakdown,
    survival,
  }
}
