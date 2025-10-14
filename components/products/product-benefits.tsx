import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Benefit {
  icon: string
  title: string
  description: string
}

interface Guide {
  title: string
  slug: string
}

interface ProductBenefitsProps {
  benefits: Benefit[]
  guides: Guide[]
}

export default function ProductBenefits({ benefits, guides }: ProductBenefitsProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Pourquoi nous recommandons ce produit
        </h2>

        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-rose-200"
            >
              <div className="flex items-center mb-4">
                <span className="mr-3 text-2xl" aria-hidden="true">
                  {benefit.icon}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {guides.length > 0 && (
          <div className="p-6 bg-rose-50 rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">🧠 Guides et conseils associés</h3>
            <ul className="space-y-3">
              {guides.map((guide, index) => (
                <li key={index}>
                  <Link
                    href={`/dressage-sante/${guide.slug}`}
                    className="flex items-center text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
