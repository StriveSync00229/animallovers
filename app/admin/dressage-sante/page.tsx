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

const categories = [
  {
    id: "comportement",
    name: "Comportement & Éducation",
    subcategories: [
      "Les bases du dressage",
      "Techniques positives VS punitives",
      "Langage corporel",
      "Anxiété et agressivité",
    ],
  },
  {
    id: "sante",
    name: "Santé & Bien-être",
    subcategories: [
      "Calendrier de vaccination",
      "Maladies courantes",
      "Stérilisation & castration",
      "Alimentation équilibrée",
    ],
  },
  {
    id: "dressage-specifique",
    name: "Dressage spécifique",
    subcategories: ["Chiens de garde/Compagnie", "Chats d'appartement/extérieur", "Dressage à la laisse"],
  },
  {
    id: "remedes",
    name: "Remèdes naturels & soins",
    subcategories: ["Hygiène", "Recettes anti-puces/tiques", "Huiles essentielles"],
  },
]

const mockArticles = [
  {
    id: 1,
    title: "Les bases du dressage pour chiots",
    category: "Comportement & Éducation",
    subcategory: "Les bases du dressage",
    species: "Chien",
    age: "Chiot",
    level: "Débutant",
    readTime: "10 min",
    price: "9.99€",
    status: "Publié",
    featured: true,
    vetApproved: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Vaccination complète pour chats",
    category: "Santé & Bien-être",
    subcategory: "Calendrier de vaccination",
    species: "Chat",
    age: "Adulte",
    level: "Intermédiaire",
    readTime: "15 min",
    price: "12.99€",
    status: "Publié",
    featured: false,
    vetApproved: true,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function DressageSantePage() {
  const [articles, setArticles] = useState(mockArticles)
  const [showAddArticle, setShowAddArticle] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)

  return (
    <AdminLayoutWrapper title="Dressage & Santé">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Ajouter Catégorie</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter une Catégorie</DialogTitle>
                <DialogDescription>Créez une nouvelle catégorie et ses sous-catégories</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nom de la catégorie</Label>
                  <Input placeholder="Ex: Comportement & Éducation" />
                </div>
                <div className="space-y-2">
                  <Label>Sous-catégories (une par ligne)</Label>
                  <Textarea placeholder="Les bases du dressage&#10;Techniques positives VS punitives" rows={5} />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Créer la catégorie</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddArticle} onOpenChange={setShowAddArticle}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">Rédiger un Article</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Rédiger un Nouvel Article</DialogTitle>
                <DialogDescription>Complétez tous les champs pour créer un article</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Language */}
                <div className="space-y-2">
                  <Label>Version</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir la langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label>Image de couverture</Label>
                  <Input type="file" accept="image/*" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label>Titre de l'article</Label>
                  <Input placeholder="Ex: Les bases du dressage pour chiots" />
                </div>

                {/* Category & Subcategory */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sous-catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bases">Les bases du dressage</SelectItem>
                        <SelectItem value="techniques">Techniques positives VS punitives</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label>Contenu de l'article</Label>
                  <Textarea placeholder="Rédigez votre article ici..." rows={8} />
                </div>

                {/* Species, Age, Level */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Espèce</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chien">Chien</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                        <SelectItem value="both">Les deux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tranche d'âge</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chiot">Chiot</SelectItem>
                        <SelectItem value="chaton">Chaton</SelectItem>
                        <SelectItem value="adulte">Adulte</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Niveau de difficulté</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debutant">Débutant</SelectItem>
                        <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                        <SelectItem value="avance">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Read Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Temps de lecture</Label>
                    <Input type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Unité</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="min">Minutes</SelectItem>
                        <SelectItem value="h">Heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* PDF & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>PDF (Ebook)</Label>
                    <Input type="file" accept=".pdf" />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix du PDF</Label>
                    <Input type="number" step="0.01" placeholder="9.99" />
                  </div>
                </div>

                {/* SEO */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">SEO</h3>
                  <div className="space-y-2">
                    <Label>Titre SEO</Label>
                    <Input placeholder="Titre optimisé pour les moteurs de recherche" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description SEO</Label>
                    <Textarea placeholder="Description pour améliorer le référencement..." rows={3} />
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Options</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="publish" />
                    <Label htmlFor="publish" className="cursor-pointer">
                      Publier immédiatement
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <Label htmlFor="featured" className="cursor-pointer">
                      Article en vedette
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vet" />
                    <Label htmlFor="vet" className="cursor-pointer">
                      Approuvé par un vétérinaire
                    </Label>
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">Créer l'article</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Overview */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle>Catégories Existantes</CardTitle>
            <CardDescription>Gérez vos catégories et sous-catégories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">{category.name}</h3>
                  <ul className="space-y-1">
                    {category.subcategories.map((sub, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Articles Publiés</CardTitle>
            <CardDescription>Gérez vos articles et ebooks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                >
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                        <p className="text-sm text-gray-600">
                          {article.category} • {article.subcategory}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {article.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{article.species}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{article.age}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{article.level}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{article.readTime}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                        {article.price}
                      </span>
                      {article.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">En vedette</span>
                      )}
                      {article.vetApproved && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          Approuvé vétérinaire
                        </span>
                      )}
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
      </div>
    </AdminLayoutWrapper>
  )
}
