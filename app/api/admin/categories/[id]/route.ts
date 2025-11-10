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
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in DELETE /api/admin/categories/[id]:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur suppression"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}


