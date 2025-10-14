import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    console.log("Test de connexion à la base de données...")
    
    const supabase = await createAdminClient()
    console.log("Client Supabase créé")

    // Test 1: Vérifier la connexion de base
    const { data: testData, error: testError } = await supabase
      .from("articles")
      .select("count")
      .limit(1)

    if (testError) {
      console.error("Erreur de connexion de base:", testError)
      return NextResponse.json({
        success: false,
        error: "Erreur de connexion de base",
        details: testError.message
      }, { status: 500 })
    }

    console.log("Connexion de base réussie")

    // Test 2: Compter les articles
    const { count: articlesCount, error: countError } = await supabase
      .from("articles")
      .select("*", { count: "exact", head: true })

    if (countError) {
      console.error("Erreur lors du comptage des articles:", countError)
      return NextResponse.json({
        success: false,
        error: "Erreur lors du comptage des articles",
        details: countError.message
      }, { status: 500 })
    }

    console.log("Comptage des articles réussi:", articlesCount)

    // Test 3: Vérifier les catégories
    const { data: categories, error: categoriesError } = await supabase
      .from("article_categories")
      .select("id, name")
      .limit(5)

    if (categoriesError) {
      console.error("Erreur lors de la récupération des catégories:", categoriesError)
      return NextResponse.json({
        success: false,
        error: "Erreur lors de la récupération des catégories",
        details: categoriesError.message
      }, { status: 500 })
    }

    console.log("Catégories récupérées:", categories?.length || 0)

    // Test 4: Vérifier les utilisateurs
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, email, first_name, last_name")
      .limit(5)

    if (usersError) {
      console.error("Erreur lors de la récupération des utilisateurs:", usersError)
      return NextResponse.json({
        success: false,
        error: "Erreur lors de la récupération des utilisateurs",
        details: usersError.message
      }, { status: 500 })
    }

    console.log("Utilisateurs récupérés:", users?.length || 0)

    return NextResponse.json({
      success: true,
      message: "Tous les tests de connexion sont réussis",
      data: {
        articlesCount,
        categoriesCount: categories?.length || 0,
        usersCount: users?.length || 0,
        sampleCategories: categories,
        sampleUsers: users
      }
    })

  } catch (error) {
    console.error("Erreur générale dans le test de base de données:", error)
    return NextResponse.json({
      success: false,
      error: "Erreur générale",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    }, { status: 500 })
  }
}
