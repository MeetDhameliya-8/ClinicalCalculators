"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw } from "lucide-react"
import { SelectField } from "@/components/calculator/select-field"
import { ToggleField } from "@/components/calculator/toggle-field"
import {
  classifyMontrelCrohns,
  classifyMontrealUC,
  crohnsAgeOptions,
  crohnsLocationOptions,
  crohnsBehaviorOptions,
  ucExtentOptions,
  type CrohnsAge,
  type CrohnsLocation,
  type CrohnsBehavior,
  type UCExtent,
  type MontrealCrohnsResult,
  type MontrealUCResult,
} from "@/lib/calculations/montreal"

type DiseaseType = "crohns" | "ulcerative-colitis" | ""

interface CrohnsForm {
  ageAtDiagnosis: CrohnsAge | ""
  location: CrohnsLocation | ""
  behavior: CrohnsBehavior | ""
  perianal: boolean
}

interface UCForm {
  extent: UCExtent | ""
}

const diseaseTypeOptions = [
  { value: "crohns", label: "Crohn's Disease" },
  { value: "ulcerative-colitis", label: "Ulcerative Colitis" },
]

export function MontrealCalculator() {
  const [diseaseType, setDiseaseType] = useState<DiseaseType>("")
  const [crohnsForm, setCrohnsForm] = useState<CrohnsForm>({
    ageAtDiagnosis: "",
    location: "",
    behavior: "",
    perianal: false,
  })
  const [ucForm, setUcForm] = useState<UCForm>({
    extent: "",
  })
  const [crohnsResult, setCrohnsResult] = useState<MontrealCrohnsResult | null>(null)
  const [ucResult, setUcResult] = useState<MontrealUCResult | null>(null)

  const isCrohnsValid =
    diseaseType === "crohns" &&
    crohnsForm.ageAtDiagnosis !== "" &&
    crohnsForm.location !== "" &&
    crohnsForm.behavior !== ""

  const isUCValid = diseaseType === "ulcerative-colitis" && ucForm.extent !== ""

  const isValid = isCrohnsValid || isUCValid

  const handleCalculate = () => {
    if (diseaseType === "crohns" && isCrohnsValid) {
      const result = classifyMontrelCrohns({
        ageAtDiagnosis: crohnsForm.ageAtDiagnosis as CrohnsAge,
        location: crohnsForm.location as CrohnsLocation,
        behavior: crohnsForm.behavior as CrohnsBehavior,
        perianal: crohnsForm.perianal,
      })
      setCrohnsResult(result)
      setUcResult(null)
    } else if (diseaseType === "ulcerative-colitis" && isUCValid) {
      const result = classifyMontrealUC({
        extent: ucForm.extent as UCExtent,
      })
      setUcResult(result)
      setCrohnsResult(null)
    }
  }

  const handleReset = () => {
    setDiseaseType("")
    setCrohnsForm({
      ageAtDiagnosis: "",
      location: "",
      behavior: "",
      perianal: false,
    })
    setUcForm({ extent: "" })
    setCrohnsResult(null)
    setUcResult(null)
  }

  const hasResult = crohnsResult !== null || ucResult !== null

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Montreal Classification</CardTitle>
        <CardDescription>
          Standardized classification system for inflammatory bowel disease phenotypes
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Disease Type Selection */}
          <SelectField
            id="diseaseType"
            label="Disease Type"
            value={diseaseType}
            onChange={(v) => {
              setDiseaseType(v as DiseaseType)
              setCrohnsResult(null)
              setUcResult(null)
            }}
            options={diseaseTypeOptions}
            placeholder="Select disease type..."
            required
          />

          {/* Crohn's Disease Inputs */}
          {diseaseType === "crohns" && (
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold">{"Crohn's Disease Classification"}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="ageAtDiagnosis"
                  label="Age at Diagnosis"
                  value={crohnsForm.ageAtDiagnosis}
                  onChange={(v) =>
                    setCrohnsForm((prev) => ({ ...prev, ageAtDiagnosis: v as CrohnsAge }))
                  }
                  options={crohnsAgeOptions}
                  required
                />
                <SelectField
                  id="location"
                  label="Location"
                  value={crohnsForm.location}
                  onChange={(v) =>
                    setCrohnsForm((prev) => ({ ...prev, location: v as CrohnsLocation }))
                  }
                  options={crohnsLocationOptions}
                  required
                />
                <SelectField
                  id="behavior"
                  label="Behavior"
                  value={crohnsForm.behavior}
                  onChange={(v) =>
                    setCrohnsForm((prev) => ({ ...prev, behavior: v as CrohnsBehavior }))
                  }
                  options={crohnsBehaviorOptions}
                  required
                />
                <div className="flex items-end">
                  <ToggleField
                    id="perianal"
                    label="Perianal disease modifier (p)"
                    checked={crohnsForm.perianal}
                    onChange={(v) => setCrohnsForm((prev) => ({ ...prev, perianal: v }))}
                    tooltip="Add 'p' modifier if perianal disease present"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Ulcerative Colitis Inputs */}
          {diseaseType === "ulcerative-colitis" && (
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold">Ulcerative Colitis Classification</h3>
              <SelectField
                id="extent"
                label="Extent of Disease"
                value={ucForm.extent}
                onChange={(v) => setUcForm({ extent: v as UCExtent })}
                options={ucExtentOptions}
                required
              />
            </div>
          )}

          {/* Action Buttons */}
          {diseaseType && (
            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleCalculate} disabled={!isValid}>
                <Calculator className="mr-2 h-4 w-4" />
                Classify
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          )}

          {/* Results */}
          {hasResult && (
            <div className="border-t pt-6">
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Classification Result
              </h3>

              {crohnsResult && (
                <div className="space-y-4">
                  <div className="rounded-lg border bg-primary/5 p-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Montreal Classification</p>
                      <p className="mt-1 text-3xl font-bold text-primary">
                        {crohnsResult.classification}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-sm font-medium text-foreground">Age at Diagnosis</p>
                      <p className="text-sm text-muted-foreground">{crohnsResult.ageDescription}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {crohnsResult.locationDescription}
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm font-medium text-foreground">Behavior</p>
                      <p className="text-sm text-muted-foreground">
                        {crohnsResult.behaviorDescription}
                      </p>
                    </div>
                    {crohnsForm.perianal && (
                      <div className="rounded-lg border p-3">
                        <p className="text-sm font-medium text-foreground">Modifier</p>
                        <p className="text-sm text-muted-foreground">
                          {crohnsResult.perianelDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border bg-amber-50 p-4">
                    <h4 className="mb-2 font-semibold text-amber-800">Clinical Implications</h4>
                    <p className="text-sm text-amber-700">{crohnsResult.clinicalImplications}</p>
                  </div>
                </div>
              )}

              {ucResult && (
                <div className="space-y-4">
                  <div className="rounded-lg border bg-primary/5 p-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Montreal Classification</p>
                      <p className="mt-1 text-3xl font-bold text-primary">
                        {ucResult.classification}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-medium text-foreground">Disease Extent</p>
                    <p className="text-sm text-muted-foreground">{ucResult.extentDescription}</p>
                  </div>

                  <div className="rounded-lg border bg-amber-50 p-4">
                    <h4 className="mb-2 font-semibold text-amber-800">Clinical Implications</h4>
                    <p className="text-sm text-amber-700">{ucResult.clinicalImplications}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
