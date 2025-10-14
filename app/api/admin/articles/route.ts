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

    const articles = await ArticleService.getArticles(filters)
    console.log("Articles récupérés depuis le service:", articles.length)

    const response = {
      success: true,
      data: articles,
      count: articles.length,
      filters: filters,
      timestamp: new Date().toISOString()
    }
    
    console.log("Réponse préparée avec succès")

    return NextResponse.json(response)
  } catch (error) {
    console.error("Erreur dans GET /api/admin/articles:", error)
    
    // Gestion d'erreurs plus détaillée
    let errorMessage = "Failed to fetch articles"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      
      // Détecter les erreurs de connexion
      if (error.message.includes("connection") || error.message.includes("network")) {
        statusCode = 503 // Service Unavailable
      } else if (error.message.includes("permission") || error.message.includes("auth")) {
        statusCode = 403 // Forbidden
      } else if (error.message.includes("not found")) {
        statusCode = 404 // Not Found
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
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
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: "Le titre et le contenu sont requis" },
        { status: 400 }
      )
    }

    const article = await ArticleService.createArticle(body)
    console.log("Article créé avec succès:", article.id)

    return NextResponse.json({
      success: true,
      data: article,
      message: "Article créé avec succès"
    })
  } catch (error) {
    console.error("Error in POST /api/admin/articles:", error)
    
    let errorMessage = "Failed to create article"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        statusCode = 409 // Conflict
      } else if (error.message.includes("validation")) {
        statusCode = 400 // Bad Request
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      }, 
      { status: statusCode }
    )
  }
}
