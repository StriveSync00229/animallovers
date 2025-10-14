import type { Metadata } from "next"
import CatFoodHero from "@/components/products/cats/cat-food-hero"
import CatFoodFilters from "@/components/products/cats/cat-food-filters"
import CatFoodGrid from "@/components/products/cats/cat-food-grid"
import NutritionGuide from "@/components/products/cats/nutrition-guide"
import ExpertAdvice from "@/components/products/cats/expert-advice"
import Newsletter from "@/components/products/cats/newsletter"

export const metadata: Metadata = {
  title: "Nourriture & Friandises pour Chats | Animal Lovers",
  description:
    "Découvrez notre sélection de croquettes, pâtées, friandises et compléments alimentaires pour chats de qualité supérieure.",
}

export default async function CatFoodPage() {
  return (
    <main className="min-h-screen bg-white">
      <CatFoodHero />
      <div className="container mx-auto px-4 py-8">
        <CatFoodFilters />
        <CatFoodGrid />
        <NutritionGuide />
        <ExpertAdvice />
        <Newsletter />
      </div>
    </main>
  )
}
