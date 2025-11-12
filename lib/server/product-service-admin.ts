import { createAdminClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/types/database"

type Product = Database["public"]["Tables"]["products"]["Row"]
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"]
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"]

export class ProductService {
  /**
   * 🔹 Générer un slug à partir du nom
   */
  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  /**
   * 🔹 Récupérer tous les produits (admin)
   */
  static async getAllProducts(filters: {
    category?: string
    species?: string
    is_active?: boolean
    is_featured?: boolean
    search?: string
    limit?: number
    offset?: number
  } = {}) {
    const supabase = await createAdminClient()

    try {
      let query = supabase
        .from("products")
        .select(`
          *,
          product_brands!products_brand_id_fkey(name, logo_url),
          product_categories!products_category_id_fkey(name, slug, icon)
        `)
        .order("created_at", { ascending: false })

      if (filters.is_active !== undefined) {
        query = query.eq("is_active", filters.is_active)
      }

      if (filters.category) {
        query = query.eq("category_id", filters.category)
      }

      if (filters.species) {
        query = query.eq("species", filters.species)
      }

      if (filters.is_featured !== undefined) {
        query = query.eq("is_featured", filters.is_featured)
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) {
        console.error("❌ Erreur dans getAllProducts:", error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error("❌ Erreur dans getAllProducts:", error)
      throw new Error("Impossible de récupérer les produits.")
    }
  }

  /**
   * 🔹 Créer un produit
   */
  static async createProduct(productData: ProductInsert) {
    const supabase = await createAdminClient()

    try {
      // Générer un slug si non fourni
      const slug = productData.slug || this.generateSlug(productData.name)

      // Nettoyer les données
      const cleanedData: any = {
        ...productData,
        slug,
        description: productData.description || null,
        sku: productData.sku || null,
        brand_id: productData.brand_id || null,
        // Convertir les chaînes vides en null pour category_id et subcategory_id
        category_id: productData.category_id && typeof productData.category_id === "string" && productData.category_id.trim() !== "" ? productData.category_id : null,
        subcategory_id: productData.subcategory_id && typeof productData.subcategory_id === "string" && productData.subcategory_id.trim() !== "" ? productData.subcategory_id : null,
        original_price: productData.original_price || null,
        stock_quantity: productData.stock_quantity ?? 0,
        weight: productData.weight || null,
        species: productData.species || null,
        featured_image: productData.featured_image || null,
        gallery_images: productData.gallery_images || null,
        is_featured: productData.is_featured ?? false,
        is_bestseller: productData.is_bestseller ?? false,
        is_new: productData.is_new ?? false,
        is_active: productData.is_active ?? true,
        rating_average: productData.rating_average ?? 0,
        review_count: productData.review_count ?? 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from("products")
        .insert(cleanedData)
        .select(`
          *,
          product_brands!products_brand_id_fkey(name, logo_url),
          product_categories!products_category_id_fkey(name, slug, icon)
        `)
        .single()

      if (error) {
        console.error("❌ Erreur Supabase dans createProduct:")
        console.error("   Code:", error.code)
        console.error("   Message:", error.message)
        console.error("   Détails:", error.details)
        console.error("   Hint:", error.hint)
        throw error
      }

      return data
    } catch (error) {
      console.error("❌ Erreur dans createProduct:", error)
      if (error instanceof Error) {
        // Si c'est une erreur Supabase, extraire le message
        if ((error as any).code && (error as any).message) {
          const supabaseError = error as any
          throw new Error(
            `Impossible de créer le produit: ${supabaseError.message}${supabaseError.hint ? ` (${supabaseError.hint})` : ""}`
          )
        }
        throw error
      }
      throw new Error("Impossible de créer le produit: " + (error ? JSON.stringify(error) : "Erreur inconnue"))
    }
  }

  /**
   * 🔹 Mettre à jour un produit
   */
  static async updateProduct(id: string, productData: ProductUpdate) {
    const supabase = await createAdminClient()

    try {
      const updateData: any = {
        ...productData,
      }

      // Générer un slug si le nom est modifié
      if (productData.name && !productData.slug) {
        updateData.slug = this.generateSlug(productData.name)
      }

      // Retirer les propriétés undefined
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
          delete updateData[key]
        }
      })

      updateData.updated_at = new Date().toISOString()

      const { data, error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", id)
        .select(`
          *,
          product_brands!products_brand_id_fkey(name, logo_url),
          product_categories!products_category_id_fkey(name, slug, icon)
        `)
        .single()

      if (error) {
        console.error("❌ Erreur Supabase dans updateProduct:")
        console.error("   Code:", error.code)
        console.error("   Message:", error.message)
        console.error("   Détails:", error.details)
        throw error
      }

      return data
    } catch (error) {
      console.error("❌ Erreur dans updateProduct:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Impossible de mettre à jour le produit.")
    }
  }

  /**
   * 🔹 Supprimer un produit
   */
  static async deleteProduct(id: string) {
    const supabase = await createAdminClient()

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)

      if (error) {
        console.error("❌ Erreur Supabase dans deleteProduct:")
        console.error("   Code:", error.code)
        console.error("   Message:", error.message)
        console.error("   Détails:", error.details)
        throw error
      }

      return { success: true }
    } catch (error) {
      console.error("❌ Erreur dans deleteProduct:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Impossible de supprimer le produit.")
    }
  }

  /**
   * 🔹 Récupérer les catégories de produits
   */
  static async getProductCategories() {
    const supabase = await createAdminClient()

    try {
      const { data, error } = await supabase
        .from("product_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("❌ Erreur dans getProductCategories:", error)
      throw new Error("Impossible de récupérer les catégories de produits.")
    }
  }

  /**
   * 🔹 Récupérer les marques de produits
   */
  static async getProductBrands() {
    const supabase = await createAdminClient()

    try {
      const { data, error } = await supabase
        .from("product_brands")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("❌ Erreur dans getProductBrands:", error)
      throw new Error("Impossible de récupérer les marques de produits.")
    }
  }
}

// ✅ Exports pour compatibilité
export const getAllProducts = ProductService.getAllProducts
export const createProduct = ProductService.createProduct
export const updateProduct = ProductService.updateProduct
export const deleteProduct = ProductService.deleteProduct
export const getProductCategories = ProductService.getProductCategories
export const getProductBrands = ProductService.getProductBrands

export type { Product }

