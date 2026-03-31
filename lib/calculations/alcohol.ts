import type { SeverityLevel } from "@/components/calculator/result-card"

// AUDIT Score
export interface AuditInput {
  q1: number // Frequency of drinking (0-4)
  q2: number // Typical quantity (0-4)
  q3: number // Frequency of 6+ drinks (0-4)
  q4: number // Unable to stop (0-4)
  q5: number // Failed expectations (0-4)
  q6: number // Morning drinking (0-4)
  q7: number // Guilt after drinking (0-4)
  q8: number // Memory blackout (0-4)
  q9: number // Injury (0-4)
  q10: number // Others concerned (0-4)
}

export interface AuditResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
}

/**
 * Calculate AUDIT Score
 * Score range: 0-40
 */
export function calculateAudit(input: AuditInput): AuditResult {
  const score = Object.values(input).reduce((sum, val) => sum + val, 0)

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string

  if (score <= 7) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Low risk drinking. Within recommended limits."
    recommendation = "Alcohol education and reinforcement of current limits."
  } else if (score <= 15) {
    severity = "moderate"
    severityLabel = "Hazardous Drinking"
    interpretation = "Risky or hazardous drinking pattern."
    recommendation = "Simple advice and brief counseling on reducing alcohol consumption."
  } else if (score <= 19) {
    severity = "high"
    severityLabel = "Harmful Drinking"
    interpretation = "Harmful drinking with likely physical/psychological harm."
    recommendation = "Brief counseling, continued monitoring, and consider referral to specialist."
  } else {
    severity = "critical"
    severityLabel = "Possible Dependence"
    interpretation = "Likely alcohol dependence. Requires comprehensive evaluation."
    recommendation = "Referral to addiction specialist for diagnostic evaluation and treatment. Consider medication-assisted treatment."
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    recommendation,
  }
}

// AUDIT Questions for UI
export const auditQuestions = [
  {
    id: "q1",
    question: "How often do you have a drink containing alcohol?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Monthly or less" },
      { value: 2, label: "2-4 times a month" },
      { value: 3, label: "2-3 times a week" },
      { value: 4, label: "4+ times a week" },
    ],
  },
  {
    id: "q2",
    question: "How many drinks containing alcohol do you have on a typical day when you are drinking?",
    options: [
      { value: 0, label: "1-2" },
      { value: 1, label: "3-4" },
      { value: 2, label: "5-6" },
      { value: 3, label: "7-9" },
      { value: 4, label: "10+" },
    ],
  },
  {
    id: "q3",
    question: "How often do you have 6 or more drinks on one occasion?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Less than monthly" },
      { value: 2, label: "Monthly" },
      { value: 3, label: "Weekly" },
      { value: 4, label: "Daily or almost daily" },
    ],
  },
  {
    id: "q4",
    question: "How often during the last year have you found that you were not able to stop drinking once you had started?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Less than monthly" },
      { value: 2, label: "Monthly" },
      { value: 3, label: "Weekly" },
      { value: 4, label: "Daily or almost daily" },
    ],
  },
  {
    id: "q5",
    question: "How often during the last year have you failed to do what was normally expected of you because of drinking?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Less than monthly" },
      { value: 2, label: "Monthly" },
      { value: 3, label: "Weekly" },
      { value: 4, label: "Daily or almost daily" },
    ],
  },
  {
    id: "q6",
    question: "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Less than monthly" },
      { value: 2, label: "Monthly" },
      { value: 3, label: "Weekly" },
      { value: 4, label: "Daily or almost daily" },
    ],
  },
  {
    id: "q7",
    question: "How often during the last year have you had a feeling of guilt or remorse after drinking?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Less than monthly" },
      { value: 2, label: "Monthly" },
      { value: 3, label: "Weekly" },
      { value: 4, label: "Daily or almost daily" },
    ],
  },
  {
    id: "q8",
    question: "How often during the last year have you been unable to remember what happened the night before because of your drinking?",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Less than monthly" },
      { value: 2, label: "Monthly" },
      { value: 3, label: "Weekly" },
      { value: 4, label: "Daily or almost daily" },
    ],
  },
  {
    id: "q9",
    question: "Have you or someone else been injured because of your drinking?",
    options: [
      { value: 0, label: "No" },
      { value: 2, label: "Yes, but not in the last year" },
      { value: 4, label: "Yes, during the last year" },
    ],
  },
  {
    id: "q10",
    question: "Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?",
    options: [
      { value: 0, label: "No" },
      { value: 2, label: "Yes, but not in the last year" },
      { value: 4, label: "Yes, during the last year" },
    ],
  },
]

