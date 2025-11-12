import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get("limit")
    const featured = searchParams.get("featured") === "true"

    let query = supabase
      .from("adoption_animals")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false })

    if (featured) {
      query = query.eq("is_featured", true)
    }

    if (limitParam) {
      query = query.limit(parseInt(limitParam))
    } else if (!featured) {
      query = query.limit(8)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erreur dans GET /api/adoption-animals:", error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      )
    }

    const transformedAnimals = (data || []).map((animal) => ({
      id: animal.id,
      name: animal.name,
      category: animal.category,
      ageRange: animal.age_range,
      breed: animal.breed,
      description: animal.description,
      character: animal.character,
      vaccinations: animal.vaccinations,
      adoptionFee: animal.adoption_fee,
      image: animal.image_url,
      isFeatured: animal.is_featured,
      reservationsCount: animal.reservations_count,
      createdAt: animal.created_at,
    }))

    return NextResponse.json({
      success: true,
      data: transformedAnimals,
      count: transformedAnimals.length,
    })
  } catch (error) {
    console.error("Erreur inattendue dans GET /api/adoption-animals:", error)
    return NextResponse.json(
      { success: false, error: "Impossible de récupérer les animaux" },
      { status: 500 },
    )
  }
}

