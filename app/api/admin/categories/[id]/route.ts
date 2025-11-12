import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { ArticleService } = await import("@/lib/server/article-service")
    
    const categoryData = {
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      color: body.color || null,
      icon: body.icon || null,
      is_active: body.is_active,
      sort_order: body.sort_order,
      parent_id: body.parent_id || null,
    }

    // Supprimer les propriétés undefined
    Object.keys(categoryData).forEach(key => {
      if (categoryData[key as keyof typeof categoryData] === undefined) {
        delete categoryData[key as keyof typeof categoryData]
      }
    })

    const data = await ArticleService.updateCategory(params.id, categoryData)
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error in PUT /api/admin/categories/[id]:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur update"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const { ArticleService } = await import("@/lib/server/article-service")
    await ArticleService.deleteCategory(params.id)
    return NextResponse.json({ 
      success: true,
      message: "Catégorie supprimée avec succès"
    })
  } catch (error: any) {
    console.error("Error in DELETE /api/admin/categories/[id]:", error)
    
    let errorMessage = "Erreur lors de la suppression de la catégorie"
    let statusCode = 500
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      // Détecter les erreurs de contrainte de clé étrangère
      if (error.message.includes("foreign key") || 
          error.message.includes("violates foreign key constraint") ||
          error.message.includes("23503")) {
        statusCode = 400
        errorMessage = "Impossible de supprimer cette catégorie car elle est utilisée par des articles. Vous devez d'abord supprimer ou déplacer les articles associés."
      } else if (error.message.includes("utilisée par des articles")) {
        statusCode = 400
        // Le message est déjà explicite
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage 
    }, { status: statusCode })
  }
}


