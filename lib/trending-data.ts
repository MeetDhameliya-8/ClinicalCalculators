export interface TrendingArticle {
  id: string
  title: string
  summary: string
  meta: {
    topic: string
    date: string
    readTime: string
  }
  month: string
  keyInsight?: string
}

export const trendingTopics = [
  "Latest", "Trending", "IBD", "Hepatitis", "AI", "Endoscopy", "Oncology", 
  "Liver Transplantation", "Basic Sciences", "HCC", "Esophagus and Stomach", 
  "Gallbladder and Pancreas", "Upper GI Tract", "GI Surgery", "Small and Large Bowel", "Cirrhosis Liver"
]

export const trendingMonths = [
  "Latest", "Trending", "Jan 2026", "Feb 2026", "Mar 2026", "Dec 2025", "Nov 2025", "Oct 2025"
]

export const trendingArticles: TrendingArticle[] = [
  {
    id: "trending-1",
    title: "The Rise of AI-Assisted Colonoscopy: Minimizing ADR Variability",
    summary: "Real-time polyp detection algorithms are now standardized in over 200 centers. We explore the latest clinical data on how Artificial Intelligence is closing the gap between high and low-performing endoscopists.",
    meta: {
      topic: "Artificial Intelligence",
      date: "Feb 28",
      readTime: "5 min read"
    },
    month: "Feb 2026",
    keyInsight: "AI integration has shown a 12% relative increase in Adenoma Detection Rate (ADR) across all experience levels."
  },
  {
    id: "trending-2",
    title: "New Frontiers in Liver Transplantation: Normothermic Machine Perfusion",
    summary: "Standard cold storage is being challenged by warm perfusion technologies that allow for real-time assessment of marginal organs. A deep dive into the 2026 transplant landscape.",
    meta: {
      topic: "Liver Transplantation",
      date: "Jan 15",
      readTime: "8 min read"
    },
    month: "Jan 2026",
    keyInsight: "Perfusion technologies are extending transplant windows by up to 24 hours while improving early graft function."
  },
  {
    id: "trending-3",
    title: "Precision Oncology in HCC: Tailoring Immunotherapy to the Tumor Microenvironment",
    summary: "Why do some patients with Hepatocellular Carcinoma thrive on combination therapy while others fail? Researchers are now using single-cell RNA sequencing to map the TME and predict success.",
    meta: {
      topic: "HCC",
      date: "Dec 12",
      readTime: "10 min read"
    },
    month: "Dec 2025",
    keyInsight: "T-cell exhaustion markers are becoming the primary biomarker for clinical trial inclusion in 2026."
  },
  {
    id: "trending-4",
    title: "The Diet-Microbiome-IBD Axis: Beyond the Low FODMAP Era",
    summary: "As our understanding of microbial metabolites like Short Chain Fatty Acids (SCFAs) grows, new dietary interventions are emerging that prioritize 'feeding' the gut rather than restricting it.",
    meta: {
      topic: "IBD",
      date: "Nov 22",
      readTime: "7 min read"
    },
    month: "Nov 2025",
    keyInsight: "Pulsed fiber intake may be more effective than fiber restriction for long-term remission in quiescent UC."
  }
]
