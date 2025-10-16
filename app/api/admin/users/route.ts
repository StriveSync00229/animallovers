import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from("users")
      .select("id, email, first_name, last_name, avatar_url, role, is_active, created_at")
      .order("created_at", { ascending: false })
      .limit(100)
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur" }, { status: 500 })
  }
}


