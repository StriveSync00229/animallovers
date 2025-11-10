"use client"

import { useState, useEffect } from "react"
import AdminLayoutWrapper from "@/components/admin/admin-layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  subcategories?: Category[]
}

interface Article {
  id: string
  title: string
  excerpt: string | null
  content: string
  featured_image: string | null
  category_id: string | null
  subcategory_id: string | null
  species: "chien" | "chat" | "les-deux" | "autre" | null
  age_range: "chiot-chaton" | "adulte" | "senior" | "tous" | null
  difficulty_level: "debutant" | "intermediaire" | "avance" | null
  reading_time: number | null
  is_vet_approved: boolean
  is_featured: boolean
  is_published: boolean
  is_ebook?: boolean
  price?: number | null
  pdf_url?: string | null
  category?: Category
  subcategory?: Category
  created_at: string
}

export default function DressageSantePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [articlesLoading, setArticlesLoading] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [showAddSubcategory, setShowAddSubcategory] = useState(false)
  const [showAddArticle, setShowAddArticle] = useState(false)
  const [showAddEbook, setShowAddEbook] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subcategories: "",
  })
  const [articleFormData, setArticleFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category_id: "",
    subcategory_id: "",
    species: "" as "chien" | "chat" | "les-deux" | "autre" | "",
    age_range: "" as "chiot-chaton" | "adulte" | "senior" | "tous" | "",
    difficulty_level: "" as "debutant" | "intermediaire" | "avance" | "",
    reading_time: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    is_published: false,
    is_featured: false,
    is_vet_approved: false,
  })
  const [ebookFormData, setEbookFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category_id: "",
    subcategory_id: "",
    species: "" as "chien" | "chat" | "les-deux" | "autre" | "",
    age_range: "" as "chiot-chaton" | "adulte" | "senior" | "tous" | "",
    difficulty_level: "" as "debutant" | "intermediaire" | "avance" | "",
    reading_time: "",
    price: "",
    pdf_url: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    is_published: false,
    is_featured: false,
    is_vet_approved: false,
  })
  const [subcategoryName, setSubcategoryName] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null)
  const { toast } = useToast()

  // Charger les catégories et articles depuis l'API
  useEffect(() => {
    loadCategories()
    loadArticles()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/categories")
      const result = await response.json()

      if (result.success) {
        setCategories(result.data || [])
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de charger les catégories",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement des catégories",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est requis",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null,
          subcategories: formData.subcategories
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0),
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Catégorie créée avec succès",
        })
        setFormData({ name: "", description: "", subcategories: "" })
        setShowAddCategory(false)
        loadCategories()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de créer la catégorie",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la catégorie",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      subcategories: category.subcategories
        ? category.subcategories.map((sub) => sub.name).join("\n")
        : "",
    })
    setShowEditCategory(true)
  }

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingCategory || !formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est requis",
        variant: "destructive",
      })
      return
    }

    try {
      // Mettre à jour la catégorie principale
      const response = await fetch(`/api/admin/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Catégorie mise à jour avec succès",
        })
        setShowEditCategory(false)
        setEditingCategory(null)
        setFormData({ name: "", description: "", subcategories: "" })
        loadCategories()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de mettre à jour la catégorie",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la catégorie",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Catégorie supprimée avec succès",
        })
        loadCategories()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de supprimer la catégorie",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la catégorie",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/categories/${subcategoryId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Sous-catégorie supprimée avec succès",
        })
        loadCategories()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de supprimer la sous-catégorie",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la sous-catégorie:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la sous-catégorie",
        variant: "destructive",
      })
    }
  }

  const handleAddSubcategory = (category: Category) => {
    setSelectedCategoryForSub(category)
    setSubcategoryName("")
    setShowAddSubcategory(true)
  }

  const handleSubmitSubcategory = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCategoryForSub || !subcategoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la sous-catégorie est requis",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subcategoryName.trim(),
          parent_id: selectedCategoryForSub.id,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Sous-catégorie ajoutée avec succès",
        })
        setSubcategoryName("")
        setShowAddSubcategory(false)
        setSelectedCategoryForSub(null)
        loadCategories()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible d'ajouter la sous-catégorie",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la sous-catégorie:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la sous-catégorie",
        variant: "destructive",
      })
    }
  }

  // Charger les articles depuis l'API
  const loadArticles = async () => {
    try {
      setArticlesLoading(true)
      console.log("📥 Chargement des articles depuis /api/admin/articles...")
      
      const response = await fetch("/api/admin/articles")
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          error: `Erreur ${response.status}: ${response.statusText}` 
        }))
        console.error("❌ Erreur HTTP:", response.status, errorData)
        
        toast({
          title: "Erreur",
          description: errorData.error || errorData.details?.error || `Erreur ${response.status}`,
          variant: "destructive",
        })
        setArticles([])
        return
      }
      
      const result = await response.json()
      console.log("✅ Réponse reçue:", {
        success: result.success,
        count: result.count,
        articlesCount: result.articlesCount,
        ebooksCount: result.ebooksCount
      })

      if (result.success) {
        setArticles(result.data || [])
        console.log(`✅ ${result.data?.length || 0} articles chargés avec succès`)
      } else {
        console.error("❌ Réponse avec success=false:", result)
        toast({
          title: "Erreur",
          description: result.error || "Impossible de charger les articles",
          variant: "destructive",
        })
        setArticles([])
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement des articles:", error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Une erreur est survenue lors du chargement des articles"
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
      setArticles([])
    } finally {
      setArticlesLoading(false)
    }
  }

  // Obtenir les sous-catégories de la catégorie sélectionnée
  const getSubcategoriesForCategory = (categoryId: string): Category[] => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.subcategories || []
  }

  // Gérer le changement de catégorie
  const handleCategoryChange = (categoryId: string) => {
    setArticleFormData({
      ...articleFormData,
      category_id: categoryId,
      subcategory_id: "", // Réinitialiser la sous-catégorie quand on change de catégorie
    })
  }

  // Gérer le changement de catégorie pour les ebooks
  const handleEbookCategoryChange = (categoryId: string) => {
    setEbookFormData({
      ...ebookFormData,
      category_id: categoryId,
      subcategory_id: "", // Réinitialiser la sous-catégorie quand on change de catégorie
    })
  }

  // Upload de l'image de couverture
  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)
      setSelectedImageFile(file)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "ebooks/images")
      formData.append("type", "image")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setEbookFormData({
          ...ebookFormData,
          featured_image: result.data.url,
        })
        toast({
          title: "Succès",
          description: "Image uploadée avec succès",
        })
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de l'upload de l'image",
          variant: "destructive",
        })
        setSelectedImageFile(null)
      }
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'upload de l'image",
        variant: "destructive",
      })
      setSelectedImageFile(null)
    } finally {
      setUploadingImage(false)
    }
  }

  // Upload du PDF
  const handlePdfUpload = async (file: File) => {
    try {
      setUploadingPdf(true)
      setSelectedPdfFile(file)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "ebooks/pdfs")
      formData.append("type", "pdf")

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setEbookFormData({
          ...ebookFormData,
          pdf_url: result.data.url,
        })
        toast({
          title: "Succès",
          description: "PDF uploadé avec succès",
        })
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de l'upload du PDF",
          variant: "destructive",
        })
        setSelectedPdfFile(null)
      }
    } catch (error) {
      console.error("Erreur lors de l'upload du PDF:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'upload du PDF",
        variant: "destructive",
      })
      setSelectedPdfFile(null)
    } finally {
      setUploadingPdf(false)
    }
  }

  // Gérer le changement de fichier image
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  // Gérer le changement de fichier PDF
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handlePdfUpload(file)
    }
  }

  // Créer un ebook
  const handleAddEbook = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ebookFormData.title.trim() || !ebookFormData.content.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre et le contenu sont requis",
        variant: "destructive",
      })
      return
    }

    if (!ebookFormData.category_id) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une catégorie",
        variant: "destructive",
      })
      return
    }

    if (!ebookFormData.price || parseFloat(ebookFormData.price) <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix doit être supérieur à 0",
        variant: "destructive",
      })
      return
    }

    try {
      const ebookData = {
        title: ebookFormData.title,
        content: ebookFormData.content,
        excerpt: ebookFormData.excerpt || null,
        featured_image: ebookFormData.featured_image || null,
        category_id: ebookFormData.category_id,
        subcategory_id: ebookFormData.subcategory_id || null,
        species: ebookFormData.species || null,
        age_range: ebookFormData.age_range || null,
        difficulty_level: ebookFormData.difficulty_level || null,
        reading_time: ebookFormData.reading_time ? parseInt(ebookFormData.reading_time) : null,
        price: parseFloat(ebookFormData.price),
        pdf_url: ebookFormData.pdf_url || null,
        seo_title: ebookFormData.seo_title || null,
        seo_description: ebookFormData.seo_description || null,
        seo_keywords: ebookFormData.seo_keywords || null,
        is_published: ebookFormData.is_published,
        is_featured: ebookFormData.is_featured,
        is_vet_approved: ebookFormData.is_vet_approved,
        is_ebook: true,
      }

      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ebookData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Ebook créé avec succès",
        })
        // Réinitialiser le formulaire
        setEbookFormData({
          title: "",
          excerpt: "",
          content: "",
          featured_image: "",
          category_id: "",
          subcategory_id: "",
          species: "",
          age_range: "",
          difficulty_level: "",
          reading_time: "",
          price: "",
          pdf_url: "",
          seo_title: "",
          seo_description: "",
          seo_keywords: "",
          is_published: false,
          is_featured: false,
          is_vet_approved: false,
        })
        setSelectedImageFile(null)
        setSelectedPdfFile(null)
        setShowAddEbook(false)
        loadArticles()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de créer l'ebook",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'ebook:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'ebook",
        variant: "destructive",
      })
    }
  }

  // Créer un article
  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!articleFormData.title.trim() || !articleFormData.content.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre et le contenu sont requis",
        variant: "destructive",
      })
      return
    }

    if (!articleFormData.category_id) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une catégorie",
        variant: "destructive",
      })
      return
    }

    try {
      const articleData = {
        title: articleFormData.title,
        content: articleFormData.content,
        excerpt: articleFormData.excerpt || null,
        category_id: articleFormData.category_id,
        subcategory_id: articleFormData.subcategory_id || null,
        species: articleFormData.species || null,
        age_range: articleFormData.age_range || null,
        difficulty_level: articleFormData.difficulty_level || null,
        reading_time: articleFormData.reading_time ? parseInt(articleFormData.reading_time) : null,
        seo_title: articleFormData.seo_title || null,
        seo_description: articleFormData.seo_description || null,
        seo_keywords: articleFormData.seo_keywords || null,
        is_published: articleFormData.is_published,
        is_featured: articleFormData.is_featured,
        is_vet_approved: articleFormData.is_vet_approved,
      }

      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Article créé avec succès",
        })
        // Réinitialiser le formulaire
        setArticleFormData({
          title: "",
          excerpt: "",
          content: "",
          category_id: "",
          subcategory_id: "",
          species: "",
          age_range: "",
          difficulty_level: "",
          reading_time: "",
          seo_title: "",
          seo_description: "",
          seo_keywords: "",
          is_published: false,
          is_featured: false,
          is_vet_approved: false,
        })
        setShowAddArticle(false)
        loadArticles()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de créer l'article",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'article",
        variant: "destructive",
      })
    }
  }

  // Supprimer un article
  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Article supprimé avec succès",
        })
        loadArticles()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de supprimer l'article",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'article",
        variant: "destructive",
      })
    }
  }

  return (
    <AdminLayoutWrapper title="Dressage & Santé">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Dialog open={showAddArticle} onOpenChange={setShowAddArticle}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">Rédiger un Article</Button>
            </DialogTrigger>
          </Dialog>

          <Dialog open={showAddEbook} onOpenChange={setShowAddEbook}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">Publier un Ebook</Button>
            </DialogTrigger>
          </Dialog>

          <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Ajouter Catégorie</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter une Catégorie</DialogTitle>
                <DialogDescription>Créez une nouvelle catégorie et ses sous-catégories</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de la catégorie *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Comportement & Éducation"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Description de la catégorie (optionnel)"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategories">Sous-catégories (une par ligne)</Label>
                  <Textarea
                    id="subcategories"
                    placeholder="Les bases du dressage&#10;Techniques positives VS punitives&#10;Langage corporel"
                    value={formData.subcategories}
                    onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                    rows={5}
                  />
                  <p className="text-sm text-gray-500">
                    Entrez une sous-catégorie par ligne. Vous pourrez en ajouter d'autres plus tard.
                  </p>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Créer la catégorie
                </Button>
              </form>
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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucune catégorie n'a été créée pour le moment. Créez-en une pour commencer.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                    {category.description && (
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    )}
                    {category.subcategories && category.subcategories.length > 0 ? (
                      <ul className="space-y-2">
                        {category.subcategories.map((sub) => (
                          <li
                            key={sub.id}
                            className="text-sm text-gray-600 flex items-center justify-between gap-2 p-2 bg-gray-50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              {sub.name}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 px-2"
                              onClick={() => handleDeleteSubcategory(sub.id)}
                            >
                              ×
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Aucune sous-catégorie</p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleAddSubcategory(category)}
                    >
                      + Ajouter une sous-catégorie
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog de modification */}
        <Dialog open={showEditCategory} onOpenChange={setShowEditCategory}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier la Catégorie</DialogTitle>
              <DialogDescription>Modifiez les informations de la catégorie</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateCategory} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom de la catégorie *</Label>
                <Input
                  id="edit-name"
                  placeholder="Ex: Comportement & Éducation"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Description de la catégorie (optionnel)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Sous-catégories existantes</Label>
                {editingCategory?.subcategories && editingCategory.subcategories.length > 0 ? (
                  <ul className="space-y-1 p-2 bg-gray-50 rounded">
                    {editingCategory.subcategories.map((sub) => (
                      <li key={sub.id} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">Aucune sous-catégorie</p>
                )}
                <p className="text-xs text-gray-500">
                  Pour ajouter des sous-catégories, créez-les après la modification de la catégorie.
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Enregistrer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditCategory(false)
                    setEditingCategory(null)
                    setFormData({ name: "", description: "", subcategories: "" })
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog d'ajout de sous-catégorie */}
        <Dialog open={showAddSubcategory} onOpenChange={setShowAddSubcategory}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter une Sous-catégorie</DialogTitle>
              <DialogDescription>
                Ajoutez une sous-catégorie à "{selectedCategoryForSub?.name}"
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitSubcategory} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subcategory-name">Nom de la sous-catégorie *</Label>
                <Input
                  id="subcategory-name"
                  placeholder="Ex: Les bases du dressage"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Ajouter
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddSubcategory(false)
                    setSelectedCategoryForSub(null)
                    setSubcategoryName("")
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog de création d'article */}
        <Dialog open={showAddArticle} onOpenChange={setShowAddArticle}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Rédiger un Nouvel Article</DialogTitle>
              <DialogDescription>Complétez tous les champs pour créer un article</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddArticle} className="space-y-6 py-4">
              {/* Titre */}
              <div className="space-y-2">
                <Label htmlFor="article-title">Titre de l'article *</Label>
                <Input
                  id="article-title"
                  placeholder="Ex: Les bases du dressage pour chiots"
                  value={articleFormData.title}
                  onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                  required
                />
              </div>

              {/* Extrait */}
              <div className="space-y-2">
                <Label htmlFor="article-excerpt">Extrait (résumé)</Label>
                <Textarea
                  id="article-excerpt"
                  placeholder="Un court résumé de l'article..."
                  value={articleFormData.excerpt}
                  onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Catégorie & Sous-catégorie */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="article-category">Catégorie *</Label>
                  <Select
                    value={articleFormData.category_id}
                    onValueChange={handleCategoryChange}
                    required
                  >
                    <SelectTrigger id="article-category">
                      <SelectValue placeholder="Choisir une catégorie" />
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
                  <Label htmlFor="article-subcategory">Sous-catégorie</Label>
                  <Select
                    value={articleFormData.subcategory_id}
                    onValueChange={(value) =>
                      setArticleFormData({ ...articleFormData, subcategory_id: value })
                    }
                    disabled={!articleFormData.category_id}
                  >
                    <SelectTrigger id="article-subcategory">
                      <SelectValue placeholder={articleFormData.category_id ? "Choisir une sous-catégorie" : "Sélectionnez d'abord une catégorie"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getSubcategoriesForCategory(articleFormData.category_id).map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contenu */}
              <div className="space-y-2">
                <Label htmlFor="article-content">Contenu de l'article *</Label>
                <Textarea
                  id="article-content"
                  placeholder="Rédigez votre article ici..."
                  value={articleFormData.content}
                  onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              {/* Espèce, Âge, Niveau */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="article-species">Espèce</Label>
                  <Select
                    value={articleFormData.species}
                    onValueChange={(value: "chien" | "chat" | "les-deux" | "autre") =>
                      setArticleFormData({ ...articleFormData, species: value })
                    }
                  >
                    <SelectTrigger id="article-species">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chien">Chien</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="les-deux">Les deux</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-age">Tranche d'âge</Label>
                  <Select
                    value={articleFormData.age_range}
                    onValueChange={(value: "chiot-chaton" | "adulte" | "senior" | "tous") =>
                      setArticleFormData({ ...articleFormData, age_range: value })
                    }
                  >
                    <SelectTrigger id="article-age">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chiot-chaton">Chiot/Chaton</SelectItem>
                      <SelectItem value="adulte">Adulte</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="tous">Tous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-level">Niveau de difficulté</Label>
                  <Select
                    value={articleFormData.difficulty_level}
                    onValueChange={(value: "debutant" | "intermediaire" | "avance") =>
                      setArticleFormData({ ...articleFormData, difficulty_level: value })
                    }
                  >
                    <SelectTrigger id="article-level">
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

              {/* Temps de lecture */}
              <div className="space-y-2">
                <Label htmlFor="article-reading-time">Temps de lecture (en minutes)</Label>
                <Input
                  id="article-reading-time"
                  type="number"
                  placeholder="10"
                  value={articleFormData.reading_time}
                  onChange={(e) => setArticleFormData({ ...articleFormData, reading_time: e.target.value })}
                  min="1"
                />
              </div>

              {/* SEO */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">SEO</h3>
                <div className="space-y-2">
                  <Label htmlFor="article-seo-title">Titre SEO</Label>
                  <Input
                    id="article-seo-title"
                    placeholder="Titre optimisé pour les moteurs de recherche"
                    value={articleFormData.seo_title}
                    onChange={(e) => setArticleFormData({ ...articleFormData, seo_title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-seo-description">Description SEO</Label>
                  <Textarea
                    id="article-seo-description"
                    placeholder="Description pour améliorer le référencement..."
                    value={articleFormData.seo_description}
                    onChange={(e) => setArticleFormData({ ...articleFormData, seo_description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-seo-keywords">Mots-clés SEO (séparés par des virgules)</Label>
                  <Input
                    id="article-seo-keywords"
                    placeholder="dressage, chien, éducation"
                    value={articleFormData.seo_keywords}
                    onChange={(e) => setArticleFormData({ ...articleFormData, seo_keywords: e.target.value })}
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Options</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="article-publish"
                    checked={articleFormData.is_published}
                    onCheckedChange={(checked) =>
                      setArticleFormData({ ...articleFormData, is_published: checked as boolean })
                    }
                  />
                  <Label htmlFor="article-publish" className="cursor-pointer">
                    Publier immédiatement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="article-featured"
                    checked={articleFormData.is_featured}
                    onCheckedChange={(checked) =>
                      setArticleFormData({ ...articleFormData, is_featured: checked as boolean })
                    }
                  />
                  <Label htmlFor="article-featured" className="cursor-pointer">
                    Article en vedette
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="article-vet"
                    checked={articleFormData.is_vet_approved}
                    onCheckedChange={(checked) =>
                      setArticleFormData({ ...articleFormData, is_vet_approved: checked as boolean })
                    }
                  />
                  <Label htmlFor="article-vet" className="cursor-pointer">
                    Approuvé par un vétérinaire
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Créer l'article
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog de création d'ebook */}
        <Dialog
          open={showAddEbook}
          onOpenChange={(open) => {
            setShowAddEbook(open)
            if (!open) {
              // Réinitialiser les fichiers sélectionnés quand on ferme le dialog
              setSelectedImageFile(null)
              setSelectedPdfFile(null)
            }
          }}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Publier un Nouvel Ebook</DialogTitle>
              <DialogDescription>Complétez tous les champs pour créer un ebook</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEbook} className="space-y-6 py-4">
              {/* Titre */}
              <div className="space-y-2">
                <Label htmlFor="ebook-title">Titre de l'ebook *</Label>
                <Input
                  id="ebook-title"
                  placeholder="Ex: Guide complet du dressage canin"
                  value={ebookFormData.title}
                  onChange={(e) => setEbookFormData({ ...ebookFormData, title: e.target.value })}
                  required
                />
              </div>

              {/* Extrait */}
              <div className="space-y-2">
                <Label htmlFor="ebook-excerpt">Extrait (résumé)</Label>
                <Textarea
                  id="ebook-excerpt"
                  placeholder="Un court résumé de l'ebook..."
                  value={ebookFormData.excerpt}
                  onChange={(e) => setEbookFormData({ ...ebookFormData, excerpt: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Image de couverture */}
              <div className="space-y-2">
                <Label htmlFor="ebook-featured-image">Image de couverture</Label>
                <div className="space-y-3">
                  {/* Upload de fichier */}
                  <div className="space-y-2">
                    <Label htmlFor="ebook-image-file" className="text-sm font-normal text-gray-600">
                      Sélectionner un fichier depuis votre appareil
                    </Label>
                    <Input
                      id="ebook-image-file"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleImageFileChange}
                      disabled={uploadingImage}
                      className="cursor-pointer"
                    />
                    {uploadingImage && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Upload en cours...
                      </div>
                    )}
                    {selectedImageFile && !uploadingImage && (
                      <p className="text-sm text-green-600">
                        ✓ Fichier sélectionné: {selectedImageFile.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Ou URL */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Ou</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ebook-featured-image-url" className="text-sm font-normal text-gray-600">
                      Entrer une URL
                    </Label>
                    <Input
                      id="ebook-featured-image-url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={ebookFormData.featured_image}
                      onChange={(e) => setEbookFormData({ ...ebookFormData, featured_image: e.target.value })}
                    />
                  </div>
                </div>
                {ebookFormData.featured_image && (
                  <div className="mt-2">
                    <img
                      src={ebookFormData.featured_image}
                      alt="Aperçu"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Formats acceptés: JPEG, PNG, WebP, GIF (max 10MB). Taille recommandée: 800x600px
                </p>
              </div>

              {/* Catégorie & Sous-catégorie */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ebook-category">Catégorie *</Label>
                  <Select
                    value={ebookFormData.category_id}
                    onValueChange={handleEbookCategoryChange}
                    required
                  >
                    <SelectTrigger id="ebook-category">
                      <SelectValue placeholder="Choisir une catégorie" />
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
                  <Label htmlFor="ebook-subcategory">Sous-catégorie</Label>
                  <Select
                    value={ebookFormData.subcategory_id}
                    onValueChange={(value) =>
                      setEbookFormData({ ...ebookFormData, subcategory_id: value })
                    }
                    disabled={!ebookFormData.category_id}
                  >
                    <SelectTrigger id="ebook-subcategory">
                      <SelectValue placeholder={ebookFormData.category_id ? "Choisir une sous-catégorie" : "Sélectionnez d'abord une catégorie"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getSubcategoriesForCategory(ebookFormData.category_id).map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Prix */}
              <div className="space-y-2">
                <Label htmlFor="ebook-price">Prix (€) *</Label>
                <Input
                  id="ebook-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="19.99"
                  value={ebookFormData.price}
                  onChange={(e) => setEbookFormData({ ...ebookFormData, price: e.target.value })}
                  required
                />
              </div>

              {/* PDF */}
              <div className="space-y-2">
                <Label htmlFor="ebook-pdf">Fichier PDF de l'ebook</Label>
                <div className="space-y-3">
                  {/* Upload de fichier */}
                  <div className="space-y-2">
                    <Label htmlFor="ebook-pdf-file" className="text-sm font-normal text-gray-600">
                      Sélectionner un fichier PDF depuis votre appareil
                    </Label>
                    <Input
                      id="ebook-pdf-file"
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfFileChange}
                      disabled={uploadingPdf}
                      className="cursor-pointer"
                    />
                    {uploadingPdf && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Upload en cours...
                      </div>
                    )}
                    {selectedPdfFile && !uploadingPdf && (
                      <p className="text-sm text-green-600">
                        ✓ Fichier sélectionné: {selectedPdfFile.name} ({(selectedPdfFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>
                  
                  {/* Ou URL */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Ou</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ebook-pdf-url" className="text-sm font-normal text-gray-600">
                      Entrer une URL
                    </Label>
                    <Input
                      id="ebook-pdf-url"
                      type="url"
                      placeholder="https://example.com/ebook.pdf"
                      value={ebookFormData.pdf_url}
                      onChange={(e) => setEbookFormData({ ...ebookFormData, pdf_url: e.target.value })}
                    />
                  </div>
                </div>
                {ebookFormData.pdf_url && (
                  <div className="mt-2">
                    <a
                      href={ebookFormData.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <span>📄</span>
                      <span>Voir le PDF</span>
                    </a>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Format accepté: PDF (max 50MB)
                </p>
              </div>

              {/* Contenu */}
              <div className="space-y-2">
                <Label htmlFor="ebook-content">Contenu de l'ebook *</Label>
                <Textarea
                  id="ebook-content"
                  placeholder="Rédigez le contenu de l'ebook ici..."
                  value={ebookFormData.content}
                  onChange={(e) => setEbookFormData({ ...ebookFormData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              {/* Espèce, Âge, Niveau */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ebook-species">Espèce</Label>
                  <Select
                    value={ebookFormData.species}
                    onValueChange={(value: "chien" | "chat" | "les-deux" | "autre") =>
                      setEbookFormData({ ...ebookFormData, species: value })
                    }
                  >
                    <SelectTrigger id="ebook-species">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chien">Chien</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="les-deux">Les deux</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ebook-age">Tranche d'âge</Label>
                  <Select
                    value={ebookFormData.age_range}
                    onValueChange={(value: "chiot-chaton" | "adulte" | "senior" | "tous") =>
                      setEbookFormData({ ...ebookFormData, age_range: value })
                    }
                  >
                    <SelectTrigger id="ebook-age">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chiot-chaton">Chiot/Chaton</SelectItem>
                      <SelectItem value="adulte">Adulte</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="tous">Tous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ebook-level">Niveau de difficulté</Label>
                  <Select
                    value={ebookFormData.difficulty_level}
                    onValueChange={(value: "debutant" | "intermediaire" | "avance") =>
                      setEbookFormData({ ...ebookFormData, difficulty_level: value })
                    }
                  >
                    <SelectTrigger id="ebook-level">
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

              {/* Temps de lecture */}
              <div className="space-y-2">
                <Label htmlFor="ebook-reading-time">Temps de lecture (en minutes)</Label>
                <Input
                  id="ebook-reading-time"
                  type="number"
                  placeholder="10"
                  value={ebookFormData.reading_time}
                  onChange={(e) => setEbookFormData({ ...ebookFormData, reading_time: e.target.value })}
                  min="1"
                />
              </div>

              {/* SEO */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">SEO</h3>
                <div className="space-y-2">
                  <Label htmlFor="ebook-seo-title">Titre SEO</Label>
                  <Input
                    id="ebook-seo-title"
                    placeholder="Titre optimisé pour les moteurs de recherche"
                    value={ebookFormData.seo_title}
                    onChange={(e) => setEbookFormData({ ...ebookFormData, seo_title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ebook-seo-description">Description SEO</Label>
                  <Textarea
                    id="ebook-seo-description"
                    placeholder="Description pour améliorer le référencement..."
                    value={ebookFormData.seo_description}
                    onChange={(e) => setEbookFormData({ ...ebookFormData, seo_description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ebook-seo-keywords">Mots-clés SEO (séparés par des virgules)</Label>
                  <Input
                    id="ebook-seo-keywords"
                    placeholder="ebook, dressage, chien"
                    value={ebookFormData.seo_keywords}
                    onChange={(e) => setEbookFormData({ ...ebookFormData, seo_keywords: e.target.value })}
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Options</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ebook-publish"
                    checked={ebookFormData.is_published}
                    onCheckedChange={(checked) =>
                      setEbookFormData({ ...ebookFormData, is_published: checked as boolean })
                    }
                  />
                  <Label htmlFor="ebook-publish" className="cursor-pointer">
                    Publier immédiatement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ebook-featured"
                    checked={ebookFormData.is_featured}
                    onCheckedChange={(checked) =>
                      setEbookFormData({ ...ebookFormData, is_featured: checked as boolean })
                    }
                  />
                  <Label htmlFor="ebook-featured" className="cursor-pointer">
                    Ebook en vedette
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ebook-vet"
                    checked={ebookFormData.is_vet_approved}
                    onCheckedChange={(checked) =>
                      setEbookFormData({ ...ebookFormData, is_vet_approved: checked as boolean })
                    }
                  />
                  <Label htmlFor="ebook-vet" className="cursor-pointer">
                    Approuvé par un vétérinaire
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Publier l'ebook
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Liste des articles */}
        <Card className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Articles Publiés</CardTitle>
            <CardDescription>Gérez vos articles et ebooks</CardDescription>
          </CardHeader>
          <CardContent>
            {articlesLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun article n'a été créé pour le moment. Créez-en un pour commencer.
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => {
                  const category = categories.find((cat) => cat.id === article.category_id)
                  const subcategory = category?.subcategories?.find((sub) => sub.id === article.subcategory_id)
                  return (
                    <div
                      key={article.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                            <p className="text-sm text-gray-600">
                              {category?.name || "Sans catégorie"}
                              {subcategory && ` • ${subcategory.name}`}
                            </p>
                            {article.excerpt && (
                              <p className="text-sm text-gray-500 mt-2">{article.excerpt}</p>
                            )}
                          </div>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              article.is_published
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {article.is_published ? "Publié" : "Brouillon"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.species && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {article.species === "chien"
                                ? "Chien"
                                : article.species === "chat"
                                ? "Chat"
                                : article.species === "les-deux"
                                ? "Les deux"
                                : "Autre"}
                            </span>
                          )}
                          {article.age_range && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {article.age_range === "chiot-chaton"
                                ? "Chiot/Chaton"
                                : article.age_range === "adulte"
                                ? "Adulte"
                                : article.age_range === "senior"
                                ? "Senior"
                                : "Tous"}
                            </span>
                          )}
                          {article.difficulty_level && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {article.difficulty_level === "debutant"
                                ? "Débutant"
                                : article.difficulty_level === "intermediaire"
                                ? "Intermédiaire"
                                : "Avancé"}
                            </span>
                          )}
                          {article.reading_time && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {article.reading_time} min
                            </span>
                          )}
                          {article.is_featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                              En vedette
                            </span>
                          )}
                            {article.is_vet_approved && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                              Approuvé vétérinaire
                            </span>
                          )}
                          {(article as any).is_ebook && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">
                              📚 Ebook
                            </span>
                          )}
                          {(article as any).price && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-semibold">
                              {(article as any).price}€
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayoutWrapper>
  )
}
