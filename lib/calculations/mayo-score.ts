import type { SeverityLevel } from "@/components/calculator/result-card"

export interface MayoScoreInput {
  stoolFrequency: 0 | 1 | 2 | 3
  rectalBleeding: 0 | 1 | 2 | 3
  endoscopicFindings: 0 | 1 | 2 | 3
  physicianGlobalAssessment: 0 | 1 | 2 | 3
}

export interface MayoScoreResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
}

/**
 * Calculate Mayo Score for Ulcerative Colitis
 * Each parameter scored 0-3
 * Total Score = Sum of all 4 parameters (0-12)
 * 
 * Interpretation:
 * 0-2 → Remission
 * 3-5 → Mild disease
 * 6-10 → Moderate disease
 * 11-12 → Severe disease
 */
export function calculateMayoScore(input: MayoScoreInput): MayoScoreResult {
  const { stoolFrequency, rectalBleeding, endoscopicFindings, physicianGlobalAssessment } = input

  const score = stoolFrequency + rectalBleeding + endoscopicFindings + physicianGlobalAssessment

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string

  if (score <= 2) {
    severity = "low"
    severityLabel = "Remission"
    interpretation = "Disease in remission. Minimal to no disease activity."
    recommendation = "Continue maintenance therapy. Regular follow-up as scheduled."
  } else if (score <= 5) {
    severity = "low"
    severityLabel = "Mild Disease"
    interpretation = "Mild ulcerative colitis activity."
    recommendation = "Consider optimizing current therapy. May benefit from topical mesalamine or dose adjustment."
  } else if (score <= 10) {
    severity = "moderate"
    severityLabel = "Moderate Disease"
    interpretation = "Moderate ulcerative colitis activity requiring treatment adjustment."
    recommendation = "Consider escalating therapy. May need oral steroids or biologic initiation. GI consultation recommended."
  } else {
    severity = "critical"
    severityLabel = "Severe Disease"
    interpretation = "Severe ulcerative colitis activity. High risk of complications."
    recommendation = "Urgent GI consultation. Consider hospitalization for IV steroids or rescue therapy. Evaluate for surgical consultation."
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    recommendation,
  }
}

// Stool frequency options
export const stoolFrequencyOptions = [
  { value: "0", label: "Normal number of stools", points: 0 },
  { value: "1", label: "1-2 stools/day more than normal", points: 1 },
  { value: "2", label: "3-4 stools/day more than normal", points: 2 },
  { value: "3", label: "≥5 stools/day more than normal", points: 3 },
]

// Rectal bleeding options
export const rectalBleedingOptions = [
  { value: "0", label: "No blood seen", points: 0 },
  { value: "1", label: "Streaks of blood with stool less than half the time", points: 1 },
  { value: "2", label: "Obvious blood with stool most of the time", points: 2 },
  { value: "3", label: "Blood alone passed", points: 3 },
]

// Endoscopic findings options
export const endoscopicFindingsOptions = [
  { value: "0", label: "Normal or inactive disease", points: 0 },
  { value: "1", label: "Mild (erythema, decreased vascular pattern, mild friability)", points: 1 },
  { value: "2", label: "Moderate (marked erythema, absent vascular pattern, friability, erosions)", points: 2 },
  { value: "3", label: "Severe (spontaneous bleeding, ulceration)", points: 3 },
]

// Physician global assessment options
export const physicianGlobalAssessmentOptions = [
  { value: "0", label: "Normal", points: 0 },
  { value: "1", label: "Mild disease", points: 1 },
  { value: "2", label: "Moderate disease", points: 2 },
  { value: "3", label: "Severe disease", points: 3 },
]
