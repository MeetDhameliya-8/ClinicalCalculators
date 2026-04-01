"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { TrustSection } from "@/components/landing/trust-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { StickyScrollSection } from "@/components/landing/sticky-scroll-section"
import { InteractiveDemoSection } from "@/components/landing/demo-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CtaSection, FooterSection } from "@/components/landing/cta-footer-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 antialiased overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <StickyScrollSection />
        <InteractiveDemoSection />
        <TestimonialsSection />
        <CtaSection />
      </main>

      <FooterSection />
    </div>
  )
}
