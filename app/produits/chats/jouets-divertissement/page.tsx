import type { Metadata } from "next"
import CatToysHero from "@/components/products/cats/cat-toys-hero"
import CatToysFilters from "@/components/products/cats/cat-toys-filters"
import CatToysGrid from "@/components/products/cats/cat-toys-grid"
import PlayImportance from "@/components/products/cats/play-importance"
import ExpertToyAdvice from "@/components/products/cats/expert-toy-advice"
import CatNewsletter from "@/components/products/cats/newsletter"

export const metadata: Metadata = {
  title: "Jouets & Divertissement pour Chats | Animal Lovers",
  description:
    "Découvrez notre sélection de jouets et accessoires de divertissement pour chats - jouets interactifs, griffoirs, arbres à chat et plus encore pour le bonheur de votre félin.",
  openGraph: {
    title: "Jouets & Divertissement pour Chats | Animal Lovers",
    description:
      "Découvrez notre sélection de jouets et accessoires de divertissement pour chats - jouets interactifs, griffoirs, arbres à chat et plus encore pour le bonheur de votre félin.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Jouets pour chats",
      },
    ],
  },
}

export default function CatToysPage() {
  return (
    <main className="min-h-screen">
      <CatToysHero />
      <div className="container mx-auto px-4 py-8">
        <CatToysFilters />
        <CatToysGrid />
        <PlayImportance />
        <ExpertToyAdvice />
        <CatNewsletter />
      </div>
    </main>
  )
}
