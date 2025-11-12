import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"

    let query = supabase
      .from("donation_campaigns")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (featured) {
      query = query.eq("is_featured", true)
    }

    // Limiter à 6 campagnes pour la page d'accueil si non spécifié
    const limit = searchParams.get("limit")
    if (limit) {
      query = query.limit(parseInt(limit))
    } else if (!featured) {
      query = query.limit(6)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erreur dans GET /api/campaigns:", error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    // Transformer les données pour correspondre au format attendu par le frontend
    const transformedCampaigns = (data || []).map((campaign: any) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description || campaign.short_description || "",
      story: campaign.story || campaign.description || "",
      targetAmount: parseFloat(campaign.target_amount || 0),
      currentAmount: parseFloat(campaign.current_amount || 0),
      image: campaign.featured_image || "/placeholder.svg?height=200&width=300",
      active: campaign.is_active || false,
      featured: campaign.is_featured || false,
      createdAt: campaign.created_at,
      endDate: campaign.end_date || null,
      animalName: campaign.animal_name || "",
      animalType: campaign.animal_type || null,
    }))

    return NextResponse.json({
      success: true,
      data: transformedCampaigns,
      count: transformedCampaigns.length,
    })
  } catch (error) {
    console.error("Error in campaigns API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" }, { status: 500 })
  }
}
