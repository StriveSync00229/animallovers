import { createAdminClient } from "@/lib/supabase/server"
import type { ArticleInsert, ArticleUpdate, Article } from "@/lib/types/database"

export class ArticleService {
  static async getArticles(
    filters: {
      status?: "all" | "published" | "draft"
      category?: string
      search?: string
      limit?: number
      offset?: number
    } = {},
  ) {
    console.log("ArticleService.getArticles - Début de la fonction")
    console.log("Filtres reçus:", filters)
    
    try {
      const supabase = await createAdminClient()
      console.log("Client Supabase créé")

      // 1. Récupérer les articles de base
      let articlesQuery = supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })

      // Appliquer les filtres sur les articles
      if (filters.status === "published") {
        articlesQuery = articlesQuery.eq("is_published", true)
        console.log("Filtre publié appliqué")
      } else if (filters.status === "draft") {
        articlesQuery = articlesQuery.eq("is_published", false)
        console.log("Filtre brouillon appliqué")
      }

      if (filters.category && filters.category !== "all") {
        articlesQuery = articlesQuery.eq("category_id", filters.category)
        console.log("Filtre catégorie appliqué:", filters.category)
      }

      if (filters.search && filters.search.trim() !== "") {
        articlesQuery = articlesQuery.or(
          `title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`,
        )
        console.log("Filtre recherche appliqué:", filters.search)
      }

      // Pagination
      if (filters.limit) {
        articlesQuery = articlesQuery.limit(filters.limit)
        console.log("Limite appliquée:", filters.limit)
      }
      if (filters.offset) {
        articlesQuery = articlesQuery.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
        console.log("Offset appliqué:", filters.offset)
      }

      console.log("Exécution de la requête articles...")
      const { data: articles, error: articlesError } = await articlesQuery

      if (articlesError) {
        console.error("Erreur lors de la récupération des articles:", articlesError)
        throw new Error(`Failed to fetch articles: ${articlesError.message}`)
      }

      console.log("Articles récupérés avec succès:", articles?.length || 0, "articles")

      if (!articles || articles.length === 0) {
        return []
      }

      // 2. Récupérer les IDs uniques pour les jointures
      const authorIds = [...new Set(articles.map(article => article.author_id).filter(Boolean))]
      const categoryIds = [...new Set(articles.map(article => article.category_id).filter(Boolean))]

      console.log("IDs auteurs uniques:", authorIds)
      console.log("IDs catégories uniques:", categoryIds)

      // 3. Récupérer les auteurs (si nécessaire)
      let authors: any[] = []
      if (authorIds.length > 0) {
        console.log("Récupération des auteurs...")
        const { data: authorsData, error: authorsError } = await supabase
          .from("users")
          .select("id, first_name, last_name, avatar_url")
          .in("id", authorIds)

        if (authorsError) {
          console.error("Erreur lors de la récupération des auteurs:", authorsError)
          // On continue sans les auteurs plutôt que de faire échouer toute la requête
        } else {
          authors = authorsData || []
          console.log("Auteurs récupérés:", authors.length)
        }
      }

      // 4. Récupérer les catégories (si nécessaire)
      let categories: any[] = []
      if (categoryIds.length > 0) {
        console.log("Récupération des catégories...")
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("article_categories")
          .select("id, name, slug, color")
          .in("id", categoryIds)

        if (categoriesError) {
          console.error("Erreur lors de la récupération des catégories:", categoriesError)
          // On continue sans les catégories plutôt que de faire échouer toute la requête
        } else {
          categories = categoriesData || []
          console.log("Catégories récupérées:", categories.length)
        }
      }

      // 5. Joindre les données
      const enrichedArticles = articles.map(article => {
        const author = authors.find(a => a.id === article.author_id) || null
        const category = categories.find(c => c.id === article.category_id) || null

        return {
          ...article,
          author,
          category,
        }
      })

      console.log("Articles enrichis avec succès:", enrichedArticles.length)
      console.log("Premier article enrichi:", enrichedArticles[0])

