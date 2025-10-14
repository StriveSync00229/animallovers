import type { Metadata } from "next"
import DonationBanner from "@/components/donation/donation-banner"
import WhyDonateSection from "@/components/donation/why-donate-section"
import DonationFormSection from "@/components/donation/donation-form-section"
import TestimonialsSection from "@/components/donation/testimonials-section"
import TransparencySection from "@/components/donation/transparency-section"
import NewsletterSection from "@/components/donation/newsletter-section"

export const metadata: Metadata = {
  title: "Faire un don | AnimalLovers",
  description:
    "Faites une différence aujourd'hui. Offrez amour, soins et un foyer à ceux qui n'en ont pas. Votre don aide les animaux dans le besoin.",
}

export default function DonationPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <DonationBanner />
      <WhyDonateSection />
      <DonationFormSection />
      <TestimonialsSection />
      <TransparencySection />
      <NewsletterSection />
    </main>
  )
}
