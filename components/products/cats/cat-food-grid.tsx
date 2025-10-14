"use client"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const catFoodProducts = [
  {
    id: 1,
    name: "Royal Canin Kitten",
    category: "Croquettes",
    price: 24.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=2071&auto=format&fit=crop",
    description: "Croquettes premium pour chatons jusqu'à 12 mois, favorise une croissance saine.",
    tags: ["Chaton", "Premium", "Croissance"],
    discount: null,
  },
  {
    id: 2,
    name: "Hill's Science Plan Adult",
    category: "Croquettes",
    price: 39.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80&w=2070&auto=format&fit=crop",
    description: "Formule équilibrée pour chats adultes, riche en protéines de haute qualité.",
    tags: ["Adulte", "Équilibré", "Sans céréales"],
    discount: null,
  },
  {
    id: 3,
    name: "Purina ONE Sterilised",
    category: "Croquettes",
    price: 19.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?q=80&w=2070&auto=format&fit=crop",
    description: "Spécialement formulé pour les chats stérilisés, aide à maintenir un poids idéal.",
    tags: ["Stérilisé", "Contrôle du poids"],
    discount: 15,
  },
  {
    id: 4,
    name: "Sheba Sélection en Sauce",
    category: "Pâtées",
    price: 12.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1607623618478-da7b47ab5d29?q=80&w=2070&auto=format&fit=crop",
    description: "Assortiment de pâtées en sauce avec des morceaux tendres pour chats adultes.",
    tags: ["Adulte", "Morceaux en sauce"],
    discount: null,
  },
  {
    id: 5,
    name: "Gourmet Gold Mousse",
    category: "Pâtées",
    price: 9.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=2070&auto=format&fit=crop",
    description: "Mousse délicate pour chats seniors, facile à digérer et très appétente.",
    tags: ["Senior", "Mousse", "Digestion facile"],
    discount: null,
  },
  {
    id: 6,
    name: "Catisfactions Friandises au Fromage",
    category: "Friandises",
    price: 3.49,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=2001&auto=format&fit=crop",
    description: "Friandises croustillantes au fromage, irrésistibles pour tous les chats.",
    tags: ["Friandises", "Croustillant", "Fromage"],
    discount: null,
  },
  {
    id: 7,
    name: "Vitakraft Cat Stick Mini",
    category: "Friandises",
    price: 2.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=2035&auto=format&fit=crop",
    description: "Bâtonnets à mâcher enrichis en taurine, parfaits comme récompense.",
    tags: ["Friandises", "Bâtonnets", "Taurine"],
    discount: 10,
  },
  {
    id: 8,
    name: "Beaphar Pâte Multivitaminée",
    category: "Compléments alimentaires",
    price: 8.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=2070&auto=format&fit=crop",
    description: "Complément alimentaire riche en vitamines et taurine pour renforcer l'immunité.",
    tags: ["Vitamines", "Immunité", "Taurine"],
    discount: null,
  },
]

export default function CatFoodGrid() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Nos produits alimentaires pour chats</h2>
      <p className="text-gray-600 mb-8">
        Découvrez notre sélection de produits de haute qualité pour répondre aux besoins nutritionnels spécifiques de
        votre chat, quel que soit son âge ou sa condition.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {catFoodProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
              {product.discount && (
                <div className="absolute top-2 right-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
              <button className="absolute top-2 left-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Heart size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-medium text-gray-500">{product.category}</span>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm ml-1">{product.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="font-bold text-lg">
                  {product.discount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-rose-600">
                        {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                      </span>
                      <span className="text-sm text-gray-500 line-through">{product.price}€</span>
                    </div>
                  ) : (
                    <span>{product.price}€</span>
                  )}
                </div>
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                  <ShoppingCart size={16} className="mr-1" /> Ajouter
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/produits/catalogue">
          <Button variant="outline" className="mx-auto">
            Voir tous les produits
          </Button>
        </Link>
      </div>
    </div>
  )
}
