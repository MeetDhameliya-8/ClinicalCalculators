export type DiseaseType = "crohns" | "ulcerative-colitis"

// Crohn's Disease Classifications
export type CrohnsAge = "A1" | "A2" | "A3"
export type CrohnsLocation = "L1" | "L2" | "L3" | "L4"
export type CrohnsBehavior = "B1" | "B2" | "B3"
export type PerianelModifier = "p" | ""

// Ulcerative Colitis Classifications
export type UCExtent = "E1" | "E2" | "E3"

export interface MontrealCrohnsInput {
  ageAtDiagnosis: CrohnsAge
  location: CrohnsLocation
  behavior: CrohnsBehavior
  perianal: boolean
}

export interface MontrealUCInput {
  extent: UCExtent
}

export interface MontrealCrohnsResult {
  classification: string
  ageDescription: string
  locationDescription: string
  behaviorDescription: string
  perianelDescription: string
  clinicalImplications: string
}

export interface MontrealUCResult {
  classification: string
  extentDescription: string
  clinicalImplications: string
}

// Age descriptions
const ageDescriptions: Record<CrohnsAge, string> = {
  A1: "A1: Diagnosed at <16 years (pediatric onset)",
  A2: "A2: Diagnosed at 17-40 years",
  A3: "A3: Diagnosed at >40 years",
}

// Location descriptions
const locationDescriptions: Record<CrohnsLocation, string> = {
  L1: "L1: Ileal - Disease confined to terminal ileum",
  L2: "L2: Colonic - Disease confined to colon",
  L3: "L3: Ileocolonic - Disease involves both terminal ileum and colon",
  L4: "L4: Upper GI - Disease involves upper GI tract (proximal to terminal ileum)",
}

// Behavior descriptions
const behaviorDescriptions: Record<CrohnsBehavior, string> = {
  B1: "B1: Inflammatory (non-stricturing, non-penetrating)",
  B2: "B2: Stricturing - Presence of bowel narrowing",
  B3: "B3: Penetrating - Presence of fistulae or abscesses",
}

// UC Extent descriptions
const ucExtentDescriptions: Record<UCExtent, string> = {
  E1: "E1: Proctitis - Limited to rectum",
  E2: "E2: Left-sided (distal) - Extends to splenic flexure",
  E3: "E3: Extensive (pancolitis) - Extends proximal to splenic flexure",
}

/**
 * Generate Montreal Classification for Crohn's Disease
 */
export function classifyMontrelCrohns(input: MontrealCrohnsInput): MontrealCrohnsResult {
  const { ageAtDiagnosis, location, behavior, perianal } = input

  const perianelModifier = perianal ? "p" : ""
  const classification = `${ageAtDiagnosis} ${location} ${behavior}${perianelModifier}`

  let clinicalImplications = ""
  
  // Age implications
  if (ageAtDiagnosis === "A1") {
    clinicalImplications += "Pediatric onset may have more extensive disease at diagnosis. "
  } else if (ageAtDiagnosis === "A3") {
    clinicalImplications += "Later onset may have less aggressive disease course. "
  }

  // Location implications
  if (location === "L3") {
    clinicalImplications += "Ileocolonic disease may be more difficult to manage. "
  } else if (location === "L4") {
    clinicalImplications += "Upper GI involvement requires endoscopic surveillance. "
  }

  // Behavior implications
  if (behavior === "B2") {
    clinicalImplications += "Stricturing disease may require surgical intervention. "
  } else if (behavior === "B3") {
    clinicalImplications += "Penetrating disease requires aggressive medical and possibly surgical management. "
  }

  // Perianal implications
  if (perianal) {
    clinicalImplications += "Perianal disease requires specialized management (biologics, surgical evaluation)."
  }

  if (!clinicalImplications) {
    clinicalImplications = "Standard monitoring and treatment approach recommended."
  }

  return {
    classification,
    ageDescription: ageDescriptions[ageAtDiagnosis],
    locationDescription: locationDescriptions[location],
    behaviorDescription: behaviorDescriptions[behavior],
    perianelDescription: perianal ? "Perianal disease modifier present" : "No perianal disease modifier",
    clinicalImplications: clinicalImplications.trim(),
  }
}

/**
 * Generate Montreal Classification for Ulcerative Colitis
 */
export function classifyMontrealUC(input: MontrealUCInput): MontrealUCResult {
  const { extent } = input

  let clinicalImplications = ""

  switch (extent) {
    case "E1":
      clinicalImplications = "Proctitis often responds well to topical therapy (suppositories/enemas). Lower risk of colorectal cancer compared to extensive disease."
      break
    case "E2":
      clinicalImplications = "May require combination oral and topical therapy. Intermediate surveillance recommendations."
      break
    case "E3":
      clinicalImplications = "Higher risk of complications and colorectal cancer. Requires more aggressive treatment and surveillance colonoscopy every 1-3 years after 8-10 years of disease."
      break
  }

  return {
    classification: extent,
    extentDescription: ucExtentDescriptions[extent],
    clinicalImplications,
  }
}

// Export options for UI
export const crohnsAgeOptions = [
  { value: "A1", label: "A1: <16 years" },
  { value: "A2", label: "A2: 17-40 years" },
  { value: "A3", label: "A3: >40 years" },
]

export const crohnsLocationOptions = [
  { value: "L1", label: "L1: Ileal" },
  { value: "L2", label: "L2: Colonic" },
  { value: "L3", label: "L3: Ileocolonic" },
  { value: "L4", label: "L4: Upper GI" },
]

export const crohnsBehaviorOptions = [
  { value: "B1", label: "B1: Inflammatory (non-stricturing, non-penetrating)" },
  { value: "B2", label: "B2: Stricturing" },
  { value: "B3", label: "B3: Penetrating" },
]

export const ucExtentOptions = [
  { value: "E1", label: "E1: Proctitis" },
  { value: "E2", label: "E2: Left-sided" },
  { value: "E3", label: "E3: Extensive (pancolitis)" },
]
