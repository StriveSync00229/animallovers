import type { Metadata } from "next"
import ImpactHero from "@/components/impact/impact-hero"
import KeyMetrics from "@/components/impact/key-metrics"
import ProjectsSection from "@/components/impact/projects-section"
import SuccessStories from "@/components/impact/success-stories"
import FinancialTransparency from "@/components/impact/financial-transparency"
import FutureGoals from "@/components/impact/future-goals"
import DonationCTA from "@/components/impact/donation-cta"

export const metadata: Metadata = {
  title: "Rapport d'impact | AnimalLovers",
  description:
    "Découvrez l'impact concret de vos dons et comment nous transformons ensemble la vie des animaux dans le besoin.",
}

export default function ImpactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ImpactHero />
      <KeyMetrics />
      <ProjectsSection />
      <SuccessStories />
      <FinancialTransparency />
      <FutureGoals />
      <DonationCTA />
    </main>
  )
}
