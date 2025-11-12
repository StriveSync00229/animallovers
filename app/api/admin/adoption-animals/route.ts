import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createAdminClient()

    const { data, error } = await supabase
      .from("adoption_animals")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur dans GET /api/admin/adoption-animals:", error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    })
  } catch (error) {
    console.error("Erreur dans GET /api/admin/adoption-animals:", error)
    return NextResponse.json(
      { success: false, error: "Impossible de récupérer les animaux" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("POST /api/admin/adoption-animals - Données reçues:", body)

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Le nom de l'animal est requis" },
        { status: 400 },
      )
    }

    if (!body.category) {
      return NextResponse.json(
        { success: false, error: "Veuillez sélectionner une catégorie" },
        { status: 400 },
      )
    }

    if (!body.age_range) {
      return NextResponse.json(
        { success: false, error: "Veuillez sélectionner une tranche d'âge" },
        { status: 400 },
      )
    }

    if (!body.adoption_fee || Number(body.adoption_fee) < 0) {
      return NextResponse.json(
        { success: false, error: "Le montant des frais de réservation doit être positif" },
        { status: 400 },
      )
    }

    const supabase = await createAdminClient()

    const animalData = {
      name: body.name.trim(),
      category: body.category,
      age_range: body.age_range,
      breed: body.breed?.trim() || null,
      description: body.description?.trim() || null,
      character: body.character?.trim() || null,
      vaccinations: body.vaccinations?.trim() || null,
      adoption_fee: Number(body.adoption_fee),
      image_url: body.image_url || null,
      reservations_count: 0,
      is_available: body.is_available !== undefined ? body.is_available : true,
      is_featured: body.is_featured === true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("adoption_animals")
      .insert(animalData)
      .select("*")
      .single()

    if (error) {
      console.error("Erreur Supabase dans POST /api/admin/adoption-animals:", error)

      let errorMessage = "Impossible de créer l'animal"
      let statusCode = 500

      if (error.message) {
        errorMessage = error.message
      }

      return NextResponse.json(
        { success: false, error: errorMessage, details: process.env.NODE_ENV === "development" ? error : undefined },
        { status: statusCode },
      )
    }

    console.log("Animal créé avec succès:", data.id)

    return NextResponse.json(
      {
        success: true,
        data,
        message: "Animal ajouté avec succès",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erreur dans POST /api/admin/adoption-animals:", error)
    const errorMessage = error instanceof Error ? error.message : "Impossible de créer l'animal"
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}

