import { NextRequest, NextResponse } from "next/server"
import { ProductService } from "@/lib/server/product-service-admin"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const productData = {
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      sku: body.sku || null,
      brand_id: body.brand_id || null,
      category_id: body.category_id || null,
      subcategory_id: body.subcategory_id || null,
      price: body.price ? parseFloat(body.price) : undefined,
      original_price: body.original_price ? parseFloat(body.original_price) : null,
      stock_quantity: body.stock_quantity ? parseInt(body.stock_quantity) : undefined,
      weight: body.weight ? parseFloat(body.weight) : null,
      species: body.species || null,
      featured_image: body.featured_image || null,
      gallery_images: body.gallery_images || (body.gallery_images_array ? body.gallery_images_array : null),
      is_featured: body.is_featured,
      is_bestseller: body.is_bestseller,
      is_new: body.is_new,
      is_active: body.is_active,
      rating_average: body.rating_average,
      review_count: body.review_count,
    }

    // Supprimer les propriétés undefined
    Object.keys(productData).forEach(key => {
      if (productData[key as keyof typeof productData] === undefined) {
        delete productData[key as keyof typeof productData]
      }
    })

    const data = await ProductService.updateProduct(id, productData)
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error in PUT /api/admin/products/[id]:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur update"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await ProductService.deleteProduct(id)
    return NextResponse.json({ 
      success: true,
      message: "Produit supprimé avec succès"
    })
  } catch (error: any) {
    console.error("Error in DELETE /api/admin/products/[id]:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur suppression"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

