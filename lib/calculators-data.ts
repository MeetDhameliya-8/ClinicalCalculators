import { 
  Activity, 
  Beaker, 
  Droplets, 
  FlaskConical, 
  Heart, 
  Stethoscope,
} from "lucide-react"

export interface Calculator {
  id: string
  name: string
  shortName?: string
  category: string
  description: string
}

export const calculators: Calculator[] = [
  // Liver Disease
  { id: "meld-na", name: "MELD-Na Score", shortName: "MELD-Na", category: "Liver Disease", description: "Model for End-Stage Liver Disease with sodium" },
  { id: "child-pugh", name: "Child-Pugh Score", shortName: "Child-Pugh", category: "Liver Disease", description: "Cirrhosis severity and prognosis" },
  { id: "cirrhosis-combined", name: "Cirrhosis Combined", shortName: "Cirrhosis Panel", category: "Liver Disease", description: "MELD-Na + Child-Pugh combined assessment" },
  
  // Fibrosis Assessment
  { id: "fib4", name: "FIB-4 Index", shortName: "FIB-4", category: "Fibrosis", description: "Non-invasive fibrosis assessment" },
  { id: "apri", name: "APRI Score", shortName: "APRI", category: "Fibrosis", description: "AST to Platelet Ratio Index" },
  { id: "nafld-fibrosis", name: "NAFLD Fibrosis Score", shortName: "NAFLD-FS", category: "Fibrosis", description: "NAFLD-specific fibrosis assessment" },
  { id: "fibrosis-combined", name: "Fibrosis Panel", shortName: "Fibrosis Panel", category: "Fibrosis", description: "FIB-4 + APRI + NAFLD-FS combined" },
  
  // Alcoholic Liver Disease
  { id: "maddrey", name: "Maddrey's DF", shortName: "Maddrey's", category: "Alcoholic Hepatitis", description: "Discriminant function for alcoholic hepatitis" },
  { id: "glasgow-ah", name: "Glasgow AH Score", shortName: "Glasgow AH", category: "Alcoholic Hepatitis", description: "Glasgow Alcoholic Hepatitis Score" },
  { id: "lille", name: "Lille Model", shortName: "Lille", category: "Alcoholic Hepatitis", description: "Response to corticosteroid therapy" },
  { id: "abic", name: "ABIC Score", shortName: "ABIC", category: "Alcoholic Hepatitis", description: "Age-Bilirubin-INR-Creatinine score" },
  { id: "alcoholic-hepatitis-combined", name: "Alcoholic Hepatitis Panel", shortName: "AH Panel", category: "Alcoholic Hepatitis", description: "Maddrey's + Glasgow + ABIC combined" },
  { id: "audit", name: "AUDIT / AUDIT-C", shortName: "AUDIT", category: "Alcoholic Hepatitis", description: "Alcohol Use Disorders Identification Test" },
  
  // GI Bleeding
  { id: "glasgow-blatchford", name: "Glasgow-Blatchford Score", shortName: "GBS", category: "GI Bleeding", description: "Upper GI bleed intervention prediction" },
  { id: "rockall", name: "Rockall Score", shortName: "Rockall", category: "GI Bleeding", description: "Mortality and rebleeding risk" },
  { id: "gi-bleeding-combined", name: "GI Bleeding Panel", shortName: "GI Bleed Panel", category: "GI Bleeding", description: "GBS + Rockall combined assessment" },
  
  // Pancreatitis
  { id: "ranson", name: "Ranson's Criteria", shortName: "Ranson's", category: "Pancreatitis", description: "Acute pancreatitis severity" },
  { id: "bisap", name: "BISAP Score", shortName: "BISAP", category: "Pancreatitis", description: "Bedside Index for Severity in AP" },
  { id: "pancreatitis-combined", name: "Pancreatitis Panel", shortName: "AP Panel", category: "Pancreatitis", description: "BISAP + Ranson's combined" },
  
  // IBD
  { id: "montreal", name: "Montreal Classification", shortName: "Montreal", category: "IBD", description: "IBD classification system" },
  { id: "mayo-score", name: "Mayo Score", shortName: "Mayo/UCDAI", category: "IBD", description: "Ulcerative colitis disease activity" },
  { id: "harvey-bradshaw", name: "Harvey-Bradshaw Index", shortName: "HBI", category: "IBD", description: "Crohn's disease activity" },
]

export const categoryIcons: Record<string, React.ElementType> = {
  "Liver Disease": Activity,
  "Fibrosis": FlaskConical,
  "Alcoholic Hepatitis": Droplets,
  "GI Bleeding": Heart,
  "Pancreatitis": Beaker,
  "IBD": Stethoscope,
}
