"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { SolutionsGrid } from "@/components/landing/solutions-grid"
import { AuthoritySection } from "@/components/landing/authority-section"
import { AnatomySection } from "@/components/landing/anatomy-section"
import { EvidenceSection } from "@/components/landing/latest-evidence"
import { FooterSection } from "@/components/landing/cta-footer-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 antialiased overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection />
        <SolutionsGrid />
        <AuthoritySection /> {/* Added the academic authority section */}
        <AnatomySection /> {/* Injected the premium anatomy atlas */}
        <EvidenceSection /> {/* Editorial Table for Clinical Updates */}
      </main>

      <FooterSection />
    </div>
  )
}
