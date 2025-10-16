import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("Test Supabase simple - Début")
    
    const supabase = await createAdminClient()
    console.log("Client Supabase créé")

    // Test simple - récupérer un article
    const { data, error } = await supabase
      .from("articles")
      .select("id, title")
      .limit(1)

    if (error) {
      console.error("Erreur Supabase:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error
      }, { status: 500 })
    }

    console.log("Articles récupérés:", data?.length || 0)

    return NextResponse.json({
      success: true,
      message: "Connexion Supabase réussie",
      articlesCount: data?.length || 0,
      sampleArticle: data?.[0] || null
    })

  } catch (error) {
    console.error("Erreur générale:", error)
    return NextResponse.json({
      success: false,
      error: "Erreur interne",
      details: error
    }, { status: 500 })
  }
}
