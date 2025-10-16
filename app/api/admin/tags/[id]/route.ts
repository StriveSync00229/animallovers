import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function PUT(_req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await _req.json()
    const { name, slug, color } = body || {}
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from("article_tags")
      .update({ name, slug, color, updated_at: new Date().toISOString() })
      .eq("id", params.id)
      .select("*")
      .single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur update" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createAdminClient()
    const { error } = await supabase.from("article_tags").delete().eq("id", params.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur suppression" }, { status: 500 })
  }
}


