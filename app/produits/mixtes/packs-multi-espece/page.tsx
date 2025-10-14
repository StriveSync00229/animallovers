import type { Metadata } from "next"
import { MultiSpeciesHero } from "@/components/products/multi-species/multi-species-hero"
import { MultiSpeciesFilters } from "@/components/products/multi-species/multi-species-filters"
import { MultiSpeciesGrid } from "@/components/products/multi-species/multi-species-grid"
import { PackAdvantages } from "@/components/products/multi-species/pack-advantages"
import { ExpertAdvice } from "@/components/products/multi-species/expert-advice"
import { Newsletter } from "@/components/products/multi-species/newsletter"
import { getMultiSpeciesProducts } from "@/lib/server/product-service"

export const metadata: Metadata = {
  title: "Packs Multi-Espèce | AnimalLovers",
  description:
    "Découvrez nos packs multi-espèce pour tous vos animaux de compagnie. Économisez du temps et de l'argent avec nos solutions complètes.",
}

export default async function MultiSpeciesPacksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const products = await getMultiSpeciesProducts(searchParams)

  return (
    <main className="pb-16">
      <MultiSpeciesHero />

      <section className="py-8">
        <div className="container px-4 mx-auto">
          <MultiSpeciesFilters />
          <MultiSpeciesGrid products={products} />
        </div>
      </section>

      <PackAdvantages />
      <ExpertAdvice />
      <Newsletter />
    </main>
  )
}
