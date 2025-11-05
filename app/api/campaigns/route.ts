import { type NextRequest, NextResponse } from "next/server"
import { getActiveCampaigns, getFeaturedCampaigns } from "@/lib/server/campaign-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"

    const campaigns = featured ? await getFeaturedCampaigns() : await getActiveCampaigns()

    return NextResponse.json({
      success: true,
      data: campaigns,
      count: campaigns.length,
    })
  } catch (error) {
    console.error("Error in campaigns API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" }, { status: 500 })
  }
}
