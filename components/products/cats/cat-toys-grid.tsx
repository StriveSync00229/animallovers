"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

// Produits fictifs pour la démonstration
const catToys = [
  {
    id: 1,
    name: "Canne à pêche interactive",
    description: "Jouet interactif avec plumes et grelots pour stimuler l'instinct de chasse",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=600&auto=format&fit=crop",
    badge: "Bestseller",
    category: "Interactif",
  },
  {
    id: 2,
    name: "Souris électronique intelligente",
    description: "Souris robotisée avec mouvements aléatoires et capteurs de mouvement",
    price: 24.99,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 86,
    image: "https://images.unsplash.com/photo-1615789591457-74a63395c990?q=80&w=600&auto=format&fit=crop",
    badge: "Nouveau",
    category: "Électronique",
  },
  {
    id: 3,
    name: "Tunnel de jeu pliable",
    description: "Tunnel en tissu crépitant avec jouets suspendus à l'intérieur",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviewCount: 93,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=600&auto=format&fit=crop",
    badge: "Promo",
    category: "Tunnel",
  },
  {
    id: 4,
    name: "Balle distributrice de friandises",
    description: "Balle interactive qui distribue des friandises pendant que votre chat joue",
    price: 14.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1526336362203-8a87ee13a556?q=80&w=600&auto=format&fit=crop",
    badge: null,
    category: "Interactif",
  },
  {
    id: 5,
    name: "Arbre à chat multi-niveaux",
    description: "Arbre à chat avec plateformes, griffoirs et jouets suspendus",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1598463166261-189659111358?q=80&w=600&auto=format&fit=crop",
    badge: "Populaire",
    category: "Arbre à chat",
  },
  {
    id: 6,
    name: "Jouet laser automatique",
    description: "Projecteur laser automatique avec mouvements aléatoires et minuterie",
    price: 29.99,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80&w=600&auto=format&fit=crop",
    badge: null,
    category: "Électronique",
  },
  {
    id: 7,
    name: "Griffoir en carton ondulé",
    description: "Griffoir écologique en carton ondulé avec herbe à chat",
    price: 9.99,
    originalPrice: 12.99,
    rating: 4.3,
    reviewCount: 52,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop",
    badge: "Éco",
    category: "Griffoir",
  },
  {
    id: 8,
    name: "Peluche interactive Poisson",
    description: "Peluche réactive qui frétille au toucher, avec herbe à chat",
    price: 16.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop",
    badge: null,
    category: "Peluche",
  },
  {
    id: 9,
    name: "Circuit de balle à étages",
    description: "Circuit à plusieurs niveaux avec balles colorées et clochettes",
    price: 22.99,
    originalPrice: 27.99,
    rating: 4.8,
    reviewCount: 104,
    image: "https://images.unsplash.com/photo-1549221987-25a490f65d34?q=80&w=600&auto=format&fit=crop",
    badge: "Promo",
    category: "Interactif",
  },
  {
    id: 10,
    name: "Jouet papillon volant",
    description: "Papillon volant électronique avec mouvements imprévisibles",
    price: 19.99,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=600&auto=format&fit=crop",
    badge: "Nouveau",
    category: "Électronique",
  },
  {
    id: 11,
    name: "Tapis de jeu avec jouets suspendus",
    description: "Tapis d'activité avec jouets suspendus et surfaces texturées",
    price: 27.99,
    originalPrice: 34.99,
    rating: 4.6,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=600&auto=format&fit=crop",
    badge: "Promo",
    category: "Tapis de jeu",
  },
  {
    id: 12,
    name: "Baguette avec plumes naturelles",
    description: "Baguette avec plumes naturelles pour stimuler l'instinct de chasse",
    price: 8.99,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 61,
    image: "https://images.unsplash.com/photo-1604916287784-c324202b3205?q=80&w=600&auto=format&fit=crop",
    badge: null,
    category: "Plumes",
  },
]

export default function CatToysGrid() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const addToCart = (name: string) => {
    toast({
      title: "Produit ajouté au panier",
      description: `${name} a été ajouté à votre panier.`,
      duration: 3000,
    })
  }

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {catToys.map((toy) => (
          <motion.div
            key={toy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="relative">
                <img src={toy.image || "/placeholder.svg"} alt={toy.name} className="w-full h-[200px] object-cover" />
                <button
                  onClick={() => toggleFavorite(toy.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(toy.id) ? "fill-rose-500 text-rose-500" : "text-gray-400"}`}
                  />
                </button>
                {toy.badge && (
                  <Badge
                    className={`absolute top-2 left-2 ${
                      toy.badge === "Promo"
                        ? "bg-orange-500"
                        : toy.badge === "Nouveau"
                          ? "bg-green-500"
                          : toy.badge === "Bestseller"
                            ? "bg-blue-500"
                            : toy.badge === "Populaire"
                              ? "bg-purple-500"
                              : toy.badge === "Éco"
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                    }`}
                  >
                    {toy.badge}
                  </Badge>
                )}
              </div>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">{toy.name}</CardTitle>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(toy.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">({toy.reviewCount})</span>
                </div>
                <CardDescription className="mt-2 text-sm line-clamp-2">{toy.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 flex-grow">
                <div className="flex items-baseline mt-2">
                  <span className="text-xl font-bold">{toy.price.toFixed(2)}€</span>
                  {toy.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">{toy.originalPrice.toFixed(2)}€</span>
                  )}
                </div>
                <div className="mt-1">
                  <span className="text-xs text-gray-500">{toy.category}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button onClick={() => addToCart(toy.name)} className="w-full bg-rose-600 hover:bg-rose-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter au panier
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-2">
          Voir plus de produits
        </Button>
      </div>
    </div>
  )
}
