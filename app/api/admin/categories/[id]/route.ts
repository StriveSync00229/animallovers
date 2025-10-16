import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, slug, description, color, icon, is_active, sort_order } = body || {}
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from("article_categories")
      .update({ name, slug, description, color, icon, is_active, sort_order })
      .eq("id", params.id)
      .select("*")
      .single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur update" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createAdminClient()
    const { error } = await supabase.from("article_categories").delete().eq("id", params.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur suppression" }, { status: 500 })
  }
}


