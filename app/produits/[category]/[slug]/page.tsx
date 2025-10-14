import type { Metadata } from "next"
import ProductHero from "@/components/products/product-hero"
import ProductBenefits from "@/components/products/product-benefits"
import QuickBuyBlock from "@/components/products/quick-buy-block"
import ProductReviews from "@/components/products/product-reviews"
import ComparisonTable from "@/components/products/comparison-table"
import RelatedArticles from "@/components/products/related-articles"
import ProductFaq from "@/components/products/product-faq"
import EmailSignup from "@/components/products/email-signup"
import { getProductData } from "@/lib/server/product-service"
import { notFound } from "next/navigation"

type Props = {
  params: {
    category: string
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductData(params.category, params.slug)

  if (!product) {
    return {
      title: "Produit non trouvé | AnimalLovers",
      description: "Le produit que vous recherchez n'existe pas ou a été déplacé.",
    }
  }

  return {
    title: `${product.title} - Avis & meilleur prix ${new Date().getFullYear()} | AnimalLovers`,
    description: `Découvrez notre avis complet sur ${product.title} : ${product.shortDescription}. Achetez via notre lien Amazon affilié.`,
    openGraph: {
      title: `${product.title} - Recommandé par AnimalLovers`,
      description: `Découvrez notre avis complet sur ${product.title} : ${product.shortDescription}. Achetez via notre lien Amazon affilié.`,
      images: [product.images[0]],
      type: "product",
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductData(params.category, params.slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <ProductHero
        title={product.title}
        description={product.description}
        features={product.keyFeatures}
        images={product.images}
        affiliateLink={product.affiliateLink}
      />

      {/* Benefits Section */}
      <ProductBenefits benefits={product.benefits} guides={product.relatedGuides} />

      {/* Quick Buy Block - Sticky on mobile */}
      <QuickBuyBlock
        image={product.images[0]}
        title={product.title}
        price={product.price}
        affiliateLink={product.affiliateLink}
      />

      {/* Reviews Section */}
      <ProductReviews amazonReviews={product.amazonReviews} testimonials={product.testimonials} />

      {/* Comparison Table */}
      {product.comparisonProducts && (
        <ComparisonTable mainProduct={product} comparisonProducts={product.comparisonProducts} />
      )}

      {/* Related Articles */}
      <RelatedArticles articles={product.relatedArticles} />

      {/* FAQ Section */}
      <ProductFaq faqs={product.faqs} />

      {/* Email Signup Banner */}
      <EmailSignup />
    </main>
  )
}
