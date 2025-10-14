import { NextRequest, NextResponse } from "next/server"
import { ArticleService } from "@/lib/server/article-service"

export async function GET(request: NextRequest) {
  try {
    console.log("API GET /api/admin/categories - Début de la requête")
    
    const categories = await ArticleService.getCategories()
    console.log("Catégories récupérées:", categories.length)

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Erreur dans GET /api/admin/categories:", error)
    
    let errorMessage = "Failed to fetch categories"
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
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

    // Validation des données requises
    if (!body.name) {
      return NextResponse.json({ success: false, error: "Le nom de la catégorie est requis" }, { status: 400 })
    }

    // Génération automatique du slug si non fourni
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    }

    const categoryData = {
      name: body.name,
      slug: body.slug,
      description: body.description || null,
    }

    // TODO: Implement category creation using ArticleService
    // const category = await ArticleService.createCategory(categoryData)

    return NextResponse.json(
      {
        success: true,
        data: null, // category,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in POST /api/admin/categories:", error)
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 })
  }
}
