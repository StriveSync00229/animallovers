import { createAdminClient } from "@/lib/supabase/server"
import type { ArticleInsert, ArticleUpdate, Article } from "@/lib/types/database"

export class ArticleService {
  /**
   * 🔹 Récupérer la liste des articles avec filtres optionnels
   */
  static async getArticles(
    filters: {
      status?: "all" | "published" | "draft"
      category?: string
      search?: string
      limit?: number
      offset?: number
    } = {},
  ) {
    console.log("🟢 ArticleService.getArticles - Début")
    const supabase = await createAdminClient()

    try {
      let articlesQuery = supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })

      // --- Filtres ---
      if (filters.status === "published") {
        articlesQuery = articlesQuery.eq("is_published", true)
      } else if (filters.status === "draft") {
        articlesQuery = articlesQuery.eq("is_published", false)
      }

      if (filters.category && filters.category !== "all") {
        articlesQuery = articlesQuery.eq("category_id", filters.category)
      }

      if (filters.search && filters.search.trim() !== "") {
        articlesQuery = articlesQuery.or(
          `title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`,
        )
      }

      if (filters.limit) {
        articlesQuery = articlesQuery.limit(filters.limit)
      }

      if (filters.offset) {
        const start = filters.offset
        const end = filters.offset + (filters.limit || 10) - 1
        articlesQuery = articlesQuery.range(start, end)
      }

      const { data: articles, error: articlesError } = await articlesQuery
      if (articlesError) throw articlesError

      if (!articles || articles.length === 0) return []

      // --- Récupération des IDs associés ---
      const authorIds = [...new Set(articles.map(a => a.author_id).filter(Boolean))]
      const categoryIds = [...new Set(articles.map(a => a.category_id).filter(Boolean))]

      // --- Auteurs ---
      let authors: any[] = []
      if (authorIds.length > 0) {
        const { data: authorsData, error: authorsError } = await supabase
          .from("users")
          .select("id, first_name, last_name, avatar_url")
          .in("id", authorIds)

        if (!authorsError) authors = authorsData || []
      }

      // --- Catégories ---
      let categories: any[] = []
      if (categoryIds.length > 0) {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("article_categories")
          .select("id, name, slug, color")
          .in("id", categoryIds)

        if (!categoriesError) categories = categoriesData || []
      }

      // --- Enrichissement des articles ---
      const enrichedArticles = articles.map(article => {
        const author = authors.find(a => a.id === article.author_id) || null
        const category = categories.find(c => c.id === article.category_id) || null

        // ✅ Correction : garantir que tags est toujours un tableau
        const tags =
          Array.isArray(article.tags)
            ? article.tags
            : typeof article.tags === "string"
            ? article.tags.split(",").map(t => t.trim()).filter(Boolean)
            : []

        return {
          ...article,
          author,
          category,
          tags,
        }
      })

