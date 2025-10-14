import type { Metadata } from "next"
import Hero from "@/components/home/hero"
import AboutSection from "@/components/home/about-section"
import ProductsSection from "@/components/home/products-section"
import AdoptionPreview from "@/components/home/adoption-preview"
import DonationSection from "@/components/home/donation-section"
import DonationCampaigns from "@/components/home/donation-campaigns"
import BlogPreview from "@/components/home/blog-preview"
import TestimonialsSection from "@/components/home/testimonials-section"
import NewsletterSection from "@/components/home/newsletter-section"

export const metadata: Metadata = {
  title: "AnimalLovers - Adoptez et soutenez les chiens et chats",
  description:
    "Découvrez l'importance des chiens et des chats dans notre vie, facilitez leur adoption et contribuez à leur bien-être.",
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <AdoptionPreview />
      <ProductsSection />
      <DonationSection />
      <DonationCampaigns />
      <BlogPreview />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  )
}
