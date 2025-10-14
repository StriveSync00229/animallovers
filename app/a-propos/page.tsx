import type { Metadata } from "next"
import AboutHero from "@/components/about/hero"
import MissionSection from "@/components/about/mission-section"
import WhySection from "@/components/about/why-section"
import TeamSection from "@/components/about/team-section"
import PartnersSection from "@/components/about/partners-section"
import ValuesSection from "@/components/about/values-section"
import ImpactSection from "@/components/about/impact-section"
import ContactSection from "@/components/about/contact-section"

export const metadata: Metadata = {
  title: "À propos | AnimalLovers",
  description: "Découvrez notre mission, nos valeurs et notre équipe dédiée au bien-être des chiens et des chats.",
}

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      <MissionSection />
      <WhySection />
      <TeamSection />
      <PartnersSection />
      <ValuesSection />
      <ImpactSection />
      <ContactSection />
    </main>
  )
}
