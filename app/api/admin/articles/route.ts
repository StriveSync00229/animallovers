import { type NextRequest, NextResponse } from "next/server"
import { ArticleService } from "@/lib/server/article-service"

export async function GET(request: NextRequest) {
  console.log("API GET /api/admin/articles - Début de la requête")
  
  try {
    const { searchParams } = new URL(request.url)
    console.log("URL de la requête:", request.url)
    console.log("Paramètres de recherche:", Object.fromEntries(searchParams.entries()))

    const filters = {
      status: (searchParams.get("status") as "all" | "published" | "draft") || "all",
      category: searchParams.get("category") || "",
      search: searchParams.get("search") || "",
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : undefined,
    }

    console.log("Filtres préparés:", filters)

    // Validation des paramètres
    if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
      return NextResponse.json(
        { success: false, error: "La limite doit être entre 1 et 100" },
        { status: 400 }
      )
    }

    if (filters.offset && filters.offset < 0) {
      return NextResponse.json(
        { success: false, error: "L'offset doit être positif" },
        { status: 400 }
      )
    }

    // Vérifier les variables d'environnement
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("❌ Variables d'environnement manquantes")
      return NextResponse.json(
        { 
          success: false, 
          error: "Configuration manquante: vérifiez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY" 
        },
        { status: 500 }
      )
    }

    // Récupérer les articles (sans ebooks)
    let articles: any[] = []
    let articlesError: any = null
    try {
      console.log("📥 Tentative de récupération des articles...")
      articles = await ArticleService.getArticles(filters)
      console.log("✅ Articles récupérés depuis le service:", articles.length)
    } catch (err) {
      articlesError = err
      console.error("❌ Erreur lors de la récupération des articles:", err)
      if (err instanceof Error) {
        console.error("❌ Message:", err.message)
        console.error("❌ Stack:", err.stack)
      }
      // Continuer avec les ebooks même si les articles échouent
      articles = []
    }

    // Récupérer les ebooks (pour le dashboard admin, on les inclut)
    let ebooks: any[] = []
    let ebooksError: any = null
    try {
      console.log("📥 Tentative de récupération des ebooks...")
      ebooks = await ArticleService.getEbooks({
        category: filters.category && filters.category !== "all" ? filters.category : undefined,
        search: filters.search || undefined,
        limit: filters.limit,
        offset: filters.offset,
        publishedOnly: false, // Inclure les ebooks non publiés pour le dashboard
      })
      console.log("✅ Ebooks récupérés depuis le service:", ebooks.length)
    } catch (err) {
      ebooksError = err
      console.error("❌ Erreur lors de la récupération des ebooks:", err)
      if (err instanceof Error) {
        console.error("❌ Message:", err.message)
        console.error("❌ Stack:", err.stack)
        
        // Si l'erreur est liée à la colonne is_ebook qui n'existe pas, ignorer l'erreur
        if (err.message && (err.message.includes("is_ebook") || err.message.includes("column") || err.message.includes("42703"))) {
          console.log("ℹ️  Colonne is_ebook non disponible, aucun ebook à afficher (normal si la colonne n'existe pas)")
          ebooksError = null // Ne pas considérer cela comme une erreur critique
        }
      }
      // Continuer avec les articles même si les ebooks échouent
      ebooks = []
    }

    // Si les deux échouent avec une erreur critique, retourner une erreur détaillée
    // Mais seulement si les erreurs ne sont pas liées à des colonnes manquantes (comme is_ebook)
    const isCriticalError = (error: any) => {
      if (!error) return false
      const errorMessage = error instanceof Error ? error.message : String(error)
      // Les erreurs de colonnes manquantes ne sont pas critiques
      if (errorMessage.includes("is_ebook") || errorMessage.includes("column") || errorMessage.includes("42703")) {
        return false
      }
      return true
    }
    
    if (isCriticalError(articlesError) && isCriticalError(ebooksError)) {
      console.error("❌ Les deux requêtes ont échoué avec des erreurs critiques")
      const errorDetails: any = {
        articlesError: articlesError instanceof Error ? articlesError.message : String(articlesError),
        ebooksError: ebooksError instanceof Error ? ebooksError.message : String(ebooksError),
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: "Impossible de récupérer les articles et les ebooks",
          details: process.env.NODE_ENV === "development" ? errorDetails : undefined
        },
        { status: 500 }
      )
    }
    
    // Si pas d'erreur mais pas de données, c'est peut-être normal (base vide)
    if (articles.length === 0 && ebooks.length === 0 && !isCriticalError(articlesError) && !isCriticalError(ebooksError)) {
      console.log("ℹ️  Aucun contenu trouvé (peut-être normal si la base est vide)")
    }
    
    // Si une seule requête échoue, on continue avec les données disponibles
    if (isCriticalError(articlesError) && !isCriticalError(ebooksError)) {
      console.warn("⚠️  Erreur lors de la récupération des articles, continuation avec les ebooks seulement")
    }
    if (isCriticalError(ebooksError) && !isCriticalError(articlesError)) {
      console.warn("⚠️  Erreur lors de la récupération des ebooks, continuation avec les articles seulement")
    }
    
    // Si les erreurs ne sont pas critiques (ex: colonne is_ebook manquante), continuer normalement
    if (articlesError && !isCriticalError(articlesError)) {
      console.log("ℹ️  Erreur non critique lors de la récupération des articles, continuation")
    }
    if (ebooksError && !isCriticalError(ebooksError)) {
      console.log("ℹ️  Erreur non critique lors de la récupération des ebooks, continuation")
    }

    // Combiner articles et ebooks, trier par date de création (plus récent en premier)
    const allContent = [...articles, ...ebooks].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
    })

    const response = {
      success: true,
      data: allContent,
      count: allContent.length,
      articlesCount: articles.length,
      ebooksCount: ebooks.length,
      filters: filters,
      timestamp: new Date().toISOString()
    }
    
    console.log("✅ Réponse préparée avec succès:", {
      total: allContent.length,
      articles: articles.length,
      ebooks: ebooks.length
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Erreur dans GET /api/admin/articles:", error)
    
    // Gestion d'erreurs plus détaillée
    let errorMessage = "Failed to fetch articles"
    let statusCode = 500
    let errorDetails: any = null

    if (error instanceof Error) {
      errorMessage = error.message
      errorDetails = {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        name: error.name
      }
      
      console.error("❌ Stack trace complet:", error.stack)
      console.error("❌ Nom de l'erreur:", error.name)
      console.error("❌ Message d'erreur:", error.message)
      
      // Détecter les erreurs de connexion
      if (error.message.includes("connection") || error.message.includes("network") || error.message.includes("ECONNREFUSED")) {
        statusCode = 503 // Service Unavailable
        errorMessage = "Impossible de se connecter à la base de données"
      } else if (error.message.includes("permission") || error.message.includes("auth") || error.message.includes("JWT")) {
        statusCode = 403 // Forbidden
        errorMessage = "Erreur d'authentification ou de permissions"
      } else if (error.message.includes("not found") || error.message.includes("does not exist")) {
        statusCode = 404 // Not Found
        errorMessage = "Ressource non trouvée"
      } else if (error.message.includes("relation") || error.message.includes("column") || error.message.includes("syntax")) {
        // Erreurs de schéma de base de données
        statusCode = 500
        errorMessage = "Erreur de schéma de base de données: " + error.message
      }
    } else {
      errorDetails = error
      console.error("❌ Erreur non-Error:", error)
    }

    console.error("❌ Détails complets de l'erreur:", JSON.stringify(errorDetails, null, 2))

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorDetails : undefined,
        timestamp: new Date().toISOString()
      }, 
      { status: statusCode }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("POST /api/admin/articles - Données reçues:", body)

    // Validation des données
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Le titre est requis" },
        { status: 400 }
      )
    }

    // Pour les ebooks, le contenu n'est pas requis (le contenu est dans le PDF)
    // Pour les articles normaux, le contenu est requis
    if (body.is_ebook) {
      // Validation pour ebook
      if (!body.pdf_url) {
        return NextResponse.json(
          { success: false, error: "L'URL du PDF est requise pour un ebook" },
          { status: 400 }
        )
      }
      if (!body.price || parseFloat(body.price) <= 0) {
        return NextResponse.json(
          { success: false, error: "Le prix doit être supérieur à 0 pour un ebook" },
          { status: 400 }
        )
      }
      // Pour les ebooks, on peut mettre un contenu vide ou null
      if (!body.content) {
        body.content = "" // Contenu vide pour les ebooks
      }
    } else {
      // Validation pour article normal
      if (!body.content) {
        return NextResponse.json(
          { success: false, error: "Le contenu est requis pour un article" },
          { status: 400 }
        )
      }
    }

    const article = await ArticleService.createArticle(body)
    console.log("Article créé avec succès:", article.id)

    return NextResponse.json({
      success: true,
      data: article,
      message: body.is_ebook ? "Ebook créé avec succès" : "Article créé avec succès"
    })
  } catch (error) {
    console.error("Error in POST /api/admin/articles:", error)
    
    let errorMessage = "Failed to create article"
    let statusCode = 500
    let errorDetails: any = null

    if (error instanceof Error) {
      errorMessage = error.message
      
      // Extraire les détails de l'erreur Supabase si disponibles
      if ((error as any).code) {
        errorDetails = {
          code: (error as any).code,
          message: (error as any).message,
          details: (error as any).details,
          hint: (error as any).hint
        }
      }
      
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        statusCode = 409 // Conflict
        errorMessage = "Un article avec ce titre existe déjà"
      } else if (error.message.includes("validation") || error.message.includes("check constraint")) {
        statusCode = 400 // Bad Request
        errorMessage = error.message.includes("species") 
          ? "L'espèce sélectionnée n'est pas valide"
          : error.message.includes("age_range")
          ? "La tranche d'âge sélectionnée n'est pas valide"
          : error.message.includes("difficulty_level")
          ? "Le niveau de difficulté sélectionné n'est pas valide"
          : "Erreur de validation des données"
      } else if (error.message.includes("foreign key") || error.message.includes("violates foreign key")) {
        statusCode = 400
        errorMessage = "La catégorie ou sous-catégorie sélectionnée n'existe pas"
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorDetails : undefined
      }, 
      { status: statusCode }
    )
  }
}
