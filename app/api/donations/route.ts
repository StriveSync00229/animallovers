import { type NextRequest, NextResponse } from "next/server"
import { processDonation, getDonationStats } from "@/lib/server/donation-service"

export async function GET(request: NextRequest) {
  try {
    const stats = await getDonationStats()

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error("Error in donations stats API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch donation stats" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = await processDonation(body)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing donation:", error)
    return NextResponse.json({ success: false, error: "Failed to process donation" }, { status: 500 })
  }
}
