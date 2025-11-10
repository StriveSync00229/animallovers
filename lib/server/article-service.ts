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
    console.log("📊 Filtres reçus:", JSON.stringify(filters, null, 2))
    
    let supabase
    try {
      supabase = await createAdminClient()
      console.log("✅ Client Supabase créé avec succès")
    } catch (clientError) {
      console.error("❌ Erreur lors de la création du client Supabase:", clientError)
      throw new Error("Impossible de se connecter à la base de données: " + (clientError instanceof Error ? clientError.message : String(clientError)))
    }

    try {
      // Construire la requête de base
      // Exclure les ebooks directement dans la requête si la colonne existe
      let articlesQuery = supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })
      
      // Ne pas filtrer par is_ebook dans la requête initiale
      // On filtrera côté application après récupération pour plus de robustesse

      // --- Filtres ---
      if (filters.status === "published") {
        articlesQuery = articlesQuery.eq("is_published", true)
      } else if (filters.status === "draft") {
        articlesQuery = articlesQuery.eq("is_published", false)
      }

      if (filters.category && filters.category !== "all") {
        articlesQuery = articlesQuery.eq("category_id", filters.category)
      }

      // Filtre de recherche - utiliser ilike avec OR
      if (filters.search && filters.search.trim() !== "") {
        const searchTerm = filters.search.trim()
        // Syntaxe correcte pour Supabase: column.ilike.%value%
        articlesQuery = articlesQuery.or(
          `title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`
        )
      }

      // Récupérer un nombre raisonnable d'articles (max 1000 pour éviter les problèmes)
      // On appliquera le filtrage des ebooks et les limites après
      const maxFetch = filters.limit ? Math.min(filters.limit * 5, 1000) : 1000
      articlesQuery = articlesQuery.limit(maxFetch)

      console.log("🔍 Exécution de la requête Supabase...")
      const { data: articles, error: articlesError } = await articlesQuery
      
      if (articlesError) {
        console.error("❌ Erreur Supabase dans getArticles:")
        console.error("   Code:", articlesError.code)
        console.error("   Message:", articlesError.message)
        console.error("   Détails:", articlesError.details)
        console.error("   Hint:", articlesError.hint)
        throw new Error(`Erreur Supabase: ${articlesError.message} (Code: ${articlesError.code})`)
      }

      if (!articles || articles.length === 0) {
        console.log("ℹ️  Aucun article trouvé dans la base de données")
        return []
      }
      
      console.log(`📦 ${articles.length} articles récupérés de la base de données`)
      
      // Filtrer les ebooks côté application (plus robuste)
      // Si is_ebook existe et est true, on exclut l'article
      let filteredArticles = articles.filter((article: any) => {
        // Si is_ebook n'existe pas, est false, ou est null, c'est un article normal
        // Gérer le cas où is_ebook pourrait être undefined, null, false, ou true
        const isEbook = article.is_ebook === true || article.is_ebook === "true" || article.is_ebook === 1
        return !isEbook
      })
      
      console.log(`📊 ${filteredArticles.length} articles après filtrage des ebooks (${articles.length - filteredArticles.length} ebooks exclus)`)
      
      // Appliquer l'offset après filtrage
      if (filters.offset && filters.offset > 0) {
        filteredArticles = filteredArticles.slice(filters.offset)
      }
      
      // Appliquer la limite après filtrage et offset
      if (filters.limit && filteredArticles.length > filters.limit) {
        filteredArticles = filteredArticles.slice(0, filters.limit)
      }
      
      if (filteredArticles.length === 0) {
        console.log("ℹ️  Aucun article trouvé après filtrage et pagination")
        return []
      }
      
      console.log(`✅ ${filteredArticles.length} articles après pagination`)

      // --- Récupération des IDs associés ---
      const authorIds = [...new Set(filteredArticles.map((a: any) => a.author_id).filter(Boolean))]
      const categoryIds = [...new Set(filteredArticles.map((a: any) => [a.category_id, a.subcategory_id]).flat().filter(Boolean))]

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
          .select("id, name, slug, color, parent_id")
          .in("id", categoryIds)

        if (categoriesError) {
          console.error("❌ Erreur lors de la récupération des catégories:", categoriesError)
        } else {
          categories = categoriesData || []
          console.log(`✅ ${categories.length} catégories récupérées`)
        }
      }

      // --- Enrichissement des articles ---
      const enrichedArticles = filteredArticles.map((article: any) => {
        const author = authors.find((a: any) => a.id === article.author_id) || null
        const category = categories.find((c: any) => c.id === article.category_id) || null
        const subcategory = article.subcategory_id
          ? categories.find((c: any) => c.id === article.subcategory_id) || null
          : null

        // ✅ Correction : garantir que tags est toujours un tableau
        const tags =
          Array.isArray(article.tags)
            ? article.tags
            : typeof article.tags === "string"
            ? article.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
            : []

        return {
          ...article,
          author,
          category,
          subcategory,
          tags,
        }
      })

      console.log(`✅ ${enrichedArticles.length} articles enrichis avec succès`)
      return enrichedArticles
    } catch (error) {
      console.error("❌ Erreur dans getArticles:", error)
      if (error instanceof Error) {
        console.error("❌ Message d'erreur:", error.message)
        console.error("❌ Stack trace:", error.stack)
        throw error
      }
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
   * 🔹 Récupérer les ebooks avec filtres optionnels
   */
  static async getEbooks(
    filters: {
      category?: string
      search?: string
      limit?: number
      offset?: number
      publishedOnly?: boolean
    } = {},
  ) {
    console.log("🟢 ArticleService.getEbooks - Début")
    console.log("📊 Filtres reçus:", JSON.stringify(filters, null, 2))
    
    let supabase
    try {
      supabase = await createAdminClient()
      console.log("✅ Client Supabase créé avec succès")
    } catch (clientError) {
      console.error("❌ Erreur lors de la création du client Supabase:", clientError)
      throw new Error("Impossible de se connecter à la base de données: " + (clientError instanceof Error ? clientError.message : String(clientError)))
    }

    try {
      // Construire la requête de base pour les ebooks
      // Note: On accepte les ebooks avec ou sans prix (pour le dashboard admin)
      let ebooksQuery = supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })

      // Essayer de filtrer par is_ebook si la colonne existe
      // Sinon, on retournera un tableau vide
      try {
        ebooksQuery = ebooksQuery.eq("is_ebook", true)
      } catch (e) {
        // Si la colonne n'existe pas, retourner un tableau vide
        console.log("ℹ️  Colonne is_ebook non disponible, aucun ebook trouvé")
        return []
      }

      // Filters
      if (filters.publishedOnly === true) {
        ebooksQuery = ebooksQuery.eq("is_published", true)
      } else if (filters.publishedOnly === false) {
        // Pour le dashboard admin, on peut inclure tous les ebooks
        // Ne pas filtrer par is_published
      }
      // Si publishedOnly est undefined, ne pas filtrer (comportement par défaut pour admin)

      if (filters.category && filters.category !== "all" && filters.category !== "") {
        ebooksQuery = ebooksQuery.eq("category_id", filters.category)
      }

      if (filters.search && filters.search.trim() !== "") {
        const searchTerm = filters.search.trim()
        ebooksQuery = ebooksQuery.or(
          `title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`,
        )
      }

      // Récupérer un nombre raisonnable d'ebooks (max 1000)
      const maxFetch = filters.limit ? Math.min(filters.limit * 5, 1000) : 1000
      ebooksQuery = ebooksQuery.limit(maxFetch)

      console.log("🔍 Exécution de la requête Supabase pour les ebooks...")
      const { data: ebooks, error: ebooksError } = await ebooksQuery
      
      if (ebooksError) {
        // Si l'erreur est liée à la colonne is_ebook qui n'existe pas, retourner un tableau vide
        if (ebooksError.message && (ebooksError.message.includes("is_ebook") || ebooksError.message.includes("column") || ebooksError.code === "42703")) {
          console.log("ℹ️  Colonne is_ebook non disponible dans la base de données, aucun ebook trouvé")
          return []
        }
        
        console.error("❌ Erreur Supabase dans getEbooks:")
        console.error("   Code:", ebooksError.code)
        console.error("   Message:", ebooksError.message)
        console.error("   Détails:", ebooksError.details)
        console.error("   Hint:", ebooksError.hint)
        throw new Error(`Erreur Supabase: ${ebooksError.message} (Code: ${ebooksError.code})`)
      }

      if (!ebooks || ebooks.length === 0) {
        console.log("ℹ️  Aucun ebook trouvé dans la base de données")
        return []
      }
      
      console.log(`📦 ${ebooks.length} ebooks récupérés de la base de données`)

      // Appliquer l'offset après récupération
      let filteredEbooks = ebooks
      if (filters.offset && filters.offset > 0) {
        filteredEbooks = filteredEbooks.slice(filters.offset)
      }
      
      // Appliquer la limite après offset
      if (filters.limit && filteredEbooks.length > filters.limit) {
        filteredEbooks = filteredEbooks.slice(0, filters.limit)
      }

      if (filteredEbooks.length === 0) {
        console.log("ℹ️  Aucun ebook trouvé après pagination")
        return []
      }

      console.log(`✅ ${filteredEbooks.length} ebooks après pagination`)

      // Fetch associated IDs
      const authorIds = [...new Set(filteredEbooks.map((e: any) => e.author_id).filter(Boolean))]
      const categoryIds = [...new Set(filteredEbooks.map((e: any) => [e.category_id, e.subcategory_id]).flat().filter(Boolean))]

      // Fetch authors
      let authors: any[] = []
      if (authorIds.length > 0) {
        const { data: authorsData, error: authorsError } = await supabase
          .from("users")
          .select("id, first_name, last_name, avatar_url")
          .in("id", authorIds)

        if (authorsError) {
          console.warn("⚠️ Erreur lors de la récupération des auteurs:", authorsError.message)
        } else {
          authors = authorsData || []
        }
      }

      // Fetch categories and subcategories
      let categories: any[] = []
      if (categoryIds.length > 0) {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("article_categories")
          .select("id, name, slug, color, parent_id")
          .in("id", categoryIds)

        if (categoriesError) {
          console.warn("⚠️ Erreur lors de la récupération des catégories:", categoriesError.message)
        } else {
          categories = categoriesData || []
        }
      }

      // Enrich ebooks
      const enrichedEbooks = filteredEbooks.map((ebook: any) => {
        const author = authors.find((a: any) => a.id === ebook.author_id) || null
        const category = categories.find((c: any) => c.id === ebook.category_id) || null
        const subcategory = ebook.subcategory_id
          ? categories.find((c: any) => c.id === ebook.subcategory_id) || null
          : null

        return {
          ...ebook,
          author,
          category,
          subcategory,
        }
      })

      console.log(`✅ ${enrichedEbooks.length} ebooks enrichis retournés`)
      return enrichedEbooks
    } catch (error) {
      console.error("❌ Erreur dans getEbooks:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Impossible de récupérer les ebooks.")
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