// CAGE Score
export interface CageInput {
  cutDown: boolean // Have you ever felt you should cut down on your drinking?
  annoyed: boolean // Have people annoyed you by criticizing your drinking?
  guilty: boolean // Have you ever felt bad or guilty about your drinking?
  eyeOpener: boolean // Have you ever had a drink first thing in the morning (eye-opener)?
}

export interface CageResult {
  score: number
  severity: SeverityLevel
  severityLabel: string
  interpretation: string
  recommendation: string
}

/**
 * Calculate CAGE Score
 * Score range: 0-4
 */
export function calculateCage(input: CageInput): CageResult {
  const score = [input.cutDown, input.annoyed, input.guilty, input.eyeOpener].filter(
    Boolean
  ).length

  let severity: SeverityLevel
  let severityLabel: string
  let interpretation: string
  let recommendation: string

  if (score < 2) {
    severity = "low"
    severityLabel = "Low Risk"
    interpretation = "Negative screen for alcohol use disorder."
    recommendation = "No specific intervention needed based on CAGE alone."
  } else {
    severity = "critical"
    severityLabel = "Clinically Significant"
    interpretation = "CAGE score ≥2 suggests clinically significant alcohol use disorder."
    recommendation = "Further evaluation recommended. Consider referral to addiction specialist. Assess for alcohol dependence and related complications."
  }

  return {
    score,
    severity,
    severityLabel,
    interpretation,
    recommendation,
  }
}

// CAGE Questions for UI
export const cageQuestions = [
  { id: "cutDown", question: "Have you ever felt you should Cut down on your drinking?" },
  { id: "annoyed", question: "Have people Annoyed you by criticizing your drinking?" },
  { id: "guilty", question: "Have you ever felt bad or Guilty about your drinking?" },
  { id: "eyeOpener", question: "Have you ever had a drink first thing in the morning (Eye-opener) to steady your nerves or get rid of a hangover?" },
]

// Alcohol Content Calculator
export interface AlcoholContentInput {
  volume: number // ml
  alcoholPercentage: number // %
}

export interface AlcoholContentResult {
  grams: number
  standardDrinks: number // ~14g per standard drink in US
  interpretation: string
}

/**
 * Calculate Alcohol Content
 * Formula: Alcohol (grams) = Volume × (%) × 0.789 / 100
 */
export function calculateAlcoholContent(input: AlcoholContentInput): AlcoholContentResult {
  const { volume, alcoholPercentage } = input

  const grams = (volume * alcoholPercentage * 0.789) / 100
  const standardDrinks = grams / 14 // US standard drink = 14g pure alcohol

  let interpretation = ""
  if (standardDrinks <= 1) {
    interpretation = "Approximately 1 standard drink or less."
  } else if (standardDrinks <= 2) {
    interpretation = "Moderate amount (1-2 standard drinks)."
  } else if (standardDrinks <= 4) {
    interpretation = "Heavy single-occasion drinking (3-4 drinks)."
  } else {
    interpretation = "Binge drinking level (>4 drinks). High risk of acute harm."
  }

  return {
    grams: Math.round(grams * 10) / 10,
    standardDrinks: Math.round(standardDrinks * 10) / 10,
    interpretation,
  }
}

// Lille Model
export interface LilleModelInput {
  age: number
  albumin: number
  bilirubinDay0: number
  bilirubinDay7: number
  creatinine: number
  pt: number
  renalInsufficiency: boolean
}

export interface LilleModelResult {
  score: number
  severity: SeverityLevel
  interpretation: string
  response: string
  survival: string
}

export function calculateLilleModel(input: LilleModelInput): LilleModelResult {
  const { age, albumin, bilirubinDay0, bilirubinDay7, creatinine, pt, renalInsufficiency } = input

  const renalValue = renalInsufficiency ? 1 : 0

  const L = 3.19 - (0.101 * age) + (0.147 * albumin) + (0.0165 * (bilirubinDay0 - bilirubinDay7)) - (0.206 * renalValue) - (0.0065 * bilirubinDay0) - (0.0096 * pt)

  const score = Math.exp(-L) / (1 + Math.exp(-L))
  const roundedScore = Math.round(score * 1000) / 1000

  let severity: SeverityLevel
  let interpretation: string
  let response: string
  let survival: string

  if (roundedScore < 0.45) {
    severity = "low"
    response = "Responder"
    interpretation = "Responder to corticosteroid therapy. Better prognosis."
    survival = "~85% at 6 months"
  } else {
    severity = "critical"
    response = "Non-responder"
    interpretation = "Non-responder to corticosteroid therapy. Consider second-line therapy or early liver transplant."
    survival = "~25% at 6 months"
  }

  return {
    score: roundedScore,
    severity,
    interpretation,
    response,
    survival,
  }
}