      return enrichedArticles

    } catch (error) {
      console.error("Erreur dans ArticleService.getArticles:", error)
      throw error
    }
  }

  static async getArticleById(id: string) {
    try {
      const supabase = await createAdminClient()

      // 1. Récupérer l'article
      const { data: article, error: articleError } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single()

      if (articleError) {
        console.error("Error fetching article:", articleError)
        throw new Error("Failed to fetch article")
      }

      if (!article) {
        throw new Error("Article not found")
      }

      // 2. Récupérer l'auteur si nécessaire
      let author = null
      if (article.author_id) {
        const { data: authorData } = await supabase
          .from("users")
          .select("id, first_name, last_name, avatar_url")
          .eq("id", article.author_id)
          .single()
        author = authorData
      }

      // 3. Récupérer la catégorie si nécessaire
      let category = null
      if (article.category_id) {
        const { data: categoryData } = await supabase
          .from("article_categories")
          .select("id, name, slug, color")
          .eq("id", article.category_id)
          .single()
        category = categoryData
      }

      return {
        ...article,
        author,
        category,
      }
    } catch (error) {
      console.error("Error in getArticleById:", error)
      throw error
    }
  }

  static async getArticleBySlug(slug: string) {
    try {
      const supabase = await createAdminClient()

      // 1. Récupérer l'article
      const { data: article, error: articleError } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()

      if (articleError) {
        console.error("Error fetching article by slug:", articleError)
        throw new Error("Failed to fetch article")
      }

      if (!article) {
        throw new Error("Article not found")
      }

      // 2. Récupérer l'auteur si nécessaire
      let author = null
      if (article.author_id) {
        const { data: authorData } = await supabase
          .from("users")
          .select("id, first_name, last_name, avatar_url")
          .eq("id", article.author_id)
          .single()
        author = authorData
      }

      // 3. Récupérer la catégorie si nécessaire
      let category = null
      if (article.category_id) {
        const { data: categoryData } = await supabase
          .from("article_categories")
          .select("id, name, slug, color")
          .eq("id", article.category_id)
          .single()
        category = categoryData
      }

      return {
        ...article,
        author,
        category,
      }
    } catch (error) {
      console.error("Error in getArticleBySlug:", error)
      throw error
    }
  }

  static async getRelatedArticles(currentArticleId: string, categoryId: string, limit: number = 3) {
    try {
      const supabase = await createAdminClient()

      // 1. Récupérer les articles liés
      const { data: articles, error: articlesError } = await supabase
        .from("articles")
        .select("*")
        .eq("category_id", categoryId)
        .eq("is_published", true)
        .neq("id", currentArticleId)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (articlesError) {
        console.error("Error fetching related articles:", articlesError)
        throw new Error("Failed to fetch related articles")
      }

      if (!articles || articles.length === 0) {
        return []
      }

      // 2. Récupérer les catégories
      const categoryIds = [...new Set(articles.map(article => article.category_id).filter(Boolean))]
      let categories: any[] = []
      
      if (categoryIds.length > 0) {
        const { data: categoriesData } = await supabase
          .from("article_categories")
          .select("id, name, slug, color")
          .in("id", categoryIds)
        categories = categoriesData || []
      }

      // 3. Joindre les données
      return articles.map(article => {
        const category = categories.find(c => c.id === article.category_id) || null
        return {
          ...article,
          category,
        }
      })
    } catch (error) {
      console.error("Error in getRelatedArticles:", error)
      throw error
    }
  }

  static async createArticle(articleData: ArticleInsert) {
    try {
      const supabase = await createAdminClient()

      // Générer un slug à partir du titre
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

      if (error) {
        console.error("Error creating article:", error)
        throw new Error("Failed to create article")
      }

      return data
    } catch (error) {
      console.error("Error in createArticle:", error)
      throw error
    }
  }

  static async updateArticle(id: string, articleData: ArticleUpdate) {
    try {
      const supabase = await createAdminClient()

      const updateData = {
        ...articleData,
        updated_at: new Date().toISOString(),
      }

      // Générer un nouveau slug si le titre a changé
      if (articleData.title) {
        updateData.slug = this.generateSlug(articleData.title)
      }

      const { data, error } = await supabase
        .from("articles")
        .update(updateData)
        .eq("id", id)
        .select("*")
        .single()

      if (error) {
        console.error("Error updating article:", error)
        throw new Error("Failed to update article")
      }

      return data
    } catch (error) {
      console.error("Error in updateArticle:", error)
      throw error
    }
  }

  static async deleteArticle(id: string) {
    try {
      const supabase = await createAdminClient()

      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id)

      if (error) {
        console.error("Error deleting article:", error)
        throw new Error("Failed to delete article")
      }

      return true
    } catch (error) {
      console.error("Error in deleteArticle:", error)
      throw error
    }
  }

  static async getCategories() {
    try {
      const supabase = await createAdminClient()

      const { data, error } = await supabase
        .from("article_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (error) {
        console.error("Error fetching categories:", error)
        throw new Error("Failed to fetch categories")
      }

      return data || []
    } catch (error) {
      console.error("Error in getCategories:", error)
      throw error
    }
  }

  static async incrementViewCount(id: string) {
    try {
      const supabase = await createAdminClient()

      const { error } = await supabase
        .from("articles")
        .update({ view_count: supabase.rpc("increment") })
        .eq("id", id)

      if (error) {
        console.error("Error incrementing view count:", error)
        // On ne fait pas échouer la requête pour un simple compteur
      }
    } catch (error) {
      console.error("Error in incrementViewCount:", error)
      // On ne fait pas échouer la requête pour un simple compteur
    }
  }

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

// Exports pour compatibilité avec l'ancien code
export const getArticles = ArticleService.getArticles
export const getArticleById = ArticleService.getArticleById
export const getArticleBySlug = ArticleService.getArticleBySlug
export const getRelatedArticles = ArticleService.getRelatedArticles
export const createArticle = ArticleService.createArticle
export const updateArticle = ArticleService.updateArticle
export const deleteArticle = ArticleService.deleteArticle
export const getCategories = ArticleService.getCategories
export const incrementViewCount = ArticleService.incrementViewCount

// Export du type Article
export type { Article }
