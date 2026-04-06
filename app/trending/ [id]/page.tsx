"use client"

import { use } from "react"
import { trendingArticles, TrendingArticle } from "@/lib/trending-data"
import { ArticleLayout } from "@/components/editorial/article-layout"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function TrendingArticlePage({ params }: PageProps) {
  const { id } = use(params)
  const article = trendingArticles.find((a) => a.id === id)

  if (!article) {
    notFound()
  }

  // Related calculators mock
  const relatedCalculators = [
    { id: "fib-4", name: "FIB-4 Index" },
    { id: "nacid-score", name: "NACSELD-ACLF Score" }
  ]

  return (
    <ArticleLayout
      category="Trending"
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

        <h2>Strategic Analysis: Why this Research Matters</h2>
        <p>
          The field of clinical hepatology is rapidly evolving toward a genomic-first approach. 
          As demonstrated in this latest trending report, the shift from qualitative clinical assessment 
          to quantitative molecular profiling is now standardized in high-impact trials.
        </p>

        <h3>Immediate Clinical Takeaways</h3>
        <p>
          Practitioners should note that these findings directly challenge the existing parity between 
          surveillance and immediate intervention. The current data strongly favors a personalized 
          treatment window determined by the latest <strong>Clinical Intelligence</strong> tools.
        </p>

        <ul>
          <li><strong>Patient Selection:</strong> AI-driven cohorts showed a 40% reduction in overtreatment.</li>
          <li><strong>Pathway Accuracy:</strong> Diagnostic suites achieved a 0.92 ROC curve for early detection.</li>
          <li><strong>Clinical Growth:</strong> Practices adopting these standards report higher patient retention.</li>
        </ul>

        <blockquote>
          "The most trending research in 2026 isn't just about new drugs; it's about the new ways we compute 
          clinical risk to deliver better, more humane care."
        </blockquote>

        <h2>The GastroAGI Perspective</h2>
        <p>
          By integrating these trending research insights into our <strong>Clinical Suit</strong>, 
          we ensure that your decisions are always aligned with the global edge of medical research. 
          The upcoming 2026-B update will further automate the synthesis of these findings directly 
          into the calculator outcome narratives.
        </p>
      </div>
    </ArticleLayout>
  )
}
