import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  title: string
  price: number
  rating: number
  size?: string
  type?: string
  affiliateLink: string
}

interface ComparisonTableProps {
  mainProduct: Product
  comparisonProducts: Product[]
}

export default function ComparisonTable({ mainProduct, comparisonProducts }: ComparisonTableProps) {
  const allProducts = [mainProduct, ...comparisonProducts]

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Comparatif des meilleurs produits
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left text-gray-700">Produit</th>
                <th className="p-4 text-left text-gray-700">Taille</th>
                <th className="p-4 text-left text-gray-700">Type</th>
                <th className="p-4 text-left text-gray-700">Prix</th>
                <th className="p-4 text-left text-gray-700">Note</th>
                <th className="p-4 text-left text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b ${
                    product.id === mainProduct.id ? "bg-rose-50" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      {product.id === mainProduct.id && (
                        <span className="inline-block px-2 py-1 mr-2 text-xs font-medium text-white bg-rose-500 rounded">
                          Notre choix
                        </span>
                      )}
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </td>
                  <td className="p-4">{product.size || "-"}</td>
                  <td className="p-4">{product.type || "-"}</td>
                  <td className="p-4 font-bold">{product.price.toFixed(2)}€</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      asChild
                      variant={product.id === mainProduct.id ? "default" : "outline"}
                      className={product.id === mainProduct.id ? "bg-amber-500 hover:bg-amber-600" : "text-gray-700"}
                      size="sm"
                    >
                      <a href={product.affiliateLink} target="_blank" rel="noreferrer nofollow noopener">
                        Voir sur Amazon
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
