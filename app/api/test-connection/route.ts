import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("Test de connexion Supabase - Début")
    
    // Vérifier les variables d'environnement
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log("Variables d'environnement:")
    console.log("- NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "Définie" : "Manquante")
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", serviceRoleKey ? "Définie" : "Manquante")
    
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        success: false,
        error: "Variables d'environnement manquantes",
        details: {
          supabaseUrl: !!supabaseUrl,
          serviceRoleKey: !!serviceRoleKey
        }
      }, { status: 500 })
    }

    const supabase = await createAdminClient()
    console.log("Client Supabase créé avec succès")

    // Tester la connexion en récupérant le nombre d'articles
    const { data: articles, error: articlesError } = await supabase
      .from("articles")
      .select("id")
      .limit(1)

    if (articlesError) {
      console.error("Erreur lors de la récupération des articles:", articlesError)
      return NextResponse.json({
        success: false,
        error: "Erreur lors de la récupération des articles",
        details: articlesError
      }, { status: 500 })
    }

    console.log("Nombre d'articles dans la base:", articles?.length || 0)

    // Tester la récupération des catégories
    const { data: categories, error: categoriesError } = await supabase
      .from("article_categories")
      .select("id")
      .limit(1)

    if (categoriesError) {
      console.error("Erreur lors de la récupération des catégories:", categoriesError)
      return NextResponse.json({
        success: false,
        error: "Erreur lors de la récupération des catégories",
        details: categoriesError
      }, { status: 500 })
    }

    console.log("Nombre de catégories dans la base:", categories?.length || 0)

    // Récupérer quelques articles avec leurs relations
    const { data: articlesWithRelations, error: relationsError } = await supabase
      .from("articles")
      .select(`
        *,
        author:users(first_name, last_name, avatar_url),
        category:article_categories(id, name, slug, color)
      `)
      .limit(5)

    if (relationsError) {
      console.error("Erreur lors de la récupération des articles avec relations:", relationsError)
      return NextResponse.json({
        success: false,
        error: "Erreur lors de la récupération des articles avec relations",
        details: relationsError
      }, { status: 500 })
    }

    console.log("Articles avec relations récupérés:", articlesWithRelations?.length || 0)

    return NextResponse.json({
      success: true,
      message: "Connexion Supabase réussie",
      data: {
        articlesCount: articles?.length || 0,
        categoriesCount: categories?.length || 0,
        sampleArticles: articlesWithRelations?.slice(0, 2) || []
      }
    })

  } catch (error) {
    console.error("Erreur générale lors du test de connexion:", error)
    return NextResponse.json({
      success: false,
      error: "Erreur générale",
      details: error
    }, { status: 500 })
  }
}
