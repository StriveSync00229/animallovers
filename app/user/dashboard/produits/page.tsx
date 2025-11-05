"use client"

import { useState } from "react"
import { ShoppingBag, Star, ShoppingCart, MessageSquare, Send, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

interface Comment {
  id: string
  author: string
  rating: number
  text: string
  date: string
  likes: number
}

export default function UserProduitsPage() {
  const [cart, setCart] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(5)

  const products = [
    {
      id: "1",
      name: "Croquettes Premium Chien Adulte",
      price: 45.99,
      oldPrice: 59.99,
      image: "/placeholder.svg?key=8rnqp",
      category: "Alimentation",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      description: "Croquettes de haute qualité pour chiens adultes, riches en protéines",
    },
    {
      id: "2",
      name: "Arbre à chat XXL",
      price: 89.99,
      image: "/placeholder.svg?key=2kcvh",
      category: "Accessoires",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      description: "Arbre à chat multi-niveaux avec griffoirs et cachettes",
    },
    {
      id: "3",
      name: "Jouet interactif pour chien",
      price: 24.99,
      oldPrice: 34.99,
      image: "/placeholder.svg?key=5yjqm",
      category: "Jouets",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      description: "Jouet intelligent qui stimule l'activité mentale de votre chien",
    },
    {
      id: "4",
      name: "Litière auto-nettoyante",
      price: 199.99,
      image: "/placeholder.svg?key=9xfkl",
      category: "Hygiène",
      rating: 4.8,
      reviews: 67,
      inStock: false,
      description: "Litière automatique avec système de nettoyage intelligent",
    },
  ]

  const [comments, setComments] = useState<Record<string, Comment[]>>({
    "1": [
      {
        id: "1",
        author: "Marie L.",
        rating: 5,
        text: "Excellentes croquettes ! Mon chien les adore et sa santé s'est nettement améliorée.",
        date: "Il y a 2 jours",
        likes: 12,
      },
      {
        id: "2",
        author: "Pierre D.",
        rating: 4,
        text: "Bon produit, rapport qualité-prix correct. Livraison rapide.",
        date: "Il y a 1 semaine",
        likes: 8,
      },
    ],
    "2": [
      {
        id: "3",
        author: "Sophie M.",
        rating: 5,
        text: "Mon chat passe ses journées dessus ! Très stable et bien conçu.",
        date: "Il y a 3 jours",
        likes: 15,
      },
    ],
  })

  const addToCart = (productId: string) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId])
      alert("Produit ajouté au panier !")
    }
  }

  const handleSubmitComment = (productId: string) => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Vous",
      rating: newRating,
      text: newComment,
      date: "À l'instant",
      likes: 0,
    }

    setComments({
      ...comments,
      [productId]: [...(comments[productId] || []), comment],
    })

    setNewComment("")
    setNewRating(5)
    alert("Commentaire publié avec succès !")
  }

  if (selectedProduct) {
    const product = products.find((p) => p.id === selectedProduct)
    const productComments = comments[selectedProduct] || []

    return (
      <div className="space-y-6 animate-fadeInUp">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{product?.name}</h1>
          <Button variant="outline" onClick={() => setSelectedProduct(null)}>
            Retour aux produits
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product details */}
          <Card className="p-6">
            <div className="relative h-96 bg-gray-200 rounded-lg mb-6">
              <Image
                src={product?.image || "/placeholder.svg"}
                alt={product?.name || ""}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                  {product?.category}
                </span>
                {product?.inStock ? (
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    En stock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                    Rupture de stock
                  </span>
                )}
              </div>

              <p className="text-gray-700">{product?.description}</p>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product?.rating} ({product?.reviews} avis)
                </span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t">
                {product?.oldPrice && <span className="text-lg text-gray-400 line-through">{product.oldPrice}€</span>}
                <span className="text-3xl font-bold text-red-600">{product?.price}€</span>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                onClick={() => product && addToCart(product.id)}
                disabled={!product?.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product?.inStock ? "Ajouter au panier" : "Produit indisponible"}
              </Button>
            </div>
          </Card>

          {/* Comments section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Laisser un commentaire</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Votre note</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setNewRating(rating)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Votre avis</label>
                  <Textarea
                    placeholder="Partagez votre expérience avec ce produit..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => product && handleSubmitComment(product.id)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publier le commentaire
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Avis clients ({productComments.length})</h2>
              <div className="space-y-4">
                {productComments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Aucun commentaire pour le moment. Soyez le premier à donner votre avis !
                  </p>
                ) : (
                  productComments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{comment.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{comment.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.text}</p>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Boutique</h1>
            <p className="text-gray-600">Découvrez nos produits pour vos animaux</p>
          </div>
        </div>
        {cart.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600">{cart.length} article(s)</span>
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedProduct(product.id)}
          >
            <div className="relative h-64 bg-gray-200">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              {product.oldPrice && (
                <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-900">Rupture de stock</span>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 uppercase">{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span>{product.reviews} avis</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  {product.oldPrice && <span className="text-sm text-gray-400 line-through">{product.oldPrice}€</span>}
                  <span className="text-2xl font-bold text-red-600">{product.price}€</span>
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product.id)
                  }}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
