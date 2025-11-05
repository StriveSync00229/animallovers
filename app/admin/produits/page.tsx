"use client"

import { useState } from "react"
import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const mockProducts = [
  {
    id: 1,
    name: "Croquettes Premium Chien Adulte",
    description: "Nourriture équilibrée pour chiens adultes, riche en protéines",
    category: "Chien",
    price: 45.99,
    status: "Disponible",
    popular: true,
    image: "/placeholder.svg?height=200&width=200",
    comments: 12,
  },
  {
    id: 2,
    name: "Jouet Interactif Chat",
    description: "Jouet stimulant pour chats avec plumes et grelots",
    category: "Chat",
    price: 15.99,
    status: "Promotion",
    discount: 20,
    popular: false,
    image: "/placeholder.svg?height=200&width=200",
    comments: 8,
  },
  {
    id: 3,
    name: "Panier Confort XL",
    description: "Panier moelleux et confortable pour grands chiens",
    category: "Mixte",
    price: 89.99,
    status: "Réservation",
    discount: 15,
    popular: true,
    image: "/placeholder.svg?height=200&width=200",
    comments: 5,
  },
]

const mockComments = [
  {
    id: 1,
    productId: 1,
    user: "Marie Dupont",
    rating: 5,
    comment: "Excellent produit, mon chien adore ces croquettes!",
    date: "2025-01-15",
    approved: true,
  },
  {
    id: 2,
    productId: 1,
    user: "Jean Martin",
    rating: 4,
    comment: "Bon rapport qualité-prix, livraison rapide.",
    date: "2025-01-14",
    approved: false,
  },
]

export default function ProduitsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  return (
    <AdminLayoutWrapper title="Gestion des Produits">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Gérer les Catégories</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gestion des Catégories</DialogTitle>
                <DialogDescription>Ajoutez, modifiez ou supprimez des catégories de produits</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nom de la catégorie</Label>
                  <Input placeholder="Ex: Alimentation" />
                </div>
                <div className="space-y-3">
                  <Label>Catégories existantes</Label>
                  <div className="space-y-2">
                    {["Chien", "Chat", "Mixte"].map((cat) => (
                      <div key={cat} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{cat}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Ajouter la catégorie</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">Ajouter un Produit</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter un Nouveau Produit</DialogTitle>
                <DialogDescription>Complétez tous les champs pour créer un produit</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Image */}
                <div className="space-y-2">
                  <Label>Image du produit</Label>
                  <Input type="file" accept="image/*" />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label>Nom du produit</Label>
                  <Input placeholder="Ex: Croquettes Premium Chien Adulte" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description du produit</Label>
                  <Textarea placeholder="Décrivez le produit en détail..." rows={4} />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chien">Chien</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="mixte">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Popular Product */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="popular" />
                  <Label htmlFor="popular" className="cursor-pointer">
                    Ajouter dans les produits populaires
                  </Label>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label>Prix du produit (€)</Label>
                  <Input type="number" step="0.01" placeholder="45.99" />
                </div>

                {/* Status */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <Label>État du produit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir l'état" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="reservation">Faire une réservation</SelectItem>
                      <SelectItem value="promotion">Promotion</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label>Pourcentage de réduction (%)</Label>
                    <Input type="number" placeholder="20" min="0" max="100" />
                    <p className="text-xs text-gray-500">Applicable uniquement pour Réservation ou Promotion</p>
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">Créer le produit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products List */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle>Catalogue de Produits</CardTitle>
            <CardDescription>Gérez vos produits et leurs commentaires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {product.status === "Disponible" && (
                          <Badge className="bg-green-100 text-green-700">Disponible</Badge>
                        )}
                        {product.status === "Promotion" && (
                          <Badge className="bg-orange-100 text-orange-700">Promotion -{product.discount}%</Badge>
                        )}
                        {product.status === "Réservation" && (
                          <Badge className="bg-blue-100 text-blue-700">Réservation -{product.discount}%</Badge>
                        )}
                        {product.popular && <Badge className="bg-yellow-100 text-yellow-700">Populaire</Badge>}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{product.category}</span>
                      <span className="text-lg font-bold text-red-600">{product.price}€</span>
                      <button
                        onClick={() => {
                          setSelectedProduct(product.id)
                          setShowComments(true)
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {product.comments} commentaires
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comments Management Dialog */}
        <Dialog open={showComments} onOpenChange={setShowComments}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Gestion des Commentaires</DialogTitle>
              <DialogDescription>Modérez les commentaires avant leur publication</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{comment.user}</p>
                      <p className="text-sm text-gray-500">{comment.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < comment.rating ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                  <div className="flex items-center gap-3">
                    {comment.approved ? (
                      <Badge className="bg-green-100 text-green-700">Approuvé</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700">En attente</Badge>
                    )}
                    <Button variant="outline" size="sm">
                      {comment.approved ? "Masquer" : "Approuver"}
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayoutWrapper>
  )
}
