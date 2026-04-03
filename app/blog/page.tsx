"use client"

import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/landing/cta-footer-section"
import { BlogList } from "@/components/blog/blog-list"

export default function BlogItems() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">
        <BlogList />
      </main>

      <FooterSection />
    </div>
  )
}