      return enrichedArticles
    } catch (error) {
      console.error("❌ Erreur dans getArticles:", error)
      throw new Error("Impossible de récupérer les articles.")
    }
  }

  /**
   * 🔹 Récupérer un article par ID
   */
  static async getArticleById(id: string) {
    const supabase = await createAdminClient()

    try {
      const { data: article, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !article) throw error || new Error("Article introuvable")

      const [author, category] = await Promise.all([
        article.author_id
          ? supabase
              .from("users")
              .select("id, first_name, last_name, avatar_url")
              .eq("id", article.author_id)
              .single()
              .then(res => res.data)
          : null,
        article.category_id
          ? supabase
              .from("article_categories")
              .select("id, name, slug, color")
              .eq("id", article.category_id)
              .single()
              .then(res => res.data)
          : null,
      ])

      const tags =
        Array.isArray(article.tags)
          ? article.tags
          : typeof article.tags === "string"
          ? article.tags.split(",").map(t => t.trim()).filter(Boolean)
          : []

      return { ...article, author, category, tags }
    } catch (error) {
      console.error("❌ Erreur dans getArticleById:", error)
      throw new Error("Impossible de récupérer l’article.")
    }
  }

  /**
   * 🔹 Récupérer un article par son slug
   */
  static async getArticleBySlug(slug: string) {
    const supabase = await createAdminClient()

    try {
      const { data: article, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()

      if (error || !article) throw error || new Error("Article introuvable")

      const [author, category] = await Promise.all([
        article.author_id
          ? supabase
              .from("users")
              .select("id, first_name, last_name, avatar_url")
              .eq("id", article.author_id)
              .single()
              .then(res => res.data)
          : null,
        article.category_id
          ? supabase
              .from("article_categories")
              .select("id, name, slug, color")
              .eq("id", article.category_id)
              .single()
              .then(res => res.data)
          : null,
      ])

      const tags =
        Array.isArray(article.tags)
          ? article.tags
          : typeof article.tags === "string"
          ? article.tags.split(",").map(t => t.trim()).filter(Boolean)
          : []

      return { ...article, author, category, tags }
    } catch (error) {
      console.error("❌ Erreur dans getArticleBySlug:", error)
      throw new Error("Impossible de récupérer l’article.")
    }
  }

  /**
   * 🔹 Récupérer des articles liés
   */
  static async getRelatedArticles(currentArticleId: string, categoryId: string, limit: number = 3) {
    const supabase = await createAdminClient()

    try {
      const { data: articles, error } = await supabase
        .from("articles")
        .select("*")
        .eq("category_id", categoryId)
        .eq("is_published", true)
        .neq("id", currentArticleId)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) throw error
      if (!articles || articles.length === 0) return []

      const { data: categories } = await supabase
        .from("article_categories")
        .select("id, name, slug, color")
        .in("id", [categoryId])

      return articles.map(article => {
        const category = categories?.find(c => c.id === article.category_id) || null
        const tags =
          Array.isArray(article.tags)
            ? article.tags
            : typeof article.tags === "string"
            ? article.tags.split(",").map(t => t.trim()).filter(Boolean)
            : []
        return { ...article, category, tags }
      })
    } catch (error) {
      console.error("❌ Erreur dans getRelatedArticles:", error)
      throw new Error("Impossible de récupérer les articles liés.")
    }
  }

  /**
   * 🔹 Créer un article
   */
  static async createArticle(articleData: ArticleInsert) {
    const supabase = await createAdminClient()

    try {
      const slug = this.generateSlug(articleData.title)
      const { data, error } = await supabase
        .from("articles")
        .insert({
          ...articleData,
          slug,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select("*")
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("❌ Erreur dans createArticle:", error)
      throw new Error("Impossible de créer l’article.")
    }
  }

  /**
   * 🔹 Mettre à jour un article
   */
  static async updateArticle(id: string, articleData: ArticleUpdate) {
    const supabase = await createAdminClient()

    try {
      const updateData = {
        ...articleData,
        updated_at: new Date().toISOString(),
      }

      if (articleData.title) {
        updateData.slug = this.generateSlug(articleData.title)
      }

      const { data, error } = await supabase
        .from("articles")
        .update(updateData)
        .eq("id", id)
        .select("*")
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("❌ Erreur dans updateArticle:", error)
      throw new Error("Impossible de mettre à jour l’article.")
    }
  }

  /**
   * 🔹 Supprimer un article
   */
  static async deleteArticle(id: string) {
    const supabase = await createAdminClient()
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id)
      if (error) throw error
      return true
    } catch (error) {
      console.error("❌ Erreur dans deleteArticle:", error)
      throw new Error("Impossible de supprimer l’article.")
    }
  }

  /**
   * 🔹 Récupérer toutes les catégories actives
   */
  static async getCategories() {
    const supabase = await createAdminClient()

    try {
      const { data, error } = await supabase
        .from("article_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("❌ Erreur dans getCategories:", error)
      throw new Error("Impossible de récupérer les catégories.")
    }
  }

  /**
   * 🔹 Incrémenter le compteur de vues
   */
  static async incrementViewCount(id: string) {
    const supabase = await createAdminClient()
    try {
      const { error } = await supabase.rpc("increment_article_views", { article_id: id })
      if (error) console.warn("⚠️ Erreur de compteur:", error)
    } catch (error) {
      console.warn("⚠️ incrementViewCount non critique:", error)
    }
  }

  /**
   * 🔹 Générer un slug à partir du titre
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }
}

// ✅ Exports pour compatibilité
export const getArticles = ArticleService.getArticles
export const getArticleById = ArticleService.getArticleById
export const getArticleBySlug = ArticleService.getArticleBySlug
export const getRelatedArticles = ArticleService.getRelatedArticles
export const createArticle = ArticleService.createArticle
export const updateArticle = ArticleService.updateArticle
export const deleteArticle = ArticleService.deleteArticle
export const getCategories = ArticleService.getCategories
export const incrementViewCount = ArticleService.incrementViewCount

export type { Article }
