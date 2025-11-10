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

    const categoryData = {
      name: body.name,
      slug: body.slug || undefined, // sera généré automatiquement si non fourni
      description: body.description || null,
      color: body.color || null,
      icon: body.icon || null,
      parent_id: body.parent_id || null,
      sort_order: body.sort_order || 0,
      is_active: body.is_active !== undefined ? body.is_active : true,
    }

    // Créer la catégorie principale
    const category = await ArticleService.createCategory(categoryData)

    // Si des sous-catégories sont fournies, les créer
    let subcategories = []
    if (body.subcategories && Array.isArray(body.subcategories) && body.subcategories.length > 0) {
      subcategories = await ArticleService.createSubcategories(category.id, body.subcategories)
    } else if (body.subcategories && typeof body.subcategories === 'string') {
      // Si c'est une string (textarea), la parser
      const subcategoryNames = body.subcategories
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0)
      
      if (subcategoryNames.length > 0) {
        subcategories = await ArticleService.createSubcategories(category.id, subcategoryNames)
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...category,
          subcategories,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in POST /api/admin/categories:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create category"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
