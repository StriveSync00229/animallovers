import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createAdminClient()

    const [articles, products, users, donations] = await Promise.all([
      supabase.from("articles").select("id", { count: "exact", head: true }),
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("users").select("id", { count: "exact", head: true }),
      supabase.from("donations").select("amount, created_at").gte("created_at", new Date(Date.now() - 30*24*60*60*1000).toISOString()),
    ])

    const articlesCount = articles.count ?? 0
    const productsCount = products.count ?? 0
    const usersCount = users.count ?? 0
    const donationsList = donations.data || []
    const donationsTotalLast30 = donationsList.reduce((sum, d: any) => sum + Number(d.amount || 0), 0)

    return NextResponse.json({
      success: true,
      data: {
        articlesCount,
        productsCount,
        usersCount,
        donationsTotalLast30,
        donationsCountLast30: donationsList.length,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Erreur analytics" }, { status: 500 })
  }
}


