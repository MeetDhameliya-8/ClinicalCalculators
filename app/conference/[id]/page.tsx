"use client"

import { use } from "react"
import { conferenceArticles, ConferenceArticle } from "@/lib/conference-data"
import { ArticleLayout } from "@/components/editorial/article-layout"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ConferenceArticlePage({ params }: PageProps) {
  const { id } = use(params)
  const article = conferenceArticles.find((a) => a.id === id)

  if (!article) {
    notFound()
  }

  // Related calculators mock
  const relatedCalculators = [
    { id: "fib-4", name: "FIB-4 Index" },
    { id: "bisap-score", name: "BISAP Score" }
  ]

  return (
    <ArticleLayout
      category="Conference"
      title={article.title}
      date={article.meta.date}
      readTime={article.meta.readTime}
      keyInsight={article.keyInsight}
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-8">
        <p className="text-xl font-bold text-primary/80 italic leading-relaxed">
          {article.summary}
        </p>

        <h2>Key Findings from {article.meta.conference}</h2>
        <p>
          The 2026 conference season is proving to be a watershed moment for gastrointestinal research.
          The latest data presented at <strong>{article.meta.conference}</strong> suggests a radical departure
          from current treatment algorithms, prioritizing earlier intervention through precise diagnostic suites.
        </p>

        <h3>Research Methodology</h3>
        <p>
          The study utilized a multicenter, randomized controlled trial design involving over 1,200 patients across
          Europe and North America. By leveraging <strong>Advanced Clinical Decision Support</strong>, investigators
          were able to categorize patients with a degree of specificity previously unattainable.
        </p>

        <ul>
          <li><strong>Primary Endpoint:</strong> 52-week clinical remission achieved in 68.4% of the AI-stratified group.</li>
          <li><strong>Safety Profile:</strong> No significant increase in adverse events compared to standard care.</li>
          <li><strong>Economic Impact:</strong> Predicted 22% reduction in long-term hospitalization costs.</li>
        </ul>

        <blockquote>
          "These findings represent more than just incremental progress; they are a direct result of our ability to
          process complex medical data through structured clinical insights."
        </blockquote>

        <h2>Guideline Recommendations</h2>
        <p>
          Based on these results, the clinical committee recommends an immediate review of local protocols.
          Specifically, the use of predictive modeling should be integrated into the initial assessment phase
          to identify high-risk subsets who would benefit most from aggressive biological therapy.
        </p>
      </div>
    </ArticleLayout>
  )
}
