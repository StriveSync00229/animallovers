import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createAdminClient()
    const [{ count: articles }, { count: products }, { count: users }] = await Promise.all([
      supabase.from("articles").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("users").select("id", { count: "exact", head: true }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          articles: articles ?? 0,
          products: products ?? 0,
          users: users ?? 0,
        },
        exports: {
          // URLs d'export à implémenter si besoin (CSV/PDF)
        },
      },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur" }, { status: 500 })
  }
}


