import { type NextRequest, NextResponse } from "next/server"
import { ProductCategoryService } from "@/lib/server/product-category-service"

/**
 * GET /api/admin/product-categories/[id]
 * Récupérer une catégorie par son ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await ProductCategoryService.getCategoryById(id)

    if (!category) {
      return NextResponse.json({ success: false, error: "Catégorie non trouvée" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: category,
    })
  } catch (error) {
    console.error("❌ Erreur dans GET /api/admin/product-categories/[id]:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la récupération de la catégorie"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

/**
 * PUT /api/admin/product-categories/[id]
 * Mettre à jour une catégorie
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const categoryData: any = {}

    if (body.name !== undefined) categoryData.name = body.name.trim()
    if (body.slug !== undefined) categoryData.slug = body.slug.trim()
    if (body.description !== undefined) categoryData.description = body.description?.trim() || null
    if (body.icon !== undefined) categoryData.icon = body.icon?.trim() || null
    if (body.image_url !== undefined) categoryData.image_url = body.image_url?.trim() || null
    if (body.parent_id !== undefined) categoryData.parent_id = body.parent_id || null
    if (body.species !== undefined) categoryData.species = body.species || null
    if (body.sort_order !== undefined) categoryData.sort_order = body.sort_order
    if (body.is_active !== undefined) categoryData.is_active = body.is_active
    if (body.seo_title !== undefined) categoryData.seo_title = body.seo_title?.trim() || null
    if (body.seo_description !== undefined) categoryData.seo_description = body.seo_description?.trim() || null

    const category = await ProductCategoryService.updateCategory(id, categoryData)

    return NextResponse.json({
      success: true,
      data: category,
    })
  } catch (error) {
    console.error("❌ Erreur dans PUT /api/admin/product-categories/[id]:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la mise à jour de la catégorie"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

/**
 * DELETE /api/admin/product-categories/[id]
 * Supprimer une catégorie
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await ProductCategoryService.deleteCategory(id)

    return NextResponse.json({
      success: true,
      message: "Catégorie supprimée avec succès",
    })
  } catch (error) {
    console.error("❌ Erreur dans DELETE /api/admin/product-categories/[id]:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression de la catégorie"
    
    // Si c'est une erreur de validation (catégorie utilisée), retourner 400
    if (errorMessage.includes("impossible") || errorMessage.includes("utilisée")) {
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 })
    }
    
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

