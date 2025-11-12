import type { Metadata } from "next"
import ProductHero from "@/components/products/product-hero"
import ProductBenefits from "@/components/products/product-benefits"
import QuickBuyBlock from "@/components/products/quick-buy-block"
import ProductReviews from "@/components/products/product-reviews"
import ComparisonTable from "@/components/products/comparison-table"
import RelatedArticles from "@/components/products/related-articles"
import ProductFaq from "@/components/products/product-faq"
import EmailSignup from "@/components/products/email-signup"
import { getProductBySlug } from "@/lib/server/product-service"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Produit non trouvé | AnimalLovers",
      description: "Le produit que vous recherchez n'existe pas ou a été déplacé.",
    }
  }

  const images = product.featured_image 
    ? [product.featured_image, ...(product.gallery_images || [])]
    : product.gallery_images || []
  const firstImage = images[0] || ""

  return {
    title: `${product.name} - Avis & meilleur prix ${new Date().getFullYear()} | AnimalLovers`,
    description: product.description || `Découvrez ${product.name} sur AnimalLovers.`,
    openGraph: {
      title: `${product.name} - Recommandé par AnimalLovers`,
      description: product.description || `Découvrez ${product.name} sur AnimalLovers.`,
      images: firstImage ? [firstImage] : [],
      type: "website",
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Construire le tableau d'images
  const images = product.featured_image 
    ? [product.featured_image, ...(product.gallery_images || [])]
    : product.gallery_images || []
  
  const firstImage = images[0] || ""

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <ProductHero
        title={product.name}
        description={product.description || ""}
        features={[]} // Pas de keyFeatures dans la base de données pour l'instant
        images={images}
        affiliateLink="" // Pas d'affiliateLink dans la base de données pour l'instant
      />

      {/* Benefits Section */}
      <ProductBenefits benefits={[]} guides={[]} />

      {/* Quick Buy Block - Sticky on mobile */}
      {firstImage && (
        <QuickBuyBlock
          image={firstImage}
          title={product.name}
          price={product.price}
          affiliateLink=""
        />
      )}

      {/* Reviews Section */}
      <ProductReviews amazonReviews={[]} testimonials={[]} />

      {/* Comparison Table - Désactivé pour l'instant car nécessite des données supplémentaires */}
      {/* {product.comparisonProducts && (
        <ComparisonTable mainProduct={product} comparisonProducts={product.comparisonProducts} />
      )} */}

      {/* Related Articles */}
      <RelatedArticles articles={[]} />

      {/* FAQ Section */}
      <ProductFaq faqs={[]} />

      {/* Email Signup Banner */}
      <EmailSignup />
    </main>
  )
}
