import { NextRequest, NextResponse } from "next/server"
import { ArticleService } from "@/lib/server/article-service"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`API DELETE /api/admin/articles/${params.id} - Début de la requête`)
    
    const result = await ArticleService.deleteArticle(params.id)
    console.log("Article supprimé avec succès")

    return NextResponse.json({
      success: true,
      message: "Article supprimé avec succès",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error(`Erreur dans DELETE /api/admin/articles/${params.id}:`, error)
    
    let errorMessage = "Failed to delete article"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      
      if (error.message.includes("not found")) {
        statusCode = 404
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`API PUT /api/admin/articles/${params.id} - Début de la requête`)
    
    const body = await request.json()
    console.log("Données de mise à jour reçues:", body)

    const article = await ArticleService.updateArticle(params.id, body)
    console.log("Article mis à jour avec succès")

    return NextResponse.json({
      success: true,
      data: article,
      message: "Article mis à jour avec succès"
    })
  } catch (error) {
    console.error(`Erreur dans PUT /api/admin/articles/${params.id}:`, error)
    
    let errorMessage = "Failed to update article"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      
      if (error.message.includes("not found")) {
        statusCode = 404
      } else if (error.message.includes("validation")) {
        statusCode = 400
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`API GET /api/admin/articles/${params.id} - Début de la requête`)
    
    const article = await ArticleService.getArticleById(params.id)
    console.log("Article récupéré avec succès")

    return NextResponse.json({
      success: true,
      data: article
    })
  } catch (error) {
    console.error(`Erreur dans GET /api/admin/articles/${params.id}:`, error)
    
    let errorMessage = "Failed to fetch article"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      
      if (error.message.includes("not found")) {
        statusCode = 404
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
