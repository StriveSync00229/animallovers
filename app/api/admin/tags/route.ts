import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from("article_tags").select("*").order("name", { ascending: true })
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors du chargement des tags" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, color } = body || {}
    if (!name || !slug) {
      return NextResponse.json({ success: false, error: "name et slug sont requis" }, { status: 400 })
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from("article_tags")
      .insert({ name, slug, color })
      .select("*")
      .single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la création du tag" },
      { status: 500 },
    )
  }
}


