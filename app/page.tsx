"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { SolutionsGrid } from "@/components/landing/solutions-grid"
import { AuthoritySection } from "@/components/landing/authority-section"
import { AnatomySection } from "@/components/landing/anatomy-section"
import { EvidenceSection } from "@/components/landing/latest-evidence"
import { SolutionPreviews } from "@/components/landing/solution-previews"
import { PlatformShowcase } from "@/components/landing/platform-showcase"
import { FooterSection } from "@/components/landing/cta-footer-section"
import ConnectedIntelligence from "@/components/landing/connected-intelligence"
import { JournalMarquee } from "@/components/landing/journal-marquee"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 antialiased overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection />
        <SolutionsGrid />
        <AuthoritySection /> {/* Added the academic authority section */}
        <ConnectedIntelligence />
        <AnatomySection /> {/* Injected the premium anatomy atlas */}
        <EvidenceSection /> {/* Editorial Table for Clinical Updates */}
        <SolutionPreviews /> {/* Specific Content Previews */}

        <PlatformShowcase /> {/* Premium SaaS platform showcase */}
      </main>

      <FooterSection />
    </div>
  )
}
