"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
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
import { useToast } from "@/hooks/use-toast"
import ProductImage from "@/components/products/product-image"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  featured_image: string | null
  species: "chien" | "chat" | "mixte" | null
  is_featured: boolean
  is_bestseller: boolean
  is_new: boolean
  is_active: boolean
  stock_quantity: number
  category_id: string | null
  review_count: number
  rating_average: number
}

interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  children?: ProductCategory[]
}

export default function ProduitsPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // États
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [categoriesHierarchy, setCategoriesHierarchy] = useState<ProductCategory[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  // Formulaire de catégorie
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    subcategories: "",
  })
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileInputEditRef = useRef<HTMLInputElement>(null)

  // Formulaire de création/modification
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    featured_image: "",
    species: "",
    category_id: "",
    subcategory_id: "",
    is_featured: false,
    is_bestseller: false,
    is_new: false,
    is_active: true,
    stock_quantity: "0",
  })

  // Charger les produits
  const loadProducts = async () => {
    try {
      setProductsLoading(true)
      console.log("📥 Chargement des produits depuis /api/admin/products...")
      
      const response = await fetch("/api/admin/products")
      
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
        setProducts([])
        return
      }
      
      const result = await response.json()
      console.log("✅ Réponse reçue:", {
        success: result.success,
        count: result.count,
        dataLength: result.data?.length || 0
      })

      if (result.success) {
        const productsData = result.data || []
        setProducts(productsData)
        console.log(`✅ ${productsData.length} produits chargés avec succès`)
      } else {
        console.error("❌ Réponse avec success=false:", result)
        toast({
          title: "Erreur",
          description: result.error || "Impossible de charger les produits",
          variant: "destructive",
        })
        setProducts([])
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement des produits:", error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Une erreur est survenue lors du chargement des produits"
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
      setProducts([])
    } finally {
      setProductsLoading(false)
    }
  }

  // Charger les catégories
  const loadCategories = async () => {
    try {
      const response = await fetch("/api/admin/product-categories?includeInactive=false")
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          error: `Erreur ${response.status}: ${response.statusText}` 
        }))
        console.error("❌ Erreur HTTP:", response.status, errorData)
        return
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        setCategoriesHierarchy(result.data)
        // Aplatir les catégories avec leurs sous-catégories
        const allCategories: ProductCategory[] = []
        result.data.forEach((cat: any) => {
          allCategories.push(cat)
          if (cat.children && cat.children.length > 0) {
            allCategories.push(...cat.children)
          }
        })
        setCategories(allCategories)
      } else {
        setCategoriesHierarchy([])
        setCategories([])
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement des catégories:", error)
      setCategoriesHierarchy([])
      setCategories([])
    }
  }

  // Créer une catégorie
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!categoryFormData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est requis",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/admin/product-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryFormData.name,
          description: categoryFormData.description || null,
          subcategories: categoryFormData.subcategories
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
        setCategoryFormData({ name: "", description: "", subcategories: "" })
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

  // Calculer les catégories principales et sous-catégories
  const mainCategories = categoriesHierarchy.filter((cat) => !cat.parent_id)
  const getSubcategories = (categoryId: string): ProductCategory[] => {
    const category = categoriesHierarchy.find((cat) => cat.id === categoryId)
    return category?.children || []
  }

  // Effects
  useEffect(() => {
    loadProducts()
    loadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Créer un produit
  const handleCreateProduct = async () => {
    try {
      if (!productFormData.name || !productFormData.price) {
        toast({
          title: "Erreur",
          description: "Le nom et le prix sont requis",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productFormData,
          price: parseFloat(productFormData.price),
          original_price: productFormData.original_price ? parseFloat(productFormData.original_price) : null,
          stock_quantity: parseInt(productFormData.stock_quantity) || 0,
          category_id: productFormData.category_id || null,
          subcategory_id: productFormData.subcategory_id || null,
          species: productFormData.species || null,
          featured_image: productFormData.featured_image || null,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Produit créé avec succès",
        })
        setShowAddProduct(false)
        resetForm()
        loadProducts()
      } else {
        console.error("Erreur API:", result)
        toast({
          title: "Erreur",
          description: result.error || result.message || "Impossible de créer le produit",
          variant: "destructive",
        })
        if (result.details && process.env.NODE_ENV === "development") {
          console.error("Détails de l'erreur:", result.details)
        }
      }
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la création du produit",
        variant: "destructive",
      })
    }
  }

  // Supprimer un produit
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Succès",
          description: "Produit supprimé avec succès",
        })
        loadProducts()
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de supprimer le produit",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du produit",
        variant: "destructive",
      })
    }
  }

  // Réinitialiser le formulaire
  const resetForm = () => {
    setProductFormData({
      name: "",
      description: "",
      price: "",
      original_price: "",
      featured_image: "",
      species: "",
      category_id: "",
      subcategory_id: "",
      is_featured: false,
      is_bestseller: false,
      is_new: false,
      is_active: true,
      stock_quantity: "0",
    })
    setSelectedProduct(null)
    setImagePreview(null)
  }

  // Gérer l'upload d'image
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Vérifier le type de fichier
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Erreur",
        description: "Type de fichier non autorisé. Types autorisés: JPEG, PNG, WebP, GIF",
        variant: "destructive",
      })
      return
    }

    // Vérifier la taille (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast({
        title: "Erreur",
        description: "Le fichier est trop volumineux. Taille maximale: 10MB",
        variant: "destructive",
      })
      return
    }

    // Afficher un aperçu de l'image
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Uploader le fichier
    try {
      setUploadingImage(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "products")
      formData.append("type", "image")
      formData.append("bucket", "products") // Utiliser le bucket products

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        console.error("❌ Erreur HTTP:", response.status, result)
        
        toast({
          title: "Erreur d'upload",
          description: result.error || result.message || `Erreur ${response.status}: ${response.statusText}`,
          variant: "destructive",
        })
        
        // Afficher des instructions si le bucket n'existe pas
        if (result.hint) {
          setTimeout(() => {
            toast({
              title: "💡 Solution",
              description: result.hint,
              variant: "default",
            })
          }, 1000)
        }
        
        if (result.availableBuckets) {
          console.log("📦 Buckets disponibles:", result.availableBuckets)
          toast({
            title: "Information",
            description: `Buckets disponibles: ${result.availableBuckets.join(", ")}`,
            variant: "default",
          })
        }
        
        if (result.instructions) {
          console.log("📝 Instructions:", result.instructions)
        }
        
        setImagePreview(null)
        return
      }

      // Succès
      setProductFormData({
        ...productFormData,
        featured_image: result.data.url,
      })
      
      toast({
        title: "Succès",
        description: result.message || "Image uploadée avec succès",
      })
      
      // Afficher un avertissement si le fichier a été uploadé dans un autre bucket
      if (result.warning) {
        setTimeout(() => {
          toast({
            title: "Information",
            description: result.warning,
            variant: "default",
          })
        }, 1500)
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'upload de l'image",
        variant: "destructive",
      })
      setImagePreview(null)
    } finally {
      setUploadingImage(false)
    }
  }

  // Ouvrir le formulaire d'édition
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setProductFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      featured_image: product.featured_image || "",
      species: product.species || "",
      category_id: product.category_id || "",
      subcategory_id: (product as any).subcategory_id || "",
      is_featured: product.is_featured,
      is_bestseller: product.is_bestseller,
      is_new: product.is_new,
      is_active: product.is_active,
      stock_quantity: product.stock_quantity.toString(),
    })
    setImagePreview(product.featured_image || null)
    setShowEditProduct(true)
  }

  return (
    <AdminLayoutWrapper title="Gestion des Produits">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700" onClick={resetForm}>
                  Ajouter un Produit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un Nouveau Produit</DialogTitle>
                  <DialogDescription>Complétez tous les champs pour créer un produit</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label>Nom du produit *</Label>
                  <Input
                    placeholder="Ex: Croquettes Premium Chien Adulte"
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description du produit</Label>
                  <Textarea
                    placeholder="Décrivez le produit en détail..."
                    rows={4}
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Image du produit</Label>
                  <div className="space-y-3">
                    {/* Bouton de téléchargement */}
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadingImage ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Upload en cours...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>
                            Choisir une image
                          </>
                        )}
                      </button>
                      <input
                        ref={fileInputRef}
                        id="image-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-500">ou</span>
                    </div>

                    {/* Aperçu de l'image */}
                    {(imagePreview || productFormData.featured_image) && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <ProductImage
                          src={imagePreview || productFormData.featured_image}
                          alt="Aperçu"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            setProductFormData({ ...productFormData, featured_image: "" })
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Champ URL (optionnel) */}
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Ou entrez une URL d'image</Label>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={productFormData.featured_image}
                        onChange={(e) => {
                          setProductFormData({ ...productFormData, featured_image: e.target.value })
                          if (e.target.value) {
                            setImagePreview(e.target.value)
                          } else {
                            setImagePreview(null)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie principale</Label>
                    <Select
                      value={productFormData.category_id || "none"}
                      onValueChange={(value) => {
                        const categoryId = value === "none" ? "" : value
                        setProductFormData({
                          ...productFormData,
                          category_id: categoryId,
                          subcategory_id: "", // Réinitialiser la sous-catégorie
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune catégorie</SelectItem>
                        {mainCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sous-catégorie (optionnel)</Label>
                    <Select
                      value={productFormData.subcategory_id || "none"}
                      onValueChange={(value) => {
                        const subcategoryId = value === "none" ? "" : value
                        setProductFormData({ ...productFormData, subcategory_id: subcategoryId })
                      }}
                      disabled={!productFormData.category_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une sous-catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune sous-catégorie</SelectItem>
                        {productFormData.category_id &&
                          getSubcategories(productFormData.category_id).map((subcategory) => (
                            <SelectItem key={subcategory.id} value={subcategory.id}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Species */}
                <div className="space-y-2">
                  <Label>Espèce</Label>
                  <Select
                    value={productFormData.species}
                    onValueChange={(value) => setProductFormData({ ...productFormData, species: value })}
                  >
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

                {/* Price */}
                <div className="space-y-2">
                  <Label>Prix du produit (€) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="45.99"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                  />
                </div>

                {/* Original Price */}
                <div className="space-y-2">
                  <Label>Prix original (€) - pour afficher une réduction</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="59.99"
                    value={productFormData.original_price}
                    onChange={(e) => setProductFormData({ ...productFormData, original_price: e.target.value })}
                  />
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label>Quantité en stock</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={productFormData.stock_quantity}
                    onChange={(e) => setProductFormData({ ...productFormData, stock_quantity: e.target.value })}
                  />
                </div>

                {/* Options */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <Label>Options du produit</Label>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_featured"
                        checked={productFormData.is_featured}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_featured: checked === true })
                        }
                      />
                      <Label htmlFor="is_featured" className="cursor-pointer">
                        Produit en vedette
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_bestseller"
                        checked={productFormData.is_bestseller}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_bestseller: checked === true })
                        }
                      />
                      <Label htmlFor="is_bestseller" className="cursor-pointer">
                        Best-seller
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_new"
                        checked={productFormData.is_new}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_new: checked === true })
                        }
                      />
                      <Label htmlFor="is_new" className="cursor-pointer">
                        Nouveau produit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_active"
                        checked={productFormData.is_active}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_active: checked === true })
                        }
                      />
                      <Label htmlFor="is_active" className="cursor-pointer">
                        Actif (affiché sur le site)
                      </Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleCreateProduct}>
                  Créer le produit
                </Button>
                </div>
              </DialogContent>
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
                    <Label htmlFor="category-name">Nom de la catégorie *</Label>
                    <Input
                      id="category-name"
                      placeholder="Ex: Alimentation"
                      value={categoryFormData.name}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea
                      id="category-description"
                      placeholder="Description de la catégorie (optionnel)"
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-subcategories">Sous-catégories (une par ligne)</Label>
                    <Textarea
                      id="category-subcategories"
                      placeholder="Croquettes&#10;Pâtées&#10;Friandises"
                      value={categoryFormData.subcategories}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, subcategories: e.target.value })}
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
        </div>

        {/* Dialog d'édition */}
        <Dialog open={showEditProduct} onOpenChange={setShowEditProduct}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Modifier le Produit</DialogTitle>
                <DialogDescription>Modifiez les informations du produit</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label>Nom du produit *</Label>
                  <Input
                    placeholder="Ex: Croquettes Premium Chien Adulte"
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description du produit</Label>
                  <Textarea
                    placeholder="Décrivez le produit en détail..."
                    rows={4}
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Image du produit</Label>
                  <div className="space-y-3">
                    {/* Bouton de téléchargement */}
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputEditRef.current?.click()}
                        disabled={uploadingImage}
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadingImage ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Upload en cours...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>
                            Choisir une image
                          </>
                        )}
                      </button>
                      <input
                        ref={fileInputEditRef}
                        id="image-upload-edit"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-500">ou</span>
                    </div>

                    {/* Aperçu de l'image */}
                    {(imagePreview || productFormData.featured_image) && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <ProductImage
                          src={imagePreview || productFormData.featured_image}
                          alt="Aperçu"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            setProductFormData({ ...productFormData, featured_image: "" })
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Champ URL (optionnel) */}
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">Ou entrez une URL d'image</Label>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={productFormData.featured_image}
                        onChange={(e) => {
                          setProductFormData({ ...productFormData, featured_image: e.target.value })
                          if (e.target.value) {
                            setImagePreview(e.target.value)
                          } else {
                            setImagePreview(null)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie principale</Label>
                    <Select
                      value={productFormData.category_id || "none"}
                      onValueChange={(value) => {
                        const categoryId = value === "none" ? "" : value
                        setProductFormData({
                          ...productFormData,
                          category_id: categoryId,
                          subcategory_id: "", // Réinitialiser la sous-catégorie
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune catégorie</SelectItem>
                        {mainCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sous-catégorie (optionnel)</Label>
                    <Select
                      value={productFormData.subcategory_id || "none"}
                      onValueChange={(value) => {
                        const subcategoryId = value === "none" ? "" : value
                        setProductFormData({ ...productFormData, subcategory_id: subcategoryId })
                      }}
                      disabled={!productFormData.category_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une sous-catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune sous-catégorie</SelectItem>
                        {productFormData.category_id &&
                          getSubcategories(productFormData.category_id).map((subcategory) => (
                            <SelectItem key={subcategory.id} value={subcategory.id}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Species */}
                <div className="space-y-2">
                  <Label>Espèce</Label>
                  <Select
                    value={productFormData.species}
                    onValueChange={(value) => setProductFormData({ ...productFormData, species: value })}
                  >
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

                {/* Price */}
                <div className="space-y-2">
                  <Label>Prix du produit (€) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="45.99"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                  />
                </div>

                {/* Original Price */}
                <div className="space-y-2">
                  <Label>Prix original (€) - pour afficher une réduction</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="59.99"
                    value={productFormData.original_price}
                    onChange={(e) => setProductFormData({ ...productFormData, original_price: e.target.value })}
                  />
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label>Quantité en stock</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={productFormData.stock_quantity}
                    onChange={(e) => setProductFormData({ ...productFormData, stock_quantity: e.target.value })}
                  />
                </div>

                {/* Options */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <Label>Options du produit</Label>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit_is_featured"
                        checked={productFormData.is_featured}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_featured: checked === true })
                        }
                      />
                      <Label htmlFor="edit_is_featured" className="cursor-pointer">
                        Produit en vedette
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit_is_bestseller"
                        checked={productFormData.is_bestseller}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_bestseller: checked === true })
                        }
                      />
                      <Label htmlFor="edit_is_bestseller" className="cursor-pointer">
                        Best-seller
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit_is_new"
                        checked={productFormData.is_new}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_new: checked === true })
                        }
                      />
                      <Label htmlFor="edit_is_new" className="cursor-pointer">
                        Nouveau produit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit_is_active"
                        checked={productFormData.is_active}
                        onCheckedChange={(checked) =>
                          setProductFormData({ ...productFormData, is_active: checked === true })
                        }
                      />
                      <Label htmlFor="edit_is_active" className="cursor-pointer">
                        Actif (affiché sur le site)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={async () => {
                      if (!selectedProduct) return

                      try {
                        if (!productFormData.name || !productFormData.price) {
                          toast({
                            title: "Erreur",
                            description: "Le nom et le prix sont requis",
                            variant: "destructive",
                          })
                          return
                        }

                        const response = await fetch(`/api/admin/products/${selectedProduct.id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ...productFormData,
                            price: parseFloat(productFormData.price),
                            original_price: productFormData.original_price ? parseFloat(productFormData.original_price) : null,
                            stock_quantity: parseInt(productFormData.stock_quantity) || 0,
                            category_id: productFormData.category_id || null,
                            species: productFormData.species || null,
                            featured_image: productFormData.featured_image || null,
                          }),
                        })

                        const result = await response.json()

                        if (result.success) {
                          toast({
                            title: "Succès",
                            description: "Produit modifié avec succès",
                          })
                          setShowEditProduct(false)
                          resetForm()
                          loadProducts()
                        } else {
                          console.error("Erreur API:", result)
                          toast({
                            title: "Erreur",
                            description: result.error || result.message || "Impossible de modifier le produit",
                            variant: "destructive",
                          })
                        }
                      } catch (error) {
                        console.error("Erreur lors de la modification du produit:", error)
                        toast({
                          title: "Erreur",
                          description: error instanceof Error ? error.message : "Une erreur est survenue lors de la modification du produit",
                          variant: "destructive",
                        })
                      }
                    }}
                  >
                    Enregistrer les modifications
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEditProduct(false)
                      resetForm()
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

        {/* Products List */}
        <Card className="animate-fadeInUp">
          <CardHeader>
            <CardTitle>Catalogue de Produits</CardTitle>
            <CardDescription>Gérez vos produits et leurs commentaires</CardDescription>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">Aucun produit n'a été créé pour le moment.</p>
                <p className="text-sm">Publiez-en un pour commencer.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                  >
                    <div className="w-full md:w-32 h-32 relative flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <ProductImage
                        src={product.featured_image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{product.description || "Aucune description"}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          {product.is_active && <Badge className="bg-green-100 text-green-700">Actif</Badge>}
                          {!product.is_active && <Badge className="bg-gray-100 text-gray-700">Inactif</Badge>}
                          {product.is_featured && <Badge className="bg-yellow-100 text-yellow-700">En vedette</Badge>}
                          {product.is_bestseller && <Badge className="bg-orange-100 text-orange-700">Best-seller</Badge>}
                          {product.is_new && <Badge className="bg-blue-100 text-blue-700">Nouveau</Badge>}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {product.species && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {product.species === "chien"
                              ? "Chien"
                              : product.species === "chat"
                                ? "Chat"
                                : "Mixte"}
                          </span>
                        )}
                        <span className="text-lg font-bold text-red-600">
                          {product.price.toFixed(2)}€
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.original_price.toFixed(2)}€
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          Stock: {product.stock_quantity}
                        </span>
                        {product.review_count > 0 && (
                          <span className="text-sm text-gray-500">
                            ⭐ {product.rating_average.toFixed(1)} ({product.review_count} avis)
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayoutWrapper>
  )
}
