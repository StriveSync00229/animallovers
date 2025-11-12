import { createAdminClient } from "@/lib/supabase/server"

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  image_url: string | null
  parent_id: string | null
  species: "chien" | "chat" | "mixte" | null
  sort_order: number
  is_active: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
  children?: ProductCategory[]
  product_count?: number
}

export interface ProductCategoryInput {
  name: string
  slug?: string
  description?: string | null
  icon?: string | null
  image_url?: string | null
  parent_id?: string | null
  species?: "chien" | "chat" | "mixte" | null
  sort_order?: number
  is_active?: boolean
  seo_title?: string | null
  seo_description?: string | null
}

export class ProductCategoryService {
  /**
   * Générer un slug à partir d'un nom
   */
  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
      .replace(/[^a-z0-9]+/g, "-") // Remplacer les caractères non alphanumériques par des tirets
      .replace(/^-+|-+$/g, "") // Supprimer les tirets en début et fin
  }

  /**
   * 🔹 Récupérer toutes les catégories (avec organisation hiérarchique)
   */
  static async getAllCategories(includeInactive: boolean = false): Promise<ProductCategory[]> {
    const supabase = await createAdminClient()

    try {
      let query = supabase
        .from("product_categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false })

      if (!includeInactive) {
        query = query.eq("is_active", true)
      }

      const { data, error } = await query

      if (error) throw error

      const categories = (data || []).map((cat) => ({
        ...cat,
        children: [],
        product_count: 0,
      }))

      // Organiser les catégories avec leurs sous-catégories
      const parentCategories = categories.filter((cat) => !cat.parent_id)
      const childCategories = categories.filter((cat) => cat.parent_id)

      // Compter les produits par catégorie
      const productCounts = await this.getProductCountsByCategory()

      const categoriesWithChildren = parentCategories.map((category) => {
        const children = childCategories
          .filter((child) => child.parent_id === category.id)
          .map((child) => ({
            ...child,
            product_count: productCounts[child.id] || 0,
          }))
          .sort((a, b) => a.sort_order - b.sort_order)

        return {
          ...category,
          children,
          product_count: productCounts[category.id] || 0,
        }
      })

      return categoriesWithChildren
    } catch (error) {
      console.error("❌ Erreur dans getAllCategories:", error)
      throw new Error("Impossible de récupérer les catégories de produits.")
    }
  }

  /**
   * 🔹 Récupérer les catégories principales (sans sous-catégories)
   */
  static async getMainCategories(includeInactive: boolean = false): Promise<ProductCategory[]> {
    const supabase = await createAdminClient()

    try {
      let query = supabase
        .from("product_categories")
        .select("*")
        .is("parent_id", null)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false })

      if (!includeInactive) {
        query = query.eq("is_active", true)
      }

      const { data, error } = await query

      if (error) throw error
      return (data || []).map((cat) => ({
        ...cat,
        children: [],
        product_count: 0,
      }))
    } catch (error) {
      console.error("❌ Erreur dans getMainCategories:", error)
      throw new Error("Impossible de récupérer les catégories principales.")
    }
  }

  /**
   * 🔹 Récupérer les sous-catégories d'une catégorie
   */
  static async getSubcategories(parentId: string, includeInactive: boolean = false): Promise<ProductCategory[]> {
    const supabase = await createAdminClient()

    try {
      let query = supabase
        .from("product_categories")
        .select("*")
        .eq("parent_id", parentId)
        .order("sort_order", { ascending: true })

      if (!includeInactive) {
        query = query.eq("is_active", true)
      }

      const { data, error } = await query

      if (error) throw error
      return (data || []).map((cat) => ({
        ...cat,
        children: [],
        product_count: 0,
      }))
    } catch (error) {
      console.error("❌ Erreur dans getSubcategories:", error)
      throw new Error("Impossible de récupérer les sous-catégories.")
    }
  }

  /**
   * 🔹 Récupérer une catégorie par son ID
   */
  static async getCategoryById(id: string): Promise<ProductCategory | null> {
    const supabase = await createAdminClient()

    try {
      const { data, error } = await supabase
        .from("product_categories")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          // Aucun résultat
          return null
        }
        throw error
      }

      if (!data) return null

      // Récupérer les sous-catégories si c'est une catégorie principale
      const subcategories = await this.getSubcategories(id, true)
      const productCount = await this.getProductCount(id)

      return {
        ...data,
        children: subcategories,
        product_count: productCount,
      }
    } catch (error) {
      console.error("❌ Erreur dans getCategoryById:", error)
      throw new Error("Impossible de récupérer la catégorie.")
    }
  }

  /**
   * 🔹 Créer une catégorie
   */
  static async createCategory(categoryData: ProductCategoryInput): Promise<ProductCategory> {
    const supabase = await createAdminClient()

    try {
      // Vérifier si le slug existe déjà
      const slug = categoryData.slug || this.generateSlug(categoryData.name)
      const existingCategory = await supabase
        .from("product_categories")
        .select("id")
        .eq("slug", slug)
        .single()

      if (existingCategory.data) {
        // Slug existe déjà, ajouter un suffixe
        const timestamp = Date.now()
        const uniqueSlug = `${slug}-${timestamp}`
        categoryData.slug = uniqueSlug
      } else {
        categoryData.slug = slug
      }

      const { data, error } = await supabase
        .from("product_categories")
        .insert({
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description || null,
          icon: categoryData.icon || null,
          image_url: categoryData.image_url || null,
          parent_id: categoryData.parent_id || null,
          species: categoryData.species || null,
          sort_order: categoryData.sort_order || 0,
          is_active: categoryData.is_active !== undefined ? categoryData.is_active : true,
          seo_title: categoryData.seo_title || null,
          seo_description: categoryData.seo_description || null,
          created_at: new Date().toISOString(),
        })
        .select("*")
        .single()

      if (error) {
        console.error("❌ Erreur Supabase dans createCategory:")
        console.error("   Code:", error.code)
        console.error("   Message:", error.message)
        console.error("   Détails:", error.details)
        throw error
      }

      return {
        ...data,
        children: [],
        product_count: 0,
      }
    } catch (error) {
      console.error("❌ Erreur dans createCategory:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Impossible de créer la catégorie.")
    }
  }

  /**
   * 🔹 Mettre à jour une catégorie
   */
  static async updateCategory(id: string, categoryData: Partial<ProductCategoryInput>): Promise<ProductCategory> {
    const supabase = await createAdminClient()

    try {
      // Si le nom change, mettre à jour le slug
      if (categoryData.name && !categoryData.slug) {
        categoryData.slug = this.generateSlug(categoryData.name)
      }

      // Nettoyer les données (supprimer les propriétés undefined)
      const cleanedData: any = {}
      Object.keys(categoryData).forEach((key) => {
        if (categoryData[key as keyof ProductCategoryInput] !== undefined) {
          cleanedData[key] = categoryData[key as keyof ProductCategoryInput]
        }
      })

      const { data, error } = await supabase
        .from("product_categories")
        .update(cleanedData)
        .eq("id", id)
        .select("*")
        .single()

      if (error) {
        console.error("❌ Erreur Supabase dans updateCategory:")
        console.error("   Code:", error.code)
        console.error("   Message:", error.message)
        console.error("   Détails:", error.details)
        throw error
      }

      // Récupérer les sous-catégories et le nombre de produits
      const subcategories = await this.getSubcategories(id, true)
      const productCount = await this.getProductCount(id)

      return {
        ...data,
        children: subcategories,
        product_count: productCount,
      }
    } catch (error) {
      console.error("❌ Erreur dans updateCategory:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Impossible de mettre à jour la catégorie.")
    }
  }

  /**
   * 🔹 Supprimer une catégorie
   */
  static async deleteCategory(id: string): Promise<void> {
    const supabase = await createAdminClient()

    try {
      // Vérifier si la catégorie a des sous-catégories
      const subcategories = await this.getSubcategories(id, true)
      if (subcategories.length > 0) {
        throw new Error("Impossible de supprimer une catégorie qui a des sous-catégories.")
      }

      // Vérifier si la catégorie est utilisée par des produits
      const productCount = await this.getProductCount(id)
      if (productCount > 0) {
        throw new Error("Impossible de supprimer une catégorie qui est utilisée par des produits.")
      }

      const { error } = await supabase.from("product_categories").delete().eq("id", id)

      if (error) {
        console.error("❌ Erreur Supabase dans deleteCategory:")
        console.error("   Code:", error.code)
        console.error("   Message:", error.message)
        throw error
      }
    } catch (error) {
      console.error("❌ Erreur dans deleteCategory:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Impossible de supprimer la catégorie.")
    }
  }

  /**
   * 🔹 Compter les produits d'une catégorie
   */
  private static async getProductCount(categoryId: string): Promise<number> {
    const supabase = await createAdminClient()

    try {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .or(`category_id.eq.${categoryId},subcategory_id.eq.${categoryId}`)

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error("❌ Erreur dans getProductCount:", error)
      return 0
    }
  }

  /**
   * 🔹 Compter les produits par catégorie
   */
  private static async getProductCountsByCategory(): Promise<Record<string, number>> {
    const supabase = await createAdminClient()

    try {
      const { data, error } = await supabase.from("products").select("category_id, subcategory_id")

      if (error) throw error

      const counts: Record<string, number> = {}

      ;(data || []).forEach((product) => {
        if (product.category_id) {
          counts[product.category_id] = (counts[product.category_id] || 0) + 1
        }
        if (product.subcategory_id) {
          counts[product.subcategory_id] = (counts[product.subcategory_id] || 0) + 1
        }
      })

      return counts
    } catch (error) {
      console.error("❌ Erreur dans getProductCountsByCategory:", error)
      return {}
    }
  }

  /**
   * 🔹 Créer des sous-catégories en masse
   */
  static async createSubcategories(parentId: string, subcategoryNames: string[]): Promise<ProductCategory[]> {
    const supabase = await createAdminClient()

    try {
      const subcategories = subcategoryNames.map((name) => ({
        name: name.trim(),
        slug: this.generateSlug(name.trim()),
        parent_id: parentId,
        is_active: true,
        sort_order: 0,
        created_at: new Date().toISOString(),
      }))

      const { data, error } = await supabase
        .from("product_categories")
        .insert(subcategories)
        .select("*")

      if (error) {
        console.error("❌ Erreur Supabase dans createSubcategories:")
        console.error("   Code:", error.code)
        console.error("   Message:", error.message)
        console.error("   Détails:", error.details)
        throw error
      }

      return (
        (data || []).map((cat) => ({
          ...cat,
          children: [],
          product_count: 0,
        })) || []
      )
    } catch (error) {
      console.error("❌ Erreur dans createSubcategories:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Impossible de créer les sous-catégories.")
    }
  }
}

