export interface ConferenceArticle {
  id: string
  title: string
  summary: string
  meta: {
    conference: string
    date: string
    readTime: string
  }
  category: string
  month: string // e.g., "Feb 2026"
  keyInsight?: string
}

export const conferenceArticles: ConferenceArticle[] = [
  {
    id: "ecco-2026-ai-ibd",
    title: "Artificial Intelligence in IBD: Predictive Modeling for Treatment Response",
    summary: "New data from ECCO 2026 highlights how machine learning algorithms are now reaching 88% accuracy in predicting biological failure before the second dose. This shift towards proactive switching could redefine standard care protocols.",
    meta: {
      conference: "ECCO 2026",
      date: "Feb 18",
      readTime: "6 min read"
    },
    category: "ECCO",
    month: "Feb 2026",
    keyInsight: "AI models now outperform clinical indices in predicting 52-week remission."
  },
  {
    id: "cddw-2026-c-diff-update",
    title: "Next-Generation Microbiota Restoration for Recurrent C. difficile",
    summary: "Summarizing the breakthrough results of the OASIS-3 trial presented at CDDW. Oral encapsulated FMT alternatives show non-inferiority to colonoscopic delivery with significantly fewer adverse events.",
    meta: {
      conference: "CDDW 2026",
      date: "Jan 12",
      readTime: "4 min read"
    },
    category: "CDDW",
    month: "Jan 2026",
    keyInsight: "Simplified delivery methods are poised to increase FMT accessibility by 40%."
  },
  {
    id: "ueg-2025-barretts-esophagus",
    title: "Endoscopic Surveillance vs. Ablation in Low-Grade Dysplasia",
    summary: "Long-term follow-up from the SURF trial indicates that immediate radiofrequency ablation reduces progression to high-grade dysplasia or adenocarcinoma by 25% compared to surveillance alone.",
    meta: {
      conference: "UEG Week",
      date: "Oct 22",
      readTime: "7 min read"
    },
    category: "UEG Week",
    month: "Oct 2025"
  },
  {
    id: "aasld-2025-nash-breakthrough",
    title: "Triple Hormone Agonists in MASH: A New Era of Weight-Independent Fibrosis Reversal",
    summary: "Clinical updates from AASLD 2025 reveal that triple agonists achieve significant fibrosis improvement even in patients with minimal weight loss, suggesting a direct metabolic pathway for hepatic repair.",
    meta: {
      conference: "AASLD",
      date: "Nov 15",
      readTime: "9 min read"
    },
    category: "AASLD",
    month: "Nov 2025",
    keyInsight: "AASLD 2025 is being called the 'year of the triple agonist' for MASH treatment."
  }
]

export const categories = [
  "Latest", "Trending", "ECCO", "CDDW", "UEG Week", "AASLD", "ACG", "DDW"
]

export const months = [
  "Latest", "Trending", "Jan 2026", "Feb 2026", "Dec 2025", "Nov 2025", "Oct 2025", "Sep 2025"
]
