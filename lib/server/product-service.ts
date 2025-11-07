import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/types/database"

type Product = Database["public"]["Tables"]["products"]["Row"]
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"]
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"]

interface ProductFilters {
  category?: string
  subcategory?: string
  species?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  limit?: number
  offset?: number
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select(`
      *,
      product_brands!products_brand_id_fkey(name, logo_url),
      product_categories!products_category_id_fkey(name, slug)
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (filters.species) {
    query = query.or(`species.eq.${filters.species},species.eq.mixte`)
  }

  if (filters.minPrice) {
    query = query.gte("price", filters.minPrice)
  }

  if (filters.maxPrice) {
    query = query.lte("price", filters.maxPrice)
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
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_brands!products_brand_id_fkey(name, logo_url),
      product_categories!products_category_id_fkey(name, slug)
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_brands!products_brand_id_fkey(name, logo_url),
      product_categories!products_category_id_fkey(name, slug)
    `)
    .eq("is_active", true)
    .or("is_featured.eq.true,is_bestseller.eq.true,is_new.eq.true")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return data || []
}

export async function createProduct(productData: ProductInsert): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").insert(productData).select().single()

  if (error) {
    console.error("Error creating product:", error)
    return null
  }

  return data
}

export async function updateProduct(id: string, updates: ProductUpdate): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating product:", error)
    return null
  }

  return data
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return false
  }

  return true
}

export type { Product }

// Fonction pour obtenir les catégories de produits
export async function getProductCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("Error fetching product categories:", error)
    throw new Error("Failed to fetch product categories")
  }

  return data || []
}

// Fonction pour obtenir les données d'un produit (alias pour getProductBySlug)
export const getProductData = getProductBySlug

export async function getMultiSpeciesProducts(filters: ProductFilters = {}): Promise<Product[]> {
  // On force le filtre pour la species 'mixte'
  const mergedFilters = { ...filters, species: "mixte" };
  return getProducts(mergedFilters);
}
