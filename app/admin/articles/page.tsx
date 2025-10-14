"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { Article, ArticleCategory } from "@/lib/types/database"

interface ArticleWithRelations extends Article {
  author?: {
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  }
  category?: ArticleCategory
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleWithRelations[]>([])
  const [categories, setCategories] = useState<ArticleCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<ArticleWithRelations | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("Chargement des données...")

      // Charger les articles
      const articlesResponse = await fetch(
        "/api/admin/articles?" +
          new URLSearchParams({
            status: statusFilter,
            category: categoryFilter,
            search: searchTerm,
          }),
      )

      console.log("Réponse articles:", articlesResponse.status, articlesResponse.statusText)

      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json()
        console.log("Données articles reçues:", articlesData)
        setArticles(articlesData.data || [])
      } else {
        const errorText = await articlesResponse.text()
        console.error("Erreur lors du chargement des articles:", errorText)
        setError(`Erreur lors du chargement des articles: ${articlesResponse.status} ${articlesResponse.statusText}`)
      }

      // Charger les catégories
      const categoriesResponse = await fetch("/api/admin/categories")
      console.log("Réponse catégories:", categoriesResponse.status, categoriesResponse.statusText)
      
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json()
        console.log("Données catégories reçues:", categoriesData)
        setCategories(categoriesData.data || [])
      } else {
        const errorText = await categoriesResponse.text()
        console.error("Erreur lors du chargement des catégories:", errorText)
        setError(`Erreur lors du chargement des catégories: ${categoriesResponse.status} ${categoriesResponse.statusText}`)
      }
    } catch (error) {
      console.error("Erreur générale lors du chargement:", error)
      setError(`Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadData()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, statusFilter, categoryFilter])

  const handleCreateArticle = () => {
    setEditingArticle(null)
    setIsDialogOpen(true)
  }

  const handleEditArticle = (article: ArticleWithRelations) => {
    setEditingArticle(article)
    setIsDialogOpen(true)
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setArticles(articles.filter((article) => article.id !== id))
        toast({
          title: "Succès",
          description: "Article supprimé avec succès",
        })
      } else {
        throw new Error("Failed to delete article")
      }
    } catch (error) {
      console.error("Error deleting article:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive",
      })
    }
  }

  const handleSaveArticle = async (articleData: any) => {
    try {
      const url = editingArticle ? `/api/admin/articles/${editingArticle.id}` : "/api/admin/articles"

      const method = editingArticle ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })

      if (response.ok) {
        const result = await response.json()

        if (editingArticle) {
          setArticles(articles.map((article) => (article.id === editingArticle.id ? result.data : article)))
        } else {
          setArticles([result.data, ...articles])
        }

        setIsDialogOpen(false)
        toast({
          title: "Succès",
          description: editingArticle ? "Article modifié avec succès" : "Article créé avec succès",
        })
      } else {
        const errorData = await response.text()
        console.error("Server error:", errorData)
        throw new Error("Failed to save article")
      }
    } catch (error) {
      console.error("Error saving article:", error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'article",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des articles</h1>
              <p className="text-gray-600">Créez et gérez vos articles de blog</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={async () => {
                try {
                  const response = await fetch('/api/test-connection')
                  const data = await response.json()
                  console.log('Test de connexion:', data)
                  if (data.success) {
                    toast({
                      title: "Connexion réussie",
                      description: `${data.data.articlesCount} articles, ${data.data.categoriesCount} catégories trouvés`,
                    })
                  } else {
                    toast({
                      title: "Erreur de connexion",
                      description: data.error,
                      variant: "destructive",
                    })
                  }
                } catch (error) {
                  toast({
                    title: "Erreur",
                    description: "Impossible de tester la connexion",
                    variant: "destructive",
                  })
                }
              }}
            >
              Tester la connexion
            </Button>
            <Button onClick={handleCreateArticle} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel article
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Articles ({articles.length})</CardTitle>
                <CardDescription>Gérez vos articles de blog et leur contenu</CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                {/* Filtres */}
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="published">Publiés</SelectItem>
                    <SelectItem value="draft">Brouillons</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Toutes catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Recherche */}
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Vues</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{article.excerpt || "Pas d'extrait"}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {article.category ? (
                          <Badge variant="outline">{article.category.name}</Badge>
                        ) : (
                          <span className="text-gray-400">Non catégorisé</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {article.author ? (
                          <span>
                            {article.author.first_name} {article.author.last_name}
                          </span>
                        ) : (
                          <span className="text-gray-400">Anonyme</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={article.is_published ? "default" : "secondary"}>
                          {article.is_published ? "Publié" : "Brouillon"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1 text-gray-400" />
                          {article.view_count}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(article.created_at).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditArticle(article)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {articles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Aucun article trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Dialog pour créer/éditer un article */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? "Modifier l'article" : "Créer un nouvel article"}</DialogTitle>
              <DialogDescription>Remplissez les informations de l'article</DialogDescription>
            </DialogHeader>
            <ArticleForm
              article={editingArticle}
              categories={categories}
              onSave={handleSaveArticle}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function ArticleForm({
  article,
  categories,
  onSave,
  onCancel,
}: {
  article: ArticleWithRelations | null
  categories: ArticleCategory[]
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    category_id: article?.category_id || "none",
    species: article?.species || "none",
    age_range: article?.age_range || "none",
    difficulty_level: article?.difficulty_level || "none",
    reading_time: article?.reading_time || 5,
    is_vet_approved: article?.is_vet_approved || false,
    is_featured: article?.is_featured || false,
    is_published: article?.is_published || false,
    seo_title: article?.seo_title || "",
    seo_description: article?.seo_description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const dataToSave = {
      ...formData,
      published_at: formData.is_published ? new Date().toISOString() : null,
    }

    onSave(dataToSave)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select
            value={formData.category_id}
            onValueChange={(value) => setFormData({ ...formData, category_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune catégorie</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extrait</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenu *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="species">Espèce</Label>
          <Select value={formData.species} onValueChange={(value) => setFormData({ ...formData, species: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune</SelectItem>
              <SelectItem value="chien">Chien</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
              <SelectItem value="les-deux">Les deux</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age_range">Tranche d'âge</Label>
          <Select value={formData.age_range} onValueChange={(value) => setFormData({ ...formData, age_range: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune</SelectItem>
              <SelectItem value="chiot-chaton">Chiot/Chaton</SelectItem>
              <SelectItem value="adulte">Adulte</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="tous">Tous</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty_level">Niveau de difficulté</Label>
          <Select
            value={formData.difficulty_level}
            onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucun</SelectItem>
              <SelectItem value="debutant">Débutant</SelectItem>
              <SelectItem value="intermediaire">Intermédiaire</SelectItem>
              <SelectItem value="avance">Avancé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reading_time">Temps de lecture (minutes)</Label>
          <Input
            id="reading_time"
            type="number"
            value={formData.reading_time}
            onChange={(e) => setFormData({ ...formData, reading_time: Number.parseInt(e.target.value) || 0 })}
            min="1"
          />
        </div>
      </div>

      {/* SEO */}
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-lg font-medium">SEO</h3>
        <div className="space-y-2">
          <Label htmlFor="seo_title">Titre SEO</Label>
          <Input
            id="seo_title"
            value={formData.seo_title}
            onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
            placeholder="Titre pour les moteurs de recherche"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo_description">Description SEO</Label>
          <Textarea
            id="seo_description"
            value={formData.seo_description}
            onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
            placeholder="Description pour les moteurs de recherche"
            rows={3}
          />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-lg font-medium">Options</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
            <Label htmlFor="is_published">Publier</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
            <Label htmlFor="is_featured">Article vedette</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_vet_approved"
              checked={formData.is_vet_approved}
              onCheckedChange={(checked) => setFormData({ ...formData, is_vet_approved: checked })}
            />
            <Label htmlFor="is_vet_approved">Approuvé par un vétérinaire</Label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
          {article ? "Modifier" : "Créer"}
        </Button>
      </DialogFooter>
    </form>
  )
}
