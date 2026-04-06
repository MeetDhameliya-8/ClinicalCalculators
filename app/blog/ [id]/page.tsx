"use client"

import { use } from "react"
import { blogPosts, BlogPost } from "@/lib/blog-data"
import { ArticleLayout } from "@/components/editorial/article-layout"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function BlogPostPage({ params }: PageProps) {
  const { id } = use(params)
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  // Related calculators mock (to demonstrate the feature)
  const relatedCalculators = [
    { id: "meld-na", name: "MELD-Na Score" },
    { id: "child-pugh", name: "Child-Pugh Classification" }
  ]

  return (
    <ArticleLayout
      category="Blog"
      title={post.title}
      date={post.date}
      readTime={post.readTime}
      author={post.author}
      image={post.image}
      keyInsight="Clinical intelligence integration is no longer a luxury but a fundamental necessity for precision hepatology in 2026."
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <p>
          The landscape of gastroenterology is undergoing a seismic shift. As we navigate through 2026, the integration of 
          Artificial Intelligence (AI) into clinical workflows has moved from theoretical exploration to practical, 
          day-to-day implementation. At <strong>GastroAGI</strong>, we are at the forefront of this transformation.
        </p>

        <h2>The Data-Driven Clinician</h2>
        <p>
          Modern hepatology requires the synthesis of vast amounts of patient data—ranging from genomic markers to real-time 
          hemodynamic monitoring. Traditional clinical scores, while foundational, often fail to capture the dynamic 
          nature of chronic liver disease progression.
        </p>

        <blockquote>
          "The future of medicine isn't about replacing the clinician; it's about augmenting their expertise with 
          real-time, evidence-based intelligence that speaks the language of modern guidelines."
        </blockquote>

        <p>
          Our latest suite of calculators integrates advanced predictive modeling. For instance, our updated MELD-Na 
          incorporation logic now cross-references the latest <strong>AASLD 2025 guidelines</strong>, ensuring that 
          transplant prioritization is as accurate as the current science allows.
        </p>

        <h3>Key Pillars of GastroAGI Intelligence</h3>
        <ul>
          <li><strong>Evidence-Based Reliability:</strong> Every calculation is backed by peer-reviewed literature.</li>
          <li><strong>Real-Time Synthesis:</strong> Guidelines are updated in our engine as soon as they are published.</li>
          <li><strong>Clinical Context:</strong> We provide structured insights to help interpret numerical results.</li>
        </ul>

        <h2>Looking Ahead</h2>
        <p>
          As we look towards the next decade, the goal remains clear: reducing diagnostic variability and improving 
          patient outcomes through the precise application of clinical intelligence. Stay tuned as we roll out 
          even more advanced diagnostic suites later this year.
        </p>
      </div>
    </ArticleLayout>
  )
}
