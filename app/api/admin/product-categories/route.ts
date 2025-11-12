import { type NextRequest, NextResponse } from "next/server"
import { ProductCategoryService } from "@/lib/server/product-category-service"

/**
 * GET /api/admin/product-categories
 * Récupérer toutes les catégories de produits
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"
    const mainOnly = searchParams.get("mainOnly") === "true"
    const parentId = searchParams.get("parentId")

    let categories

    if (parentId) {
      // Récupérer les sous-catégories d'une catégorie
      categories = await ProductCategoryService.getSubcategories(parentId, includeInactive)
    } else if (mainOnly) {
      // Récupérer uniquement les catégories principales
      categories = await ProductCategoryService.getMainCategories(includeInactive)
    } else {
      // Récupérer toutes les catégories avec organisation hiérarchique
      categories = await ProductCategoryService.getAllCategories(includeInactive)
    }

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    })
  } catch (error) {
    console.error("❌ Erreur dans GET /api/admin/product-categories:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la récupération des catégories"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

/**
 * POST /api/admin/product-categories
 * Créer une nouvelle catégorie de produits
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Le nom de la catégorie est requis" },
        { status: 400 }
      )
    }

    const categoryData = {
      name: body.name.trim(),
      slug: body.slug?.trim() || undefined,
      description: body.description?.trim() || null,
      icon: body.icon?.trim() || null,
      image_url: body.image_url?.trim() || null,
      parent_id: body.parent_id || null,
      species: body.species || null,
      sort_order: body.sort_order || 0,
      is_active: body.is_active !== undefined ? body.is_active : true,
      seo_title: body.seo_title?.trim() || null,
      seo_description: body.seo_description?.trim() || null,
    }

    // Créer la catégorie
    const category = await ProductCategoryService.createCategory(categoryData)

    // Si des sous-catégories sont fournies, les créer
    let subcategories = []
    if (body.subcategories && Array.isArray(body.subcategories) && body.subcategories.length > 0) {
      subcategories = await ProductCategoryService.createSubcategories(category.id, body.subcategories)
    } else if (body.subcategories && typeof body.subcategories === "string") {
      // Si c'est une string (textarea), la parser
      const subcategoryNames = body.subcategories
        .split("\n")
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0)

      if (subcategoryNames.length > 0) {
        subcategories = await ProductCategoryService.createSubcategories(category.id, subcategoryNames)
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...category,
          children: subcategories,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("❌ Erreur dans POST /api/admin/product-categories:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur lors de la création de la catégorie"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

