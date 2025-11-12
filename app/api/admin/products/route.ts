import { NextRequest, NextResponse } from "next/server"
import { ProductService } from "@/lib/server/product-service-admin"

export async function GET(request: NextRequest) {
  try {
    console.log("API GET /api/admin/products - Début de la requête")
    
    const { searchParams } = new URL(request.url)
    
    // Si on demande les catégories
    if (searchParams.get("categories") === "true") {
      const categories = await ProductService.getProductCategories()
      return NextResponse.json({
        success: true,
        categories,
      })
    }
    
    const filters = {
      category: searchParams.get("category") || undefined,
      species: searchParams.get("species") || undefined,
      is_active: searchParams.get("is_active") === "true" ? true : searchParams.get("is_active") === "false" ? false : undefined,
      is_featured: searchParams.get("is_featured") === "true" ? true : searchParams.get("is_featured") === "false" ? false : undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined,
      offset: searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : undefined,
    }

    const products = await ProductService.getAllProducts(filters)
    console.log("Produits récupérés:", products.length)

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Erreur dans GET /api/admin/products:", error)
    
    let errorMessage = "Failed to fetch products"
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
    console.log("POST /api/admin/products - Données reçues:", body)

    // Validation des données
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Le nom du produit est requis" },
        { status: 400 }
      )
    }

    if (!body.price || parseFloat(body.price) <= 0) {
      return NextResponse.json(
        { success: false, error: "Le prix doit être supérieur à 0" },
        { status: 400 }
      )
    }

    // Mapper les données du formulaire vers la structure de la base de données
    const productData = {
      name: body.name,
      slug: body.slug || undefined, // sera généré automatiquement si non fourni
      description: body.description || null,
      sku: body.sku || null,
      brand_id: body.brand_id || null,
      category_id: body.category_id || null,
      subcategory_id: body.subcategory_id || null,
      price: parseFloat(body.price),
      original_price: body.original_price ? parseFloat(body.original_price) : null,
      stock_quantity: body.stock_quantity ? parseInt(body.stock_quantity) : 0,
      weight: body.weight ? parseFloat(body.weight) : null,
      species: body.species || null,
      featured_image: body.featured_image || null,
      gallery_images: body.gallery_images || (body.gallery_images_array ? body.gallery_images_array : null),
      is_featured: body.is_featured === true || body.is_popular === true,
      is_bestseller: body.is_bestseller === true || body.status === "bestseller",
      is_new: body.is_new === true || body.status === "new",
      is_active: body.is_active !== undefined ? body.is_active : true,
      rating_average: body.rating_average || 0,
      review_count: body.review_count || 0,
    }

    const product = await ProductService.createProduct(productData)
    console.log("Produit créé avec succès:", product.id)

    return NextResponse.json({
      success: true,
      data: product,
      message: "Produit créé avec succès"
    }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/admin/products:", error)
    
    let errorMessage = "Failed to create product"
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
        errorMessage = "Un produit avec ce nom ou ce slug existe déjà"
      } else if (error.message.includes("validation") || error.message.includes("check constraint")) {
        statusCode = 400 // Bad Request
        errorMessage = "Erreur de validation des données"
      } else if (error.message.includes("foreign key") || error.message.includes("violates foreign key")) {
        statusCode = 400
        errorMessage = "La catégorie ou la marque sélectionnée n'existe pas"
      } else if (error.message.includes("Impossible de créer le produit")) {
        // Message déjà formaté par le service
        errorMessage = error.message
      }
    } else {
      // Si l'erreur n'est pas une instance d'Error, la convertir en string
      errorMessage = typeof error === "string" ? error : JSON.stringify(error)
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

