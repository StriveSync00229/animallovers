import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

// Générer un slug à partir du titre
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createAdminClient()
    const { searchParams } = new URL(request.url)
    
    let query = supabase
      .from("donation_campaigns")
      .select("*")
      .order("created_at", { ascending: false })

    if (searchParams.get("active") === "true") {
      query = query.eq("is_active", true)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erreur dans GET /api/admin/campaigns:", error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    })
  } catch (error) {
    console.error("Erreur dans GET /api/admin/campaigns:", error)
    return NextResponse.json(
      { success: false, error: "Impossible de récupérer les campagnes" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("POST /api/admin/campaigns - Données reçues:", body)

    // Validation des données
    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Le titre de la campagne est requis" },
        { status: 400 }
      )
    }

    if (!body.target_amount || parseFloat(body.target_amount) <= 0) {
      return NextResponse.json(
        { success: false, error: "Le montant cible doit être supérieur à 0" },
        { status: 400 }
      )
    }

    const supabase = await createAdminClient()

    // Générer le slug
    const slug = generateSlug(body.title)

    // Préparer les données pour l'insertion
    const campaignData: any = {
      title: body.title.trim(),
      slug,
      description: body.description?.trim() || null,
      short_description: body.object?.trim() || null,
      story: body.story?.trim() || null,
      target_amount: parseFloat(body.target_amount),
      current_amount: 0,
      currency: "EUR",
      featured_image: body.featured_image || null,
      gallery_images: body.gallery_images || null,
      video_url: body.video_url || null,
      animal_name: body.animal_name?.trim() || null,
      animal_type: body.animal_type || null,
      animal_age: body.animal_age ? parseInt(body.animal_age) : null,
      animal_breed: body.animal_breed?.trim() || null,
      animal_story: body.animal_story?.trim() || null,
      animal_images: body.animal_images || null,
      is_active: body.is_active !== undefined ? body.is_active : true,
      is_featured: body.is_featured === true,
      is_urgent: body.is_urgent === true,
      is_completed: false,
      start_date: new Date().toISOString(),
      end_date: body.end_date || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("donation_campaigns")
      .insert(campaignData)
      .select()
      .single()

    if (error) {
      console.error("Erreur Supabase dans POST /api/admin/campaigns:", error)
      
      let errorMessage = "Impossible de créer la campagne"
      let statusCode = 500

      if (error.code === "23505") {
        // Duplicate key (slug already exists)
        errorMessage = "Une campagne avec ce titre existe déjà"
        statusCode = 409
      } else if (error.code === "23503") {
        // Foreign key violation
        errorMessage = "Erreur de référence (catégorie ou autre référence invalide)"
        statusCode = 400
      } else if (error.message) {
        errorMessage = error.message
      }

      return NextResponse.json(
        { success: false, error: errorMessage, details: process.env.NODE_ENV === "development" ? error : undefined },
        { status: statusCode }
      )
    }

    console.log("Campagne créée avec succès:", data.id)

    return NextResponse.json({
      success: true,
      data,
      message: "Campagne créée avec succès",
    }, { status: 201 })
  } catch (error) {
    console.error("Erreur dans POST /api/admin/campaigns:", error)
    
    let errorMessage = "Impossible de créer la campagne"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

